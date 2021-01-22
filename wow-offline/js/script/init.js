// 画面适配
$(document).ready(function () {
    $(document).bind("contextmenu", function () {
        return false;
    });
    $(document).bind("selectstart", function () {
        return false;
    });
    $("#timestamp").text("2021年1月22日13:25:23");

    do_adapt();
    $(window).resize(do_adapt);
    setTimeout(do_adapt, 100);
});

// 画面适配
function do_adapt() {
    let zoom = $(window).width() / 1600;
    $("body").css("zoom", zoom);
}

// 反调试
let element = new Image()
Object.defineProperty(element, 'id', {
    get: function () {
        if (!is_in_local_mode()) {
            window.location.href = '../index2.html';
        }
    },
})
console.log(element);

/**
 重构model计算（multiple
 */