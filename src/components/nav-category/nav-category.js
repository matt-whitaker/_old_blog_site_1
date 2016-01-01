"use strict";

angular.module('mw.nav-category.nav-category', [])

  .directive('mwNavCategory', [
    '$q', '$http', 'templatesBase',
    function ($q, $http, templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'nav-category.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-nav-category');
        }
      }
    }
  ]);