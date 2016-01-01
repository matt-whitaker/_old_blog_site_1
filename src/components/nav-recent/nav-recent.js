"use strict";

angular.module('mw.nav-recent.nav-recent', [])

  .directive('mwNavRecent', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'nav-recent.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-recent');
        }
      }
    }
  ]);