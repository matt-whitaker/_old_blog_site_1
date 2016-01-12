"use strict";

angular.module('mw.directives.utils.bind-html', [])
  .directive('bindHtml', ['$compile', function ($compile) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {'html': '=bindHtml', 'preprocess': '='},
      link: function (scope, elem, attrs) {
        var articleScope = scope.$new(),
          articleHtml;

        bind();
        scope.$watch('html', bind);

        function bind() {
          var html = scope.html;
          if (html) {
            if (scope.preprocess && scope.preprocess instanceof Function) {
              html = scope.preprocess.call(this, html);
            }

            html = '<div>' + html + '</div>';
            articleHtml = $compile(html)(articleScope);
            elem.empty().append(articleHtml);
          } else {
            elem.empty().html(null);
          }
        }
      }
    }
  }]);