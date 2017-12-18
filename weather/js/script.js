// 初始化
$(document).ready(function(){
    doadapt();
    $(window).resize(doadapt);
    loadXMLDoc();
});

// 页面适配
function doadapt() {
    var zoom = $(window).width() / 1000;
    var width = $(window).width();
    var height = $(window).height();
    $("body").css("width", width / zoom + "px");
    $("body").css("height", height / zoom + "px");
    $("body").css("margin", "50px");
    $("body").css("margin-top", "40px");
    $("body").css("zoom", zoom * 0.9);
}

var loadXMLFlag = 0;
function oninputchange() {
    var cityName = $("#city").val();
    if (isChinese(cityName)) {
        clearTimeout(loadXMLFlag);
        loadXMLFlag = setTimeout(loadXMLDoc, 100);
    }
}

var baseUrl = "http://wthrcdn.etouch.cn/WeatherApi?city=";
function loadXMLDoc() {
    $("#result").html("<div class='error'>LOADING...</div>");

    var url = baseUrl + $("#city").val() + "&random=" + Math.random();
    var xmlhttp;
    var txt, x, xx, i;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var responseText = xmlhttp.responseText;
            // log(responseText);

            $("#result").html("");
            var resultStr = "";
            var error = gettag(responseText, "error");
            if (error.length) {
                if ($("#city").val() == "") {
                    error = "";
                } else {
                    error = error.toUpperCase();
                }
                resultStr = "<div class='error'>" + error + "</div>";
            } else {
                responseText = responseText.replace(/\<\!\[CDATA\[/gi, "");
                responseText = responseText.replace(/\]\]\>/gi, "");

                resultStr += "<div class='total1 block'>";
                resultStr += "城市：" + gettag(responseText, "city") + "<br>";
                resultStr += "日出：" + gettag(responseText, "sunrise_1") + "<br>";
                resultStr += "日落：" + gettag(responseText, "sunset_1") + "<br><br>";
                resultStr += "更新时间：" + gettag(responseText, "updatetime") + "<br>";
                resultStr += "</div><div class='total2 block'>";
                resultStr += "温度：" + gettag(responseText, "wendu") + "℃<br>";
                resultStr += "湿度：" + gettag(responseText, "shidu") + "<br>";
                resultStr += "风力：" + gettag(responseText, "fengli") + "<br>";
                resultStr += "风向：" + gettag(responseText, "fengxiang") + "<br>";
                resultStr += "</div>";

                resultStr += "<div class='air1 block'>";
                var environment = gettag(responseText, "environment");
                if (environment != "") {
                    resultStr += "空气质量：" + gettag(responseText, "aqi") + "/" + gettag(responseText, "quality") + "<br>";
                    var MajorPollutants = gettag(responseText, "MajorPollutants");
                    if (MajorPollutants == "") {
                        MajorPollutants = "--";
                    }
                    resultStr += "主要污染物：" + MajorPollutants + "<br>";
                    resultStr += "PM2.5指数：" + gettag(responseText, "pm25") + "<br>";
                    resultStr += "PM10 指数：" + gettag(responseText, "pm10") + "<br>";
                    resultStr += "更新时间：" + gettag(responseText, "time") + "<br>";
                }
                resultStr += "</div><div class='air2 block'>";
                if (environment != "") {
                    resultStr += "臭氧：" + gettag(responseText, "o3") + "<br>";
                    resultStr += "一氧化碳：" + gettag(responseText, "co") + "<br>";
                    resultStr += "二氧化硫：" + gettag(responseText, "so2") + "<br>";
                    resultStr += "二氧化氮：" + gettag(responseText, "no2") + "<br>";
                    resultStr += "建议：" + gettag(responseText, "suggest") + "<br>";
                }
                resultStr += "</div>";

                var forecast = getstrarray(responseText, "<weather>", "</weather>");
                for (var i = 0; i < forecast.length; i++) {
                    var str = forecast[i];
                    resultStr += "<div class='weather block'>" + gettag(str, "date") + "：<br>";
                    resultStr += gettag(str, "high") + " " + gettag(str, "low") + "<br>";
                    var day = gettag(str, "day");
                    var night = gettag(str, "night");
                    var typeDay = gettag(day, "type");
                    var typeNight = gettag(night, "type");
                    resultStr += "白天：" + typeDay + "<img src='" + getweathericon(typeDay) + "' /> " + gettag(day, "fengxiang") + " " + gettag(day, "fengli") + "<br>";
                    resultStr += "夜间：" + typeNight + "<img src='" + getweathericon(typeNight) + "' /> " + gettag(night, "fengxiang") + " " + gettag(night, "fengli") + "<br>";
                    resultStr += "</div>";
                }

                var zhishu = getstrarray(responseText, "<zhishu>", "</zhishu>");
                for (var i = 0; i < zhishu.length; i++) {
                    var str = zhishu[i];
                    resultStr += "<div class='zhishu block'>" + gettag(str, "name") + "：" + gettag(str, "value") + "<br>";
                    resultStr += gettag(str, "detail") + "<br>";
                    resultStr += "</div>";
                }
            }
            $("#result").html(resultStr);

            $($(".weather").get(0)).css("margin-left", "0px");
            $($(".zhishu").get(0)).css("margin-left", "0px");
            $($(".zhishu").get(4)).css("margin-left", "0px");
            $($(".zhishu").get(8)).css("margin-left", "0px");

            var blockList = $(".block");
            for (var i = 0; i < blockList.length; i++) {
                var view = $(blockList[i]);
                view.css("visibility", "hidden");
                var top = view.position().top;
                var left = view.position().left;
                var fromTop = - top;
                if (top > 300) {
                    fromTop = 300 + top;
                }
                var fromLeft = - left;
                if (left > 500) {
                    fromLeft = 1000 + left;
                }
                doanimation(view, fromTop, fromLeft, i);
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function doanimation(view, fromTop, fromLeft, count) {
    view = $(view);
    var top = view.position().top;
    var left = view.position().left;
    setTimeout(function(){
        view.css("visibility", "visible");
        view.css("position", "fixed");
        view.css("top", fromTop + "px");
        view.css("left", fromLeft + "px");
        view.animate({top:top+"px", left:left+"px"}, 200, "swing", null);
    }, count * 30);
}

function getweathericon(type) {
    if (type == "多云")
        return "img/cloud.png";
    if (type == "晴")
        return "img/fine.png";
    if (type == "阴")
        return "img/overcast.png";
    if (type == "小雨")
        return "img/small_rain.png";
    if (type == "小到中雨")
        return "img/stom_rain.png";
    if (type == "大雨" || type == "中到大雨")
        return "img/big_rain.png";
    if (type == "暴雨" || type == "大暴雨" || type == "特大暴雨" || type == "大到暴雨" || type == "暴雨到大暴雨" || type == "大暴雨到特大暴雨")
        return "img/mbig_rain.png";
    if (type == "雨夹雪")
        return "img/rain_snow.png";
    if (type == "阵雪")
        return "img/quick_snow.png";
    if (type == "雾")
        return "img/fog.png";
    if (type == "沙尘暴" || type == "浮尘" || type == "扬沙" || type == "强沙尘暴" || type == "雾霾")
        return "img/sand.png";
    if (type == "冻雨")
        return "img/ice_rain.png";
    if (type == "中雨")
        return "img/mid_rain.png";
    if (type == "雷阵雨伴有冰雹")
        return "img/quick_rain_ice.png";
    if (type == "阵雨")
        return "img/quick_rain.png";
    if (type == "雷阵雨")
        return "img/lquick_rain.png";
    if (type == "无天气类型")
        return "img/unknown.png";
}

function log(obj){console.log(obj)}
function gettag(text,tag){return getstr(text,"<"+tag+">","</"+tag+">",false,false)}
function getstr(v,s,e,a,b){var r="";var t=v.indexOf(s);if(t<0){return""}if(a){r=v.substr(t)}else{r=v.substr(t+s.length)}t=r.indexOf(e);if(b){r=r.substr(0,t+e.length)}else{r=r.substr(0,t)}return r}
function getstrarray(v,s,e,a,b){var r=[];var t=getstr(v,s,e,a,b);while(t!=""){r.push(t);t=getstr(v,s,e,1,1);v=v.substr(v.indexOf(t)+t.length);t=getstr(v,s,e,a,b)}return r}
function isChinese(temp){var re=/[^\u4e00-\u9fa5]/;if(re.test(temp))return false;return true}