#!/usr/bin/env python

# Usage: python cors_http_server.py <port>
import sys
import os

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
            SimpleHTTPRequestHandler.end_headers(self)
        def validResponse(self):
            SimpleHTTPRequestHandler.send_response(self,200)
            self.end_headers()
        def do_GET(self):
            if self.path.endswith("/compute"):
                #SimpleHTTPRequestHandler.send_header(self,"content-type","application/json")
                self.wfile.write("ok".encode())
                self.validResponse()
            elif os.path.isfile("."+self.path):
                self.validResponse()
                f=open("."+self.path,'rb')
                self.wfile.write(f.read())
                f.close()
        

    test(CORSRequestHandler, HTTPServer)

if __name__ == '__main__':
    main()
