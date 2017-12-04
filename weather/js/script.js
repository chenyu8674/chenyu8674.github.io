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
    $("body").css("zoom", zoom * 0.9);
}


var baseUrl = "http://wthrcdn.etouch.cn/WeatherApi?city=";
var count = 0;
var startTime = 0;
function loadXMLDoc() {
    if (startTime == 0) {
        startTime = new Date().getTime();
    }
    var url = baseUrl + document.getElementById("city").value + "&random=" + Math.random();
    var xmlhttp;
    var txt, x, xx, i;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var responseText = xmlhttp.responseText;
            // log(responseText);

            var resultStr = "";
            var error = gettag(responseText, "error");
            if (error.length) {
                resultStr = "<div class='error'>" + error.toUpperCase() + "</div>";
            } else {
                responseText = responseText.replace(/\<\!\[CDATA\[/gi, "");
                responseText = responseText.replace(/\]\]\>/gi, "");

                resultStr += "<div class='total'>";
                resultStr += "城市：" + gettag(responseText, "city") + "<br>";
                resultStr += "更新：" + gettag(responseText, "updatetime") + "<br>";
                resultStr += "气温：" + gettag(responseText, "wendu") + "<br>";
                resultStr += "风力：" + gettag(responseText, "fengli") + "<br>";
                resultStr += "风向：" + gettag(responseText, "fengxiang") + "<br>";
                resultStr += "湿度：" + gettag(responseText, "shidu") + "<br>";
                resultStr += "日出：" + gettag(responseText, "sunrise_1") + "<br>";
                resultStr += "日落：" + gettag(responseText, "sunset_1") + "<br>";
                resultStr += "</div>";

                resultStr += "<div class='air'>";
                var environment = gettag(responseText, "environment");
                if (environment != "") {
                    resultStr += "空气质量：" + gettag(responseText, "aqi") + " " + gettag(responseText, "quality") + "<br>";
                    resultStr += "主要污染物：" + gettag(responseText, "MajorPollutants") + "<br>";
                    resultStr += "建议：" + gettag(responseText, "suggest") + "<br>";
                    resultStr += "PM2.5：" + gettag(responseText, "pm25") + "<br>";
                    resultStr += "PM10：" + gettag(responseText, "pm10") + "<br>";
                    resultStr += "臭氧：" + gettag(responseText, "o3") + "<br>";
                    resultStr += "一氧化碳：" + gettag(responseText, "co") + "<br>";
                    resultStr += "二氧化硫：" + gettag(responseText, "so2") + "<br>";
                    resultStr += "二氧化氮：" + gettag(responseText, "no2") + "<br>";
                    resultStr += "更新时间：" + gettag(responseText, "time") + "<br>";
                }
                resultStr += "</div>";

                var forecast = getstrarray(responseText, "<weather>", "</weather>");
                for (var i = 0; i < forecast.length; i++) {
                    var str = forecast[i];
                    resultStr += "<div class='weather'>" + gettag(str, "date") + "：<br>";
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
                    resultStr += "<div class='zhishu'>" + gettag(str, "name") + "：" + gettag(str, "value") + "<br>";
                    resultStr += gettag(str, "detail") + "<br>";
                    resultStr += "</div>";
                }

                count ++;
                // var useTime = new Date().getTime() - startTime;
                // document.getElementById("count").innerText = count  + " - " + (count * 1000 / useTime).toFixed(1);
                // document.getElementById("count").innerText = useTime;
                // loadXMLDoc();
            }
            document.getElementById("result").innerHTML = resultStr;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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