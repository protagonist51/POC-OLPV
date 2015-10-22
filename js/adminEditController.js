
app.controller('adminEditController',[ '$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    
	 $scope.status  = 'Waiting';

     $scope.options = [
       { id : '1', name: 'Verified' }
      ,{ id : '2', name: 'Rejected' }
      ,{ id : '3', name: 'Waiting' }
      ];
     
	$scope.id = $routeParams.id;
      
       $http.post('editUserdetails', $scope.id).success(function(response)
       {
              $scope.data = response;
             
 
       }).error(function(error)
            {
        alert(error);
    });
       
       
       
       $http.post('viewDoc', $scope.id).success(function(re){
      	  
       	 
      	  $scope.doc = re;
      	
      	  
        }).error(function(error)
                {
            alert(error);
        });
       
       
       
       
       
       $scope.submit = function(){
           
    	  
    	
           var formData = {
        		   status	:{ statusId:$scope.status, status:''},
                        id	: $scope.id
           };
           $scope.data.status.statusId = $scope.status;
          
           $http.post('userdetails', $scope.data).success(function(data)
        	      {	
        	   
        	   			$location.url('/admin');
        	   		  
        	  			
        	      }).error(function(error)
        	              {
        	          alert(error);
        	      });
         
          
       };
       
       
       $scope.comeback = function(){
    	   $location.url('/admin');
    	   
       }
       
      
}]);
