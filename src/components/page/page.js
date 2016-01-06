"use strict";

angular.module('mw.page.page', [])

  .directive('page', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'page.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-page');
        }
      }
    }
  ]);