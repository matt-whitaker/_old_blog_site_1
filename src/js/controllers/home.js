"use strict";

angular.module('mw.controllers.home', [])
    .controller('HomeController', [
        '$scope',
        function ($scope) {

        }
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/wp-content/themes/disjointedthinking/templates/views/home.html",
            controller: "HomeController"
        });
    }]);