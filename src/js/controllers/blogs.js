"use strict";

angular.module('mw.controllers.blogs', [])
    .controller('BlogsController', [
        '$scope', '$state', '$sce', 'blogsService',
        function ($scope, $state, $sce, blogsService) {
            $scope.loaded = false;

            blogsService.findAll().then(function (blogs) {
                if (blogs.length) {
                    $scope.listings = _.map(blogs, function (blog) {
                        return {
                            id: blog.id,
                            title: blog.title,
                            excerpt: blog.excerpt.replace('[&hellip;]', ''),
                            date: blog.moment,
                            slug: blog.slug
                        }
                    });

                    $scope.loaded = true;
                }
            });
        }
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('blogs', {
            url: "/blogs/",
            templateUrl: "/wp-content/themes/disjointedthinking/templates/views/blogs.html",
            controller: 'BlogsController'
        })
    }]);