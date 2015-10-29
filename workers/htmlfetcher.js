// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var httpRequest = require('http-request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var sites = archive.readListOfUrls(function() {
  // return;
});

// downloads Urls to archive folder from the list
exports.loadSites = function() {
  archive.downloadUrls(sites);
}