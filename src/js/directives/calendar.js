"use strict";

var calendarIdCounter = 0;

function CalendarController () {
    this.init.apply(this, arguments);
}

CalendarController.prototype = Object.create({
   init: function ($scope, blogsService) {
       $scope.calendarId = ++calendarIdCounter;
       $scope.state = 'month';

       $scope.viewDay = function (rowIndex, cellIndex) {
           $scope.state = 'day';
       };
       $scope.closeDay = function () {
           $scope.state = 'month';
       };

       blogsService.getArchive()
           .then(function (posts) {
               //var postsTree = _.chain(posts)
               //    .groupByMulti(['year', 'month', 'day'])
               //    .value();
               //
               //var latestYear = posts[0].year;
               //var latestMonth = posts[0].month;
               //
               //var numDaysInMonth = moment(""+latestYear+"-"+latestMonth, 'YYYY-MM').daysInMonth();
               //var firstDayOfWeekOfMonth = moment(""+latestYear+"-"+latestMonth+"-1", 'YYYY-MM-DD').day();
               //var lastDayOfWeekOfMonth = moment(""+latestYear+"-"+latestMonth+"-"+numDaysInMonth, 'YYYY-MM-DD').day();
               //
               //$scope.header = { items: ['s', 'm', 't', 'w', 'th', 'f', 's'] };
               //
               //var preTimes = firstDayOfWeekOfMonth ? firstDayOfWeekOfMonth : 0;
               //var coreTimes = numDaysInMonth;
               //var postTimes = lastDayOfWeekOfMonth !== 6 ? 6 - lastDayOfWeekOfMonth : 0;
               //
               //$scope.body = {
               //    items: _.chain([])
               //    .concat(_.times(preTimes, function () { return {}; }))
               //    .concat(_.chain(coreTimes).times(function (i) { return {
               //        label: '' + (i + 1),
               //        year: latestYear,
               //        month: latestMonth,
               //        day: (i + 1)
               //    }; }).each(function (item) {
               //        item.hasBlog = !!(postsTree[''+item.year]
               //        && postsTree[''+item.year][''+item.month]
               //        && postsTree[''+item.year][''+item.month][''+item.day]);
               //    }).value())
               //    .concat(_.times(postTimes, function () { return {}; }))
               //    .chunk(7).value()
               //};
               //
               //$scope.archive = {
               //    title: "archive"
               //};
           })
   }
});

CalendarController.$inject = ['$scope', 'blogsService'];

angular.module('mw.directives.calendar', [])
    .directive('mwCalendar', function () {
        return {
            restrict: 'A',
            controller: CalendarController,
            templateUrl: '/wp-content/themes/disjointedthinking/templates/directives/calendar.html'
        }
    });