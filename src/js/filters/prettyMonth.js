"use strict";

angular.module('mw.filters.prettyMonth', [])
  .filter('prettyMonth', function () {
    return function (moment) {
      return moment.format("MMMM");
    }
  });