function ComponentsCtrl($scope, $http)
{
    $scope.method = 'GET';
  	$scope.url = basePath + 'ajax/getComponents.json';

    $scope.fetch = function() 
    {
    	$scope.code = null;
    	$scope.response = null;
 
    	$http({
    		method: $scope.method,
    		url: $scope.url,
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    	})
    	.success(function(data, status) 
      {
      		$scope.status = status;
      		$scope.components = data;
    	}).
    	error(function(data, status) 
      {
      	$scope.components = data || "Request failed";
      	$scope.status = status;
    	});
  	};

    $scope.fetch();
}