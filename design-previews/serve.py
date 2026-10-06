"""Local preview server for the portfolio prototypes — like `python -m http.server`,
but with caching turned off so every reload shows the latest code.
usage: python3 design-previews/serve.py [port]   (serves the project root)
"""
import http.server, os, sys

class NoCache(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.mjs': 'text/javascript'}
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()
    def log_message(self, *a):
        pass

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(root)
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8642
http.server.ThreadingHTTPServer(('', port), NoCache).serve_forever()
