angular.module('emailClientApp').controller('optionsController', function ($scope, model) {
    
  // Change background color 
  $scope.changeBackground = function (color) { 
    model.setBackgroundColor(color);
    document.body.style.background = model.getBackgroundColor();
  }
  
  // Change refresh time
  $scope.changeInterval = function (time) {
    var time = angular.element("#setIntervalTextbox");
    model.setInterval(1000*time.val());
  }
    var setTime = angular.element("#setIntervalTextbox");
    setTime.val(model.getInterval()/1000);
});

