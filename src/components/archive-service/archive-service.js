"use strict";

angular.module('mw.archive-service', [])
  .factory('archiveService', [
    '$http', 'customApiBase',
    function ($http, customApiBase) {
      return Object.create({
        '$http': $http,
        customApiBase: customApiBase,

        getMonths () {
          return this.$http.get(`${this.customApiBase}archive/months`, { cache: true })
            .then(function (result) {
              var dates = result.data;

              return dates.length ? _(dates)
                .map((date) => {
                  return {
                    year: date.year,
                    month: date.month,
                    moment: moment(`${date.year}-${date.month}`, 'YYYY-MM')
                  };
                })
                .value() : [];
            });
        },

        getArchive (year, month) {
          if (!parseInt(year) || !parseInt(month)) {
            throw("Must provide year and month");
          }

          year = parseInt(year);
          month = parseInt(month);

          return this.$http.get(`${this.customApiBase}archive`, { cache: true, params: { year: year, month: month } })
            .then(function (result) {
              var posts = result.data;
              return posts.length ? _(posts)
                .select(function (datum) {
                  return datum.year === year && datum.month === month;
                })
                .map(function (datum) {
                  return {
                    moment: moment(`${datum.year}-${datum.month}-${datum.day}`, "YYYY-MM-DD"),
                    year: datum.year,
                    month: datum.month,
                    day: datum.day,
                    title: datum.title,
                    name: datum.name,
                    excerpt: datum.excerpt
                  };
                }).value() : [];
            });
        }
      });
    }
  ]);