from mimetypes import init
from typing import List

from Logger import Logger

import json
import os
import wave

from pandas import DataFrame

class LoggersDictionary:
    def __init__(self):
        self.map = {}
        #TODO avoid calculation endif we need to recompute audio duration
                # option : sha1 of the json file 
                # option 2 : store and compare added or removed files
        for root, directories, files in os.walk("./audio"):  
            for file in files:      
                parts = os.path.relpath(os.path.join(root, file)).split('/')
                if len(parts) > 3 :
                    site = parts[1]
                    logger = parts[2]
                    audio = parts[3]
                    #print(site+"/"+logger+"/"+audio)
                    audioFile = wave.open("./audio/"+site+"/"+logger+"/"+audio,"rb")
                    waveParam = audioFile.getparams()
                    timeDuration = waveParam.nframes/waveParam.framerate
                    startTime = audio.split('_')[0]
                    audioFile.close()
                    #print(startTime,timeDuration)
                    self.setNewAudio(site,logger,audio,startTime,timeDuration)
                #print(map) #contient le site et le logger
                #write in file
                #TRIGGER WARNING : the audio can be corrupt by the date value

    def __str__(self) -> str:
        return json.dumps(self.map,indent=2, default=lambda o: o.__dict__)

    def getAllAudiosOfSiteWithPath(self,siteName:str,suffix:str) -> List :
        array = []
        for aLogger in self.__getSite(siteName):
            print(aLogger.name)
            for audio in aLogger.audios:
                array.append(aLogger.name+"/"+audio.fileName.split(suffix)[0])#audio.fileName.removesuffix(suffix)) avaiable in 3.9 #TODO configure for Windows path too
        return array

    def getAllLoggersOfSite(self,siteName:str) -> List:
        return self.__getSite().values()

    def getAllLoggers(self) -> List:
        pass

    def __setNewSite(self,siteName:str) -> List:
        self.map.update({siteName : []})
        return self.map.get(siteName)

    def __getSite(self,siteName:str) -> List:
        return self.map.get(siteName)

    def setNewAudio(self,siteName:str,logger:str,audio:str,startTime:str,timeDuration:float):
        #to Change tomorow
        site = self.__getSite(siteName) if self.__getSite(siteName) != None else self.__setNewSite(siteName)
        Logger.addAudio(site,logger,audio,startTime,timeDuration)
        pass

    def toDataFrameforConfig()->DataFrame:
        pass
        return DataFrame()
