angular.module('emailClientApp').service('mailUtils', function($http, $rootScope) {

  // Sort json array
  this.sortBy = function(field, reverse, primer){
     var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};
     reverse = [-1, 1][+!!reverse];
     return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
  }
});