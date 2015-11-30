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
        
        var today = new Date().toISOString().split('T')[0];
		document.getElementsByName("datePicker")[0].setAttribute('max', today);
      
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
         $scope.countries   = [				   { 'contName': 'India', 	   'code':'+91'}, { 'contName':	'Brazil', 	   'code':'+55'},
		                                       { 'contName': 'Pakistan',   'code':'+92'}, { 'contName':	'New Zealand', 'code':'+64'},
		                                       { 'contName': 'Canada', 	   'code':'+01'}, { 'contName':	'France', 	   'code':'+33'},
		                                       { 'contName': 'China', 	   'code':'+86'}, { 'contName':	'Germany', 	   'code':'+49'},
		                                       { 'contName': 'Japan', 	   'code':'+81'}, { 'contName':	'Iran', 	   'code':'+98'},
		                                       { 'contName': 'Afghanistan','code':'+93'}, { 'contName':	'Italy', 	   'code':'+39'},
		                                       { 'contName': 'Australia',  'code':'+61'}, { 'contName':	'Sri Lanka',   'code':'+94'},
		                                       { 'contName': 'Bangladesh', 'code':'+80'}, { 'contName':	'South Africa','code':'+27'},
		                                       { 'contName': 'South Korea','code':'+82'}, { 'contName':	'United States','code':'+01'},
		                                       { 'contName': 'Vietnam',    'code':'+81'}, { 'contName':	'Vatican City','code':'+124'},
		                                       { 'contName': 'Mexico',     'code':'+49'}, { 'contName': 'Iraq',        'code':'+231'},
		                                       { 'contName': 'Ireland',    'code':'+52'}, { 'contName': 'Poland',       'code':'+31'},
		                                       { 'contName': 'Norway',     'code':'+71'}, { 'contName': 'Russia',    'code':'+81'}
		 					 ];
         
         $scope.change=function()
			{
				$scope.number = $scope.nationality.code;
				
			}
           
         $scope.submit = function()
         { 
					var formData =
				{
					serviceType : {serviceId:$scope.result.serviceId, serviceName:''},	
					fullName  	 : $scope.fullName,
					fatherName   : $scope.fatherName,
					gender   	 : $scope.gender,
					nationality  : $scope.nationality.contName,
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
			                	 
			                	
			                  $scope.uploadFile(response.id, $scope.items[i]);
			                  console.log($scope.items[i].name);
			                }
			              }  
							

						if (response.id != null)
						{
							$scope.viewuser = response;
							
							$location.url('/showdetailsforuser/' + response.userId);
							
							
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
     
        var uploadUrl = 'upload';
        fileUpload.uploadFileToUrl(file, id,  uploadUrl);
    };
	
 }]);
