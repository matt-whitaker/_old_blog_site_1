"use strict";

angular.module('mw.loader', [])
  .directive('loader', [
    '$rootScope',
    function ($rootScope) {
      return {
        restrict: 'E',
        template: '<div class="container"><i class="spinner fa fa-circle-o-notch fa-3x fa-spin"></i></div>',
        link: function (scope, elem, attrs) {
          elem.addClass('mw-loader');

          $rootScope.$on('loading', function (evt, data) {
            $rootScope.loading = data;
          });
        }
      }
    }]
  );