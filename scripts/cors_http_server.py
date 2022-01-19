#!/usr/bin/env python

# Usage: python cors_http_server.py <port>
import sys
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
            SimpleHTTPRequestHandler.end_headers(self)
            SimpleHTTPRequestHandler.send_response(self,200)
        """def do_GET(self):
            #SimpleHTTPRequestHandler.do_GET(self)
            print("")
            if self.path.endswith("/compute"):
                SimpleHTTPRequestHandler.send_header(self,"content-type","application/json")
                self.wfile.write("".encode())
                self.validResponse()
                print("ok")
            else:
                self.send_header('Access-Control-Allow-Origin', '*')
                SimpleHTTPRequestHandler.end_headers(self)
                print("pasok")"""
        

    test(CORSRequestHandler, HTTPServer)

if __name__ == '__main__':
    main()
