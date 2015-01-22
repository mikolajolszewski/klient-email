angular.module('emailListController', []).controller('emailListController', function ($scope, $http) {
  $scope.getEmails = function () {
    $http.get('/emails').success(function (res) {
      $scope.emailsRes = res;
    });
  };
});