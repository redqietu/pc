$(function(){
	//城市菜单
	function hoverEvent( ele,width ){
		if(!$(ele).find('a').hasClass('cur')){
			$(ele).find('i').stop().animate({
				'width': width + 'px'
			});
		}
	}
	$('.city-menu li').each(function(){
		$(this).hover(function(){
			hoverEvent($(this), 98 )
		},function(){
			hoverEvent($(this), 0 )
		});
		$(this).click(function(){
			$(this).find('a').addClass('cur').find('span').addClass('animated tada');
			$(this).siblings().find('a').removeClass('cur').find('span').removeClass('animated tada');
			$(this).siblings().find('i').stop().animate({
				'width': '0'
			});
			return false;
		});
	});
	//约惠车热销导航
	$('.brand li').each(function(){
		$(this).click(function(){
			$(this).find('a').addClass('cur');
			$(this).siblings().find('a').removeClass('cur');
			return false;
		});
	});
	//购车意愿
	//$('.submit-btn').on('click',function(){
	//	var name = $('#nameID'),
	//		phone = $('#phoneID'),
	//		city = $('#cityID'),
	//		chexing = $('#chexingID'),
	//		phoneREG = /^1[3|4|5|7|8]\d{9}$/;
	//	if(name.val() == ''){
	//		name.siblings('span').show();
	//		return false;
	//	}else{
	//		name.siblings('span').hide();
	//	}
	//	return false;
	//});

	//验证手机号
	function isPhone(phone){
		var pattern = /^1[3|4|5|7|8]\d{9}$/;
		return pattern.test(phone);
	}
	//验证函数
	function formValidate(){
		var name = $('#nameID'),
			phone = $('#phoneID'),
			city = $('#cityID'),
			chexing = $('#chexingID');
		//判断名称
		if(name.val().length == 0){
			name.siblings('span').show(100);
			return false;
		}else{
			name.siblings('span').hide(100);
		}
		//判断手机号
		if(phone.val().length == 0){
			phone.siblings('span').show(100);
			return false;
		}else{
			if(isPhone(phone.val()) == false){
				phone.siblings('span').show(100);
				return false;
			}else{
				phone.siblings('span').hide(100);
			}
		}
		//判断购车城市
		if(city.val().length == 0){
			city.siblings('span').show(100);
			return false;
		}else{
			city.siblings('span').hide(100);
		}
		//意向车型
		if(chexing.val().length == 0){
			chexing.siblings('span').show(100);
			return false;
		}else{
			chexing.siblings('span').hide(100);
		}
	}

	$('.submit-btn').on('click', function() {
		formValidate();
		return false;
	});
});