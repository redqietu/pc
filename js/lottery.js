var positive = $('.game-area .positive-side');
var reverse = $('.game-area .reverse-side');
var aLi = $('.game-area .item');
var i = aList = 0;
var li_len = aLi.length;
var zIndex = li_len-1;
var timer = null;
var oSwitch = true;
var oPlace = [];
var num = 3;
var user={
    init:function(){
        this.bindDOMEvent();
    },
    bindDOMEvent:function(){
        var that=this;
        $('.start-game').bind('click',function(){
            if(num > 0 && num < 4){
                that.clickBack($(this));
                $(".game-area .row").each(function(){
                    var item = $(this).find('div.item');
                    //var c = $(this).attr('class');
                    //p.css("background-color",c);
                    item.each(function(){
                        var that = $(this).find('div.reverse-side');
                        console.log(that);
                        that.click(function(){
                            if(num > 0 && num < 4){
                                $('.reverse-side').unbind('click');
                            }
                            //$.getJSON("data.php",function(json){
                            //    var prize = json.yes; //抽中的奖项
                            that.flip({
                                direction:'rl', //翻动的方向rl：right to left
                                //content: '<span><img src="images/icon/lottery/J_'+ num +'.png" alt=""></span>', //翻转后显示的内容即奖品
                                color: '#fff',  //背景色
                                onEnd: function(){ //翻转结束
                                    that.prev().show().html('<span><img src="images/icon/lottery/J_'+ num +'.png" alt=""></span>');
                                    if(num > 0 && num < 4){
                                        $('.reverse-side').unbind('click').css("cursor","default");
                                        $('.shade-box').show();
                                        $('.apply-form').show();
                                    }
                                    num--;
                                }
                            });
                            //});
                        });
                    });
                });

            }
        })
     
    },
    clickBack:function(_this){
        //positive.css({'display':'none','transform':'translate(0px, 0px)'});
        positive.css({'display':'none','transform':'translate(0px, 0px)'}).html('');
        reverse.css({'display':'block','transform':'translate(0px, 0px)'});
        var iNow = diNow = li_len-1;
        timer = setInterval(function(){
            if(oSwitch){
                $('.game-area .items').css({'left':'192px','top':'132px'});
                $('.reverse-side').css('cursor','pointer');
                startMove(aLi[iNow],{top:132,left:192});
                iNow--;
                if(iNow<0)oSwitch=false,cli=0,_this.index == 0 ? (aList = 0) : (aList = 10);
                console.log(iNow);
            }else{
                setTimeout(function(){
                    $('.game-area .items').css({'left':'192px','top':'132px'});
                    iNow++;
                    if(diNow>=0)startMove(aLi[diNow],{opacity:100,top:oPlace[diNow].top,left:oPlace[diNow].left});
                    diNow--;
                    if(iNow==li_len-1){
                        oSwitch=true;
                        clearInterval(timer);
                    }
                },1100);
            }
        },100);    
        function startMove(obj, json, fnEnd){
            if(obj.timer)clearInterval(obj.timer);
            obj.timer = setInterval(function (){
                doMove(obj, json, fnEnd);
            }, 30);
        } ;
        function getStyle(obj, attr){
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
        };
        function doMove(obj, json, fnEnd){
            var iCur = 0;
            var attr = '';
            var bStop = true;
            for(attr in json){
                attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, 'opacity'))*100) : iCur = parseInt(getStyle(obj, attr));
                if(isNaN(iCur))iCur = 0;
                if(navigator.userAgent.indexOf("Firefox") > 0){
                    var iSpeed = (json[attr]-iCur) / 6;
                }else{
                    var iSpeed = (json[attr]-iCur) / 4;
                }
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(parseInt(json[attr])!=iCur)bStop = false;
                if(attr=='opacity'){
                    obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
                    obj.style.opacity = (iCur + iSpeed) / 100;
                }else{
                    attr == 'zIndex' ? obj.style[attr] = iCur + iSpeed : obj.style[attr] = iCur + iSpeed +'px';
                }
            };
            if(bStop){
                clearInterval(obj.timer);
                obj.timer = null;       
                if(fnEnd)fnEnd();
            };
        };
        for(i=0;i<li_len;i++){
            aLi[i].style.top = aLi[i].offsetTop+'px';
            aLi[i].style.left = aLi[i].offsetLeft+'px';
            aLi[i].style.zIndex = zIndex;
        };
        for(i=0;i<li_len;i++){
            aLi[i].style.margin = '0';
            aLi[i].style.position = 'absolute';
            aLi[i].index = i;
            oPlace.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
        }
    }
}

$(function(){
    user.init();

})