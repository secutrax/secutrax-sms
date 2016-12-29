angular.module('ApplFormAPP', [])

.config(function($locationProvider) {
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
})

.controller('ApplFormController', function($scope, $http, $location, $window) {


$scope.formSubmit = function() {

	$http({
        method: "POST",
        url: '/saveFormat',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({content:angular.toJson($scope.formDetails)}) })
		.success(function(data, status, headers, config){
				$window.location.href = "/viewFormat.html";
		});
}
$scope.textBoxValidations = function(field) {
	
	if(field.required && (typeof field.value=="undefined" || field.value=="")) {
		alert(field.displayName + " is required.");
		return;
	}
	
	if(field.value != "") {
		for(i=0; i<field.validations.length; i++) {
			var validation = field.validations[i];
			if(validation.name == "minLength") {
				if(field.value.length < validation.value) {
					alert(field.displayName + " : Minimum length should be : " + validation.value);
					return;
				}
			} else if(validation.name == "maxLength") {
				if(field.value.length > validation.value) {
					alert(field.displayName + " : Maximum length should be : " + validation.value);
					return;
				}
			}
		}
	}
}


$scope.numericTextBoxValidations = function(field) {
	
	if(field.required && (typeof field.value=="undefined" || field.value=="")) {
		alert(field.displayName + " is required.");
		return;
	}
	
	if(field.value != "") {
		for(i=0; i<field.validations.length; i++) {
			var validation = field.validations[i];
			if(validation.name == "minValue") {
				if(field.value < validation.value) {
					alert(field.displayName + " : Should be greater : " + validation.value);
					return;
				}
			} else if(validation.name == "maxValue") {
				if(field.value > validation.value) {
					alert(field.displayName + " : Should be lesser : " + validation.value);
					return;
				}
			}
		}
	}
}

$scope.dateTextBoxValidations = function(field) {
	alert(field.value);
	return;
	if(field.required && (typeof field.value=="undefined" || field.value=="")) {
		alert(field.displayName + " is required.");
		return;
	}
	
	if(field.value != "") {
		for(i=0; i<field.validations.length; i++) {
			var validation = field.validations[i];
			if(validation.name == "minValue") {
				if(field.value < validation.value) {
					alert(field.displayName + " : Should be greater : " + validation.value);
					return;
				}
			} else if(validation.name == "maxValue") {
				if(field.value > validation.value) {
					alert(field.displayName + " : Should be lesser : " + validation.value);
					return;
				}
			}
		}
	}
}
	
$scope.commonDetails = {};
$scope.formDetails = {};

$scope.handleInit = function() {
		$http.get("config/format.json")
		.then(function(response) {
			$scope.formDetails = response.data;
		});
		
		$http.get("config/common.json")
		.then(function(response) {
			$scope.commonDetails = response.data;
		});
};

$scope.handleInit();

})
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});