var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider)
{
	
		$routeProvider
    	
        .when('/homepage', 
        		{
        			controller: 'signUpController',
        			templateUrl: 'html/homepage.html',
        	
            	})
               
        .when('/details/:userId', 	
        		{
        	 		templateUrl: 'html/details.html',
        	 		controller: 'detailsController'
            	
        		})
        
        .when('/userwelcome/:id', 	
        		{
        	 		templateUrl: 'html/userwelcome.html',
        	 		controller: 'welcomeController'
            	
        		})
     
        .when('/showdetailsforuser/:userId', 	
        		{
        	 		templateUrl: 'html/showdetails.html',
        	 		controller: 'viewDetailsController'
            	
        		})
        		
        .when('/admin',
        		{
        			controller: 'adminController',
        			templateUrl: 'html/admin.html'
        		
        })
        
        
        
        .when('/editUser/:id',
        		{
        			controller: 'adminEditController',
        			templateUrl: 'html/editUser.html'
                   	
        })
        		
       
        .otherwise({
        			redirectTo: '/homepage'
            	
        			});
		
		
});	



app.controller('LogoutCtrl',['$scope', '$http', '$location',  '$rootScope',function($scope, $http, $location,  $rootScope)          
     {  
	 	$scope.Logout = function()
	 		{
	 			$http.post('logout', $scope.userId ).success(function(response)	
	 					{
              				$location.url('/homepage');
                         });
            }
	 		
	 	$scope.logoutInit = function()
	 	{
	 		
			if( $rootScope.userId== null )
                  {	
				  	$scope.logoutHide= false;
                   }
			else{
				alert("else");
				$scope.logoutHide= false;
				}
	 	}
       }                                                
]); 	


		
		
	
	    
	

