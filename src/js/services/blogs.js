"use strict";

angular.module('mw.services.blogs', [])
  .factory('blogsService', [
    '$http', 'apiBase', 'customApiBase',
    function ($http, apiBase, customApiBase) {
      return Object.create({
        '$http': $http,
        apiBase: apiBase,
        customApiBase: customApiBase,

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
        },

        getArchiveMonths: function () {
          return this.$http.get(this.customApiBase + 'archive/months', { cache: true })
            .then(function (result) {
              var dates = result.data;

              return dates.length ? _(dates)
                .map(function (date) {
                  return {
                    year: date.year,
                    month: date.month,
                    moment: moment(date.year + "-" + date.month, 'YYYY-MM')
                  };
                })
                .value() : [];
            });
        },

        getArchive: function (year, month) {
          if (!parseInt(year) || !parseInt(month)) {
            throw("Must provide year and month");
          }

          year = parseInt(year);
          month = parseInt(month);

          return this.$http.get(this.customApiBase + 'archive', { cache: true, params: { year: year, month: month } })
            .then(function (result) {
              var posts = result.data;
              return posts.length ? _(posts)
                .select(function (datum) {
                  return datum.year === year && datum.month === month;
                })
                .map(function (datum) {
                  return {
                    moment: moment(""+datum.year+"-"+datum.month+"-"+datum.day, "YYYY-MM-DD"),
                    year: datum.year,
                    month: datum.month,
                    day: datum.day,
                    title: datum.title,
                    name: datum.name
                  };
                }).value() : [];
            });
        },

        findAll: function (filter) {
          var self = this;
          return this.$http.get(this.apiBase + 'posts/', { cache: true })
            .then(function (result) {
              var posts = result.data;
              return posts.length ? _.map(posts, function (post) {
                return {
                  id: post.id,
                  slug: post.slug,
                  title: post.title.rendered,
                  content: post.content.rendered,
                  moment: moment(post.date, "YYYY-MM-DDTHH:mm:ss")
                };
              }) : [];
            });
        },

        getCharts: function () {
          return this.$http.get(this.apiBase + 'posts/?filter[category_name]=Visualizations', { cache: true })
            .then(function(result) {
              var posts = result.data;
              return posts.length ? _.map(posts, function (post) {
                return {
                  id: post.id,
                  name: post.slug,
                  title: post.title.rendered,
                  content: post.content.rendered,
                  moment: moment(post.date, "YYYY-MM-DDTHH:mm:ss")
                }
              }) : [];
            });
        }
      });
    }
  ]);
