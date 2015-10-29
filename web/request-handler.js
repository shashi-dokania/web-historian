var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var queryString = require('querystring');
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
      content += data.toString();
    });
    
    req.on('end', function() {
      var reqUrl = queryString.parse(content).url;
      archive.addUrlToList(reqUrl, function() {
        res.writeHead(302, {"Content-Type": "text/plain"});
        res.end();
      });
    });

  }
};
