app.controller('welcomeController',[ '$scope', '$http', '$location', '$routeParams', '$window', '$route',  function($scope, $http, $location, $routeParams, $window, $route)
                                     
 {
		$scope.id = $routeParams.id;
		var check=false;
		setTimeout(function(){
			$http.post('recordforid', $scope.id ).success(function(response)
					{
						
						$scope.res=response;
						
						$http.post('viewDoc', $scope.id).success(function(re){
					     	  
					     	  $scope.doc = re;
					     	
					     	
					     //	alert("inside"+ check);
					     	 // alert("Inside"+check);
					       }).error(function(error)
					               {
					           console.log(error);
					       });
						
					});
     	}, 2000);
		
		//$route.reload();
		
		//sleep(1000);
		// alert(check);
		
		/*if(check==true)
			{
			alert("inside");
			setTimeout(function(){
				alert("ok");
	     		$window.location.reload();
	     	}, 2000);
			}*/
	
		  $scope.Back = function(){
			
	    	   $location.url('/showdetailsforuser/' + $scope.res.userId );
	    	   
	       }
		
	
}]);
