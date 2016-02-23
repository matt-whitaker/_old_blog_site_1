"use strict";

angular.module('mw.pretty-date.pretty-date', [])
  .filter('prettyDate', function () {
    return function (moment) {
      return moment.format("MMM D, YYYY");
    }
  });