var Keyboard = new Object();

Keyboard.keyboard = null;
Keyboard.dragBar = null;

Keyboard.create = function(type, onbuttonclick, hasZero, hasSubmit) {
    if (type == 1) {
        return Keyboard.create1(onbuttonclick, hasZero, hasSubmit);
    } else if (type == 2) {
        return Keyboard.create2(onbuttonclick);
    }
}

Keyboard.create1 = function(onbuttonclick, hasZero, hasSubmit) {
    Keyboard.dragHeight = 50;
    Keyboard.dragMargin = 5;
    Keyboard.padding = 5;
    Keyboard.buttonSize = 70;
    Keyboard.buttonMargin = 3;
    Keyboard.buttonBorder = 1;
    Keyboard.width = (Keyboard.buttonSize + (Keyboard.buttonMargin + Keyboard.buttonBorder) * 2) * 3;
    Keyboard.height = (Keyboard.buttonSize + (Keyboard.buttonMargin + Keyboard.buttonBorder) * 2) * (hasSubmit ? 5 : 4) + Keyboard.dragHeight + Keyboard.dragMargin;
    Keyboard.top = 0;
    Keyboard.left = 0;
    Keyboard.contentPadding = 10;
    Keyboard.mousedown = null;
    Keyboard.top = WINDOW_HEIGHT / SCREEN_ZOOM - (Keyboard.height + Keyboard.padding * 2) - Keyboard.contentPadding;
    Keyboard.left = WINDOW_WIDTH / SCREEN_ZOOM - (Keyboard.width + Keyboard.padding * 2) - Keyboard.contentPadding;

    var buttonBg = "rgb(100,100,100)";
    var buttonColor = "rgb(255,255,255)";

    Keyboard.keyboard = $("<div/>").appendTo(CONTENT);
    Keyboard.keyboard.css("position", "fixed");
    Keyboard.keyboard.css("top", Keyboard.top + "px");
    Keyboard.keyboard.css("left", Keyboard.left + "px");
    Keyboard.keyboard.css("width", Keyboard.width + 3 + "px");
    Keyboard.keyboard.css("height", Keyboard.height + "px");
    Keyboard.keyboard.css("padding", Keyboard.padding + "px");
    Keyboard.keyboard.css("background", "rgba(0,0,0,0.8)");
    Keyboard.keyboard.css("border-radius", "5px");
    Keyboard.keyboard.css("display", "none");

    Keyboard.dragBar = $("<div/>").appendTo(Keyboard.keyboard);
    Keyboard.dragBar.css("width", Keyboard.width + Keyboard.padding * 2 + 3 + "px");
    Keyboard.dragBar.css("height", Keyboard.dragHeight + Keyboard.padding + "px");
    Keyboard.dragBar.css("border-top-left-radius", "5px");
    Keyboard.dragBar.css("border-top-right-radius", "5px");
    Keyboard.dragBar.css("margin", - Keyboard.padding + "px")
    Keyboard.dragBar.css("margin-bottom", Keyboard.dragMargin + "px");
    Keyboard.dragBar.css("background", "#999");
    Keyboard.dragBar.css("color", "#666");
    Keyboard.dragBar.css("line-height", Keyboard.dragHeight + Keyboard.padding + "px");
    Keyboard.dragBar.css("text-align", "center");
    Keyboard.dragBar.css("font-size", Keyboard.dragHeight * 0.6 + "px");
    Keyboard.dragBar.text(Language.get("keyboard_drag_text"));
    Keyboard.dragBar.attr("id", "keyboardDragBar");

    var keyCount = 9;
    if (hasZero) {
        keyCount ++;
    }
    if (hasSubmit) {
        keyCount ++;
    }
    for (var i = 0; i <= keyCount; i++) {
        var button = $("<div/>").appendTo(Keyboard.keyboard);
        button.css("height", Keyboard.buttonSize + "px");
        button.css("border", Keyboard.buttonBorder + "px solid black");
        button.css("background", buttonBg);
        button.css("color", buttonColor);
        button.css("text-align", "center");
        button.css("margin", Keyboard.buttonMargin + "px");
        button.css("border-radius", "10px");
        button.css("float", "left");
        button.attr("button");
        if (i < 9) {
            button.css("width", Keyboard.buttonSize + "px");
            button.css("line-height", Keyboard.buttonSize + "px");
            button.css("font-weight", "900");
            button.css("font-size", Keyboard.buttonSize * 0.8 + "px");
            button.text(i + 1);
        } else if (i == 9) {
            if (hasZero) {
                button.css("width", Keyboard.buttonSize + "px");
                button.css("line-height", Keyboard.buttonSize + "px");
                button.css("font-weight", "900");
                button.css("font-size", Keyboard.buttonSize * 0.8 + "px");
                button.text(0);
            } else {
                button.css("width", Keyboard.getbuttonwidth(3) + "px");
                button.css("line-height", Keyboard.buttonSize - 2 + "px");
                button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
                button.attr("id", "keyboard_button_clear");
                button.text(Language.get("keyboard_clear_text"));
            }
        } else if (i == 10) {
            if (hasZero) {
                alert(Keyboard.getbuttonwidth(2))
                button.css("width", Keyboard.getbuttonwidth(2) + "px");
                button.css("line-height", Keyboard.buttonSize - 2 + "px");
                button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
                button.attr("id", "keyboard_button_clear");
                button.text(Language.get("keyboard_clear_text"));
            } else {
                button.css("width", Keyboard.getbuttonwidth(3) + "px");
                button.css("line-height", Keyboard.buttonSize - 2 + "px");
                button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
                button.attr("id", "keyboard_button_submit");
                button.text(Language.get("keyboard_ok_text"));
            }
        } else {
            button.css("width", Keyboard.getbuttonwidth(3) + "px");
            button.css("line-height", Keyboard.buttonSize - 2 + "px");
            button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
                button.attr("id", "keyboard_button_submit");
            button.text(Language.get("keyboard_ok_text"));
        }
        button.mousedown(onbuttonclick);
    }

    Keyboard.binddragevent();
    return Keyboard.keyboard;
}

Keyboard.create2 = function(onbuttonclick) {
    Keyboard.dragHeight = 50;
    Keyboard.dragMargin = 5;
    Keyboard.padding = 5;
    Keyboard.buttonSize = 100;
    Keyboard.buttonMargin = 3;
    Keyboard.buttonBorder = 1;
    Keyboard.width = (Keyboard.buttonSize + (Keyboard.buttonMargin + Keyboard.buttonBorder) * 2) * 7;
    Keyboard.height = (Keyboard.buttonSize + (Keyboard.buttonMargin + Keyboard.buttonBorder) * 2) * 2 + Keyboard.dragHeight + Keyboard.dragMargin;
    Keyboard.top = 0;
    Keyboard.left = 0;
    Keyboard.contentPadding = 10;
    Keyboard.mousedown = null;
    Keyboard.top = WINDOW_HEIGHT / SCREEN_ZOOM - (Keyboard.height + Keyboard.padding * 2) - Keyboard.contentPadding;
    Keyboard.left = WINDOW_WIDTH / SCREEN_ZOOM - (Keyboard.width + Keyboard.padding * 2) - Keyboard.contentPadding;

    var buttonBg = "rgb(100,100,100)";
    var buttonColor = "rgb(255,255,255)";

    Keyboard.keyboard = $("<div/>").appendTo(CONTENT);
    Keyboard.keyboard.css("position", "fixed");
    Keyboard.keyboard.css("top", Keyboard.top + "px");
    Keyboard.keyboard.css("left", Keyboard.left + "px");
    Keyboard.keyboard.css("width", Keyboard.width + 3 + "px");
    Keyboard.keyboard.css("height", Keyboard.height + "px");
    Keyboard.keyboard.css("padding", Keyboard.padding + "px");
    Keyboard.keyboard.css("background", "rgba(0,0,0,0.8)");
    Keyboard.keyboard.css("border-radius", "5px");
    Keyboard.keyboard.css("display", "none");

    Keyboard.dragBar = $("<div/>").appendTo(Keyboard.keyboard);
    Keyboard.dragBar.css("width", Keyboard.width + Keyboard.padding * 2 + 3 + "px");
    Keyboard.dragBar.css("height", Keyboard.dragHeight + Keyboard.padding + "px");
    Keyboard.dragBar.css("border-top-left-radius", "5px");
    Keyboard.dragBar.css("border-top-right-radius", "5px");
    Keyboard.dragBar.css("margin", - Keyboard.padding + "px")
    Keyboard.dragBar.css("margin-bottom", Keyboard.dragMargin + "px");
    Keyboard.dragBar.css("background", "#999");
    Keyboard.dragBar.css("color", "#666");
    Keyboard.dragBar.css("line-height", Keyboard.dragHeight + Keyboard.padding + "px");
    Keyboard.dragBar.css("text-align", "center");
    Keyboard.dragBar.css("font-size", Keyboard.dragHeight * 0.6 + "px");
    Keyboard.dragBar.text(Language.get("keyboard_drag_text"));
    Keyboard.dragBar.attr("id", "keyboardDragBar");

    for (var i = 0; i <= 11; i++) {
        var button = $("<div/>").appendTo(Keyboard.keyboard);
        button.css("height", Keyboard.buttonSize + "px");
        button.css("border", Keyboard.buttonBorder + "px solid black");
        button.css("background", buttonBg);
        button.css("color", buttonColor);
        button.css("text-align", "center");
        button.css("margin", Keyboard.buttonMargin + "px");
        button.css("border-radius", "10px");
        button.css("float", "left");
        button.attr("button");
        if (i <= 4) {
            button.css("width", Keyboard.buttonSize + "px");
            button.css("line-height", Keyboard.buttonSize + "px");
            button.css("font-weight", "900");
            button.css("font-size", Keyboard.buttonSize * 0.8 + "px");
            button.text(i + 1);
        } else if (i == 5) {
            button.css("width", Keyboard.getbuttonwidth(2) + "px");
            button.css("line-height", Keyboard.buttonSize - 2 + "px");
            button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
            button.attr("id", "keyboard_button_clear");
            button.text(Language.get("keyboard_clear_text"));
        }  else if (i <= 10) {
            button.css("width", Keyboard.buttonSize + "px");
            button.css("line-height", Keyboard.buttonSize + "px");
            button.css("font-weight", "900");
            button.css("font-size", Keyboard.buttonSize * 0.8 + "px");
            button.text(i == 10 ? 0 : i);
        }  else {
            button.css("width", Keyboard.getbuttonwidth(2) + "px");
            button.css("line-height", Keyboard.buttonSize - 2 + "px");
            button.css("font-size", Keyboard.buttonSize * 0.65 + "px");
            button.attr("id", "keyboard_button_submit");
            button.text(Language.get("keyboard_ok_text"));
        }
        button.mousedown(onbuttonclick);
    }

    Keyboard.binddragevent();
    return Keyboard.keyboard;
}

Keyboard.setClearText = function(text) {
    $("#keyboard_button_clear").text(text);
}

Keyboard.setSubmitText = function(text) {
    $("#keyboard_button_submit").text(text);
}

Keyboard.setMoveable = function(canMove) {
    if (canMove) {
        if (!Keyboard.moveable) {
            Keyboard.binddragevent();
            Keyboard.dragBar.show();
            Keyboard.keyboard.css("height", Keyboard.height + "px");
            Keyboard.position(Keyboard.top - Keyboard.dragHeight - Keyboard.padding, Keyboard.left);
        }
    } else {
        if (Keyboard.moveable) {
            Keyboard.unbinddragevent();
            Keyboard.dragBar.hide();
            Keyboard.keyboard.css("height", Keyboard.height - Keyboard.dragHeight - Keyboard.padding + "px");
            Keyboard.position(Keyboard.top + Keyboard.dragHeight + Keyboard.padding, Keyboard.left);
        }
    }
}

Keyboard.getbuttonwidth = function(count) {
    var width = 0;
    width += Keyboard.buttonSize * count;
    width += Keyboard.buttonMargin * 2 * (count - 1);
    width += Keyboard.buttonBorder * 2 * (count - 1);
    return width;
}

Keyboard.show = function() {
    if (Keyboard.keyboard != null) {
        Keyboard.keyboard.css("display", "block");
    }
}

Keyboard.hide = function() {
    if (Keyboard.keyboard != null) {
        Keyboard.keyboard.css("display", "none");
    }
}

Keyboard.position = function(top, left) {
    Keyboard.top = top;
    Keyboard.left = left;
    Keyboard.keyboard.css("top", top);
    Keyboard.keyboard.css("left", left);
}

Keyboard.remove = function() {
    if (Keyboard.keyboard != null) {
        Keyboard.unbinddragevent();
        Keyboard.keyboard.remove();
        Keyboard.keyboard = null;
    }
}

Keyboard.dragLoop = 2;// 位移事件响应间隔
Keyboard.dragCount = 0;// 位移事件响应计数
Keyboard.moveable = false;// 是否可移动

Keyboard.unbinddragevent = function() {
    Keyboard.moveable = false;
    Keyboard.dragBar.off("mousedown");
    Keyboard.dragBar.off("mouseup");
    CONTENT.off("mousemove");
    Keyboard.dragBar.off("touchstart");
    Keyboard.dragBar.off("touchend");
    Keyboard.dragBar.off("touchmove");
}

Keyboard.binddragevent = function() {
    Keyboard.unbinddragevent();
    Keyboard.moveable = true;
    var drag = function drag() {
        this.init.apply(this, arguments);
    };
    drag.prototype = {
        constructor: drag,
        down: false,// 指针是否按下
        move: false,// 指针是否发生位移
        _x: 0,
        _y: 0,
        dragX: 0,
        dragY: 0,

        init: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            var t = this;
            if (Interface.isWeb()) {
                Keyboard.dragBar.on("mousedown", Keyboard.dragBar,function(e) {;t.movestart(e);});
                Keyboard.dragBar.on("mouseup", Keyboard.dragBar,function(e) {t.moveend(e);});
                CONTENT.on("mousemove", Keyboard.dragBar,function(e) {t.moving(e);});
            } else {
                Keyboard.dragBar.get(0).addEventListener("touchstart",function(e) {t.movestart(e);});
                Keyboard.dragBar.get(0).addEventListener("touchend",function(e) {t.moveend(e);});
                Keyboard.dragBar.get(0).addEventListener("touchmove",function(e) {t.moving(e);});
            }
        },
        movestart: function(e) {
            e && e.preventDefault();
            if (!this.move) {
                this.move = false;
                this.down = true;
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                this._x = clientx / SCREEN_ZOOM;
                this._y = clienty / SCREEN_ZOOM;
                this.dragX = this._x - Keyboard.left;
                this.dragY = this._y - Keyboard.top;
            }
        },
        moveend: function(e) {
            e && e.preventDefault();
            if (this.down) {
                this.move = false;
                this.down = false;
            }
        },
        moving: function(e) {
            e && e.preventDefault();
            if (this.down) {
                if (Keyboard.dragCount != Keyboard.dragLoop) {
                    Keyboard.dragCount++;
                    return;
                } else {
                    Keyboard.dragCount = 0;
                }
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                if (clientx - this._x != 0 || clienty - this._y != 0) {
                    this.move = true;
                }
                var top = clienty / SCREEN_ZOOM - this.dragY;
                var left = clientx / SCREEN_ZOOM - this.dragX;
                var titleHeight = $("#title").height();
                if($("#timebg").css("display") != "none") {
                    titleHeight += $("#timebg").height()
                }
                if(top < titleHeight + Keyboard.contentPadding) {
                    top = titleHeight + Keyboard.contentPadding;
                } else if (top > WINDOW_HEIGHT / SCREEN_ZOOM - (Keyboard.height + Keyboard.padding * 2) - Keyboard.contentPadding) {
                    top = WINDOW_HEIGHT / SCREEN_ZOOM - (Keyboard.height + Keyboard.padding * 2) - Keyboard.contentPadding;
                }
                if(left < Keyboard.contentPadding) {
                    left = Keyboard.contentPadding;
                } else if (left > WINDOW_WIDTH / SCREEN_ZOOM - (Keyboard.width + Keyboard.padding * 2) - Keyboard.contentPadding) {
                    left = WINDOW_WIDTH / SCREEN_ZOOM - (Keyboard.width + Keyboard.padding * 2) - Keyboard.contentPadding;
                }
                Keyboard.position(top, left);
            }
        }
    };
    var drag = new drag();
}