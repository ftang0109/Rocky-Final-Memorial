// function to run when there is mouse cursor over the logo icon, enlarge it (by adding inline CSS) and shake it afterward.

$(".navbar-header-logo").on("mouseover",function(){

    //console.log($(".navbar-header-logo").attr("src"));
    //$(".navbar-header-logo").addClass("enlargelogo");
    //$(".navbar-header-logo").effect("shake",10,2);
    //setTimeout(function(){$(".navbar-header-logo").effect("shake",10,2);},500);
    //$(".navbar-header-logo").effect("shake",10,1);
    //setTimeout(function(){$(".navbar-header-logo").effect("shake",10,1);},5000);
    //setTimeout(function(){$(".navbar-header-logo").addClass("enlargelogo");},100);

    $(".navbar-header-logo").animate({
        height:100,
        width:100,
        margin:0
      }, 500, function() {
        // Animation complete.
       $(".navbar-header-logo").effect("shake",10,1);
      });
    
});

// function to run when there is mouse cursor has left the logo icon, remove all inline css
$(".navbar-header-logo").on("mouseleave",function(){

    $(".navbar-header-logo").attr("style","");

});





//Carousel Pop up modal section.

/*When windows is resized, the carousel modal position need to be updated*/

$(window).on('resize', function(){
  console.log("current x position: "+ $(".carousel-inner").offset().left);
  console.log("current y position: "+ $(".carousel-inner").offset().top);

  if($("#carouselphotomodal").css('display') != 'none'){

    $("#carouselphotomodal").css({
      top: $(".carousel-inner").offset().top-10,
      left:$(".carousel-inner").offset().left-10
    });
 
  }
});


/*initial placement of carousel modal when user on the active picture*/

$(".carousel-inner img").on("click", function() {
  

 //retrieve the active click image url first
 var activeimage=$(".carousel-item.active img").attr("src");
 
 //change the background image of model to active image.
 $("#carouselphotomodal").css({"background-image": "url("+ activeimage + ")"});  

  $("#carouselphotomodal").css({
      top: $(".carousel-inner").offset().top-10,
      left:$(".carousel-inner").offset().left-10
  });
  
  $("#carouselphotomodal").css("display","block");
  
});

/* click on the carousel model would close it*/

$("#carouselphotomodal").on('click', function() {
  $("#carouselphotomodal").css("display","");
});

