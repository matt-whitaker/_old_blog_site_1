"use strict";

angular.module('mw.directives.utils.toggleLink', [])
  .directive('mwToggleLink', ['$compile', function ($compile) {
    return {
      restrict: 'C',
      scope: {},
      transclude: true,
      link: function (scope, elem, attrs) {
        scope.message = attrs['mw-message'];
        scope.toggle = function ($evt) {
          $evt.stopPropagation();
          $evt.preventDefault();
          scope.toggled = !scope.toggled;
        }
      },
      template: '<a href="#" ng-click="toggle($event)">{{message}}</a><div ng-if="toggled" ng-transclude></div>'
    }
  }]);