'use strict';

/*Factories*/

var pragaExpressFactories = angular.module('pragaExpressFactories',[])

pragaExpressFactories.factory("Data", function(){
    return { message: " This is from factory"};
});


pragaExpressFactories.service("menuService", [ 'MODELS', '$http', function(MODELS, $http) {
    return {
        get: function(id){
//            return $http(MODELS.URL_TO_MENU).then(
//                function(response) {
//                    return response.data;
//                    }, 
//                function(response) {
//                    return menu;
//            })
            return menu;
        }
}}]);


pragaExpressFactories.service("advertisingService", [ 'MODELS', '$http', function(MODELS,$http){
    this.get = function(){
      return advertising;
    };
}])

pragaExpressFactories.service("networkService",[ 'MODELS', '$http', function(MODELS,$http){
    this.get = function(){
      return network;
    };
}])