pragaExpress.directive("ng-wrap-text", function () {
    return function ($scope, element,attrs) {
        $( ".inner" ).wrap( "<div class='new'></div>" );
        var str = blockProducts.name;
        var text = "IQ Models";

        if (str.indexOf(text) != -1)
        {
            str = str.substr(str.indexOf(text),text.length);
        }
        //$(".products h1").innerHTML("<i>"+str+"</i>"+str.substr(text.length));
        element.innerHTML("text");
    }
});

pragaExpress.directive("headertmpl", function(){
   return {               
        templateUrl: 'partials/header.html',        
        scope: {},
        link: function(scope, element, attributes) {                                    
        }
    }
},'TEMPLATE');

pragaExpress.directive("networktmpl", function(){
   return {        
       controller: 'networkCtrl',
       templateUrl: 'partials/network.html',        
        scope: {},
        link: function(scope, element, attributes) {                        
            element.find("input[type='text']").attr('placeholder','Search');
        }
    }
});

pragaExpress.directive("emptytmpl", function(){
   return {        
       templateUrl: 'partials/empty.html',        
        scope: {},
        link: function(scope, element, attributes) {                        
            element.find('.dataIsEmpty').data("ng-show='"+scope.modelIsEmpty+"'");            
        }
    }
});

pragaExpress.directive("footertmpl", function(){
   return {        
       controller: 'mainCtrl',
       templateUrl: 'partials/footer.html',        
        scope: {},
        link: function(scope, element, attributes) {                        
            //element.find('.dataIsEmpty').data("ng-show='"+scope.modelIsEmpty+"'");            
        }
    }
});


pragaExpress.directive('checkEmail', function(){
    var EMAIL_REGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return {
  		restrict: 'A',
			require: 'ngModel',
			link: function(scope, elm, attr, ctrl) {

					if (attr.type === 'radio' || attr.type === 'checkbox') return;
					elm.unbind('input').unbind('keydown').unbind('change');
					
					elm.bind('blur', function() {
						scope.$apply(function() {
							if (EMAIL_REGX.test(elm.val())) {
								ctrl.$setValidity('email', true);
							} else {
								ctrl.$setValidity('email', false);
							}
						});
					});
			}
    };
});    

pragaExpress.directive("required", function(){
  return {        
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {                        
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
                elm.unbind('input').unbind('keydown').unbind('change');

                elm.bind('blur', function() {
                    scope.$apply(function() {
                        if (EMAIL_REGX.test(elm.val())) {
                            ctrl.$setValidity('text', true);
                        } else {
                            ctrl.$setValidity('text', false);
                        }
                    });
                });
        }
    };
});

//app.directive("title", function () {
//    return {
//        controller: 'productsController',
//        // обязательно, для поддержки работы через элемент
//        restrict: 'E',
//        template: '<h1></h1>',
//        replace: true,
//        scope: {},
//        link: function(scope, element, attributes) {
//            var str = blockProducts.name;
//            var text = "IQ Models";
//
//            if (str.indexOf(text) != -1)
//            {
//                str = "<i>"+str.substr(str.indexOf(text),text.length)+"</i>" + str.substr(text.length);
//            }
//            //$(".products h1").innerHTML("<i>"+str+"</i>"+str.substr(text.length));
//            element.html(str);
//            //element.text(blockProducts.name);
//        }
//    }
//});
//
//pragaExpress.directive("startScrolling", function($timeout) {
//    return {
//        restrict: "A",
//        link: function(scope, elem, attrs) {
//            if ($("body").width() <= 700) 
//            {
//                angular.element( document.querySelector('header')).addClass('model-empty');    
//                if (attrs.startScrolling == "jssor_1") { scope.modelIsEmpty = true;}
//                return;                        
//            }
//            
//            var id = $('#'+attrs.id);
//            
//            if (!scope.modelIsEmpty)
//                {
//                    $timeout(function(){                        
//                        switch (attrs.startScrolling)
//                            {
//                                case "mCustomScrollbar": {
//                                    
//                                    id.mCustomScrollbar({
//                                        live:true,
//                                        theme:"inset-dark",				
//                                        axis:"x",
//                                        mouseWheel:{ enable: Browser.isIpad() ? true : false },
//                                        scrollInertia:550,
//                                        scrollbarPosition:"outside"
//                                    });     
//                                    break;
//                                }
//                                case "bxSlider": {                                    
//                                    id.bxSlider();
//                                    break;
//                                }
//                                case "jssor_1" : {                                
//                                    Slider.JssorInit();        
//                                    break;
//                                }
//                                default:break;
//                            }                    
//                    });
//                } else
//                  {
//                      $timeout(function(){
//                        
//                        switch (attrs.startScrolling)
//                            {                                
//                                case "jssor_1" : {
//                                    angular.element( document.querySelector('header')).addClass('model-empty');                                    
//                                    break;
//                                }
//                                default:break;
//                            }                    
//                    });
//                  }
//        }
//    }
//},['$timeout']);