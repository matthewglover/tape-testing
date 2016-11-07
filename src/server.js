var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var PORT = process.env.PORT || 4000;

http.createServer(function handler (request, response) {
  var pathname = url.parse(request.url).pathname;

  if (/^\//.test(pathname)) {
    fs.readFile(path.join(__dirname, '/../static/index.html'), function (error, data) {
      if (error) {
        response.writeHead(404, { 'Content-type': 'text/html' });
        response.end('<h2>404 File not found</h2>');
      } else {
        response.writeHead(200);
        response.end(data);
      }
    });
  } else if (/^\/public\/.*/i.test(pathname)) {
    var filematch = /^\/public\/(.*)/i.exec(pathname);
    if (filematch === null) {
      response.writeHead(404, { 'Content-type': 'text/html' });
      response.end('<html><head></head><body><h2>404 File not found</h2></body></html>');
    } else {
      var filename = filematch[1];
      fs.readFile(path.join(__dirname, '/../static/', filename), function (error, data) {
        if (error) {
          response.writeHead(404, { 'Content-type': 'text/html' });
          response.end('<h2>404 File not found</h2>');
        } else {
          response.writeHead(200);
          response.end(data);
        }
      });
    }
  }
}).listen(PORT);

console.log('Server is running on port: ' + PORT);
