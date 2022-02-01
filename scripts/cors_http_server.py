#!/usr/bin/env python

# Usage: python cors_http_server.py <port>
import sys
import os
import re
import json
import wave

from LoggersDictionary import LoggersDictionary 

def main(argv=sys.argv):
    try:
        # try to use Python 3
        from http.server import HTTPServer, SimpleHTTPRequestHandler, test as test_orig
        def test (*args):
            test_orig(*args, port=int(argv[1]) if len(argv) > 1 else 9876, bind="0.0.0.0")
    except ImportError: # fall back to Python 2
        from BaseHTTPServer import HTTPServer, test
        from SimpleHTTPServer import SimpleHTTPRequestHandler

    class CORSRequestHandler (SimpleHTTPRequestHandler):
        def end_headers (self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header("Cache-control","no-store")
            SimpleHTTPRequestHandler.end_headers(self)
        def validResponse(self):
            SimpleHTTPRequestHandler.send_response(self,200)
            self.end_headers()
        def do_GET(self):
            print(self.path)
            if re.match("/compute",self.path):
                self.validResponse()
                #SimpleHTTPRequestHandler.send_header(self,"content-type","application/json")
                res = re.match("/compute/([a-zA-Z0-9_./]+)/([0-9]+)",self.path)
                file,duration = res.group(1),res.group(2)
                print(file,duration)
                print("rm -r generated/preview-*")
                os.system("rm -r generated/preview-*")
                print("sse extract preview -f "+file+" -t "+duration)
                os.system("sse extract preview -f "+file+" -t "+duration)
                print("All done")
                self.wfile.write("{\"status\":\"ok\"}".encode())
            if re.match("/avaiableLogger",self.path):
                self.validResponse()
                map = LoggersDictionary()
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
                            #print(startTime,timeDuration)
                            map.setNewAudio(site,logger,audio,startTime,timeDuration)
                #print(map) #contient le site et le logger
                #write in file
                self.wfile.write(str(map).encode())

            elif os.path.isfile("."+self.path):
                self.validResponse()
                f=open("."+self.path,'rb')
                self.wfile.write(f.read())
                f.close()
        

    test(CORSRequestHandler, HTTPServer)

if __name__ == '__main__':
    main()
