angular.module('emailClientApp').controller('optionsController', function ($scope) {
    
  // Change color 
  $scope.changeBackground = function (color) { 
   localStorage.setItem ("color", color);
   document.body.style.background = localStorage.getItem("color");
  }

  
});

