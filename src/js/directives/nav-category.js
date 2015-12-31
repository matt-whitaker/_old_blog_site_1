"use strict";

angular.module('mw.directives.nav-category', [])

  .directive('mwNavCategory', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'directives/nav-category.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-category');
        }
      }
    }
  ]);