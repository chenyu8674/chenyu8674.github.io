/** 装备一览 **/
let dictionary_equipment;
$(document).ready(function () {
    dictionary_equipment = new_equipment();
});

function new_equipment() {
    let equipment = {}
    /**
     * 稀有度
     * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
     *
     * 装备位置
     * 99-其他
     * 左：01-头盔 02-项链 03-肩膀 04-胸甲 05-披风 06-衬衫 07-战袍 08-手腕
     * 右：09-手套 10-腰带 11-腿甲 12-鞋子 13-戒指 14-饰品
     * 下：15-主手 16-副手
     *
     * 装备倾向
     * 9-其他
     * 1-物理 2-法系
     *
     * 装备类型（非武器）
     * 99-其他
     * 01-布甲 02-皮甲 03-锁甲 04-板甲
     *
     * 装备类型（武器）
     * 99-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     */

    equipment["newbee_shirt"] = {
        name: "新手衬衫",
        rare: 2,// 稀有度
        pos: 6,// 位置
        type: 999,// 类型
        lvl_max: 1,// 允许生成的最大等级
        affix: [1, 6]
    };

    equipment["newbee_two_hand_sword_str"] = {
        name: "训练双手剑",
        rare: 2,// 稀有度
        pos: 15,// 位置
        type: 125,// 类型
        lvl_max: 1,// 允许生成的最大等级
        effect: [],
        affix: [2, 125]
    };

    equipment["newbee_one_hand_sword_str"] = {
        name: "训练单手剑",
        rare: 2,// 稀有度
        pos: 15,// 位置
        type: 115,// 类型
        lvl_max: 1,// 允许生成的最大等级
        effect: [],
        affix: [1, 115]
    };

    equipment["newbee_one_hand_sword_int"] = {
        name: "训练单手剑",
        rare: 2,// 稀有度
        pos: 15,// 位置
        type: 215,// 类型
        lvl_max: 1,// 允许生成的最大等级
        effect: [],
        affix: [1, 215]
    };

    equipment["newbee_shield_str"] = {
        name: "训练盾牌",
        rare: 2,// 稀有度
        pos: 16,// 位置
        type: 141,// 类型
        lvl_max: 1,// 允许生成的最大等级
        effect: [
            "block_chance_final+=10"
        ],
        affix: [1, 141]
    };

    equipment["test_two_hand_sword_str"] = {
        name: "测试用双手剑",
        rare: 3,// 稀有度
        pos: 15,// 位置
        type: 125,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [],
        affix: [2, 125, "野熊", "暴击"]
    };

    equipment["test_two_hand_bow"] = {
        name: "测试用长弓",
        rare: 4,// 稀有度
        pos: 15,// 位置
        type: 131,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [],
        affix: [2, 131, "灵猴", "暴击"]
    };

    equipment["test_one_hand_sword_str"] = {
        name: "测试用单手剑",
        rare: 3,// 稀有度
        pos: 15,// 位置
        type: 115,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [],
        affix: [1, 115, "野熊", "暴击"]
    };

    equipment["test_one_hand_sword_int"] = {
        name: "测试用单手剑",
        rare: 3,// 稀有度
        pos: 15,// 位置
        type: 215,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [],
        affix: [1, 215, "雄鹰", "暴击"]
    };

    equipment["test_shield_str"] = {
        name: "测试用盾牌",
        rare: 3,// 稀有度
        pos: 16,// 位置
        type: 141,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "block_chance_final+=30"
        ],
        affix: [1, 141, "野熊", "格挡"]
    };

    equipment["test_shield_int"] = {
        name: "测试用盾牌",
        rare: 3,// 稀有度
        pos: 16,// 位置
        type: 241,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "block_chance_final+=30"
        ],
        affix: [1, 241, "雄鹰", "格挡"]
    };

    equipment["test_book"] = {
        name: "测试用法典",
        rare: 3,// 稀有度
        pos: 16,// 位置
        type: 242,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "magic_power_percent+=5"
        ],
        affix: [1, 242, "雄鹰", "暴击"]
    };

    equipment["test_armor"] = {
        name: "测试用板甲",
        rare: 3,// 稀有度
        pos: 4,// 位置
        type: 104,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "str+=120",
            "agi+=120",
            "sta+=200",
            "int+=120",
            "spr+=120"
        ],
        affix: [1, 104]
    };

    equipment["test_chain"] = {
        name: "测试用锁甲",
        rare: 3,// 稀有度
        pos: 4,// 位置
        type: 103,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "str+=120",
            "agi+=120",
            "sta+=200",
            "int+=120",
            "spr+=120"
        ],
        affix: [1, 103]
    };

    equipment["test_leather"] = {
        name: "测试用皮甲",
        rare: 3,// 稀有度
        pos: 4,// 位置
        type: 102,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "str+=120",
            "agi+=120",
            "sta+=200",
            "int+=120",
            "spr+=120"
        ],
        affix: [1, 102]
    };

    equipment["test_cloth"] = {
        name: "测试用布甲",
        rare: 3,// 稀有度
        pos: 4,// 位置
        type: 201,// 类型
        lvl_max: MAX_LVL,// 允许生成的最大等级
        effect: [
            "str+=120",
            "agi+=120",
            "sta+=200",
            "int+=120",
            "spr+=120"
        ],
        affix: [1, 201]
    };

    return equipment;
}