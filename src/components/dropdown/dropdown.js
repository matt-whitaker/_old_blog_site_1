"use strict";

angular.module('mw.dropdown.dropdown', [])
  .directive('dropdown', [
    'templatesBase',
    function (templatesBase) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'dropdown.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-dropdown');
        }
      }
    }
  ]);