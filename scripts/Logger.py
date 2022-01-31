from mimetypes import init

from numpy import array


class Logger:
    def __init__(self, string:str, audio:str):
        self.name=string
        self.audios=[]
        self.audios.append(audio)

    def __str__(self) -> str:
        return str(self.name)

    @staticmethod
    def addAudio(site:list,logger:str,audio:str): #->'Logger':
        if len(site)>0 :
            for el in site:
                if str(el) == logger:
                    el.audios.append(audio)
                    return
            site.append(Logger(logger,audio))
        else:
            site.append(Logger(logger,audio))
        