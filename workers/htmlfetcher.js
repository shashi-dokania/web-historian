// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var httpRequest = require('http-request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var sites = arhive.readListOfUrls();
