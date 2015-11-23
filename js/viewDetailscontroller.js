app.controller('viewDetailsController',[ '$scope', '$http', '$location', '$routeParams','$rootScope', '$window',  function($scope, $http, $location, $routeParams, $rootScope, $window)
    {
				$scope.userId = $routeParams.userId;
				$rootScope.Username = $window.sessionStorage.userName;
				
				if($location.path()!= '/homepage' )
				{
				 $rootScope.logoutHide = false;
				}else
				{
					$rootScope.logoutHide = true;
				}
			
				$http.post('viewuserdetails', $scope.userId ).success(function(response)
						{
			
						$scope.detailsforuser = response;
			
						}).error(function(error)
								
								{
							console.log(error);
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
