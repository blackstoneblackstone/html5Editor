App.directive('toggleCheckbox', function(){
  return {
    require: '?ngModel',
    restrict: 'A',
    link: function($scope, element, attrs, ctrl){
      element.bind('click', function(){
        var checked = ctrl.$viewValue;
        $scope.$apply(function(scope) {
            ctrl.$setViewValue(!checked);
        });
      });
      $scope.$watch(attrs.ngModel, function(newValue, oldValue) {
        var text = $('[ng-show="' + attrs.ngModel + '"] input[type=text]');
        if (newValue)
        {
          element.addClass("active");
          text.focus();
        }
        else
        {
          element.removeClass("active");
          $scope.resetSearchValue();
          // console.log($scope);
        }
      });
    }
  }
});