angular.module('emailClientApp').service('options', function($http, $rootScope, $location) {
  // Set background color
  this.setBackgroundColor = function (color) {
    if (color === null) {
      return;
    }
    localStorage.setItem ("color", color);
  };

  // Get background color
  this.getBackgroundColor = function () {
    var color = localStorage.getItem("color");
    if (color === null) {
        return white;
    }
    return color;
  };

  // Set interval
  this.setInterval = function (time) {
    if (time === null) {
      return;
    }
    localStorage.setItem("time", time);
  };

  // Get Interval
  this.getInterval = function () {
    var time = localStorage.getItem("time");
    if (time === null) {
      return 20000;
    }
    return time;
  };
});