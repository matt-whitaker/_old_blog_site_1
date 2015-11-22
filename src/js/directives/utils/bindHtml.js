"use strict";

angular.module('mw.directives.utils.bindHtml', [])
  .directive('mwBindHtml', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {'html': '=mwBindHtml'},
      link: function (scope, elem, attrs) {
        var articleScope = scope.$new(),
          articleHtml;

        bind();
        scope.$watch('html', bind);

        function bind() {
          if (scope.html) {
            articleHtml = $compile(scope.html)(articleScope);
            elem.empty().append(articleHtml);
          } else {
            elem.empty().html(null);
          }
        }
      }
    }
  }]);