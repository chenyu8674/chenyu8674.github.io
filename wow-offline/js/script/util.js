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

function random_in_array(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function is_in_array(obj, array) {
    for (let i in array) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function is_in_local_mode() {
    if(window.location.href.indexOf("C:/") > 0) {
        return true;
    } else if(window.location.href.indexOf("localhost:63342") > 0) {
        return true;
    }
    return false;
}

function random(percent) {
    return Math.random() * 100 <= percent;
}