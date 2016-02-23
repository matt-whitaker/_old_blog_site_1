"use strict";

angular.module('mw.toolbar', [])

  .directive('toolbar', [
    '$q', '$http', 'templatesBase', '$rootScope',
    function ($q, $http, templatesBase, $rootScope) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: templatesBase + 'toolbar.html',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-toolbar');

          scope.toggle = function () {
            $rootScope.sidebar.active = !$rootScope.sidebar.active;
          }
        }
      }
    }
  ]);