angular.module('emailClientApp').controller('writeController', function ($rootScope, $scope, $http, model) {
	$scope.email = {sendto: '', title:'', body: ''};
	 
	$scope.email.send = function() {
            model.sendEmail($scope.email.sendto, $scope.email.title, $scope.email.body);
    }
});