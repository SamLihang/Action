
$(document).on('scroll',function(){
if($(this).scrollTop()>700){
$('.totop').show()
}else{
$('.totop').hide()
}
})
$('.totop').hover(function(){
	$(this).css('background','url(img/totop.gif) no-repeat')
},function(){
	$(this).css('background','url(img/totop.png) no-repeat')
})
$('.totop').on('click',function(){
 $('body').animate({scrollTop:0},700)
})
$('.lbk_top img').hover(function(){
    $(this).css('transform','scale(1.02)')
},function(){
  $(this).css('transform','scale(1)')
})
$('.lbk_left img').hover(function(){
    $(this).css('transform','scale(1.02)')
},function(){
  $(this).css('transform','scale(1)')
})
$('.lbk_right img').hover(function(){
    $(this).css('transform','scale(1.02)')
},function(){
  $(this).css('transform','scale(1)')
})