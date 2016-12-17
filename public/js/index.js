angular.module('ApplFormAPP', [])

.config(function($locationProvider) {
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
})

.controller('ApplFormController', function($scope, $http, $location) {
$scope.groups = [ 
{
	"name" : "group-1",
	"fields" : [
		{
			"type" : "textfield",
			"displayName" : "Name of the Student",
			"required" : true,
			"validations" : [{"min-length" : 5, "max-length" : 10}]
			
		},
		{
			"type" : "textfield",
			"displayName" : "Father's Name",
			"required" : true
		},
		{
			"type" : "textfield",
			"displayName" : "Age",
			"required" : false
		},
		{
			"type" : "radio",
			"name" : "community",
			"displayName" : "Community",
			"required" : false,
			"value" : "BC",
			"options" : [
				{"name" : "FC"},
				{"name" : "BC"},
				{"name" : "MBC"},
				{"name" : "SC"},
				{"name" : "ST"}
			]
		},
		{
			"type" : "radio",
			"name" : "gender",
			"displayName" : "Gender",
			"required" : false,
			"value" : "Male",
			"options" : [
				{"name" : "Male"},
				{"name" : "Female"}
			]
		}
	]
}

];


})
.filter('filterByShow',[function() {
    var customFilter = function(arr){
	if(!arr) {
		return;
	}

      return arr.filter(function(arrayItem){
          var match = false;
			  // alert(arrayItem.tcname + "  .... " + arrayItem.show);
              if(arrayItem.show) {
                match = true;
              }
           return match;
       });
    };

    return customFilter;

}])
.filter('objLength', function() {
	return function(object) { 
		return Object.keys(object).length; 
	} 
});