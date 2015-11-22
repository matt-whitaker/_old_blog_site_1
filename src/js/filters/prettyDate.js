"use strict";

angular.module('mw.filters.prettyDate', [])
    .filter('prettyDate', function () {
        return function (date) {
            var formattedDate = date.format("MMM D, YYYY");
            return formattedDate;
        }
    });