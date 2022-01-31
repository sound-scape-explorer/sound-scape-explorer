from mimetypes import init
from typing import List

from Logger import Logger

import json

class LoggersDictionary:
    def __init__(self):
        self.map = {}

    def __str__(self) -> str:
        return json.dumps(self.map,indent=2, default=lambda o: o.__dict__)

    def getAllLoggersOfSite(self,siteName:str) -> List:
        return self.__getSite().values()

    def getAllLoggers(self) -> List:
        pass

    def __setNewSite(self,siteName:str) -> List:
        self.map.update({siteName : []})
        return self.map.get(siteName)

    def __getSite(self,siteName:str) -> List:
        return self.map.get(siteName)

    def setNewLogger(self,siteName:str,logger:str,audio:str):
        #to Change tomorow
        site = self.__getSite(siteName) if self.__getSite(siteName) != None else self.__setNewSite(siteName)
        Logger.addAudio(site,logger,audio)
        pass
