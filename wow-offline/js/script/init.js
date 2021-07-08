// 画面适配
$(document).ready(function () {
    $(document).bind("contextmenu", function () {
        return false;
    });
    $(document).bind("selectstart", function () {
        return false;
    });
    $("#timestamp").text("2021年2月9日12:32:54 Ver." + CURRENT_VERSION);

    window_view = $("#window");
    do_adapt();
    $(window).resize(do_adapt);
    setTimeout(do_adapt, 100);
});

let window_view;
let window_width = 1600;
let window_height = 900;
let window_margin_top;
let window_margin_left;
let window_zoom;

// 画面适配
function do_adapt() {
    let browser_width = $(window).width();
    let browser_height = $(window).height();
    if (browser_width / browser_height >= window_width / window_height) {
        // 横屏，两侧留黑边
        window_zoom = browser_height / window_height;
        window_margin_top = 0;
        window_margin_left = (browser_width - browser_height * window_width / window_height) / 2 / window_zoom;
    } else {
        // 竖屏，上下留黑边
        window_zoom = browser_width / window_width;
        window_margin_top = (browser_height - browser_width * window_height / window_width) / 2 / window_zoom;
        window_margin_left = 0;
    }
    window_view.css("top", window_margin_top + "px");
    window_view.css("left", window_margin_left + "px");
    window_view.css("zoom", window_zoom);
}

// 反调试
if (!is_in_local_mode()) {
    let element = new Image()
    Object.defineProperty(element, 'id', {
        get: function () {
            if (!is_in_local_mode()) {
                window.location.href = '../index2.html';
            }
        },
    })
    console.log(element);
}