var pragaExpress = angular.module('pragaExpress',[    
    'ngRoute',
    'pragaExpressControllers',
    'pragaExpressFactories',
    'pragaExpressProviders'
    ]);

pragaExpress.config(["$routeProvider", 
    function($routeProvider) {
	$routeProvider
    .when("/", {
        templateUrl: "pages/main.html",
        controller: 'mainCtrl'
	})
    .when("/news", {
        templateUrl: "pages/news.html",
        controller:'newsCtrl'
	})
    .otherwise({
        redirectTo: '/phones'
      });
}])
