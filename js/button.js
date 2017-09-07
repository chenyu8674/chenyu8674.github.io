var Button = new Object();

Button.button = null;
Button.width = 120;
Button.height = 120;
Button.contentPadding = 5;
Button.top = -1;
Button.left = -1;
Button.click = null;

Button.create = function(text, click) {
    Button.remove();
    Button.button = $("<div/>").appendTo(CONTENT);
    Button.button.css("position", "fixed");
    Button.button.css("width", Button.width + "px");
    Button.button.css("height", Button.height + "px");
    Button.button.css("line-height", Button.height + "px");
    Button.button.css("font-size", Button.width * 0.3 + "px");
    Button.button.css("text-align", "center");
    Button.button.css("color", "#000");
    Button.button.css("background", "url(img/button.png)");
    Button.button.css("background-size", Button.width + "px " + Button.height + "px");
    Button.button.css("z-index", "2");
    Button.button.css("top", Button.top);
    Button.button.css("left", Button.left);
    if(Button.top == -1 && Button.top == -1) {
        Button.position(180, CONTENT_WIDTH - 160);
    }
    Button.button.text(text);
    Button.click = function() {
        if (!Result.isShow && !Info.isShow) {
            click();
        }
    }
    Button.binddragevent();
    return Button.button;
}

Button.doclick = function() {
    if (!Result.isShow && !Info.isShow) {
        Button.click();
    }
}

Button.show = function() {
    if (Button.button != null) {
        Button.button.css("display", "block");
    }
}

Button.hide = function() {
    if (Button.button != null) {
        Button.button.css("display", "none");
    }
}

Button.refresh = function(text, click) {
    Button.button.text(text);
    Button.button.unbind("click");
    Button.click = click;
}

Button.position = function(top, left) {
    Button.top = top;
    Button.left = left;
    Button.button.css("top", top);
    Button.button.css("left", left);
}

Button.remove = function() {
    if (Button.button != null) {
        Button.unbinddragevent();
        Button.button.remove();
        Button.button = null;
    }
}

Button.dragLoop = 2;// 位移事件响应间隔
Button.dragCount = 0;// 位移事件响应计数

Button.unbinddragevent = function() {
    Button.button.off("mousedown");
    Button.button.off("mouseup");
    CONTENT.off("mousemove");
    Button.button.off("touchstart");
    Button.button.off("touchend");
    Button.button.off("touchmove");
}

Button.binddragevent = function() {
    Button.unbinddragevent();
    var drag = function drag() {
        this.init.apply(this, arguments);
    };
    drag.prototype = {
        constructor: drag,
        down: false,// 指针是否按下
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,

        init: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            var t = this;
            if (Interface.isWeb()) {
                Button.button.on("mousedown", Button.button,function(e) {;t.movestart(e);});
                Button.button.on("mouseup", Button.button,function(e) {t.moveend(e);});
                CONTENT.on("mousemove", Button.button,function(e) {t.moving(e);});
            } else {
                Button.button.get(0).addEventListener("touchstart",function(e) {t.movestart(e);});
                Button.button.get(0).addEventListener("touchend",function(e) {t.moveend(e);});
                Button.button.get(0).addEventListener("touchmove",function(e) {t.moving(e);});
            }
        },
        movestart: function(e) {
            e && e.preventDefault();
            if (!this.down) {
                this.down = true;
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                this.startX = clientx;
                this.startY = clienty;
                this.startLeft = Button.left;
                this.startTop = Button.top;
            }
        },
        moveend: function(e) {
            e && e.preventDefault();
            if (this.down) {
                this.down = false;
                if (Button.top - this.startTop == 0 && Button.left - this.startLeft == 0) {
                    Button.doclick();
                } else {
                    Button.draglock();
                }
            }
        },
        moving: function(e) {
            e && e.preventDefault();
            if (this.down) {
                if (Button.dragCount != Button.dragLoop) {
                    Button.dragCount++;
                    return;
                } else {
                    Button.dragCount = 0;
                }
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                var top=(clienty - this.startY) / SCREEN_ZOOM;
                var left=(clientx - this.startX) / SCREEN_ZOOM;
                top += this.startTop;
                left += this.startLeft;
                var titleHeight = $("#title").height();
                if($("#timebg").css("display") != "none") {
                    titleHeight += $("#timebg").height()
                }
                if(top < titleHeight + Button.contentPadding) {
                    top = titleHeight + Button.contentPadding;
                } else if (top > WINDOW_HEIGHT / SCREEN_ZOOM - Button.height - Button.contentPadding) {
                    top = WINDOW_HEIGHT / SCREEN_ZOOM - Button.height - Button.contentPadding;
                }
                if(left < Button.contentPadding) {
                    left = Button.contentPadding;
                } else if (left > WINDOW_WIDTH / SCREEN_ZOOM - Button.width - Button.contentPadding) {
                    left = WINDOW_WIDTH / SCREEN_ZOOM - Button.width - Button.contentPadding;
                }
                Button.position(top, left);
            }
        }
    };
    var drag = new drag();
}

Button.isDragLock = false;
Button.dragLockFlag = 0;

Button.draglock = function() {
    Button.isDragLock = true;
    clearTimeout(Button.dragLockFlag);
    Button.dragLockFlag = setTimeout("Button.isDragLock=false", 0);
}