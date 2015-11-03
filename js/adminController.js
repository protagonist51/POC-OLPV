app.controller('adminController',[ '$scope', '$http', '$location', '$rootScope', '$window', function($scope, $http, $location, $rootScope, $window) {
		
$rootScope.Username = $window.sessionStorage.userName;
	
	if($location.path()!= '/homepage' ){
		
		$rootScope.logoutHide = false;
	}else{
		$rootScope.logoutHide = true;
	}
	
		
	$scope.$watch('status', function()
	{
		var array =[];
		//alert($scope.data.length);
		totaldata.forEach(function(value, index, arr)
				{
					//console.log(index);
			//console.log(value.status.status, $scope.status);

					if(value.status.status==$scope.status)
						{
						//console.log(value.status.status, $scope.status);
							array.push(value);
						}
					if($scope.status=='Status')
						{
							alert("Hello");
							$scope.data=totaldata;
							$scope.totalItems=totladata.length;
							
						}
				})
		$scope.data = array;		
		$scope.totalItems = array.length;
		console.log(array.length);
	}		
	)

	var totaldata=[];
	
	$http.get('getAlldetails').success(function(response)
    	 	{
				$scope.data = response;
				totaldata=response;
				$scope.totalItems = response.length;
		        $scope.currentPage = 1;
		        $scope.itemsPerPage = 10;
		        $scope.maxSize = 5; 

		        $scope.setPage = function (pageNo) {
		            $scope.currentPage = pageNo;
		        };

		        
				
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
