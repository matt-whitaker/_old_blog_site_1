"use strict";

angular.module('mw.directives.overlay', [])
    .factory('overlayService', [
        'templatesService', '$window', '$compile',
        function (templatesService, $window, $compile) {
            var overlayTemplate = '<div class="mw-overlay-background"><div class="mw-overlay-container"></div></div>';
            var overlayElement;
            var overlayScope;

            return Object.create({
                open: function (contentHTML, scope) {
                    if (overlayElement) {
                        this.close();
                    }

                    var contentElement = $compile(contentHTML)(scope);

                    overlayScope = scope;
                    overlayElement = angular.element(overlayTemplate);
                    overlayElement.children().empty().append(contentElement);

                    overlayElement.children().on('click', function (e) {
                        e.stopPropagation();
                    });
                    overlayElement.on('click', this.close);

                    angular.element($window.document.body)
                        .append(overlayElement);

                    setTimeout(function () {
                        angular.element($window.document.body).addClass('overlain');
                        overlayElement.addClass('mw-enter');
                    }, 0);
                },

                close: function () {
                    if (overlayElement) {
                        overlayElement.remove();
                        overlayElement = null;
                        overlayScope.$destroy();

                        angular.element($window.document.body)
                            .removeClass('overlain');
                    }
                }
            });
        }
    ])
    .directive('mwOverlay', [
        'overlayService',
        function (overlayService) {
            return {
                controller: [
                    '$scope', '$transclude', '$attrs',
                    function ($scope, $transclude, $attrs) {
                        $scope.$on('$destroy', function () {
                            overlayService.close();
                        });

                        $scope.open = function () {
                            $transclude(function (tclone, tscope) {
                                overlayService.open(tclone.prop('outerHTML'), tscope);
                            });
                        };
                    }
                ],
                restrict: 'C',
                transclude: true,
                template: '<button ng-click="open()">Open</button>'
            }
        }
    ]);