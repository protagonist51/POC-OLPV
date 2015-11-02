app.controller('adminController',[ '$scope', '$http', '$location', '$rootScope', '$window', function($scope, $http, $location, $rootScope, $window) {
		
$rootScope.Username = $window.sessionStorage.userName;
	
	if($location.path()!= '/homepage' ){
		
		$rootScope.logoutHide = false;
	}else{
		$rootScope.logoutHide = true;
	}
	
	 $scope.options = [
	                   { id : '1', name: 'Open' },
	                   { id : '2', name: 'In-Progress' },
	                   { id : '3', name: 'Rejected' },
	                   { id : '4', name: 'Verified' },
	                   { id : '5', name: 'Closed' }
	                   ];
	
	$http.get('getAlldetails').success(function(response)
    	 	{
				$scope.data = response;
				for(var i=0; i<response.length; i++)
					{
						
					console.log(response.id);
					}
				$scope.totalItems = response.length;
		        $scope.viewby = 10;
		        $scope.currentPage = 1;
		        $scope.itemsPerPage = $scope.viewby;
		        $scope.maxSize = 5; //Number of pager buttons to show

		        $scope.setPage = function (pageNo) {
		            $scope.currentPage = pageNo;
		        };

		        $scope.setItemsPerPage = function(num) {
		            $scope.itemsPerPage = num;
		            $scope.currentPage = 1; 
		            }
				
				}).error(function(error)
                    {
                alert(error);
            });
	
	
	$scope.editUser = function(id)
	{
		
		$location.url('/editUser/'+ id);
	}
	
	
	$scope.statusChange = function()
	{
		//$scope.status.statusId = $scope.status;
		alert($scope.response.status.statusId);
		var count = 0;
		for (var i = 0 ; i < $scope.totalItems; i++){
			if($scope.data.status.statusId ==  $scope.status){
			count ++;
			}
		}
	$scope.totalItems = count;
	
	}

}]);


