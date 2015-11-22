"use strict";

angular.module('mw.filters.prettyMonth', [])
  .filter('prettyMonth', function () {
    return function (date) {
      return moment(""+date.year+"-"+date.month+"-"+date.day, "YYYY-MM-DD").format("MMMM");
    }
  });