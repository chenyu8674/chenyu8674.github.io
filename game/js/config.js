var Config = new Object();

Config.titleText = ["", "", ""];//任务名称
Config.contentText = ["", "", ""];//任务说明
Config.rememberText = ["", "", ""]; //记忆阶段顶栏文字
Config.exerciseText = ["", "", ""]; //做题阶段顶栏文字
Config.rememberTime = [-1, -1, -1, -1, -1]; //每级的记忆阶段限时（单位：秒，-1为不限时）
Config.exerciseTime = [-1, -1, -1, -1, -1]; //每级的做题阶段限时（单位：秒，-1为不限时）
Config.taskTime = 600;//任务时间限制（单位：秒，-1为不限时）