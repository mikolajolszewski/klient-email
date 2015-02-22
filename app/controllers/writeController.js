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
	
	var tooltips = JSON.parse(localStorage.getItem("tooltips"));
	if(!tooltips){
	console.log("tworzy");
		tooltips = [{
				name: 'example@domain.com'
			}, 
			{
				name: 'adres@domena.pl'
			}
		]
	};
	console.log("tultypki: " + tooltips);
	$scope.tooltips = tooltips;
	localStorage.setItem("tooltips", JSON.stringify(tooltips));
	

	$scope.email.adresses = adresses;
	
	var regexpPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	$scope.email.pattern = regexpPattern;
	//validacja email

	function validateEmail(adressArray) {
		var validAdressArray = true;
		adressArray.some(function (entry) {
			if (!regexpPattern.test(entry)) {
				//inform about invalid email
				console.log("email nieprawidlowy!!!");
				window.alert("Email adress "+entry+ " is invalid");
				return validAdressArray = false;
			} else{
				console.log("wkladam");
				console.log({name:entry});
				tooltips.push({name:entry});
				console.log("po wlozeniu");
				console.log(tooltips);
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
			localStorage.setItem("tooltips", JSON.stringify(tooltips));
		} else {
			console.log("wypelnij wymagane pola");
			window.alert("Fill all fields");
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
