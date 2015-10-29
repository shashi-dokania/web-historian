// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var request = require('request');

exports.fetchHtml = function(url, urlPath) {
  request({
    uri: 'http://' + url
  }, function(err, res, body) {
    fs.writeFile(urlPath, body, function(err) {
      if (err) {
        console.error(err);
      }
    });
  });
};