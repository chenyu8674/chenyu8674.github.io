// 基础速度系数
let ONLINE_MULTIPLE = 10;

// 调试加速系数
let LOCAL_MULTIPLE = 10;

// 回合时间
let TURN_TIME = 1000 / ONLINE_MULTIPLE;

// 食用补给0~100回复时间
let HEAL_TIME = 10 / ONLINE_MULTIPLE;

// 移动距离
let MOVE_DISTANCE = 5 * ONLINE_MULTIPLE;

// 经验系数
let EXP_MULTIPLE = is_in_local_mode() ? 0 : 1;

// 金钱系数
let MONEY_MULTIPLE = 1;

// 掉落系数
let DROP_MULTIPLE = 1;