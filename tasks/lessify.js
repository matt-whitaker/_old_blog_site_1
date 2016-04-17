"use strict";


var path          = require('path');
var through2      = require('through2');
var _             = require('lodash');
var StringBuilder = require('stringbuilder');
var File          = require('vinyl');

module.exports = function lessify (config) {
  StringBuilder.extend('string');

  var dependencies = config.dependencies;

  var final = new StringBuilder();
  var files = new StringBuilder();

  //@import "directives/sidebar.less";
  var appFile;

  return through2.obj(function (file, encoding, cb) {
    var relativePath = file.path.replace(file.base, '');
    var fileName = 'mw.{0}'.format(relativePath.replace('.js', '').split(path.sep).join('.'));

    if (relativePath === config.root) {
      appFile = file;
    } else {
      // core is manually added
      if (fileName.indexOf('core') === -1) {
        files.appendLine('');
        files.append("@import '{0}';".format(fileName));
      }
    }

    cb();
  }, function (cb) {
    var self = this;

    final.append(files);
    final.appendLine(appFile.contents.toString());

    final.toString(function (__, str) {
      var finalFile = new File({
        cwd: appFile.cwd,
        base: appFile.base,
        path: appFile.path,
        contents: new Buffer(str)
      });

      self.push(finalFile);
      cb();
    });
  });
};