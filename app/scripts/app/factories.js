'use strict';

/*Factories*/

var tobSnabFactories = angular.module('tobSnabFactories',[])

tobSnabFactories.factory("Data", function(){
    return {
        get: function(){
            return modelData;
        }
    };
});
