app.controller('welcomeController',[ '$scope', '$http', '$location', '$routeParams', '$window', function($scope, $http, $location, $routeParams, $window)
                                     
 {
		$scope.id = $routeParams.id;
		$scope.num=false;
		setTimeout(function(){
			$http.post('recordforid', $scope.id ).success(function(response)
					{
						$scope.num=true;
						$scope.res=response;
						$http.post('viewDoc', $scope.id).success(function(re){
					     	  
					     	  $scope.doc = re;
					     	  
					       }).error(function(error)
					               {
					           console.log(error);
					       });
						
					});
     	}, 4000);
		
		if($scope.num==false)
			{
			
				location.reload();
			}
		
		  $scope.Back = function(){
	    	   $location.url('/showdetailsforuser/' + $scope.res.userId );
	       }
}]);
