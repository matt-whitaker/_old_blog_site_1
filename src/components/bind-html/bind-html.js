"use strict";

angular.module('mw.bind-html', [])
  .directive('bindHtml', ['$compile', function ($compile) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        html: '=bindHtml',
        preprocess: '=',
        postprocess: '=',
      },
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

            if (scope.postprocess && scope.postprocess instanceof Function) {
              articleHtml = scope.postprocess.call(this, articleHtml);
            }

            elem.empty().append(articleHtml);
          } else {
            elem.empty().html(null);
          }
        }
      }
    }
  }]);