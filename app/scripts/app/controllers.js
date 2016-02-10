'use strict';

/* Controllers */

var pragaExpressControllers = angular.module('pragaExpressControllers',[])

pragaExpressControllers.controller("mainCtrl", function(advertisingService, $scope){
    $scope.advertising = advertisingService.get();
    
    var keepGoing = true;
    $scope.advertising.forEach(function(row){
       if (row.type == 1 && keepGoing) 
           {               
               row.image = "upload/"+ row.image; 
               $scope.mainAdvertising = row;
               keepGoing = false;
           }
    });
},['advertisingService', '$scope']);

pragaExpressControllers.controller("menuCtrl", function(menuService,$scope,$http){
    $scope.data = menuService.get();    
},['menuService','$scope', '$http']);

pragaExpressControllers.controller("searchCtrl", function($window, $scope){        
    $scope.submit = function(){        
        $window.location.href = '/search.html';
    };
},['$window', "$scope"]);

pragaExpressControllers.controller("networkCtrl", function(networkService, $scope){
    $scope.modelIsEmpty = true;
    $scope.data = networkService.get();
    if ($scope.data.length > 0)
        {
            $scope.modelIsEmpty = false;
            $scope.data.forEach(function(row){
               switch (row.type) 
                   {
                       case "1":{
                           row.clazz = "facebook";                           
                           row.type = "Facebook";                           
                           break;
                   }
                       case "2":{ 
                           row.clazz = "twitter";
                           row.type = "Twitter";
                           break;
                   }
                       case "3":{
                           row.clazz = "rss";
                           row.type = "Rss";
                           break;
                       }
                       default: break;
                   }
            });
        }
},['networkService', '$scope']);


pragaExpressControllers.controller("formController",function($scope){
    
    $scope.user = {
        firstName:null,
        email:null,
        description:null
    };
    
//    vm.triggerSubmit = function() {
//    vm.homeForm.$setSubmitted();
//    ...
//}
    
//    angular.forEach($scope.form.$error.required, function(field) {
//        field.$setDirty();
//    });
     $scope.submit=function(){        
         if ((this.user !== undefined))
             {
                if (this.user.firstName ==null) this.user.firstName = "";
                if (this.user.email ==null) this.user.email = "";
                if (this.user.description ==null) this.user.description = "";
             }
        
    }               
},['$scope']);