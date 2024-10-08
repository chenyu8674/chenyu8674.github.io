(function(){"use strict";var t={8119:function(t,e,a){var i=a(6848),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("app-index")],1)},s=[],o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"app"},[e("div",{attrs:{id:"title"}},[t.showBackBtn?e("i",{staticClass:"el-icon-back",attrs:{id:"backBtn"}}):t._e(),e("div",{attrs:{id:"titleText"}},[t._v(t._s(t.titleText))]),e("el-dropdown",{attrs:{id:"settingBtn",trigger:"click"}},[e("i",{staticClass:"el-icon-caret-bottom"}),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-s-custom"}},[t._v("我的")]),e("el-dropdown-item",{attrs:{icon:"el-icon-s-tools",divided:""}},[t._v("设置")]),e("el-dropdown-item",{attrs:{icon:"el-icon-s-comment",divided:""}},[t._v("客服")]),e("el-dropdown-item",{attrs:{icon:"el-icon-info",divided:""}},[t._v("关于")])],1)],1)],1),e("div",{attrs:{id:"main"}},["1"===t.activeIndex?e("div",{staticClass:"contentView"},[e("driver-map")],1):t._e(),"2"===t.activeIndex?e("div",{staticClass:"contentView"},t._l(t.taskList1,(function(a){return e("task-card",{key:a.name,attrs:{task:a,type:"task"},on:{handleStart:t.handleStart}})})),1):t._e(),"3"===t.activeIndex?e("div",{staticClass:"contentView"},t._l(t.taskList2,(function(t){return e("task-card",{key:t.name,attrs:{task:t,type:"history"}})})),1):t._e(),e("el-menu",{attrs:{id:"foot","default-active":t.activeIndex,mode:"horizontal","background-color":"#545c64","active-text-color":"#ffd04b","text-color":"#fff"},on:{select:t.handleSelect}},[e("el-menu-item",{staticClass:"footItem",attrs:{index:"1"}},[t._v("当前任务")]),e("el-menu-item",{staticClass:"footItem",attrs:{index:"2"}},[t._v("任务中心")]),e("el-menu-item",{staticClass:"footItem",attrs:{index:"3"}},[t._v("任务历史")])],1)],1)])},r=[],l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout-container"},[e("div",{attrs:{id:"map"}}),e("task-card",{staticClass:"taskcard",attrs:{task:t.task,type:"map"},on:{handleStart:t.handleStart,handleCheck:t.handleCheck}})],1)},c=[],p=(a(4114),function(){var t=this,e=t._self._c;return e("div",{staticClass:"taskCard"},[e("div",{staticClass:"title"},[e("i",{staticClass:"el-icon-collection-tag",staticStyle:{"margin-right":"10px"}}),t._v(t._s(t.task.name))]),e("div",{staticClass:"content"},[e("i",{staticClass:"el-icon-time",staticStyle:{margin:"10px"}}),t._v("出发时间："),e("span",{staticClass:"contentText"},[t._v(t._s(t.task.startTime))])]),e("div",{staticClass:"content"},[e("i",{staticClass:"el-icon-location-outline",staticStyle:{margin:"10px"}}),t._v("出发地点："),e("span",{staticClass:"contentText"},[t._v(t._s(t.task.startPosition))])]),e("div",{staticClass:"content"},[e("i",{staticClass:"el-icon-tickets",staticStyle:{margin:"10px"}}),t._v("货品说明："),e("span",{staticClass:"contentText"},[t._v(t._s(t.task.remark))])]),e("div",{staticClass:"content"},[e("i",{staticClass:"el-icon-place",staticStyle:{margin:"10px"}}),t._v("途经点："),e("span",{staticClass:"contentText"},[t._v(t._s(t.task.waypoints)+"个")])]),e("div",{staticClass:"content"},[e("i",{staticClass:"el-icon-odometer",staticStyle:{margin:"10px"}}),t._v("总里程："),e("span",{staticClass:"contentText"},[t._v(t._s(t.task.mileage)+"公里")])]),"task"===this.type?e("el-button",{staticClass:"button",staticStyle:{"margin-top":"-200px"},attrs:{type:"primary",plain:"",icon:"el-icon-video-play"},on:{click:t.handleStart}},[t._v("开始任务")]):t._e(),"task"===this.type?e("el-button",{staticClass:"button",staticStyle:{"margin-top":"-130px"},attrs:{type:"info",plain:"",icon:"el-icon-alarm-clock"}},[t._v("设置提醒")]):t._e(),"task"===this.type||"history"===this.type?e("el-button",{staticClass:"button",staticStyle:{"margin-top":"-60px"},attrs:{type:"info",plain:"",icon:"el-icon-warning-outline"}},[t._v("查看详情")]):t._e(),"map"===this.type?e("el-button",{staticClass:"button",staticStyle:{"margin-top":"-130px"},attrs:{type:"primary",plain:"",icon:"el-icon-video-play"},on:{click:t.handleStart}},[t._v("开始导航")]):t._e(),"map"===this.type?e("el-button",{staticClass:"button",staticStyle:{"margin-top":"-60px"},attrs:{type:"warning",plain:"",icon:"el-icon-circle-check"},on:{click:t.handleCheck}},[t._v("确认送达")]):t._e()],1)}),d=[],m={props:{type:{type:String,default:"task"},task:{type:Object}},methods:{handleStart(){this.$emit("handleStart")},handleCheck(){this.$emit("handleCheck")}}},h=m,u=a(1656),y=(0,u.A)(h,p,d,!1,null,"0f518456",null),v=y.exports,f={components:{TaskCard:v},data(){return{task:{name:"物流单24090801",waypoints:1,startPosition:"西区1号仓",startTime:"2024/09/08 09:00:00",mileage:25.68,remark:"冰箱4台"},map:null,from:"39.714410,116.507762",to:"39.914936,116.478092",startPosition:new TMap.LatLng(39.71441,116.507762),endPosition:new TMap.LatLng(39.914936,116.478092),paths:[],polylineLayer:null,markerLayer:null}},mounted(){this.initMap(),this.initPath()},methods:{initMap(){document.getElementById("map").innerHTML="",this.map=new TMap.Map(document.getElementById("map"),{center:this.startPosition,zoom:12,showControl:!1,doubleClickZoom:!1})},initPath(){const t=document.createElement("script"),e="handleDirection"+Date.now();window[e]=t=>{const e=t.result.routes[0].polyline;let a=[];for(let n=0;n<e.length;n++)a[n]=e[n];let i=1e6;for(let n=2;n<a.length;n++)a[n]=Math.round(Number(a[n-2])*i+Number(a[n]))/i;this.createPath(a)},t.src="https://apis.map.qq.com/ws/direction/v1/driving/?key="+MAP_KEY+"&from="+this.from+"&to="+this.to+"&get_mp=1&no_step=1&output=jsonp&callback="+e,document.body.appendChild(t)},createPath(t){this.paths=[];let e=90,a=0,i=180,n=0;for(let p=0;p<t.length;p+=2){let s=t[p],o=t[p+1];e=s<e?s:e,a=s>a?s:a,i=o<i?o:i,n=o>n?o:n,this.paths.push(new TMap.LatLng(s,o))}let s=.1*(a-e),o=.1*(n-i),r=new TMap.LatLng(a+s,n+o),l=new TMap.LatLng(e-s,i-o);this.map.fitBounds(new TMap.LatLngBounds(l,r));let c=this.map;this.polylineLayer=new TMap.MultiPolyline({map:c,styles:{style_green:new TMap.PolylineStyle({color:"#13ce66",width:8,borderWidth:3,borderColor:"#FFF",showArrow:!0}),style_gray:new TMap.PolylineStyle({color:"#ccc",width:8,borderWidth:3,borderColor:"#FFF"})},geometries:[{id:"path1",styleId:"style_green",paths:this.paths},{id:"path2",styleId:"style_green",paths:this.paths}]}),this.markerLayer=new TMap.MultiMarker({id:"car",map:c,styles:{car1:new TMap.MarkerStyle({width:60,height:90,anchor:{x:30,y:45},rotation:90,src:"https://mapapi.qq.com/web/mapComponents/componentsTest/zyTest/static/model_taxi.png"}),start:new TMap.MarkerStyle({width:40,height:60,anchor:{x:20,y:60},src:"https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png"}),end:new TMap.MarkerStyle({width:40,height:60,anchor:{x:20,y:60},src:"https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png"})},geometries:[{id:"car",styleId:"car1",position:this.paths[0]},{id:"start",styleId:"start",position:this.paths[0]},{id:"end",styleId:"end",position:this.paths[this.paths.length-1]}]})},handleStart(){this.map.easeTo({center:this.startPosition,zoom:20,rotation:90,pitch:60},{duration:1e3})},handleCheck(){this.$message({message:"距离目的地过远，无法确认送达",type:"warning"})}}},g=f,k=(0,u.A)(g,l,c,!1,null,"56a9b104",null),w=k.exports,_={components:{DriverMap:w,TaskCard:v},data(){return{titleText:"任务助手",showBackBtn:!1,isDropdownOpen:!1,activeIndex:"2",taskList1:[{name:"物流单24090801",waypoints:1,startPosition:"西区1号仓",startTime:"2024/09/08 09:00:00",mileage:25.68,remark:"冰箱4台"},{name:"物流单24090802",waypoints:4,startPosition:"西区2号仓",startTime:"2024/09/08 10:00:00",mileage:34.56,remark:"冰箱2台，空调2台"},{name:"物流单24090803",waypoints:3,startPosition:"西区2号仓",startTime:"2024/09/08 14:00:00",mileage:20.31,remark:"冰箱1台，空调2台"}],taskList2:[{name:"物流单24090703",waypoints:1,startPosition:"西区1号仓",startTime:"2024/09/07 12:00:00",mileage:19.77,remark:"空调2台"},{name:"物流单24090702",waypoints:2,startPosition:"西区1号仓",startTime:"2024/09/07 10:00:00",mileage:14.04,remark:"空调2台"},{name:"物流单24090701",waypoints:3,startPosition:"西区3号仓",startTime:"2024/09/07 09:00:00",mileage:7.07,remark:"冰箱2台，空调2台，洗衣机1台"},{name:"物流单24090604",waypoints:4,startPosition:"西区2号仓",startTime:"2024/09/06 18:00:00",mileage:23.73,remark:"空调2台，洗衣机2台"},{name:"物流单24090603",waypoints:3,startPosition:"西区2号仓",startTime:"2024/09/06 14:00:00",mileage:20.31,remark:"冰箱1台，空调2台"},{name:"物流单24090602",waypoints:4,startPosition:"西区2号仓",startTime:"2024/09/06 10:00:00",mileage:34.56,remark:"冰箱2台，空调2台"},{name:"物流单24090601",waypoints:1,startPosition:"西区1号仓",startTime:"2024/09/06 09:00:00",mileage:11.35,remark:"冰箱4台"}]}},methods:{handleSelect(t){this.activeIndex=t},handleStart(){console.log("start 1"),this.activeIndex="1"}}},C=_,b=(0,u.A)(C,o,r,!1,null,"37cb95a0",null),x=b.exports,T={name:"App",components:{AppIndex:x}},S=T,M=(0,u.A)(S,n,s,!1,null,null,null),P=M.exports,L=a(2780),I=a.n(L);i["default"].config.productionTip=!1,i["default"].use(I()),new i["default"]({render:t=>t(P)}).$mount("#app")}},e={};function a(i){var n=e[i];if(void 0!==n)return n.exports;var s=e[i]={id:i,loaded:!1,exports:{}};return t[i].call(s.exports,s,s.exports,a),s.loaded=!0,s.exports}a.m=t,function(){a.amdO={}}(),function(){var t=[];a.O=function(e,i,n,s){if(!i){var o=1/0;for(p=0;p<t.length;p++){i=t[p][0],n=t[p][1],s=t[p][2];for(var r=!0,l=0;l<i.length;l++)(!1&s||o>=s)&&Object.keys(a.O).every((function(t){return a.O[t](i[l])}))?i.splice(l--,1):(r=!1,s<o&&(o=s));if(r){t.splice(p--,1);var c=n();void 0!==c&&(e=c)}}return e}s=s||0;for(var p=t.length;p>0&&t[p-1][2]>s;p--)t[p]=t[p-1];t[p]=[i,n,s]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,s,o=i[0],r=i[1],l=i[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(n in r)a.o(r,n)&&(a.m[n]=r[n]);if(l)var p=l(a)}for(e&&e(i);c<o.length;c++)s=o[c],a.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return a.O(p)},i=self["webpackChunkmy_app"]=self["webpackChunkmy_app"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=a.O(void 0,[504],(function(){return a(8119)}));i=a.O(i)})();
//# sourceMappingURL=app.2d9ae9fd.js.map