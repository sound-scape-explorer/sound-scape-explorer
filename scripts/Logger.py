from mimetypes import init
from Audio import Audio

from numpy import array
import json


class Logger:
    def __init__(self, string:str, audio:str,startTime:str,timeDuration:float):
        self.name=string
        self.audios=[]
        self.audios.append(Audio(audio,startTime,timeDuration))
        self.files_site="" #TODO an other constructor for this to replace the default aLogger.name in Column U (config.xlsx)

    def __str__(self) -> str:
        return json.dumps(self,indent=2)

    @staticmethod
    def addAudio(site:list,logger:str,audio:str,startTime:str,timeDuration:float): #->'Logger':
        if len(site)>0 :
            for el in site:
                if el.name == logger:
                    el.audios.append(Audio(audio,startTime,timeDuration))
                    el.audios.sort(key=lambda audio: audio.startTime)
                    return
            site.append(Logger(logger,audio,startTime,timeDuration))
        else:
            site.append(Logger(logger,audio,startTime,timeDuration))
        