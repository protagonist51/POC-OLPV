app.controller('adminController',[ '$scope', '$http', '$location', '$rootScope', '$window', function($scope, $http, $location, $rootScope, $window) {
		
$rootScope.Username = $window.sessionStorage.userName;
	
	if($location.path()!= '/homepage' ){
		
		$rootScope.logoutHide = false;
	}else{
		$rootScope.logoutHide = true;
	}
	
	$http.get('getAlldetails').success(function(response)
    	 	{
				$scope.data = response;
				
				}).error(function(error)
                    {
                alert(error);
            });
	
	
	$scope.editUser = function(id)
	{
		
		$location.url('/editUser/'+ id);
	}

}]);
