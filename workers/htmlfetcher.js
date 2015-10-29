// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var httpRequest = require('http-request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var mostRecentSite
var mostRecentSiteSearch = archive.readListOfUrls(function(result) {
  mostRecentSite = [result[result.length-2]];
  return mostRecentSite;
});

// downloads Urls to archive folder from the list
exports.loadSites = function() {
  archive.downloadUrls(mostRecentSite);
}