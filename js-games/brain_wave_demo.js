$(document).ready(function() {
    var brainMode = decodeURI(GetQueryString("brain"));
    if (brainMode == "thinkgear") {
        Config.titleText = ["脑电测试", "", ""];
    } else if (brainMode == "hht") {
        Config.titleText = ["脑血流测试", "", ""];
    }
});