app.controller('welcomeController',[ '$scope', '$http', '$location', '$routeParams', '$window', '$rootScope', function($scope, $http, $location, $routeParams, $window, $rootScope)
                                     
 {
		$scope.id = $routeParams.id;
		$rootScope.num=1;
		
		setTimeout(function(){
			$http.post('recordforid', $scope.id ).success(function(response)
					{
						
						$scope.res=response;
						
						$http.post('viewDoc', $scope.id).success(function(re){
					     	  
					     	  $scope.doc = re;
					     	 $rootScope.num+=1;
					     
					       }).error(function(error)
					               {
					           console.log(error);
					       });
						
					});
     	}, 3000);
		
		/*alert("Value of rootscope "+$rootScope.num);
		if($rootScope.num==2)
		{
			alert("inside refresh"+$rootScope.num);
			location.reload();
		}*/
		
		if (localStorage.getItem('loadedOnce') === 'true') {
		   
		} else {
		    // set the flag and reload the page
		    localStorage.setItem('loadedOnce', 'true');
		    location.reload();
		}
		
		  $scope.Back = function(){
	    	   $location.url('/showdetailsforuser/' + $scope.res.userId );
	       }
	
}]);
