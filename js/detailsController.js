
app.controller('detailsController',[ '$scope', '$http', '$location', '$routeParams', '$filter', '$upload','$window', '$rootScope', function($scope, $http, $location, $routeParams, $upload, $filter,$window, $rootScope)
  {
 
       $scope.userId = $routeParams.userId;
 
       $scope.items = [];
       $scope.item = {};
       $scope.showTable = false;
       
       $rootScope.Username = $window.sessionStorage.userName;
		
		
		if($location.path()!= '/homepage' )
		{
		   $rootScope.logoutHide = false;
		}else
		{
		   $rootScope.logoutHide = true;
		}
   
       $scope.addItem = function (item)								/*	for add button	*/							
		{   
			if ($scope.item.file != undefined)
			{
				$scope.items.push( $scope.item);
				$scope.item = {};
				$scope.showTable=true;
			}
			else {
					$('#myModalErr2').modal('show');
				 }
		}
			
		$scope.removeItem = function (item)									/*for remove button	*/			
		{
			for (var i = 0; i < $scope.items.length; i++)
			{
			if ($scope.items[i] === item)
				{
				 $scope.items.splice(i, 1);
				 break;
				}
			}
		}
         
         
         $http.get('getServiceTable').success(function(tableResponse)					
					{	
						$scope.dataTable = tableResponse;
						
					}).error(function(error)
				        {
				          alert(error);
				          });
         
        $scope.result = {};
      
         
         
         $scope.submitForm = function(isValid) {											/*form validation for details and showing modal for confirm details*/
				
				if	( $scope.items.length < 2)
				{
					$('#myModalErr1').modal('show');
					return false;
				}

			  if (isValid) {
			    	$('#saveDetails').modal('show');
			    }
			
			 }
         
       
         $scope.nationality='';
         $scope.countries = ['Afghanistan', 'Australia', 'Bangladesh', 'Brazil', 'Britan', 'Canada', 'China', 'Denmark', 'Egypt', 'France', 'Germany', 'India', 'Indonesia', 'Iran', 'Iraq', 'Isrel', 'Italy', 'Japan', 'Nepal', 'New Zealand', 'Pakistan', 'Sri Lanka', 'Poland', 'United States', 'South Africa', 'Russia', 'Sweeden', 'Chilie', 'Spain', 'Norway', 'Mexico', 'South Korea', 'Netherland','Irelend'];
          
           
         $scope.submit = function()
         { 
					var formData =
				{
					serviceType : {serviceId:$scope.result.serviceId, serviceName:''},	
					fullName  	 : $scope.fullName,
					fatherName   : $scope.fatherName,
					gender   	 : $scope.gender,
					nationality  : $scope.nationality,
					contactNumber: $scope.number,
					address    	 : $scope.address,
				    dateofbirth  : $scope.dateofbirth,
					userId 		 : $scope.userId,
					subDate		 : new Date()
	                
	                
				};
										
					
					$http.post('userdetails', formData ).success(function(response)
					{
						
						if ($scope.items.length > 0)
			              {
			                for (var i = 0 ; i < $scope.items.length ; i++)
			                {
			                  $scope.uploadItem(response.id, $scope.items[i]);
			                  
			                }
			              }  
			      
			             							
						if (response.id != null)
							
						{
							
							$scope.viewuser = response;
							
							$location.url('/userwelcome/' + response.id);
						//	$('#myModal').modal('show');
							
							$scope.Logout = function ()
							{
								alert(response.userId );
								$http.post('logout',response.userId ).success(function(response)	
										{
									
											$location.url('/homepage');
										});
							}
						
						}
						
				
	    
					}).error(function(error)
							{
								alert(error);
							});
	   
	};
         
         $scope.uploadItem = function(id, file)
         {
        	 
        	 		var data = new FormData();
        	 		data.append('id', id);
        	 		data.append('file', file);
        	 		
        	 		/*$http({
        	 				method: 'POST',
        	 				url  :   'multipleSave',
        	 				headers: {
        	 	                'Content-Type': 'multipart/form-data'
        	 	            },
        	 			
        	 	           headers: {'Content-Type': undefined},
        	 	        data: data*/
  	 			
        	 				
        	 		    $http.post('multipleSave', data, {
        	 	        transformRequest: function(data, headersGetterFunction) {
        	 	            return data;
        	 	        },
        	 	        headers: { 'Content-Type': undefined
        	 	        /*enctype:'multipart/form-data'*/ }
  
        	 		 }).success(function(data) {
        	            $log.debug("Upload Successfull");
        	            $log.debug("File upload: Success calling ");
        	            alert(data);
        	            alert("hi");
        	 		}).error(function(error) {
        	             $log.debug("Upload failure");
        	             
        	             
        	         });
         };
        
             
    
 }]);
