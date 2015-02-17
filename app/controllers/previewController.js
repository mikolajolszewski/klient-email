angular.module('emailClientApp').controller('previewController', function ($rootScope, $scope, model, $stateParams, $location) {
  $scope.dataLoading = true;
  $scope.dataLoaded = false;

  // Function rendering email
  var renderEmail = function() {
    var email = model.getMailById($stateParams.emailid, $stateParams.box);
    if (email) {
      date = new Date(email.received);
      $scope.date = date.toLocaleString();
      if ($stateParams.box === 'inbox') { // If this is an inbox lookup or sent lookup
        $scope.from = email.sender;
        $scope.boxtype = "From";
      } else if ($stateParams.box === 'inbox') {
        $scope.from = email.sender;
        $scope.boxtype = "From";
      }
      $scope.subject = email.title;
      $scope.content = email.content;
      $scope.dataLoading = false;
      $scope.dataLoaded = true;
    }
  };

  $scope.delete = function () {
    model.removeMailFromServer($stateParams.emailid);
    $location.path('/inbox');
  };

  // Load data in case of page is refreshed on email view
  $rootScope.$on('initialDataLoaded', function (event, arg) {
      renderEmail();
  });

  // Load data on click
  renderEmail();
});


