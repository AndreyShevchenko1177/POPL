// $(document).ready(function(){

// $('.toggle').click(function(){
// 	$('.menu').toggleClass('slide_menu')
// });

// });

$(document).ready(function(){

  $(".toggle").click(function(){
    $(".menu").toggleClass("slide_menu");
  });

  $("#close_bnt").click(function(){
    $(".menu").hide("slow", function(){
    });
  });

});
