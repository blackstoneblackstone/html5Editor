App.filter('isArray', function(){
  return function (value){
    return angular.isArray(value);
  }
});