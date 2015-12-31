"use strict";

angular.module('mw.directives.page', [])

  .directive('mwPage', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'directives/page.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-page');
        }
      }
    }
  ]);