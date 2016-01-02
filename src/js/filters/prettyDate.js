"use strict";

angular.module('mw.filters.prettyDate', [])
  .filter('prettyDate', function () {
    return function (moment) {
      return moment.format("MMM D, YYYY");
    }
  });