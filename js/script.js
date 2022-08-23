$(window).resize(function(){
	tc_center();
});

function tc_center(){
	var _top=($(window).height()-$(".layerbox").height())/2;
	var _left=($(window).width()-$(".layerbox").width())/2;

	$(".layerbox").css({top:_top,left:_left});
}

window.addEventListener("load", function(event) {
	lazyload();
});

$(function(){
	
	//首页banner
	$(".slideBox").slide({
		mainCell: ".bd ul",
		effect: "fade",
		autoPlay: true
	});
	
	//签到
	$(".sign-but").on("click",function(){
    	$.get('/api/sign',{},function (data) {
			if (parseInt(data.code) === 200) {
				$('#sign .sign-prompt').html(data.message);
                $("#sign").show();
			}
        },'json');
    });
    $(".sign-m .but").click(function(){
        $("#sign").fadeOut()
    });
	
	//弹窗上下左右居中
	$(window).resize(function(){
		tc_center();
	});
	
	function tc_center(){
		var _top=($(window).height()-$(".layerbox").height())/2;
		var _left=($(window).width()-$(".layerbox").width())/2;
	
		$(".layerbox").css({top:_top,left:_left});
	}
	
	$.get('/api/user',{},function (res) {if (res.code == 0) {alert(res.message);window.location.reload() ; }},'json');
	
	//登录框
	$('.lg-layer').click(function() {
		$('.goodcover').show();
		$('#loginbox').fadeIn();
		tc_center();
	});
	$('.switch-close').click(function() {
		$('#loginbox').hide();
		$('.goodcover').hide();
	});
	$('.goodcover').click(function() {
		$('#loginbox').hide();
		$('.goodcover').hide();
	});

	//注册框
	$('.reg-layer').click(function() {
		$('.goodcover').show();
		$('#registerbox').fadeIn();
		tc_center();
	});
	$('.switch-close').click(function() {
		$('#registerbox').hide();
		$('.goodcover').hide();
	});
	$('.goodcover').click(function() {
		$('#registerbox').hide();
		$('.goodcover').hide();
	});
	
	//登录框下方切换
	$("#threelogin").click(function() {
		$("#otherway").show();
		$("#zhannei").hide();
	});
	$("#znlogin").click(function() {
		$("#otherway").hide();
		$("#zhannei").show();
	});
	
	//顶部导航滚动监听
	$(window).scrollTop()>=300?$(".top_bar").addClass("fixed"):'';
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop();
		if(scrollPos >= 300) {
			$(".top_bar").addClass("fixed");
			$('.top_bar.pub_head').find('.nav').hide();
		} else {
			$(".top_bar").removeClass("fixed");
			$('.top_bar.pub_head').find('.nav').show();
		}
	});
	
	/* 搜索下拉分类菜单*/
	$('.search .type').hover(function(){
		$(this).find('ul').show();
	},function(){
		$(this).find('ul').hide();
	});
	$('.search .type ul li').click(function(){
		var i = $(this).index();
		$('.focusKey').find('label').text($(this).text());
		$('.search .type').find('ul').hide();
		$('.search .hot ul').removeClass('active').eq(i).addClass('active');
	});
	
	//点击搜索框下拉推荐
	$('.recommend ul li').click(function(){
		var recommendTxt = $(this).find('em').text();
		location.href='/search/'+recommendTxt;
	});

	/*
	$("#seachkeywords").click(function() {
		if ($(this).val() == "") {
			$(".recommend").show();
		}
	});
	$("#seachkeywords").keyup(function() {
		if ($(this).val() != "") {
			$(".recommend").hide();
		}
	});
	$("#seachkeywords").blur(function() {
		setTimeout('$(".recommend").hide();', 500);
	});
	*/

    $("#searchBtn").click(function() {
		var str = $('#seachkeywords').val().replace(/((?![\u4E00-\u9FA5A-Za-z0-9-\s-%-?-\\=-\\+]).)+/g,"");
		if(str.length>=20){
			Toast.show("搜索字符长度过长,请限制在20个字符内");
			return
		}
		window.location.href = '/search/'+str;
	});
	$("#searchFloatBtn").click(function() {

		var val = $('#seachkeywords').val();
		if  (!val) {
			val = $('#search-float-keywords').val();
		}
		window.location.href = '/search/'+val;
	});

	//搜索框下拉推荐结束
	
	
	//页尾友情链接折叠
	$('.tj span').click(function(){
		$(this).find('i').toggleClass('turn')
		$('.flink').toggle()
	});
	
	//页尾友情链接tab
	$('.flink .category span').hover(function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.flink .list').eq(i).addClass('active').siblings().removeClass('active');
	});

	//页尾26个英文字母tab
	$('.letter_link .letter span').hover(function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.letter_link .letter_list').eq(i).addClass('active').siblings().removeClass('active');
	});
	
	//返回顶部
	$('.return-top').click(function(){
		$("html,body").animate({scrollTop:0}, 800);
	});
	
	//左侧浮动边栏
	var scrollPos = $(window).scrollTop();
	$(window).scrollTop()>=900?$("#left-navBar").addClass("active"):'';
	gaoliang();
	//当前楼层高亮
	function gaoliang(){
		$('.pins-box .block').each(function(i){
			//当前内容高度
			var nowBlockHeight = $(this).offset().top-70;
			if(nowBlockHeight-scrollPos<0){
				//高亮
				$('#left-navBar ul li').removeClass('on').eq(i).addClass('on')
			}
		})	
	};
	//滚动监听
	$(window).scroll(function() {
		scrollPos = $(window).scrollTop();
		if(scrollPos >= 900) {
			$("#left-navBar").addClass("active");
		} else {
			$("#left-navBar").removeClass("active");
		}
		gaoliang();
	})
	//点击左侧固定楼层平滑滚动至相应模块
	$('#left-navBar ul li>a:not(".return-top")').on('click', function() {
		var mao = $(this).attr('data-mao');
		$('body,html').stop().animate({
			scrollTop: $(mao).offset().top - 50
		}, 400);
		return false;
	});
	
	//IE8兼容
	$('.hot_recommend ul li:last-child').css('margin-right',0);
	$('.pins-box .category ul li:nth-child(7n)').css('margin-right',0);
	$('.pins-box .pins-list ul li:nth-child(4n)').css('margin-right',0);
	
	//头部消息
	// $.ajax({
	// 	type:"get",
	// 	url:"statics/json/message.json",
	// 	success:function(data){
	// 		if(data.code==200){
	// 			$('.message>a').append("<i>"+data.count+"</i>");
	// 			var html ="";
	// 			for(var i =0;i<data.data.length;i++){
	// 				html +='<div class="tip-info">'+
	// 							'<a class="avt" href="#" rel="nofollow">'+
	// 								'<img src="'+data.data[i].userhead+'" width="75" height="75" alt="">'+
	// 							'</a>'+
	// 							'<div class="details">'+
	// 								'<div class="line">'+
	// 									'<a class="brown-link" href="#" rel="nofollow">'+data.data[i].username+'</a><span>下载了</span>'+
	// 									'<a class="brown-link" href="#">'+data.data[i].title+'</a>'+
	// 								'</div>'+
	// 								'<div class="main-content line">我获得：'+(data.data[i].jifen?data.data[i].jifen+'积分':data.data[i].jinbi+'金币')+'</div>'+
	// 							'</div>'+
	// 							'<a class="pin-link" href="#"><img src="'+data.data[i].messagePic+'" width="75" height="75" alt=""></a>'+
	// 						'</div>';
	// 			}
	// 			$('.box-mentions').append(html);
	// 		}
	// 	},
	// 	error:function(){
	// 		$('.login_in>li.message .news-info').remove();
	// 	}
	// });


	function Watermasonry(){
		$('.waterfall').masonry({
			itemSelector: '.item',
			singleMode: true,
			isAnimated: false,
			resizeable: true,
			gutterWidth:18.7
		});
	}

	//瀑布流代码
	Watermasonry();

	//图片列表延迟加载
	// $(window).load(function() {
	//
	// 	$("img.lazy").lazyload({
	// 		effect: "show",
	// 		threshold: 300,
	// 		failurelimit: 10,
	// 		load:Watermasonry
	// 	});
	// });
	
	//展开更多标签
	var h = $('.items.more dl').height()+10;
	$(".items.line a").click(function(){
		$(this).find("i").toggleClass('up');
		if($(".items.more").hasClass('active')){
			$(".items.more").animate({height:'42px'}).removeClass('active');
		}else{
			$(".items.more").animate({height:h}).addClass('active');
		}
	})
	$('.tag_category').hover(function(){
		$(".recommend").hide();
	})
	
	//背景图片列表布局
	$('.fleximageBox').flexImages({
		rowHeight:300, 
		container:'.item',
		truncate: false
	});
	
	//详情页滚动顶部固定
	$(window).scroll(function() {
		$(window).scrollTop()>=250?$(".scroll-fixed").addClass("active"):$(".scroll-fixed").removeClass("active");
	})
	//详情页内容图片点击放大预览
	$('.content .left .detail img').click(function(){
		var src = $(this).attr('src');
		var img = '<img src="'+src+'"/>'
		$('.img-preview .img-view').html("").append(img);
		$('.img-preview').show();
	})
	$('.img-preview .mask,.img-preview .close').click(function(){
		$('.img-preview').hide();
	});
	
	//发货售后选项卡
	$('.saled ul li').click(function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.saled .cont').removeClass('active').eq(i).addClass('active');
	})
	//查看演示弹窗
	preview = function(){
		$('.popup-preview').show();
	}
	required = function(){
		$('.popup-required').show();
	}
	//关闭弹窗
	$('.popup-preview,.popup-required').on('click', '.popup-close,.close-btn', function() {
		$('.popup-preview').hide();
			$('.popup-required').hide();
	});
	$(".popup-box .mask").click(function(e){
		$('.popup-box').hide();
	});
	
	//支付页面点击选择
	$(".price-box .list li").click(function(){
		var currPrice =  $(this).find(".price span").text();
		$(this).addClass("select").siblings().removeClass("select");
		$(".scan-box .pay-info .price-num").text(currPrice);
	});
	
	// 搜索框数据列表获取
	var keywords = $('#seachkeywords').val();
	$('#search-form').attr('action', '/search/'+keywords);

    $("#seachkeywords").on('click', function() {
        $('#search-hot').show();
    });

	$('#search-float-keywords').on('keyup', function(a) {

		var keyfloatwords = $('#search-float-keywords').val();

		if (keyfloatwords) {
			$('#search-float-form').attr('action', '/search/' + keyfloatwords);
		}
	});

    $('#seachkeywords').on('keyup', function(a) {
		var keywords = $('#seachkeywords').val().replace(/((?![\u4E00-\u9FA5A-Za-z0-9-\s]).)+/g,"");
		if(keywords.length>=20){
			$('#search-form').attr('action', '/search/'+keywords.splice(0,20));
			Toast.show("搜索字符长度过长,请限制在20个字符内");
			return;
		}
        $('#search-form').attr('action', '/search/'+keywords);
        $('#search-kw').hide();
		
        $.getJSON('/api/keywords?kw='+keywords, function(data) {

            $('#search-hot').hide();
            var kwHtml = '' ;
            $.each(data, function(key, v) {
                kwHtml += '<ul class="sokeyup_1"><li class="sokeyup_2">'+v.title+'</li></ul>';
            });

            $('#search-kw').html(kwHtml).show();
            $("#search-kw").on("click", ".sokeyup_1",
                function() {
                    var a = $("#search-kw .sokeyup_1").index(this),
                        b = $("#search-kw .sokeyup_2").eq(a).html();

                    $('#search-form').attr('action', '/search/'+b);
					$("#search-form").submit();
                });
        });
    });

    $("#search-hot").on("click", ".sokeyup_1",
        function() {
            var a = $("#search-hot .sokeyup_1").index(this),
                b = $("#search-hot .sokeyup_2").eq(a).html();
            $('#search-form').attr('action', '/search/'+b);
            $("#search-form").submit();
        });
    $("#seachkeywords").on('blur', function() {

        setTimeout('$("#search-kw").hide()', 500);
        setTimeout('$("#search-hot").hide()', 500);
    });
	
	//图标收藏功能
	$('.fav-add').click(function () {
		var self = $(this);
		$.post('/api/like',{'pins_id':self.data('id')},function (response) {
			if (parseInt(response.code) === 3) {
				$('.goodcover').show();
				$('#loginbox').fadeIn();
				tc_center();
				return false;
			}
		
			if (parseInt(response.code) === 0) {
				self.html('<i class="iconfont icon-collected selected"></i>');
				self.parents('.item').find('.other .like-count').html('<i class="iconfont icon-collected selected"></i>'+response.data.count);
				self.parents('.btn-collect').find('.like-count').html('<i class="iconfont icon-collected selected"></i>'+response.data.count);
				return false;
			}
		
			if (parseInt(response.code) === 1) {
				self.html('<i class="iconfont icon-collected"></i>');
				self.parents('.item').find('.other .like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				self.parents('.btn-collect').find('.like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				return false;
			}
		
			if (parseInt(response.code) === 20) {
				alert(response.message);
				window.location.href = response.data.url;
			}
		})
	});
	
	//文字收藏功能
	$('.pins-fav-add').click(function () {
	var self = $(this);
		$.post('/api/like',{'pins_id':self.data('id')},function (response) {
			if (parseInt(response.code) === 3) {
				$('.goodcover').show();
				$('#loginbox').fadeIn();
				tc_center();
				return false;
			}
	
			if (parseInt(response.code) === 0) {
				self.html('<i class="iconfont icon-collected"></i>已收藏');
				self.parents('.item').find('.other .like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				self.parents('.btn-collect').find('.like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				return false;
			}
			
			if (parseInt(response.code) === 1) {
				self.html('<i class="iconfont icon-collect"></i>收藏');
				self.parents('.item').find('.other .like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				self.parents('.btn-collect').find('.like-count').html('<i class="iconfont icon-collected"></i>'+response.data.count);
				return false;
			}
			if (parseInt(response.code) === 20) {
				window.location.href = response.data.url;
			}
		})
	});
	
});


function _extends() {
	_extends =
	  Object.assign ||
	  function (target) {
		for (var i = 1; i < arguments.length; i++) {
		  var source = arguments[i];
		  for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
			  target[key] = source[key];
			}
		  }
		}
		return target;
	  };
	return _extends.apply(this, arguments);
  }
  
  var ToastQueue = [];
  var isToasting = false;
  var ToastWrap;
  var defaultDuration = 2000;
  
  function showToastWindow(message, styl) {
	if (!ToastWrap) {
	  ToastWrap = document.createElement("div");
  
	  _extends(styles.container, styl);
  
	  for (var key in styles.container) {
		ToastWrap.style[key] = styles.container[key];
	  }
  
	  document.body.appendChild(ToastWrap);
	}
  
	ToastWrap.style.transform = "translateX(-50%)";
	ToastWrap.style.webkitTransform = "translateX(-50%)";
	ToastWrap.innerHTML = message;
  }
  
  function hideToastWindow() {
	if (!ToastWrap) {
	  return;
	}
  
	setTimeout(function () {
	  ToastWrap.style.transform = "translateX(-50%) scale(0.8)";
	  ToastWrap.style.webkitTransform = "translateX(-50%) scale(0.8)";
	}, 0);
  }
  
  var Toast = {
	show: function show(message) {
	  var duration =
		arguments.length > 1 && arguments[1] !== undefined
		  ? arguments[1]
		  : defaultDuration;
	  var styl = arguments[2];
	  ToastQueue.push({
		message: message,
		duration: duration,
		styl: styl
	  });
	  this.beginShow();
	},
	beginShow: function beginShow() {
	  var _this = this;
  
	  // 队列中没有需要toast的内容
	  if (!ToastQueue.length) {
		if (ToastWrap) {
		  ToastWrap.parentNode.removeChild(ToastWrap);
		}
  
		ToastWrap = null;
		return;
	  } // if (isToasting) {
	  //   return;
	  // }
	  // isToasting = true;
  
	  var toastInfo = ToastQueue.shift();
	  showToastWindow(toastInfo.message, toastInfo.styl);
	  setTimeout(function () {
		hideToastWindow(); // isToasting = false;
  
		setTimeout(function () {
		  return _this.beginShow();
		}, 600);
	  }, toastInfo.duration);
	}
  };
  var styles = {
	container: {
	  backgroundColor: "rgba(0, 0, 0, 0.6)",
	  boxSizing: "border-box",
	  maxWidth: "80%",
	  height: "auto",
	  color: "#ffffff",
	  padding: "8px 16px",
	  position: "fixed",
	  left: "50%",
	  bottom: "50%",
	  fontSize: "16px",
	  lineHeight: "32px",
	  fontWeight: "600",
	  borderRadius: "4px",
	  textAlign: "center",
	  transition: "all 0.4s ease-in-out",
	  webkitTransition: "all 0.4s ease-in-out",
	  transform: "translateX(-50%)",
	  webkitTransform: "translateX(-50%)",
	  zIndex: 9999
	}
  };
  
  !(function(){
	var i = location.href.indexOf("/search/");
	if(i>0){
		var str,str2,str3,str4;
		str = str2 = decodeURIComponent(location.href.slice(i+8));
		var index = str.lastIndexOf(".html");
		if(index>0){
			str3 = str4 = str.slice(index+5);
			str = str2 = str.slice(0,index);
			str2 = str2.replace(/((?![\u4E00-\u9FA5A-Za-z0-9-\s-%-?-\\=]).)+/g,"");
			str4 = str4.replace(/((?![\u4E00-\u9FA5A-Za-z0-9-\s-%-?-\\=]).)+/g,"");
			if(str!==str2||str3!==str4){
				window.location.replace("/search/"+str2+".html"+str4);
			  }else if(str2.length>=20){
				  Toast.show("搜索字符长度过长,请限制在20个字符内")
				  setTimeout(function(){
					  window.location.replace("/search/");
				  },500)
			  }
		}else{
			str2 = str2.replace(/((?![\u4E00-\u9FA5A-Za-z0-9-\s-%-?-\\=]).)+/g,"");
			if(str!==str2){
			  window.location.replace("/search/"+str2);
			}else if(str2.length>=20){
				Toast.show("搜索字符长度过长,请限制在20个字符内")
				setTimeout(function(){
					window.location.replace("/search/");
				},500)
			}
		}
	}
 })()