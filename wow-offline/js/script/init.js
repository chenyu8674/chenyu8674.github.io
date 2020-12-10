/** 画面适配 **/
$(document).ready(function () {
    $(document).bind("contextmenu", function () {
        return false;
    });
    $(document).bind("selectstart", function () {
        return false;
    });

    do_adapt();
    $(window).resize(do_adapt);
    setTimeout(do_adapt, 100);
});

/** 画面适配 **/
function do_adapt() {
    let zoom = $(window).width() / 1600;
    $("body").css("zoom", zoom);
}