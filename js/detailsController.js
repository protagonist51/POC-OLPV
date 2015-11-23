app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                   // alert($scope.myFile);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, id, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('id', id);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
       
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

app.controller('detailsController',[ '$scope', '$http', '$location', '$routeParams', '$filter', '$window', '$rootScope', 'fileUpload', function($scope, $http, $location, $routeParams, $filter, $window, $rootScope, fileUpload)
  {
 
       $scope.userId = $routeParams.userId;
 
       $scope.items = [];
       $scope.myFile = {};
       $scope.showTable = false;
       
       $rootScope.Username = $window.sessionStorage.userName;
		
		if($location.path()!= '/homepage' )
		{
		   $rootScope.logoutHide = false;
		}else
		{
		   $rootScope.logoutHide = true;
		}
   
       $scope.addItem = function (myFile)								/*	for add button	*/							
		{   
			if ($scope.myFile.file != undefined)
			{
				
				$scope.items.push( $scope.myFile);
				$scope.myFile = {};
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
						console.log(error);
				          });
         
        $scope.result = {};
      
         
         $scope.submitForm = function(isValid) {
        	 /*form validation for details and showing modal for confirm details*/
			if (isValid){	
				if	( $scope.items.length < 2)
				{
					$('#myModalErr1').modal('show');
					return false;
				}

			    	$('#saveDetails').modal('show');
			 }
         }
         
         $scope.nationality='';
         $scope.countries = ['Afghanistan', 'Australia', 'Bangladesh', 'Brazil', 'Britan', 'Canada', 'China', 'Denmark', 'Egypt', 'France', 'Germany', 'India', 'Maldives', 'Slovakia', 'Indonesia', 'Iran', 'Iraq', 'Isrel', 'Italy', 'Japan', 'Nepal', 'New Zealand', 'Pakistan', 'Sri Lanka', 'Poland', 'United States', 'South Africa', 'Russia', 'Sweeden', 'Chilie', 'Spain', 'Norway', 'Mexico', 'South Korea', 'Netherland', 'Vietnam', 'Vatican City', 'Irelend'];
          
           
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
			                	 //$scope.items[i].name =  $scope.items[i].name+ '_'+i+ '_';
			                	
			                  $scope.uploadFile(response.id, $scope.items[i]);
			                  console.log($scope.items[i].name);
			                }
			              }  
							

						if (response.id != null)
						{
							$scope.viewuser = response;
							
							$location.url('/userwelcome/' + response.id);
							$('#myModal').modal('show');
							
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
						console.log(error);
							});
	   
	};
	
	$scope.uploadFile = function(id, file){
     //   var file = $scope.myFile;
        var uploadUrl = 'upload';
        fileUpload.uploadFileToUrl(file, id,  uploadUrl);
    };
	
 }]);
