/* 请求地址 */
var baseURL="https://baoyang.d.edaijia.cn/api/third/2/";

/* 3.1 获取渠道下所有的商户列表 */
function listAll(){
	this.method="GET";
	this.api="business/listAll";
	this.params=[
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.2 获取商户的账号余额 */
function balance(){
	this.method="GET";
	this.api="business/balance";
	this.params=[
		["channel","渠道号","固定为86","86"],
		["customerId","商户号","最多20个字符","CH0110000223"]
	];
}

/* 3.3 获取服务支持城市列表 */
function queryCityList(){
	this.method="GET";
	this.api="queryCityList";
	this.params=[
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.4 根据城市code获取城市信息 */
function queryCity(){
	this.method="GET";
	this.api="queryCity";
	this.params=[
		["channel","渠道号","固定为86","86"],
		["code","城市编码","","1"]
	];
}

/* 3.5 获取预估价格 */
function price(){
	this.method="GET";
	this.api="price";
	this.params=[
		["channel","渠道号","固定为86","86"],
		["startLng","出发地经度","","116.467332"],
		["startLat","出发地纬度","","39.957112"],
		["endLng","目的地经度","","116.456236"],
		["endLat","目的地纬度","","39.962488"],
		["middleLng","中转地经度","有暂存点需要传的参数",""],
		["middleLat","中转地纬度","有暂存点需要传的参数",""],
		["bookingTime","预约时间","yyyyMMddHHmmss","20191122000000"],
		["customerId","商户号","","CH0110000223"]
	];
}

/* 3.6 下单 */
function Create(){
	this.method="POST";
	this.api="order/create";
	this.params=[
		["channel","渠道号","固定为86","86"],
		["customerId","商户号","最多20个字符","CH0110000223"],
		["type","订单类型","1-取送车","1"],
		["mode","订单成单模式","0-客服派单，1-司机抢单，3-实时派单","1"],
		["createMobile","下单人手机号","手机号","12310201321"],
		["mobile","车主手机号","手机号","12310201321"],
		["username","车主姓名","","车主"],
		["pickupContactName","取车地址联系人姓名","最多20个字符","取车人"],
		["pickupContactPhone","取车地址联系人手机号","手机号","12310201321"],
		["pickupAddress","取车地址","最多100个字符","北京发展大厦"],
		["pickupAddressLng","取车地址经度","","116.467332"],
		["pickupAddressLat","取车地址纬度","","39.957112"],
		["returnContactName","还车地址联系人姓名","最多20个字符","还车人"],
		["returnContactPhone","还车地址联系人手机号","手机号","12310201321"],
		["returnAddress","还车地址","最多100个字符","三元桥丰田"],
		["returnAddressLng","还车地址经度","","116.456236"],
		["returnAddressLat","还车地址纬度","","39.962488"],
		["bookingTime","预约时间","yyyyMMddHHmmss，必须比当前时间晚至少半个小时，当mode=3预约时间可以不传","20191122000000"],
		["carNo","车牌号","","京N12345"],
		["carBrandName","车辆品牌名称","最多50个字符",""],
		["carSeriesName","车辆车系名称","最多50个字符",""],
		["payMode","订单支付方式","0-vip扣款，1-用户付款，默认为0","0"],
		["couponCode","优惠券码","payMode=1的情况下，可以使用优惠券",""],
		["midAddress","中转地址","最多100个字符",""],
		["midAddressLng","中转地址经度","",""],
		["midAddressLat","中转地址纬度","",""],
		["fixedDriverId","驻店司机工号","",""],
		["pushSms","是否发送短信","0-发送短信，1-不发短信，默认是0","0"]
	];
}

/* 3.7 取消 */
function cancel(){
	this.method="POST";
	this.api="cancel";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.8 获取订单详情 */
function detail(){
	this.method="GET";
	this.api="order/detail";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.9 获取订单轨迹 */
function recordList(){
	this.method="GET";
	this.api="order/recordList";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.10 获取司机代驾轨迹 */
function trace(){
	this.method="GET";
	this.api="order/trace";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.11 获取司机信息 */
function driverInfo(){
	this.method="GET";
	this.api="order/driverInfo";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"],
		["type","代驾类型","1-取车","1"]
	];
}

/* 3.12 获取目的人收车验证码 */
function verifyCode(){
	this.method="GET";
	this.api="order/verifyCode";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"],
		["type","代驾类型","1-取车","1"]
	];
}

/* 3.13 获取历史订单列表 */
function queryList(){
	this.method="GET";
	this.api="order/queryList";
	this.params=[
		["startDate","开始时间","String(yyyyMMddHHmmss)","20190101000000"],
		["endDate","结束时间","String(yyyyMMddHHmmss)","20200101000000"],
		["channel","渠道号","固定为86","86"],
		["pageSize","每页条目","默认20",""],
		["currentPage","当前页码","默认1",""],
		["mobile","车主手机号","",""],
		["createMobile","下单人手机号","",""],
		["customerId","商户号","",""]
	];
}

/* 3.14 用户评论 */
function comment(){
	this.method="POST";
	this.api="order/comment";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"],
		["attitude","服务态度评分","取值：10,20,30,40,50","50"],
		["speed","接送车速度评分","取值：10,20,30,40,50","40"],
		["content","评论内容","不能超过200字","服务态度很棒，就是等了好久"]
	];
}

/* 3.15 获取用户评论内容 */
function getComment(){
	this.method="GET";
	this.api="order/getComment";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"]
	];
}

/* 3.16 获取车辆信息照片(司机开车后才有数据) */
function getCarPhotos(){
	this.method="GET";
	this.api="order/getCarPhotos";
	this.params=[
		["orderId","订单号","",""],
		["channel","渠道号","固定为86","86"],
		["daijiaType","代驾类型","1:取车，2：还车","1"]
	];
}

/* 3.17 绑定优惠券 */
function binding(){
	this.method="POST";
	this.api="coupon/binding";
	this.params=[
		["mobile","用户手机号","",""],
		["couponCode","优惠券编码","12或4位数字",""]
	];
}

/* 3.18 用户获取优惠券列表 */
function userConponList(){
	this.method="GET";
	this.api="coupon/userConponList";
	this.params=[
		["mobile","用户手机号","",""],
		["orderLimit","订单类型限制","取送车传maintain","maintain"],
		["merchantId","商家的id","",""]
	];
}

/* 3.19 根据券码获取优惠券信息 */
function detail2(){
	this.method="POST";
	this.api="coupon/detail";
	this.params=[
		["couponCode","优惠券编码","",""]
	];
}

/* 3.20 获取附近代充电司机列表 */
function getFixList(){
	this.method="GET";
	this.api="driver/getFixList";
	this.params=[
		["customerId","商户号","",""],
		["lat","取车地址纬度","",""],
		["lng","取车地址经度","",""]
	];
}

/* 3.21 获取额外费用 */
function getOhterFee(){
	this.method="GET";
	this.api="order/getOhterFee";
	this.params=[
		["orderId","订单号","",""],
		["customerId","商户号","",""]
	];
}

/* 3.22 额外费用审核结算 */
function otherFeeSettle(){
	this.method="POST";
	this.api="order/otherFeeSettle";
	this.params=[
		["orderId","订单号","",""],
		["customerId","商户号","",""]
	];
}
