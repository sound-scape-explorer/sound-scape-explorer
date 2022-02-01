import json


class Audio:
    def __init__(self, audio:str,startTime:str,timeDuration:float):
        self.fileName = audio
        self.startTime = startTime
        self.timeDuration = timeDuration
    
    def __str__(self) -> str:
        return json.dumps(self,indent=2)