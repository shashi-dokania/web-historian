var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
    }
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(data) {
    var found = false;
    data.forEach(function(target) {
      if (target === url) {
        found = true;
      }
    });

    cb(found);
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url+'\n', function(err, data) {
    if (err) {
      console.error(err);
    }
  });
  cb();
};

exports.isUrlArchived = function(url, cb) {
  var archived = false;

  fs.readdir(exports.paths.archivedSites, function(err, files) {
    files.forEach(function(file) {
      if (file === path.join(exports.paths.archivedSites, url)) {
        archived = true;
      }
    });
    cb(archived);
  });
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(function(url) {
    fs.writeFile(path.join(exports.paths.archivedSites, url), url);
  });
};
