
$(document).on('scroll',function(){
if($(this).scrollTop()>700){
$('.totop').show()
}else{
$('.totop').hide()
}
})
$('.totop').on('click',function(){
 $('body').animate({scrollTop:0},700)
})
$('.totop').hover(function(){
	$(this).css('background','url(img/totop.gif) no-repeat')
},function(){
	$(this).css('background','url(img/totop.png) no-repeat')
})