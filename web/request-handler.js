var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var queryString = require('querystring');
var httpHelpers = require('./http-helpers');
var htmlFetcher = require('../workers/htmlfetcher.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // console.log('Request method: ', req.method, 'Request url: ', req.url);
  var readFile = function(urlPath, endPoint) {
    fs.readFile(path.join(urlPath, endPoint), 'utf8', function(err, data) {
      if (err) {
        res.writeHead(404, httpHelpers.headers);
        res.end('Cannot read file');
      }
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    });
  };

  if (req.method === 'GET' && req.url === '/') {
    readFile(archive.paths.siteAssets, 'index.html');
  } else if (req.method === 'GET') {
    readFile(archive.paths.archivedSites, req.url);
  } else if (req.method === 'POST') {
    // separate conditional between whether archive.isUrlArchived
    if (archive.isUrlArchived(req.url)) {
      // if true, render page
      // maybe this connects to get request (line 26)
      readFile(archive.paths.archivedSites, req.url);
    } else {
      // else, render loading.html & add to list and archives
      var content = '';
      req.on('data', function(data) {
        content += data;
      });
      
      req.on('end', function() {
        var reqUrl = queryString.parse(content).url;
        archive.addUrlToList(reqUrl, function() {
          readFile(archive.paths.siteAssets, 'load.html');
          res.writeHead(302, httpHelpers.headers);
          res.end();
        });
      });
    }
      // htmlFetcher.loadSites();

  } else {
    res.end(archive.paths.list);
  }
};
