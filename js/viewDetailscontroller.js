app.controller('viewDetailsController',[ '$scope', '$http', '$location', '$routeParams',  function($scope, $http, $location, $routeParams)
                                          
    {
		
				$scope.userId = $routeParams.userId;
		
			
			
				$http.post('viewuserdetails', $scope.userId ).success(function(response)
						{
			
			
						$scope.detailsforuser = response;
			
			
						}).error(function(error)
								
								{
								alert(error);
								});
		
			
				
					
				
						$scope.viewdetails =function(id)
						
						{
				
							
							$location.url('/userwelcome/'+id);
				
						};
						
						
						$scope.AnotherService = function()
						{	
						
							$location.url('/details/'+$scope.userId);
									
							
						}
						
						
						
						$scope.Logout = function()
						{	
						
						$http.post('logout', $scope.userId ).success(function(response)	
									{
										
										$location.url('/homepage');
									});
							
						}
						
						
						
	}]);
