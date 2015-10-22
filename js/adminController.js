app.controller('adminController',[ '$scope', '$http', '$location',  '$rootScope' ,'$timeout',function($scope, $http, $location, $rootScope, $timeout) {
	

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
