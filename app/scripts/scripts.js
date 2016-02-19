$(function(){
    
    Browser.Init();
    Site.Init();     
    $(window).load(function(){Site.OnLoad();});
    $(window).scroll(function () {            
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {                            
            Site.scroll($(window).scrollTop());
        }, 250));                          
    });
});

var Site = new function () {
    this.Init = function(){
        
        //smooth scroll to top
        $(".cd-top").on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, 700
            );
        });    
        
         //$.mask.definitions['~']='[+-]';    
         $('input[type=tel]').mask("+7(999) 999-9999");
               
        $(".call-back-form").each(function(){
		var it = $(this);
		it.validate({
			rules: {
				name: { required: true },
				phone: { required: true },
				email: { required: true }
			},
			messages: {

			},
			errorPlacement: function(error, element) {

			},
			submitHandler: function(form) {
				var thisForm =$(form);
               
                $(this).find("input").val("");                                                 
               
                var value = [
                        {old:'.people', id:"fullName"},
                        {old:'.phone', id:"phone"},
                        {old:'.email', id:"email"}
                ];
                var temp = null;
                for(i = 0; i<3; i++)
                    {
                        temp = thisForm.find(value[i].old);
                        if (temp!=undefined) 
                        {
                            var newForm = thisForm.find(value[i].old).attr("id", value[i].id).attr("name", value[i].id);
                            thisForm.find(value[i].old).html(newForm);
                        }
                    }
                
                if (thisForm.find("input[type='submit']").data("animated")!=undefined)
                    {
                        var obj = $(".calculatePrice .checkboxes .base label input");
                        var value = [
                            $(obj[0]).attr("data-checked") !=undefined ? "да" : "нет",
                            $(obj[1]).attr("data-checked") !=undefined ? "да" : "нет",
                            $(obj[2]).attr("data-checked") !=undefined ? "да" : "нет",
                            $(obj[3]).attr("data-checked") !=undefined ? "да" : "нет"
                        ];
                            
                        var formWindow ={
                            "Тип окна": $(".calculatePrice .item.active img").data("type"),
                            "Высота (мм)":$(".calculatePrice .win_height").val(),
                            "Ширина (мм)":$(".calculatePrice .win_width").val(),
                            "Дополнительно":{
                                "Отливы": value[0],
                                "Подоконник": value[1],
                                "Монтаж": value[2],
                                "Пластиковые откосы": value[3]
                            }
                        }                    
                    }
                
                
				$.ajax({
					type: "POST",
					url: "back-end/main.php",
					data: thisForm.serialize()+(formWindow!=undefined ? "&view="+JSON.stringify(formWindow) : "")
				}).done(function() {
					$(this).find("input").val("");
                                       
                    if (thisForm.find("input[type='submit']").data("animated")!=undefined)
                    {
                        var label = "";
                        thisForm.parent().animate({height:0}, 500);  
                    }
                    else
                        {                            
                             if (thisForm.find("input[type='submit']").data("successful")!=undefined)
                                {
                                    thisForm.parent().animate({height:0},500,function(){
                                        $(".thanks").show();                        
                                    });                            
                                }
                                else $('#callForm').modal({show: 'true'}).find(".call-answer").addClass("small-window");                            
                        }
                    
                    
					setTimeout(function() {
                        if ( label==undefined)
                        {
                            $('.modal').modal('hide');    
                        }
						  
					},3000);
					$(".call-back-form").trigger("reset");
				});
				return false;
                
                

			},
			success: function() {

			},
			highlight: function(element, errorClass) {
				$(element).addClass('error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('error');
			}
		})
	});
        
        $(".download").bind("click", function(e){            
             window.location.href = $(this).data("link");
        });
    
        $(".call").bind("click", function(e){
              e.preventDefault();
            var t = $(this);
            var id =  $('#callForm');
            id.find(".call-answer").removeClass("small-window");            
            id.find(".block-before").attr("style","");
            id.modal({show:true}); 
        });    
        
         if ($("body").width() < 700)   
            { $("#baseBlockForOurWork").attr("data-show", 2); }      
    };
    this.verify = function(){
            $("img").each(function(){
               var t = $(this);
                if (t.attr("alt") == undefined)
                    {
                        t.attr("alt","");
                    }
            });
    };        
    this.windowChoose = function(){
        var obj = $(".calculatePrice .item img");
        var a = "active";
        var big = $(".calculatePrice .large");
        var first = obj.first().addClass(a);
        var source = first.attr("src").substring(first.attr("src").lastIndexOf("/")+1);
        big.attr("src", "uploads/"+source);
        
        $(".successfully").html($(".thanks").html());

        obj.bind("click", function(){
           var a = "active";
           var t = $(this);           
           t.closest(".images").find(".item").removeClass(a);                       
           var big = $(".calculatePrice .large");
           var source = t.attr("src").substring(t.attr("src").lastIndexOf("/")+1);
           big.attr("src", "uploads/"+source);                        
            
            t.closest(".item").addClass(a);        
           if (t.closest(".item").index()==1)
               {
                   $(".calculatePrice .base-img").attr("src", "images/calculation/"+source);                        
               }
            
        });
    };
    this.scroll = function (scroll) {
        
        var header = $(".header");
        var clazz = "fixit";
        if (scroll>0)
            {
                if ((Browser.isIPhone() || Browser.isAndroid())&&( !header.hasClass(clazz))){
                    header.addClass(clazz);
                    $(".will-call i").addClass("call");
                    header.find(".navbar-header").append($(".will-call").html());
                    
                    $(".call").bind("click", function(e){
                        e.preventDefault();
                        var t = $(this);
                        var id =  $('#callForm');
                        id.find(".call-answer").removeClass("small-window");            
                        id.find(".block-before").attr("style","");
                        id.modal({show:"true"}); 
                    });    
                } 
            }
            else
                    {
                        header.removeClass(clazz).find(".navbar-header .call").remove();
                    }
    };
    this.OnLoad = function(){
        this.windowChoose();
        //this.verify();
        
        $(".list-works .base a").fancybox({
            'transitionIn'	:	'elastic',
            'transitionOut'	:	'elastic',
            'speedIn'		:	600, 
            'speedOut'		:	200, 
            'overlayShow'	:	false,
             'padding' : 0,
             'helpers': {overlay: { locked: false}}
        });
        
        $(".navbar-toggle").bind("click", function(e){
           e.preventDefault();
            var obj = $("#navbar");
            var visible = ["50px", "166px"];
            if (!obj.hasClass("in"))
                {
                    obj.addClass("collapse in").animate({height:visible[1]},500);
                } else obj.animate({height:visible[0]},500, function(){ $(this).removeClass("in")});
            
            return false;
        });                
        
        $("a[data-rel='m_PageScroll2id']").mPageScroll2id({            
            scrollSpeed: 500,
            offset: 100            
        });
      
        $('.block-map').click(function () {
            $(this).find('iframe').css("pointer-events", "auto");
        });
        
        
            $('.multiple-items').slick({
              infinite: true,
              dots: true,
              slidesToShow: ($("body").width()>768) ? 3 : 1,
              slidesToScroll: ($("body").width()>768) ? 3 : 1,
            });
        
        
        $(".btnToCalculatePrice").bind("click", function(e){
            e.preventDefault();
            
            var a = "active";
            var t = $(this).addClass(a);
            var id =  $('#calculatePrice').modal({show:true, keyboard: false, backdrop: 'static'}); 
            
            var item = id.find(".images .item").removeClass(a).eq(t.data("index")).addClass(a);             
            var source = item.find("img").first().attr("src");
            source = source.substring(source.lastIndexOf("/")+1);
            id.find(".large").attr("src", "uploads/"+source);                        
        });
        
        $(".btn-close").bind("click", function(){            
            $($(this).data("target")).modal('hide');    
            $(".btn").removeClass("active");
        });
        
        $(".checkboxes .base label").bind("click", function(e){
            e.preventDefault();
            
            var t = $(this);
            var a = "active";
            var obj = t.find("input");
            if (obj.attr("data-checked") != undefined)
                {
                    t.removeClass(a);                    
                    obj.removeAttr("data-checked");
                } 
            else
                {
                    t.addClass(a);
                    obj.attr("data-checked","");
                }
        });
    };
    this.ScrollToElement = function (id, speed) {
        
        var offset = $(id).offset().top - 96;        
        if (Browser.isIPhone() || Browser.isAndroid()){
            offset = offset - 38;
        }
        $('body,html').animate({ scrollTop: offset }, speed);        
    };
};

var Browser = new function () {
    var data = {
        $b: null,
        is: {
            mobile: false,
            Andorid: false,
            iPod: false
        }
    }
    this.getData = function()
    {
        return data;
    };
    this.Init = function () {
        var t = this;
        data.$b = $("body");
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0) { data.$b.addClass("iPad"); data.is.mobile = true; }
        else if (ua.indexOf("android") > 0) { data.$b.addClass("Android"); data.is.mobile = true; data.is.Andorid = true; }
        else if (ua.indexOf("ipod") > 0) { data.$b.addClass("iPod"); data.is.mobile = true; data.is.iPod = true; }
        else if (ua.indexOf("iphone") > 0)  data.$b.addClass("iPhone");
        
        if (ua.indexOf('firefox') > 0) { data.$b.addClass("Firefox"); }
        if (data.is.mobile) t.Orientation();

        if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) { data.$b.addClass("Safari"); }
        if (ua.indexOf('MSIE 8.') > 0) { data.$b.addClass("ie8"); }
        if (ua.indexOf('MSIE 9.') > 0) { data.$b.addClass("ie9"); }
        if (ua.indexOf(' OPR/') > 0) { data.$b.addClass("Opera"); }

        //IE10 -- IE 11
        if (ua.indexOf('MSIE 10.') > 0) { data.$b.addClass("ie10"); }
        else if ((ua.indexOf('Trident') > 0) && (navigator.userAgent.indexOf('rv:11.') > 0)) data.$b.addClass("ie11"); //IE11     
    };
    this.isIpad = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("ipad") > 0)  data.$b.addClass("iPad");
        return (data.$b.hasClass("iPad"));
    };
    this.isIPhone = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("iphone") > 0)  data.$b.addClass("iPhone");
        return (data.$b.hasClass("iPhone"));
    };
    this.isAndroid = function () {
        return (data.$b.hasClass("Android"));
    };

    this.Orientation = function () {
        var or = ["orX", "orY"];
        var c = [data.$b.innerHeight(), data.$b.innerWidth()]
        if (c[0] > c[1]) {
            data.$b.removeClass(or[0]);
            data.$b.addClass(or[1]);
        } else {
            data.$b.removeClass(or[1]);
            data.$b.addClass(or[0]);
        }

    };
    this.ViewPort = function (def) {
        var v = document.querySelector("meta[name=viewport]");
        if (def == null) {
            if (data.is.Andorid) {
                v.setAttribute('content', 'width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
            else
                if (data.is.iPod) {
                    v.setAttribute('content', 'width=900, user-scalable=1');
                }
        }
        else v.setAttribute('content', def);
    }
}
