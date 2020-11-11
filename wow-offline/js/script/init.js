// 初始化
$(document).ready(function(){
    //doadapt();
    //$(window).resize(doadapt);
});

// 页面适配
function doadapt() {
    let width = $(window).width();
    let height = $(window).height();
    let zoom = width / 1000;
    let body = $("body");
    body.css("width", width / zoom + "px");
    body.css("height", height / zoom + "px");
    body.css("margin", "50px");
    body.css("margin-top", "40px");
    body.css("zoom", zoom * 0.9);
}