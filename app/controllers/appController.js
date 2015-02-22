angular.module('emailClientApp').controller('AppController', ['$scope', function($scope) {
  //This gets and sets a color from localStorage on app start
  if (localStorage.getItem("color")) {
    document.body.style.background = localStorage.getItem("color");
  }
}]);