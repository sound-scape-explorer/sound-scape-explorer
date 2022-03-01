from mimetypes import init
from typing import Dict, List, Tuple

from Logger import Logger

import json
import os
import wave
import re
import datetime

from pandas import DataFrame


class LoggersDictionary:
    def __init__(self, selectedSite, regexSpliter, groupe, suffix):
        self.map = {}
        # TODO avoid calculation endif we need to recompute audio duration
        # option : sha1 of the json file
        # option 2 : store and compare added or removed files
        for root, directories, files in os.walk("./audio/"+selectedSite+"/"):
            for file in files:
                parts = os.path.relpath(os.path.join(root, file)).split('/')
                if len(parts) > 3:
                    site = parts[1]
                    logger = parts[2]
                    audio = parts[3]
                    # print(site+"/"+logger+"/"+audio)
                    audioFile = wave.open(
                        "./audio/"+site+"/"+logger+"/"+audio, "rb")
                    waveParam = audioFile.getparams()
                    timeDuration = waveParam.nframes/waveParam.framerate
                    # May be consider to replace this by suffix function in 3.9 python interpretor
                    audio = audio.replace(suffix, '')
                    m = re.match(regexSpliter, audio)
                    startTime = m.group(groupe)  # audio.split('_')[0]
                    # a "little bit" hard coded
                    startTime = startTime.replace('T', '_')
                    audioFile.close()
                    # print(startTime,timeDuration)
                    self.setNewAudio(site, logger, audio,
                                     startTime, timeDuration)
                # print(map) #contient le site et le logger
                #write in file
                # TRIGGER WARNING : the audio can be corrupt by the date value

    def __str__(self) -> str:
        return json.dumps(self.map, indent=2, default=lambda o: o.__dict__)

    def getAllAudiosOfSiteWithPath(self, siteName: str, suffix: str) -> Tuple[List, datetime.datetime, datetime.datetime]:
        array = []
        #datetime.strptime(v, '%Y%m%d_%H%M%S')
        minrange = datetime.datetime.now()
        maxrange = datetime.datetime(year=1970, month=1, day=1)
        for aLogger in self.__getSite(siteName):
            print(aLogger.name)
            for audio in aLogger.audios:
                try:
                    strdate = datetime.datetime.strptime(
                        audio.startTime, '%Y%m%d_%H%M%S')
                    if strdate < minrange:
                        minrange = strdate
                    time = datetime.timedelta(seconds=audio.timeDuration)
                    if (strdate+time) > maxrange:
                        maxrange = (strdate+time)
                except:
                    strdate = datetime.datetime.strptime(
                        audio.startTime, '%Y%m%d_%H%M')
                    if strdate < minrange:
                        minrange = strdate
                    time = datetime.timedelta(seconds=audio.timeDuration)
                    if (strdate+time) > maxrange:
                        maxrange = (strdate+time)
                array.append(
                    [aLogger.name+"/"+audio.fileName.split(suffix)[0],
                     aLogger.name,
                     audio.startTime])  # audio.fileName.removesuffix(suffix)) available in 3.9 #TODO configure for Windows path too
        minrange = minrange.replace(microsecond=0)
        maxrange = maxrange.replace(microsecond=0)
        return array, minrange, maxrange

    def getAllLoggersOfSite(self, siteName: str) -> List:
        return self.__getSite().values()

    def getAllLoggers(self) -> List:
        pass

    def __setNewSite(self, siteName: str) -> List:
        self.map.update({siteName: []})
        return self.map.get(siteName)

    def __getSite(self, siteName: str) -> List:
        return self.map.get(siteName)

    def setNewAudio(self, siteName: str, logger: str, audio: str, startTime: str, timeDuration: float):
        # to Change tomorow
        site = self.__getSite(siteName) if self.__getSite(
            siteName) != None else self.__setNewSite(siteName)
        Logger.addAudio(site, logger, audio, startTime, timeDuration)
        pass

    def getAllSite() -> List:
        for root, directories, files in os.walk("./audio/"):
            return directories

    def getExampleFile(site: str) -> str:
        for root, directories, files in os.walk("./audio/"):
            for file in files:
                parts = os.path.relpath(os.path.join(root, file)).split('/')
                if len(parts) > 3:
                    fSite = parts[1]
                    logger = parts[2]
                    audio = parts[3]
                    if fSite == site:
                        return audio

    def toDataFrameforConfig() -> DataFrame:
        pass
        return DataFrame()
