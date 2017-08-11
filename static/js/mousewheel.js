var pageCurrent, pageNum;
var _pageDelay = true;
var support = function (prop) {
    var _div = document.createElement('div'),
        _vendors = 'webkit moz ms o'.split(' '),
        _len = _vendors.length;
    var result = function (prop) {
        var _dstyle = _div.style;
        if (prop in _dstyle) return true;
        prop = prop.replace(/^[a-z]/, function (val) {
            return val.toUpperCase();
        });
        while (_len--) {
            if (_vendors[_len] + prop in _dstyle) {
                return true;
            }
        }
        return false;
    };
    return result(prop);
};

var supports = {
    "transition": support("transition")
};
$.fn.trans = function (css) {
    var $obj = $(this);
    if (supports.transition) {
        $obj.css(css);
    } else {
        $obj.stop().animate(css, 500);
    }
};
var movePage = function (delta) {
    if (_pageDelay) {
        if (!(pageCurrent == 0 && delta > 0) && !(pageCurrent == (pageNum - 1) && delta < 0)) {
            pageCurrent -= delta;
            moveToPage(pageCurrent, delta);
        }
    }
};
var moveToPage = function (index, delta) {
    if (_pageDelay) {
        index = parseInt(index);
        pageCurrent = index;
        //实现导航当前选中效果
        if (pageCurrent > -1 && pageCurrent < 6) {
            $("#scene-bar-nav li").removeClass("choose");
            $("#scene-bar-nav li").eq(pageCurrent).addClass("choose");
        }
        //重置所有
        $("#btn-scroll").css("display","block");
        $(".indoor-page").removeClass("animation");
        $("#btn-scroll").removeAttr("animation");
        $(".indoor_page_wrap").trans({"top": (-100 * index) + "%"});
        //添加场景动画
        switch (pageCurrent) {
            case 0:
                //scene1();
                $(".indoor-page").eq(0).addClass("animation");
                $("#btn-scroll").attr("animation","1");
                break;
            case 1:
                $(".indoor-page").eq(1).addClass("animation");
                $(".indoor-page").eq(2).attr("class","scene3 indoor-page");
                $("#btn-scroll").attr("animation","2");
                break;
            case 2:
                //scene3();
                $(".indoor-page").eq(2).addClass("animation");
                $(".indoor-page").eq(3).attr("class","scene4 indoor-page");
                $("#btn-scroll").attr("animation","3");
                break;
            case 3:
                //scene4();
                $(".indoor-page").eq(3).addClass("animation");
                $(".indoor-page").eq(4).attr("class","scene5 indoor-page");
                $("#btn-scroll").attr("animation","4");
                break;
            case 4:
                //scene5();
                $(".indoor-page").eq(4).addClass("animation");
                $(".indoor-page").eq(5).attr("class","scene6 indoor-page");
                $("#btn-scroll").attr("animation","5");
                break;
            case 5:
                //scene6();
                $(".indoor-page").eq(5).addClass("animation");
                $("#btn-scroll").css("display","none");
                $("#scene-bar-nav").css("display","block");
                break;
        };
        _pageDelay = false;
        setTimeout(function () {
            _pageDelay = true;
        }, 1500);
    }
};
var init = function () {
    pageCurrent = 0;
    moveToPage(0,1);  //手动显示场景一
    /*初始化按钮*/
    $("#btn-scroll").click(function () {
        moveToPage(pageCurrent+1);
    });
    pageNum = $(".indoor_page_wrap .indoor-page").size();
    $('.indoor_page_wrap').mousewheel(function (event, delta) {
        event.preventDefault();
        if (delta > 0) {
            delta = 1;
        } else {
            delta = -1;
        }
        movePage(delta);
    });

    $("#scene-bar-nav li").click(function () {
        moveToPage($(this).index());
    });

    //绑定键盘keypress事件，keyCode == 38(down arrow) keyCode == 40(up arrow)
    $(document).keydown(function (event) {
        if (event.keyCode == 38) {
            delta = 1;
            movePage(delta);
        } else if (event.keyCode == 40) {
            delta = -1;
            movePage(delta);
        }
    });

};

$(document).ready(function () {
    var img = new Image();
    img.src = $(".scene1").css("background-image").split("\"")[1];
    img.onload = function(){  //image的onload事件可以判断图片是否加载完成
        $(".loading-wrap").hide();
        init();
    }
});