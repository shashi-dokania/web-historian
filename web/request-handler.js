var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log('Request method: ', req.method, 'Request url: ', req.url);
  var readFile = function(urlPath, endPoint) {
    fs.readFile(path.join(urlPath, endPoint), 'utf8', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end('Cannot read file');
      }
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(JSON.stringify(data));
    });
  };

  if (req.method === 'GET' && req.url === '/') {
    readFile(archive.paths.siteAssets, 'index.html');
  } else if (req.method === 'GET') {
    readFile(archive.paths.archivedSites, req.url);
  } else if (req.method === 'POST') {

    var content = '';
    req.on('data', function(err, data) {
      if (err) {
        console.error(err);
      }
      content += data;
    });
    
    req.on('end', function() {
      content = JSON.parse(content);
      fs.appendFile(archive.paths.list, content, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });

  }
};
