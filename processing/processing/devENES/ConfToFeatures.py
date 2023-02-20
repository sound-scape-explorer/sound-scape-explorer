#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb  7 10:09:59 2023

@author: rj102145
"""
import pandas as pd
import numpy as np
import os
import sys
import torch
import pathlib
import datetime
sys.path.append('/home/rj102145/Documents/ujm(Mac-Linux)/travail' + 
                '/sound-scape-explorer/processing/processing')
from processing.classes.Config import Config
from processing.classes.ExtractorDataLoader import ExtractorDataLoader
from processing.utils.convert_band_parameters_string_to_array import\
                                    convert_band_parameters_string_to_array
from processing.models.VGGish import VGGish
from processing.utils.load_feature_file import load_feature_file



from progress.spinner import Spinner

class ConfToFeatures:
    def __init__(self, configFile, rootPath):
        self.confObj = Config(configFile)
        self.rootPath = rootPath + os.sep
        self.__getFormatParamDict()
        self.__getFormatBandsDict()
        self.__getFileLabelPd()
        
    def __getFormatBandsDict(self):
        self.bandDict = dict()
        for b in self.confObj.bands.keys():
            self.bandDict[b] = \
                convert_band_parameters_string_to_array(self.confObj.bands[b])
         
    def __getFormatParamDict(self):
        spinner = Spinner('Loading ')
        self.paramDict = dict()
        for p in self.confObj.variables.keys():
            if p in ['integration_seconds', 'nearest_radiuses']:
                self.paramDict[p] = \
                    convert_band_parameters_string_to_array(self.confObj.variables[p])
            elif self.confObj.variables[p] == 'nan':
                self.paramDict[p] = np.nan
            else:
                try:
                    self.paramDict[p] = eval(self.confObj.variables[p])
                except:
                    self.paramDict[p] = self.confObj.variables[p]
            spinner.next()
        
    def __getFileLabelPd(self):
        
        # get files and Handcraft labels DataFrames from confObg
        filesLabelsPd = pd.DataFrame.from_dict(self.confObj.get().files, 
                                              orient='index', 
                                              columns=None).reset_index(drop=True)
        # change 'site' column name to 'wavFiles' 
        filesLabelsPd.rename(columns={'site': 'wavFiles'}, inplace=True)
        # "unlist" the HandCraft labels
        for column in filesLabelsPd.columns[3:]:
            filesLabelsPd[column] = filesLabelsPd[column].apply(lambda x : x[0])
        # DataFrames affectation    
        self.filesPd = filesLabelsPd['wavFiles'].apply(lambda x : self.rootPath\
                                                       + os.path.basename(self.paramDict['audio_base'])\
                                                            + x)
        self.outFilesBaseName = filesLabelsPd['wavFiles'].apply(lambda x : x.replace('/', '_')[1:])
        # self.filesTagsPd = filesLabelsPd['tags']
        # self.filesStartPd = filesLabelsPd['start']
        self.handLabelsPd = filesLabelsPd[filesLabelsPd.columns[1:]]
        self.bandsToCompute = list(self.bandDict.keys())
        
    def __reduiceFeaturesDim(self, featuresDataframe):
        c = [c for c in featuresDataframe[4:].columns if len(set(featuresDataframe[c])) == 1]
        featuresDataframe.drop(labels=c, axis=1, inplace=True)
        return featuresDataframe
    
    def filtering(self, bands = 'all', integration = 'all',  **kwargs):
        if not isinstance(bands, list):
            self.bandsToCompute = [bands]
        else:
            self.bandsToCompute = bands
        if bands == 'all':
            self.bandsToCompute = list(self.bandDict.keys())
            
        if not isinstance(integration, list):
            integration = [integration]
        if integration != 'all':
            self.paramDict['integration_seconds'] = integration
        for key in kwargs.keys():
            if not isinstance(kwargs[key], list):
                kwargs[key] = [ kwargs[key] ]
                self.filesPd = self.filesPd[self.handLabelsPd[key].isin(kwargs[key])]
                self.outFilesBaseName = self.outFilesBaseName[self.handLabelsPd[key].isin(kwargs[key])]
                # self.filesTagsPd = self.filesTagsPd[self.handLabelsPd[key].isin(kwargs[key])]
                # self.filesStartPd = self.filesStartPd[self.handLabelsPd[key].isin(kwargs[key])]
                self.handLabelsPd = self.handLabelsPd[self.handLabelsPd[key].isin(kwargs[key])]
            
    def computeFeatures(self, modelType = 'VGGish', save = False):
        featuresDataframe = None

        if modelType == 'VGGish':
            model = VGGish()
            if torch.cuda.is_available():
                device  = 'cuda'
        else:
            pass
        self.modelType = modelType
        
        for fileIn, outBaseName, Handcraft in zip(self.filesPd, 
                                                  self.outFilesBaseName, 
                                                  self.handLabelsPd.iterrows()):
            for bandName in self.bandsToCompute:
                frequency_range = self.bandDict[bandName]
                fileOut = self.rootPath + 'features'+ os.sep + bandName + \
                    os.sep + outBaseName + '.npz'
                fileIn = pathlib.Path(fileIn)
                fileOut = pathlib.Path(fileOut)
                
                data_loader = ExtractorDataLoader(
                    fileIn,
                    fileOut,
                    frequency_range,
                    self.paramDict['audio_expected_sample_rate'],
                    )
                input_path, output_path, band_params, t_start, wav_data, \
                    sample_rate, _ = data_loader.get()
                
                payload = []  # results file
                i = 0
                batch = int(sample_rate * 60 * 5)
                # completion to a integer number of seconds
                if wav_data.shape[1] % sample_rate != 0:
                    wav_data = torch.cat(
                        (wav_data, torch.zeros(
                            (1, int(sample_rate) - int(wav_data.shape[1] % sample_rate))
                        )), 1
                    )
                # cut the signal into batch samples (batch = 5 min of signal)
                while i < wav_data.shape[1]:
                    samples = wav_data[:, i:i + batch]
                    model.frequency_range = frequency_range
                    if device == 'cuda':
                        fts = model.forward(samples, fs=sample_rate).cpu()
                    else:
                        fts = model.forward(samples, fs=sample_rate)
                    i += batch
                    payload.append(fts)
                payload = torch.cat(payload).numpy()
                
                if save == True:    
                    if not(fileOut.exists()):
                        if not(fileOut.parent.exists()):
                            fileOut.parent.mkdir(parents=True, exist_ok=False)
                        np.savez_compressed(output_path, x=payload)
                        
                start = Handcraft[1].values[0]       
                for integration in self.paramDict['integration_seconds']:
                    
                    nb_sub = len(payload)//integration
                    payload_temp = payload[:nb_sub*integration,:]
                    payload_temp = np.reshape(payload_temp, (integration, nb_sub, payload.shape[1]))
                    payload_temp = np.mean(payload_temp, axis=0)
                    for i in range(nb_sub):
                        
                        name = outBaseName[:-4] + '_' + bandName + '_' + str(integration) + '_' + str(i+1)
                        DimColName = np.arange(1,len(payload_temp[i,:])+1).astype(str)
                        DimColName = ['F_' + DColN for DColN in  DimColName]

                        if not isinstance(featuresDataframe, pd.DataFrame):
                            featuresDataframe = pd.DataFrame(
                                [[name, outBaseName, fileIn, bandName, integration, start] + list(Handcraft[1].values[1:]) + list(payload_temp[i,:])],
                                columns = ['name', 'file', 'wavpath', 'band', 'integration', 'start' ] + list(self.handLabelsPd.columns[1:]) + DimColName)
                        else:
                            Handcraft[1].values[0] += datetime.timedelta(seconds=integration)
                            featuresDataframe = pd.concat( [featuresDataframe, 
                                pd.DataFrame(
                                    [[name, outBaseName, fileIn, bandName, integration, start+datetime.timedelta(seconds=i*integration)] + list(Handcraft[1].values[1:]) + list(payload_temp[i,:])],
                                    columns = ['name', 'file', 'wavpath', 'band', 'integration', 'start' ] + list(self.handLabelsPd.columns[1:]) + DimColName)])
        featuresDataframe.attrs['OrigBand'] = self.bandDict
        return featuresDataframe
         
    def loadFeatures(self):
        featuresDataframe = None
        for fileIn, outBaseName, Handcraft in zip(self.filesPd, 
                                                  self.outFilesBaseName, 
                                                  self.handLabelsPd.iterrows()):
            for bandName in self.bandsToCompute:
                fileOut = self.rootPath + 'features'+ os.sep + bandName + os.sep + outBaseName + '.npz'
                fileIn = pathlib.Path(fileIn)
                fileOut = pathlib.Path(fileOut)
                if fileOut.exists():
                    payload = load_feature_file(fileOut)
                start = Handcraft[1].values[0] 
                for integration in self.paramDict['integration_seconds']:
                    nb_sub = len(payload)//integration
                    payload_temp = payload[:nb_sub*integration,:]
                    payload_temp = np.reshape(payload_temp, (integration, nb_sub, payload.shape[1]))
                    payload_temp = np.mean(payload_temp, axis=0)
                    for i in range(nb_sub):
                        name = outBaseName[:-4] + '_' + bandName + '_' + str(integration) + '_' + str(i+1)
                        DimColName = np.arange(1,len(payload_temp[i,:])+1).astype(str)
                        DimColName = ['F_' + DColN for DColN in  DimColName]
                        if not isinstance(featuresDataframe, pd.DataFrame):
                            featuresDataframe = pd.DataFrame(
                                [[name, outBaseName, fileIn, bandName, integration, start] + list(Handcraft[1].values[1:]) + list(payload_temp[i,:])],
                                columns = ['name', 'file', 'wavpath', 'band', 'integration', 'start' ] + list(self.handLabelsPd.columns[1:]) + DimColName)
                        else:
                            Handcraft[1].values[0] += datetime.timedelta(seconds=integration)
                            featuresDataframe = pd.concat( [featuresDataframe, 
                                pd.DataFrame(
                                    [[name, outBaseName, fileIn, bandName, integration, start+datetime.timedelta(seconds=i*integration)] + list(Handcraft[1].values[1:]) + list(payload_temp[i,:])],
                                    columns = ['name', 'file', 'wavpath', 'band', 'integration', 'start' ] + list(self.handLabelsPd.columns[1:]) + DimColName)])
        featuresDataframe.attrs['OrigBand'] = self.bandDict
        return featuresDataframe
    