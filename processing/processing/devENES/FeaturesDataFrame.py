#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb  9 10:51:33 2023

@author: rj102145
"""
import pandas as pd
import numpy as np
from scipy import stats, spatial
import umap.umap_ as umap
from sklearn.decomposition import PCA, SparsePCA
import sklearn.metrics as metrics
from VAE_v1 import VAE
import matplotlib
import mplcursors
import soundfile as sf
import maad
import ENES_index
import hdbscan
import time

import matplotlib.pyplot as plt
import matplotlib.colors as clrs
import seaborn as sns

def filtering(df, **kwargs):
    for key in kwargs.keys():
        if not isinstance(kwargs[key], list):
            kwargs[key] = [ kwargs[key] ]
        df = df[df[key].isin(kwargs[key])]
    return df

def reductCol(df, dimShortName = 'F_'):
    dim = [col for col in df.columns if\
           (len(col)>2 and col[:len(dimShortName)]==dimShortName)]
    return dim

def featuresCol(df, dimShortName = 'F_'):
    dim = reductCol(df, dimShortName)
    return dim

def deleteUnusedDim(df, dimShortName = 'F_'):
    dim0 = featuresCol(df, dimShortName)
    col = [col for col in dim0 if len(set(df[col])) == 1]
    df.drop(labels=col, axis=1, inplace=True)
    return df

def transformDim(df, dimShortName = 'F_', method = 'center-reduce'):
    dim = featuresCol(df, dimShortName)
    if method == 'center':
        df[dim] = df[dim].subtract(df[dim].mean())
    elif method == 'center-reduce':
        df[dim] = stats.zscore(df[dim])
    return df
        
def dimReduce(df, dimShortName = 'F_',
               reducName = 'UMAP2d_D',
               method = 'umap',
               n_components = 2,
               **kwarg):
    reducCol = [reducName + str(i+1) for i in range(n_components)]
    dim = featuresCol(df, dimShortName)
    X = df[dim]
    if method == 'umap':
        reducer = umap.UMAP(n_components = n_components, **kwarg)
        reducer.fit(X)
        dimRed = reducer.transform(X)
    if method == 'PCA':
        reducer = PCA(n_components=n_components, **kwarg)
        reducer.fit(X)
        dimRed = reducer.transform(X)
    if method == 'SparsePCA':
        reducer = SparsePCA(n_components=n_components, **kwarg)
        reducer.fit(X)
        dimRed = reducer.transform(X)
    if method == 'VAE':
        reducer = VAE(n_components=n_components, **kwarg)
        reducer.fit(X)
        dimRed = reducer.transform(X)
    df[reducCol] = dimRed
    return df, reducer

def plotPairwise(df, dim = 'F_', n_components = 2, hue = None):
    if isinstance(dim, str):
        title = dim
        dim = reductCol(df, dim)
    else:# dim is alraedy a vector made by strings: the columns names
        title = dim[0][:-1]
    if n_components > len(dim):
        n_components = len(dim)    
    dim = dim[:n_components]
    
    # pairplot
    if len(df[hue].unique()) > 10:
        palette = sns.color_palette("Spectral")
    else: 
        palette = None
    g = sns.PairGrid(df, vars = dim, diag_sharey=False, hue = hue, palette=palette)
    g.map_upper(sns.scatterplot, alpha = 0.5)
    g.add_legend()
    g.map_lower(sns.scatterplot, alpha = 0.5)
    g.map_lower(sns.kdeplot, levels=4)
    g.map_diag(sns.kdeplot)

def plotScatter(df, dim = 'F_', n_components = 2, hue = None):
     # scatter plot
    if isinstance(dim, str):
        title = dim
        dim = reductCol(df, dim)
    else:# dim is alraedy a vector made by strings: the columns names
        title = dim[0][:-1]
    print(hue)   
    if n_components > len(dim):
        n_components = len(dim)    
    dim = dim[:n_components]
    fig = plt.figure()
    fig.suptitle(title)
    if n_components == 2:
        ax = fig.add_subplot(111)
        if len(df[hue].unique()) > 10:
            palette = sns.color_palette("Spectral")
        else: 
            palette = None
        sns.scatterplot(df, x=dim[0], y=dim[1], hue = hue, ax = ax, alpha = 0.5, palette=palette)
    elif n_components == 3:
        ax = fig.add_subplot(111, projection = '3d')
        ax.set_xlabel(dim[0])
        ax.set_ylabel(dim[1])
        ax.set_zlabel(dim[2])
        # to reproduice the hue coloration as seaborn would do
        if hue != None:
            nbUHue = len(df[hue].unique())
            if nbUHue > 10:
                palette = sns.color_palette("Spectral")
                colMap = sns.color_palette(palette=palette, n_colors=None, desat=None, as_cmap=False)
                colMap = [colMap[int(255*nbUHue/i)] for i in range(nbUHue)]
                colMap = clrs.ListedColormap(colMap)
            else: 
                palette = None
                colMap = sns.color_palette(palette=palette, n_colors=None, desat=None, as_cmap=True)
            color = []
            uniqueHue = sns._oldcore.categorical_order(df[hue], order=None)
            for c in enumerate(df[hue]):
                color.append(np.where(uniqueHue == c)[0])
        else:
            color = None
            colMap = None
        scatter = ax.scatter(df[dim[0]], df[dim[1]], df[dim[2]], c = color, cmap = colMap)
        scatter.legend()
    plt.show()
    
def clusterBasicMetrics(df, hue):
    hueSerie = df[hue]
    dfCount = pd.crosstab(index=hueSerie, columns='count')  
    dfCount['prc'] = dfCount['count'] / dfCount['count'].sum() * 100.
    return dfCount
    
def centralTend(df, hue, centralType = 'medioid', dimShortName = 'F_'):
    dimColumns = reductCol(df, dimShortName)
    X = df[dimColumns]
    X.index = df[hue]
    clusterNames = X.index.unique()
    center = [] 
    if centralType == 'centroid':
        for cluster in clusterNames:
            center.append(np.array(X[X.index == cluster].mean()))
            
    elif centralType == 'medioid':
        for cluster in clusterNames:
            center.append(
                np.nanpercentile(X[X.index == cluster].to_numpy(), 50, axis=0))
    dfcentTrend = pd.DataFrame(center,
                               columns = [ 'centTre ' + i for i in dimColumns],
                               index = clusterNames)
    dfcentTrend.attrs['clusteringFactor'] = hue
    dfcentTrend.attrs['centralType'] = centralType
    return dfcentTrend, X
        
def volume(df, hue, volumeType = 'mean_spreading', dimShortName = 'F_'):
    dimColumns = reductCol(df, dimShortName)
    X = df[dimColumns]
    X.index = df[hue]
    clusterNames = X.index.unique()
    volume = []
    
    if volumeType == 'mean_std':
        for cluster in clusterNames:
            volume.append(X[X.index == cluster].std().mean())
    elif volumeType == 'mean_spreading':
        for cluster in clusterNames:
            volume.append(np.mean( \
                np.nanpercentile(X[X.index == cluster].to_numpy(), 95, axis=0) - \
                np.nanpercentile(X[X.index == cluster].to_numpy(), 5, axis=0)))
    elif volumeType == 'sumlog_spreading':
        eps = np.finfo(np.float32).eps
        my_max = np.nanpercentile(X[X.index == cluster].to_numpy(), 95, axis=0)
        my_min = np.nanpercentile(X[X.index == cluster].to_numpy(), 5, axis=0)
        log = np.log(eps + my_max - my_min)
        my_sum = np.sum(log)
        volume.append(float(my_sum)) 
    dfVolume = pd.DataFrame(volume, columns = ['volume'], index=clusterNames)
    dfVolume.attrs['volumeType'] = volumeType
    dfVolume.attrs['clusteringFactor'] = hue
    return dfVolume, X


def distances(df, hue, metric='manhattan', centralType = 'medioid', dimShortName = 'F_'):
    if metric in ['wasserstein', 'energy']:
        if metric == 'wasserstein':
            fun = stats.wasserstein_distance
        elif metric == 'energy':
            fun = stats.energy_distance
        centralType = ''
        dimColumns = reductCol(df, dimShortName)
        X = df[dimColumns]
        X.index = df[hue]
        clusterNames = X.index.unique()
        distMat = np.zeros((len(clusterNames), len(clusterNames)))
        for i, c1 in enumerate(clusterNames):
            A = X.loc[c1]
            for j, c2 in enumerate(clusterNames):
                B = X.loc[c2]
                wd = []
                for col in X.columns:
                    if j < i:
                        wd.append(fun(list(A[col]) , list(B[col])))
                    else:
                        wd.append(0)
                distMat[i,j] = np.mean(wd)
        distMat = distMat + distMat.T
    else:
        dfcentTrend, X = centralTend(df, 
                                  hue, 
                                  centralType = centralType, 
                                  dimShortName = dimShortName)
        clusterNames = X.index.unique()
        distMat = metrics.pairwise_distances(dfcentTrend, metric=metric)
    dfDist = pd.DataFrame(distMat, columns = clusterNames, index = clusterNames)
    dfDist.attrs['distMetric'] = metric
    dfDist.attrs['centralType'] = centralType
    dfDist.attrs['clusteringFactor'] = hue
    return dfDist, X

def overlaps(df, hue, method = 'percentile', dimShortName = 'F_'):
    dimColumns = reductCol(df, dimShortName)
    X = df[dimColumns]
    X.index = df[hue]
    clusterNames = X.index.unique()
    nb_clusters = len(clusterNames)
    
    if method == 'normal':
        plusLim = []
        minusLim = []
        for cluster in X.index.unique():
            mean = X[X.index == cluster].mean()
            std = X[X.index == cluster].std()
            plusLim.append((mean + 2*std).to_numpy())
            minusLim.append((mean - 2*std).to_numpy())    
        b=np.zeros([nb_clusters,nb_clusters])
        
        for i, cluster in enumerate(clusterNames):
            a=X[X.index == cluster].to_numpy()
            maskPti = (a>minusLim[i])*(a<plusLim[i])
            dim_to_keep = np.where(np.sum(maskPti, axis=0) == 0, np.nan, 1)
            for j in range(nb_clusters):
                maskPtj = (a>minusLim[j])*(a<plusLim[j])
                b[i,j] = np.nanmean(
                    np.sum(maskPti*maskPtj*dim_to_keep, axis=0) \
                    /np.sum(maskPti, axis=0)
                    )
        ovlMat = (b+b.T)/2
    elif method == 'percentile':
        plusLim = []
        minusLim = []
        for cluster in X.index.unique():
            plusLim.append(np.nanpercentile(X[X.index == cluster].to_numpy(), 95, axis=0))
            minusLim.append(np.nanpercentile(X[X.index == cluster].to_numpy(), 5, axis=0))
        b=np.zeros([nb_clusters,nb_clusters])
        for i, cluster in enumerate(X.index.unique()):
            a=X[X.index == cluster].to_numpy()
            maskPti = (a>minusLim[i])*(a<plusLim[i])
            dim_to_keep = np.where(np.sum(maskPti, axis=0) == 0, np.nan, 1)
            for j in range(nb_clusters):
                maskPtj = (a>minusLim[j])*(a<plusLim[j])
                b[i,j] = np.nanmean(
                    np.sum(maskPti*maskPtj*dim_to_keep, axis=0) \
                    /np.sum(maskPti, axis=0)
                    )
        ovlMat = (b+b.T)/2
    elif method == 'jaccard': # i.e. intersection over union
        plusLim = []
        minusLim = []
        for cluster in X.index.unique():
            plusLim.append(np.nanpercentile(X[X.index == cluster].to_numpy(), 95, axis=0))
            minusLim.append(np.nanpercentile(X[X.index == cluster].to_numpy(), 5, axis=0))
        b=np.zeros([nb_clusters,nb_clusters])
        print(b.shape)
        for i, cluster1 in enumerate(X.index.unique()):
            A=X[X.index == cluster1].to_numpy()
            maskPti = (A>minusLim[i])*(A<plusLim[i])
            dim_to_keep = np.where(np.sum(maskPti, axis=0) == 0, np.nan, 1)
            for j, cluster2 in enumerate(X.index.unique()):
                B=X[X.index == cluster2].to_numpy()
                maskPtj = (B>minusLim[j])*(B<plusLim[j])
                m = np.maximum(minusLim[i], minusLim[j])
                p =  np.minimum(plusLim[i], plusLim[j])
                maskPtij = (B>m)*(B<p)
                maskPtji = (A>m)*(A<p)
                b[i,j] = np.nanmean(
                    (np.sum(maskPtij*dim_to_keep, axis=0)+np.sum(maskPtji*dim_to_keep, axis=0)) \
                    /( np.sum(maskPti, axis=0) + np.sum(maskPtj, axis=0) ) 
                    )
        ovlMat = b
    elif method == 'jsd':
        b=np.zeros([nb_clusters,nb_clusters])
        for i, cluster1 in enumerate(X.index.unique()):
            A=X[X.index == cluster1].to_numpy()
            minA = np.min(A, axis = 0 )
            maxA = np.max(A, axis = 0 )
            
            for j, cluster2 in enumerate(X.index.unique()):
                B=X[X.index == cluster2].to_numpy()
                minB = np.min(B, axis = 0 )
                maxB = np.max(B, axis = 0 )
                minAB = np.min((minA, minB), axis =0)
                maxAB = np.max((maxA, maxB), axis =0)
                nBins = 100
                jsb = []
                for k in range(A.shape[1]):
                    AProbMass =np.histogram(A[:,k], bins = nBins, range = (minAB[k], maxAB[k]))[0]/len(A[:,k])
                    BProbMass = np.histogram(B[:,k], bins = nBins, range = (minAB[k], maxAB[k]))[0]/len(B[:,k])
                    jsb.append(spatial.distance.jensenshannon(AProbMass, BProbMass))
                b[i,j] = np.mean(1-np.array(jsb))
        ovlMat = b
    
    dfOvl = pd.DataFrame(ovlMat, columns = clusterNames, index = clusterNames)
    dfOvl.attrs['ovlMethod'] = method
    dfOvl.attrs['clusteringFactor'] = hue
    return dfOvl, X

def plotClusterMetMat(dfVolume, dfDist, dfOvl):
    mask = np.triu(np.ones_like(dfDist, dtype=bool))
    fig, ax = plt.subplots(2,2)
    fig.suptitle('Clustering factor : ' + dfDist.index.name)
    
    sns.heatmap(dfDist, mask=mask, annot=True, ax=ax[0,0])
    ax[0,0].set_title(dfDist.attrs['distMetric'] + ' distances\nbetween ' 
                      + dfDist.attrs['centralType'] + 's')
    ax[0,0].set_xlabel('')
    ax[0,0].set_ylabel('')
    
    sns.heatmap(dfOvl, mask=mask, annot=True, ax=ax[0,1])
    ax[0,1].set_title('Overlap\n' +  dfOvl.attrs['ovlMethod'] + ' method')
    ax[0,0].set_xlabel('')
    ax[0,1].set_ylabel('')
    
    sns.barplot(data=dfVolume, y='volume', x=dfVolume.index, ax=ax[1,0])
    ax[1,0].set_xlabel('')
    ax[1,0].set_ylabel('units')
    ax[1,0].set_title('Volume')
    ax[1,0].spines["right"].set_visible(False)
    ax[1,0].spines["top"].set_visible(False)
    
    ax[1,1].axis('off')
    
def mixClusterFrom(df, clustersToMix = [], shortNames = False):
    dfMixCluster = df[clustersToMix]
    if shortNames == True:
        mixName = '/'.join([i[0] for i in clustersToMix])
    else:
        mixName = '/'.join(clustersToMix)
    mix = []
    for i in dfMixCluster.iterrows():
        mix.append('/'.join(list(i[1])))
    df[mixName] = mix
    return df

def acousIndex(df, acousIndex =  {
                                    'Leq' : {'ref':1},
                                    'emergenceLeq' : {},
                                    'statisticalLeq': {'stat':50},
                                    'statisticalSpec' : {'stat':50},
                                    'energyRatio': {'ratioLevel': 0.5},
                                    'temporal_entropy': {},
                                    'spectral_entropy' : {},
                                    'acoustic_complexity_index': {},
                                    'temporal_median': {},
                                    'acoustic_gradient_index': {}
                                  }):
    finalFeaturePd = pd.DataFrame()
    for _, row in df.iterrows():
        st = time.time()
        tempFeatureDic = {}
        Sxx = []
        shortTimeLeq = []
        Sxx_power = []
        cumFourier = []
        fourierform = []
        wavFile = str(row['wavpath'])
        infoWav = sf.info(wavFile)
        nbframes = row['integration'] * infoWav.samplerate
        start = (int(row['name'].split('_')[-1]) - 1) * nbframes
        s, fs = sf.read(wavFile, frames = nbframes, start = start )
        # sosfiltfilt filtering so the actual filter order is the double of forder 
        band = row['band']
        bandFreq = df.attrs['OrigBand'][band]
        s = maad.sound.select_bandwidth (s, fs, fcut = bandFreq, 
                            forder = 6, fname ='butter', ftype='bandpass')
        
        
        if 'Leq' in acousIndex.keys():
            indexParm = acousIndex['Leq']
            shortTimeLeq = ENES_index.numpy_Leq(s, fs, **indexParm)
            Leq = ENES_index.statisticalLeq(shortTimeLeq, stat=None)
            tempFeatureDic['AC_Leq'] = Leq
        if 'statisticalLeq' in acousIndex.keys():
            if shortTimeLeq == []:
                shortTimeLeq = ENES_index.numpy_Leq(s, fs)
            indexParm = acousIndex['statisticalLeq']
            LeqX = ENES_index.statisticalLeq(shortTimeLeq, **indexParm)
            tempFeatureDic['AC_Leq' + str(indexParm['stat'])] = LeqX
        if 'emergenceLeq' in acousIndex.keys():
            if shortTimeLeq == []:
                shortTimeLeq = ENES_index.numpy_Leq(s, fs)
            emergenceLeq = ENES_index.statisticalLeq(shortTimeLeq, stat = 10) - \
                   ENES_index.statisticalLeq(shortTimeLeq, stat = 90)
            tempFeatureDic['AC_emergenceLeq'] = emergenceLeq        
        if 'statisticalSpec' in acousIndex.keys():
            if cumFourier == []:
                fourierform, cumFourier, freq = ENES_index.energyFractFromSpect(s, fs)
            indexParm = acousIndex['statisticalSpec']
            cumFourierX = ENES_index.statisticalPowerSpectrum(cumFourier, freq, freqLim = bandFreq, **indexParm)
            tempFeatureDic['AC_StatFreq' + str(indexParm['stat'])] = cumFourierX
        if 'temporal_entropy' in acousIndex.keys():
            indexParm = acousIndex['temporal_entropy']
            temporal_entropy = maad.features.temporal_entropy (s, **indexParm)
            tempFeatureDic['AC_temporal_entropy'] = temporal_entropy 
        if 'spectral_entropy' in acousIndex.keys():
            if Sxx == []:
                    Sxx, tn, fn, ext = maad.sound.spectrogram (s, fs, mode='amplitude')
            if Sxx_power == []:
                    Sxx_power = Sxx**2
            indexParm = acousIndex['spectral_entropy']
            spectral_entropy, _, _, _, _, _ = maad.features.spectral_entropy (Sxx_power, fn, **indexParm)
            tempFeatureDic['AC_spectral_entropy'] = spectral_entropy
        if 'acoustic_complexity_index' in acousIndex.keys():
            if Sxx == []:
                    Sxx, tn, fn, ext = maad.sound.spectrogram (s, fs, mode='amplitude')  
            indexParm = acousIndex['acoustic_complexity_index']
            _, _ , acoustic_complexity_index  = maad.features.acoustic_complexity_index(Sxx, **indexParm)
            tempFeatureDic['AC_acoustic_complexity_index'] = acoustic_complexity_index
        if 'temporal_median' in acousIndex.keys():  
            indexParm = acousIndex['temporal_median']
            temporal_median  = maad.features.temporal_median(s, **indexParm)
            tempFeatureDic['AC_temporal_median'] = temporal_median
        if 'acoustic_gradient_index' in acousIndex.keys():
            if Sxx == []:
                    Sxx, tn, fn, ext = maad.sound.spectrogram (s, fs, mode='amplitude') 
            indexParm = acousIndex['acoustic_gradient_index']
            _, _, _, acoustic_gradient_index  = maad.features.acoustic_gradient_index(Sxx, dt=1, **indexParm)
            tempFeatureDic['AC_acoustic_gradient_index'] = acoustic_gradient_index
        if 'energyRatio' in acousIndex.keys():
            if fourierform == []:
                    fourierform, cumFourier, freq = ENES_index.energyFractFromSpect(s, fs)
            indexParm = acousIndex['energyRatio']
            energyRatio = ENES_index.energyRatio(fourierform, freq, freqLim = bandFreq, **indexParm)
            tempFeatureDic['AC_energyRatio' + str(indexParm['ratioLevel'])] = energyRatio
        
        # TODO : experimental try for using directly maad acoustic index functions
        otherMaadFeatures = [maadF for maadF in list(acousIndex.keys()) if maadF[:14]=='maad.features.']
        for maadF in otherMaadFeatures:
            fun = eval(maadF)
            indexParm = acousIndex[maadF]
            fun = maad.features.soundscape_index
            entryType = fun.__code__.co_varnames[:fun.__code__.co_argcount][0]
            if entryType == 's':
                entry = s
            elif entryType == 'Sxx' or entryType == 'Sxx_power':
                if not Sxx == []:
                    Sxx, tn, fn, ext = maad.sound.spectrogram (s, fs, mode='amplitude')  
                    Sxx_power = Sxx**2
                entry = Sxx    
            outF = fun(entry, indexParm)
            tempFeatureDic['AC_' + maadF] = outF
        finalFeaturePd = finalFeaturePd.append(tempFeatureDic, ignore_index=True) 
        print('(' + str(time.time() - st) + 's)... audio file feature compute')
    return pd.concat([df.reset_index(),finalFeaturePd], axis=1).drop(columns='index')
         
def HDBScan(df, 
                dimShortName = 'F_', 
                metric = 'manhattan', 
                min_cluster_size = 4,
                clusterName='hdBScanCluster'):
    dimColumns = reductCol(df, dimShortName)
    X = df[dimColumns]
    clusterer = hdbscan.HDBSCAN(metric=metric, min_cluster_size=min_cluster_size)
    clusterer.fit(X)
    df[clusterName] = clusterer.labels_.astype(str)
    return df

def clusteringCorr(df, factors = [], metric = 'FMI', plot = True):
    dfFactors = df[factors]
    outGlobMat = np.zeros((len(factors), len(factors)))
    outHomoMat = np.zeros((len(factors), len(factors)))
    outCompMat = np.zeros((len(factors), len(factors)))
    vmin = 0
    for i, fact1 in enumerate(dfFactors):
        X = dfFactors[fact1].to_numpy()
        for j, fact2 in enumerate(dfFactors):
            if i > j:
                Y = dfFactors[fact2].to_numpy()
                outHomoMat[i,j] = metrics.homogeneity_score(X, Y)
                outCompMat[i,j] = metrics.completeness_score(X, Y)
                if metric == 'AMI':
                    outGlobMat[i,j] = metrics.adjusted_mutual_info_score(X, Y)
                    vmin = min(outGlobMat[i,j], vmin)
                elif metric == 'V':
                    outGlobMat[i,j] = metrics.v_measure_score(X, Y)
                elif metric == 'FMI':
                    outGlobMat[i,j] = metrics.fowlkes_mallows_score(X, Y)

    outGlobMat = outGlobMat + np.triu(outGlobMat.T) + np.diag(np.ones(len(outGlobMat)))
    outHomoMat = outHomoMat + np.triu(outHomoMat.T) + np.diag(np.ones(len(outHomoMat)))
    outCompMat = outCompMat + np.triu(outCompMat.T) + np.diag(np.ones(len(outCompMat)))
    
    dfoutGlob = pd.DataFrame(outGlobMat, columns = factors, index = factors)
    dfoutHomo = pd.DataFrame(outHomoMat, columns = factors, index = factors)
    dfoutComp = pd.DataFrame(outCompMat, columns = factors, index = factors)
    if plot == True:
        mask = np.triu(np.ones_like(dfoutGlob, dtype=bool))
        fig, ax = plt.subplots(2,2)
        fig.suptitle('Factor correspondance')
        sns.heatmap(dfoutGlob, mask=mask, annot=True, ax=ax[0,0], vmin = vmin, vmax = 1)
        ax[0,0].set_title('global index : ' + metric)
        sns.heatmap(dfoutHomo, mask=mask, annot=True, ax=ax[1,0], vmin = 0, vmax = 1)
        ax[1,0].set_title('homogeneity index')
        sns.heatmap(dfoutComp, mask=mask, annot=True, ax=ax[1,1], vmin = 0, vmax = 1)
        ax[1,1].set_title('completeness index')
        ax[0,1].axis('off')
    return dfoutGlob, dfoutHomo, dfoutComp

def clusteringPairing(df, factor1 = '', factor2 = '',  plot = True):
    X = df[factor1].to_numpy()
    Y = df[factor2].to_numpy()
    outContMat = metrics.cluster.contingency_matrix(X, Y)
    outContMat_fact1 = outContMat / \
        np.tile(np.sum(outContMat, axis=1), (outContMat.shape[1],1)).T * 100
    outContMat_fact1 = np.hstack((outContMat_fact1, np.zeros((outContMat.shape[0],1)) + 100))
    dfoutCont_factor1 = pd.DataFrame(outContMat_fact1, 
                            columns = list(np.unique(df[factor2].to_numpy())) + ['total'],
                            index = list(np.unique(df[factor1].to_numpy())))
    
    outContMat_fact2 = outContMat / \
        np.tile(np.sum(outContMat, axis=0), (outContMat.shape[0],1)) * 100
    outContMat_fact2 = np.vstack((outContMat_fact2, np.zeros((1, outContMat.shape[1])) + 100))
    dfoutCont_factor2 = pd.DataFrame(outContMat_fact2,
                            columns = list(np.unique(df[factor2].to_numpy())),
                            index = list(np.unique(df[factor1].to_numpy())) + ['total'])
    
    if plot == True:
        fig, ax = plt.subplots(1,2)
        hm1 = sns.heatmap(dfoutCont_factor1, annot=True, ax=ax[0], cbar = False, fmt=".1f")
        hm1.set_title('total factor correspondance\nover factor ' + factor1)
        hm2 = sns.heatmap(dfoutCont_factor2, annot=True, ax=ax[1], cbar = False, fmt=".1f")
        hm2.set_title('total factor correspondance\nover factor ' + factor2)
    return dfoutCont_factor1, dfoutCont_factor2

                
