angular.module('emailClientApp').controller('optionsController', function ($scope, options) {

  // Info message empty on start
  $scope.info = "";

  // Change background color
  $scope.changeBackground = function (color) {
    options.setBackgroundColor(color);
    document.body.style.background = options.getBackgroundColor();
  };

  // Change refresh time
  $scope.changeInterval = function () {
    var time = angular.element("#setIntervalTextbox");
    options.setInterval(1000*time.val());
    $scope.info = "Changes successfully saved.";
  };

  // Fill input with the value already set
  var setTime = angular.element("#setIntervalTextbox");
  setTime.val(options.getInterval()/1000);

});

