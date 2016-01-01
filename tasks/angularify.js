"use strict";


var path          = require('path');
var through2      = require('through2');
var _             = require('lodash');
var StringBuilder = require('stringbuilder');
var File          = require('vinyl');

module.exports = function angularify (config) {
  StringBuilder.extend('string');

  var dependencies = config.dependencies;

  var final = new StringBuilder();
  var requires = new StringBuilder();
  var modules = new StringBuilder();

  modules.appendLine("angular.module('{0}', [".format(config.module));

  for (var i = 0; i < dependencies.length; i++) {
    if (i) modules.appendLine(',');
    modules.append("  '{0}'".format(dependencies[i]));
  }

  var appFile;

  return through2.obj(function (file, encoding, cb) {
    var isComponent = file.path.indexOf('/components') > -1;
    var isView = file.path.indexOf('/views') > -1;

    var relativePath = file.path.replace(file.base, '');
    var moduleName = 'mw.{0}'.format(relativePath.replace('.js', '').split(path.sep).join('.'));

    if (relativePath === config.root) {
      appFile = file;
    } else {
      if (isComponent) {
        requires.appendLine("require('../components/{0}');".format(relativePath));
      } else if (isView) {
        requires.appendLine("require('../views/{0}');".format(relativePath));
      } else {
        requires.appendLine("require('./{0}');".format(relativePath));
      }

      if (moduleName.indexOf('mixins') === -1) {
        modules.appendLine(',');
        modules.append("  '{0}'".format(moduleName));
      }
    }

    cb();
  }, function (cb) {
    var self = this;

    modules.appendLine(']);');

    final.append(requires);
    final.append(modules);
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