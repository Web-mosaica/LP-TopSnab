var app = new function(){
    this.initSlider = function (list, element, attributes){
     var name ={
                active:"active"
            };
            var newElement = angular.element('<div></div>').attr("id",element.data("id")).attr("data-ride","carousel").addClass(element.data("id")+" carousel reviews slide");            
            var ol = angular.element('<ol></ol>').addClass("carousel-indicators");
            if (!element.data("show-ol")){ ol.hide();}            
            var group = {
                count:null,
                show: element.data("show")
            };
            
            var result = list.length % group.show;
            if (result==0)
                {
                    group.count = list.length / group.show;
                } else 
                    {
                        group.count = Math.floor(list.length / group.show);
                        group.count++;
                    }
            for(var i = 0; i<group.count; i++)
                {
                    var item =  angular.element('<li></li>').attr("data-target","#"+element.data("id")).attr("data-slide-to",i);
                    ol.append(item);                    
                }
            var divBase = angular.element('<div></div>').addClass("carousel-inner").attr("role","listbox");            
            //var divItem = angular.element('<div></div>');           
            var currentGroup = 0;
            var listImages = angular.element('<div></div>');            
            list.forEach(function(row){                
                var a = angular.element('<a></a>').attr("href","uploads/"+row.image).attr("title",row.description).attr("rel","group");                
                var image = angular.element('<img />').attr("src","uploads/"+row.image).attr("alt",row.description);
                var p = angular.element('<p></p>').addClass("description").html(row.description);
                var space = angular.element('<div></div>').addClass("space");
                var div = angular.element('<div></div>').addClass("col").append(angular.element('<div></div>'));
                a.append(image).append(space);
                div.find("div").addClass("base").append(a).append(p);
                
                currentGroup++;
                if (currentGroup == group.show)
                    {
                        listImages.addClass("group clearfix");
                        listImages.append(div);
                        
                        //continue next to group
                        currentGroup = 0;
                        var baseDiv = angular.element('<div></div>');   
                        baseDiv.addClass("item");
                        baseDiv.append(listImages);
                        divBase.append(baseDiv);
                        
                        listImages = angular.element('<div></div>');
                    }
                else {
                    listImages.append(div);
                }
            });
                        
            var btnLeft =  angular.element('<div></div>').addClass("left carousel-control").attr("data-slide","prev").attr("href","index.html#"+element.data("id"));
            btnLeft.append(angular.element('<div></div>').addClass("icon-prev"));
            
            var btnRight =  angular.element('<div></div>').addClass("right carousel-control").attr("data-slide","next").attr("href","index.html#"+element.data("id"));
            btnRight.append(angular.element('<div></div>').addClass("icon-next"));
            
            //divBase.append(btnLeft).append(btnRight);
            newElement.append(ol).append(divBase).append(btnLeft).append(btnRight);                   
            element.append(newElement);
            
            
            element.find(".item").first().addClass(name.active);
            element.find("ol li").first().addClass(name.active);
            
            //$compile(newElement)(scope);
            
            //element.find("input[type='text']").attr('placeholder','Search');
}
};