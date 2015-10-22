

app.controller('detailsController',[ '$scope', '$http', '$location', '$routeParams', '$filter', '$upload', '$log', function($scope, $http, $location, $routeParams, $upload, $filter, $log)
  {
	
					$scope.userId = $routeParams.userId;
					$scope.items = [];
					$scope.item = {};
		 
					
					$scope.addItem = function (item)								/*	for add button	*/							
					{   
						if ($scope.item.file != undefined)
						{
							$scope.items.push( $scope.item);
							$scope.item = {};
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
					
					
					$http.get('getServiceTable').success(function(tableResponse)			/*for showing service table data from database*/
					{	
						$scope.dataTable = tableResponse;
					}).error(function(error)
				        {
				          alert(error);
				          });
					
					
					$scope.data = ["Afghanistan","Australia","Bangladesh",								/*type ahead for nationality*/
			                     "Brazil","Britan","Canada","China","Denmark","Egypt","France",
			                     "Germany","India","Indonesia","Iran","Iraq",
			                     "Isrel","Italy","Japan","Nepal","Pakistan","Sri Lanka",
			                     "United States","New Zealand","South Africa","Russia","South Korea","Sapin","Chilie","Sweeden"];   
			                     /*$('#nationality').typeahead({source: data});*/
					
					
				$scope.submit = function()															/*Register button to submit details*/
				{	
						
					if	( $scope.items.length < 2)
					{
						$('#myModalErr1').modal('show');
						return false;
					}
					
					
					/*$scope.submitForm = function()
					{
						alert("plz fill feilds");
						 var unvalid = myForm.$error.pattern;
						 if(unvalid)
						 {
							 alert("plz fill feilds");
						 }
						 	
					}*/
					
					$('#saveDetails').modal('show');
				
					var formData =
					{
						serviceType  : {serviceId:$scope.service, serviceName:''},	
						fullName  	 : $scope.fullName,
						fatherName   : $scope.fatherName,
						gender   	 : $scope.gender,
						nationality  : $scope.country,
						contactNumber: $scope.number,
						address    	 : $scope.address,
						dateofbirth  : $scope.dateofbirth,
						userId 		 : $scope.userId
		                
		                
					};
						alert($scope.serviceType);
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
								//$('#myModal').modal('show');
								$scope.Logout = function ()
								{
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
            
						
						$http.post('multipleSave', data,
							{
							transformRequest: function(data, headersGetterFunction)
								{
									return data;
								},
							headers: { 'Content-Type': undefined }
  
							}).success(function(data)
							
							{
							$log.debug('Upload Successfull');
							$log.debug('File upload: Success calling ');
                     
							}).error(function(error)
									
							{
							$log.debug('Upload failure');
							alert(error);
							});
					};
		  
	}]);

