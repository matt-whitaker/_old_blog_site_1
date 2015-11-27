"use strict";

angular.module('mw.directives.loader', [])
  .directive('mwLoader', [
    function () {
      return {
        restrict: 'E',
        scope: {
          loaded: '='
        },
        link: function (scope, elem, attrs) {
          elem.css('height', document.documentElement.clientHeight);
        },
        template: '<div class="mw-loader" ng-if="!loaded"><i class="fa fa-circle-o-notch fa-spin fa-4x fa-fw"></i></div>'
      }
    }
  ]);