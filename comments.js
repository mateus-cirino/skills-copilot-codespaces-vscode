// Create web server
// Listen on port 3000
// When a request comes in, serve the file comments.html
// When a request comes in, serve the file comments.js
// When a request comes in, serve the file comments.css

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var server = http.createServer(function(req, res) {
  var filename = url.parse(req.url).pathname;
  if(filename === '/') {
    filename = '/comments.html';
  }
  filename = path.join(process.cwd(), filename);
  fs.readFile(filename, function(err, file) {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Not Found\n');
      res.end();
      return;
    }
    var contentType = 'text/html';
    if(filename.endsWith('.js')) {
      contentType = 'text/javascript';
    } else if(filename.endsWith('.css')) {
      contentType = 'text/css';
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.write(file);
    res.end();
  });
});
server.listen(3000);
console.log('Server running at http://