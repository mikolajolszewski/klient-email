angular.module('emailClientApp').controller('previewController', function ($rootScope, $scope, $http, model, $stateParams) {
  $scope.dataLoading = true;
  $scope.dataLoaded = false;

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

  $rootScope.$on('initialDataLoaded', function (event, arg) {
      renderEmail();
  });

  renderEmail();
});


