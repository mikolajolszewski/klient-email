angular.module('emailClientApp').controller('writeController', function ($scope, model) {
	$scope.email = {
		// sendto : "",
		title : '',
		body : ''
	};

	var adresses = [{
			name : ''
		}
	];

	$scope.email.adresses = adresses;
	// <div id="emailAdressesDiv" >

	var regexpPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	$scope.email.pattern = regexpPattern;
	//validacja email

	function validateEmail(adressArray) {
		var validAdressArray = true;
		adressArray.some(function (entry) {
			if (!regexpPattern.test(entry)) {
				//inform about invalid email
				console.log("email nieprawidlowy!!!");

				return validAdressArray = false;
			}
		});
		return validAdressArray;
	}

	$scope.email.send = function (form) {
		if (form.$valid) {
			var adressArray = [];
			$scope.email.adresses.forEach(function (entry) {
				console.log(entry);
				adressArray.push(entry.name);
			});
			var title = $scope.email.title;
			var body = $scope.email.body;

			if (validateEmail(adressArray)) {
				model.sendEmail(adressArray, title, body);
			}
		} else {
			console.log("wypelnij wymagane pola");
		};
	};

	$scope.email.addAdress = function () {
		console.log("dodaje do diva");
		var item = {
			name : ''
		};
		$scope.email.adresses.push(item);
	};
});
