"use strict";

angular.module('mw.directives.charts.test', [])
    .directive('mwChartTest', [
        'templatesBase',
        function (templatesBase) {
            return {
                scope: {},
                link: function (scope) {
                    scope.test = "Hello World! This is to test including directives within the post body";
                },
                restrict: 'C',
                templateUrl: templatesBase + 'directives/charts/test.html'
            }
        }
    ]);