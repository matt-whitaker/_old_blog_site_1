"use strict";

angular.module('mw.pretty-month', [])
  .filter('prettyMonth', function () {
    return function (moment) {
      return moment.format("MMMM");
    }
  });