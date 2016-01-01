"use strict";

angular.module('mw.nav-archive.nav-archive', [])

  .directive('mwNavArchive', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'nav-archive.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-archive');


        }
      }
    }
  ]);