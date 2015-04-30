var app = angular.module('myLocalStorageApp', ['ngRoute', 'LocalStorageModule']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
    .when('/', {
      templateUrl:'index',
      controller:'MainCtrl'
    })
    .otherwise({
      redirectTo:'/'
    })
  }]);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){  
  localStorageServiceProvider.setPrefix('myLocalStorageApp');
}]);

app.controller('MainCtrl', ['$scope','$http', 'localStorageService',  
  function($scope, $http, localStorageService){
    var getInventoryFromServer = function(){
    $http.get('http://localhost:3000/inventory') //get us some datas
    .success(function(data, status, headers, config){
      $scope.message = 'Check out this inventory';
      $scope.inventory = data;
      localStorageService.set('inventory', $scope.inventory);
    })
    .error(function(data, status, headers, config){
      $scope.message = 'There was an issue connecting to the server. Please try again later';
    });   
  }


  if(!localStorageService.isSupported){
    $scope.message = 'Your browser does not support localStorage. This app wont work offline!';
  }
  else{  
    //check to see if our inventory is stored in local storage.
    console.log('Checking local storage');
    $scope.inventory = localStorageService.get('inventory');

    if(!$scope.inventory){
      console.log('There is no inventory in your localStorage. Requesting Inventory from Srever');
      getInventoryFromServer();
    }
    else{
      $scope.message = 'We found some data in your localStorage. Here it is!'
    }
  }

  //scope helper functions
  $scope.edit = function(index){
    $scope.editing = true;
    $scope.item = $scope.inventory[index];
  }
  $scope.finishEditing = function(){
    $scope.editing = false;
    $scope.item = {};
  }
  $scope.removeLocalStorage = function(){
    //localStorageService.remove('inventory');
    console.log('Cleared the local storage');
    getInventoryFromServer()
  }
  $scope.$watch('inventory', function(){
    console.log('Inventory Changed');
    localStorageService.set('inventory', $scope.inventory);
  }, true);
}]);