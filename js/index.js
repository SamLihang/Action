$(window).on('load',function(){
	getSize();
	$('.row').eq(0).addClass('active');
})
var animate=null;var tim=null;
$(document.body).css({           //隐藏滚动条
	'overflow-x':'hidden',
	'overflow-y':'hidden'
})
var h=window.innerHeight;
var w=window.innerWidth;
function getSize(){
	h=window.innerHeight;
	w=window.innerWidth;
}
$(window).on('resize',function(){			//在屏幕大小变化时改变宽高
	if(tim){clearTimeout(tim)};
	tim=setTimeout(function(){
		getSize();
	},500)
})
document.addEventListener('mousewheel',function(e){          //检测鼠标滑动事件
	$row=$('.row');
	if(animate){
		window.onmousewheel=document.onmousewheel=function(){return false};
	}else{
		setTimeout(function(){animate=null},1500)
			if(e.wheelDelta>0){
				animate=1;
				$('body').not(':animated').animate({scrollTop:pageYOffset-h},700,'easeInOutCubic');
				$n=parseInt(Math.ceil(pageYOffset+10)/h);
				$row.eq($n).removeClass('active');
				$row.eq($n-1).addClass('active');
				if($n==5){pos=[];setTimeout(function(){
					clearInterval(tim)
				},100) };
			}else{
				animate=1;
				$n=parseInt(Math.ceil(pageYOffset+10)/h);
				$('body').not(':animated').animate({scrollTop:pageYOffset+h},700,'easeInOutCubic');
				$row.eq($n).removeClass('active');
				$row.eq($n+1).addClass('active');
				if($n==4){drawImg();into()};
			}				
	}
})
$('.row1 .bc').on('mousemove',function(e){        //大图的鼠标滑动效果
	var lef=e.offsetX;
	var trans=(lef/w)*2-1;
	var rota=~~(20*trans),translate=~~(150*trans);
	$('.row1 .bc').css({transform:'rotateY('+rota+'deg) translateX('+translate+'px)',transitionDuration:'1s'});
	$('.row1 h3').css('margin-left',-147+parseInt(trans*100));
	$('.row1 p').css('margin-left',parseInt(trans*100));
	$('.row1 .btn').css('margin-left',-70+parseInt(trans*100))
})
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
 	$('body').animate({scrollTop:0},700);
 	$('.row').removeClass('active');
 	$('.row1').addClass('active');
 	clearInterval(tim);pos=[];
})
//canvas
var c=document.getElementById('canvas').getContext('2d');
var Cw=canvas.width=window.innerWidth;
var Ch=canvas.height=window.innerHeight*.4;
var focallenth=250;
var pos=[];var Re,Gr,Bl,a;
function point(x,y,r,R,G,B,a){
this.x=x;
this.y=y;
this.r=r;
this.nx=null;
this.ny=null;
this.time=0;
this.speed=50+parseInt(Math.random()*30);
this.dx=~~(Cw*Math.random());
this.dy=~~(Ch*Math.random());
this.color='rgba('+R+','+G+','+B+','+a+')';
this.draw=function(){
	this.nx=easeInOutExpo(this.time,this.dx,this.x-this.dx,this.speed);
	this.ny=easeInOutExpo(this.time,this.dy,this.y-this.dy,this.speed);
	c.save();
	c.beginPath();
	c.fillStyle=this.color;
	c.rect(this.nx,this.ny,this.r,r);
	c.fill()
	this.time++;
	}
}
function drawImg(){
	var img=new Image();
	img.src='img/wenzi.png';
	img.onload=function(){
		c.drawImage(img,0,0,800,100);
		getPos();
		};
	};
	function getPos(){
		var imgDate=c.getImageData(0,0,800,100);
		for(var i=0;i<imgDate.width;i+=4){
			for(var j=0;j<imgDate.height;j+=4){
					Re=imgDate.data[((j-1)*imgDate.width+i-1)*4];
					Gr=imgDate.data[((j-1)*imgDate.width+i-1)*4+1];
					Bl=imgDate.data[((j-1)*imgDate.width+i-1)*4+2];
					a=imgDate.data[((j-1)*imgDate.width+i-1)*4+3];	
					if(a>=100){
						pos.push(new point(i+Cw*.5-400,j+Ch*.5*.4+50,4,Re,Gr,Bl,a));
					}
				}
			}				
		}
	function easeInOutExpo(t,b,c,d){
				t/=d*.5;
				if(t<1) return c/2*Math.pow(2,10*(t-1))+b;
				t--;
				return c/2*(-Math.pow(2,-10*t)+2)+b;
			}
	function into(){
		tim=setInterval(function(){
			c.clearRect(0,0,Cw,Ch);
			c.fillStyle='rgb(38,38,38)';
			c.fillRect(0,0,canvas.width,canvas.height);
				for(var i=0;i<pos.length;i++){
					pos[i].draw();
				}
			},60)
		};into()