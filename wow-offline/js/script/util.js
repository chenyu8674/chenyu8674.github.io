/** 工具 **/

let pre_load_img;
let pre_load_img_count = 0;
let pre_load_img_list = [
    "./img/map.jpg",
    "./img/job/warrior.jpg",
    "./img/job/paladin.jpg",
    "./img/job/hunter.jpg",
    "./img/job/shaman.jpg",
    "./img/job/druid.jpg",
    "./img/job/rogue.jpg",
    "./img/job/priest.jpg",
    "./img/job/warlock.jpg",
    "./img/job/mage.jpg"
];

/**
 * 图片预加载
 */
$(document).ready(function () {
    pre_load_img = new Image();
    pre_load_img.addEventListener("load", loadHandler);
    pre_load_img.src = pre_load_img_list[pre_load_img_count];
});

function loadHandler(e) {
    pre_load_img_count++;
    if (pre_load_img_count < pre_load_img_list.length) {
        pre_load_img.src = pre_load_img_list[pre_load_img_count];
    }
}

/**
 * 获取元素的纵坐标（相对于窗口）
 */
function getTop(e) {
    let offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

/**
 * 获取元素的横坐标（相对于窗口）
 */
function getLeft(e) {
    let offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}