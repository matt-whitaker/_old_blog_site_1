"use strict";

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
          this.$http.get(this.apiBase + 'posts/', { cache: true })
          return this.$http.get(this.customApiBase + 'posts/', { cache: true })
            .then(function (result) {
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
                  category: { name: post.category.slug, title: post.category.name }
                };
              }) : [];
            });
        },

        findByQuery: function (query) {
          return [];
        },

        findByTag: function (tag) {
          var self = this;
          this.$http.get(this.apiBase + 'posts/', { cache: true })
          return this.$http.get(this.customApiBase + 'posts/', { cache: true, params: { tag: tag } })
            .then(function (result) {
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
                  category: { name: post.category.slug, title: post.category.name }
                };
              }) : [];
            });
        },

        findByCategory: function (category) {
          var self = this;
          return this.$http.get(this.customApiBase + 'posts/', { cache: true, params: { category: category } })
            .then(function (result) {
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
                  category: { name: post.category.slug, title: post.category.name }
                };
              }) : [];
            });
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
