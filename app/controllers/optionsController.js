angular.module('emailClientApp').controller('optionsController', function ($scope, model) {
    
  // Change background color 
  $scope.changeBackground = function (color) { 
    model.setBackgroundColor(color);
    document.body.style.background = model.getBackgroundColor();
  }
});

