app.controller('welcomeController',[ '$scope', '$http', '$location', '$routeParams', '$window', function($scope, $http, $location, $routeParams, $window)
                                     
 {
		$scope.id = $routeParams.id;
		
			$http.post('recordforid', $scope.id ).success(function(response)
					{
						$scope.res=response;
						setTimeout(function(){
						$http.post('viewDoc', $scope.id).success(function(re){
							
					    	 $scope.doc = re;
					    	 
					    
					      }).error(function(error)
					              {
					          console.log(error);
					      });
						}, 2000);
						
					});
     	
		 $scope.Back = function(){
	   	   $location.url('/showdetailsforuser/' + $scope.res.userId );
	      }
}]);
