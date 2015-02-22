angular.module('emailClientApp').controller('writeController', function ($scope, model) {
	$scope.email = {
		title : '',
		body : ''
	};

	var adresses = [{
			name : ''
		}
	];

  // Get emails from local storage
	var tooltips = JSON.parse(localStorage.getItem("tooltips"));

	// If there are no tooltips
	if(!tooltips){
		tooltips = [];
	}
	$scope.tooltips = tooltips;
	localStorage.setItem("tooltips", JSON.stringify(tooltips));


	$scope.email.adresses = adresses;

	var regexpPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	$scope.email.pattern = regexpPattern;

	// Email validation
	function validateEmail(adressArray) {
		var validAdressArray = true;
		adressArray.some(function (entry) {
			if (!regexpPattern.test(entry)) {
				//inform about invalid email
				alert("Email adress "+entry+ " is invalid");
				validAdressArray = false;
			} else{
				tooltips.push({name:entry});
			}
		});
		return validAdressArray;
	}

  // Send email
	$scope.email.send = function (form) {
		if (form.$valid) {
			var adressArray = [];
			$scope.email.adresses.forEach(function (entry) {
				adressArray.push(entry.name);
			});
			var title = $scope.email.title;
			var body = $scope.email.body;

			if (validateEmail(adressArray)) {
				model.sendEmail(adressArray, title, body);
			}
			localStorage.setItem("tooltips", JSON.stringify(tooltips));
		} else {
			window.alert("Fill all fields");
		}
	};

	$scope.email.addAdress = function () {
		var item = {
			name : ''
		};
		$scope.email.adresses.push(item);
	};
});
