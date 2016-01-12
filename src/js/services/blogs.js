"use strict";

function processFindAll (result) {
  var posts = result.data;
  return posts.length ? _.map(posts, function (post) {
    return {
      id: post.id,
      name: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      moment: moment(post.date, "YYYY-MM-DDTHH:mm:ss"),
      tags: _(post.tags)
        .map(function (tag) {
          return tag.name;
        }).value(),
      categories: _(post.categories)
        .map(function (category) {
          return { name: category.slug, title: category.name };
        }).value()
    };
  }) : [];
}

angular.module('mw.services.blogs', [])
  .factory('blogsService', [
    '$http', 'apiBase', 'customApiBase',
    function ($http, apiBase, customApiBase) {
      return Object.create({
        '$http': $http,
        apiBase: apiBase,
        customApiBase: customApiBase,

        findAll: function () {
          var self = this;
          return this.$http.get(this.customApiBase + 'posts/', { cache: true })
            .then(processFindAll);
        },

        findByQuery: function (query) {
          var self = this;
          return this.$http.get(this.customApiBase + 'posts/', { cache: false, params: { query: query } })
            .then(processFindAll);
        },

        findByTag: function (tag) {
          var self = this;
          return this.$http.get(this.customApiBase + 'posts/', { cache: false, params: { tag: tag } })
            .then(processFindAll);
        },

        findByCategory: function (category) {
          var self = this;
          return this.$http.get(this.customApiBase + 'posts/', { cache: false, params: { category: category } })
            .then(processFindAll);
        },

        findBySlug: function (slug) {
          return this.$http.get(this.customApiBase + 'posts/' + slug, { cache: true })
            .then(function (result) {
              var post = result.data;
              return post ? {
                title: post.post_title,
                content: post.post_content,
                moment: moment(post.post_date, "YYYY-MM-DD HH:mm:ss"),
                tags: _.map(post.tags, function (tag) {
                  return {
                    name: tag.name,
                    slug: tag.slug,
                    description: tag.description
                  }
                })
              } : null;
            });
        },

        getRecent: function () {
          return this.$http.get(this.customApiBase + 'posts/recent', { cache: true })
            .then(function (result) {
              var posts = result.data;
              return posts.length ? _(posts)
                .take(4)
                .map(function (post) {
                  return {
                    title: post.post_title,
                    name: post.post_name,
                    moment: moment(post.post_date, "YYYY-MM-DD HH:MM:SS")
                  }
                }).value() : [];
            });
        }
      });
    }
  ]);
