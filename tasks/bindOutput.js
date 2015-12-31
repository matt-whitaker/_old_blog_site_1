
var through2  = require('through2');
var path      = require('path');

module.exports = function bindOutput (obj, key) {
  obj[key] = [];

  return through2.obj(function (file, encoding, cb) {
    var name = path.basename(file.path);
    obj[key].push(name);
    this.push(file);
    cb();
  });
};