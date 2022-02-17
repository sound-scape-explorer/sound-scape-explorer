#!/usr/bin/env python

# Usage: python cors_http_server.py <port>
from distutils.log import error
import sys
import os
import re
import json
import wave
import utils

from LoggersDictionary import LoggersDictionary 
from sserunner import get_config

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
        
        #Route for python server
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
            elif re.match("/availableLogger",self.path):
                self.validResponse()
                cfg = get_config()
                suffix = cfg.variables['audio_suffix']
                regexSpliter = '([a-zA-Z0-9_]+)' #Todo, pass this on path 
                groupRegexRequired=0
                map = LoggersDictionary(regexSpliter,groupRegexRequired,suffix)
                # so we scann the generate 
                self.wfile.write(str(map).encode())

            elif re.match("/availableSite",self.path):
                self.validResponse()
                map = LoggersDictionary.getAllSite()
                # so we scann the generate 
                self.wfile.write(str(map).encode())


            elif os.path.isfile("."+self.path):
                self.validResponse()
                f=open("."+self.path,'rb')
                self.wfile.write(f.read())
                f.close()
        def do_POST(self):
            if re.match("/scanData",self.path):
                cfg = get_config()#TODO REMOVE THISThat here we have an problem
                self.data_string = self.rfile.read(int(self.headers['Content-Length']))
                data = json.loads(json.loads(self.data_string))# needed to dict(..)
                siteName:list = cfg.variables['audio_base'].split('/')
                siteName:str = siteName[len(siteName)-1]
                regexSpliter = data['regex']
                groupRegexRequired = data['groupe']
                suffix = cfg.variables['audio_suffix']#TODO EDIT THIS WITHOUT THIS CONFIG FILE
                self.validResponse()
                map=None
                try:
                    map = LoggersDictionary(siteName,regexSpliter,groupRegexRequired,suffix)
                except  Exception as error:
                    print(error)
                    self.wfile.write(("{\"result\" : \"Error\",'error': "+str(error)+"}").encode())
                    return    

                print(len(map))
                # so we scann the generate 
                listFiles = map.getAllAudiosOfSiteWithPath(siteName,suffix)
                utils.edit_file_config('../sample/config.xlsx',listFiles)
                print("sse show config --json > generated/ghost-config.json")
                os.system("sse show config --json > generated/ghost-config.json")
                self.wfile.write("{\"result\" : \"Scanned\"}".encode())
        

    test(CORSRequestHandler, HTTPServer)

if __name__ == '__main__':
    main()
