var App = angular.module('App', []);
 
App.config(function($interpolateProvider) 
{
  $interpolateProvider.startSymbol('//');
  $interpolateProvider.endSymbol('//');
});