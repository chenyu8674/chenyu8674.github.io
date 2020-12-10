/** 装备一览 **/
let dictionary_equipment;
$(document).ready(function () {
    dictionary_equipment = new_equipment();
});

function new_equipment() {
    let equipment = {}
    /**
     * rare 稀有度
     * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
     *
     * pos 装备位置
     * 99-其他
     * 左：01-头盔 02-项链 03-肩膀 04-胸甲 05-披风 06-衬衫 07-战袍 08-手腕
     * 右：09-手套 10-腰带 11-腿甲 12-鞋子 13-戒指 14-饰品
     * 下：15-主手 16-副手
     *
     * type1 装备倾向
     * 9-其他
     * 1-物理 2-法系
     *
     * type2 装备类型（非武器）
     * 99-其他
     * 01-布甲 02-皮甲 03-锁甲 04-板甲
     *
     * type2 装备类型（武器）
     * 99-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     */

    equipment["newbee_shirt"] = {
        name: "新手衬衫",
        icon: "INV_Shirt_01",
        rare: 2,
        pos: 6,
        type: 99,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [1, 6199]
    };

    equipment["newbee_two_hand_sword_str"] = {
        name: "训练双手剑",
        icon: "INV_Sword_06",
        rare: 2,
        pos: 15,
        type: 25,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [2, 15125]
    };

    equipment["newbee_one_hand_sword_str"] = {
        name: "训练单手剑",
        type_name: "单手剑",
        icon: "INV_Sword_04",
        rare: 2,
        pos: 15,
        type: 15,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [1, 15115]
    };

    equipment["newbee_one_hand_sword_int"] = {
        name: "训练单手剑",
        type_name: "单手剑",
        icon: "INV_Sword_05",
        rare: 2,
        pos: 15,
        type: 15,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [1, 15215]
    };

    equipment["newbee_shield_str"] = {
        name: "训练盾牌",
        type_name: "盾牌",
        icon: "INV_Shield_03",
        rare: 2,
        pos: 16,
        type: 41,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [1, 16141]
    };

    equipment["newbee_bow"] = {
        name: "训练之弓",
        type_name: "弓",
        icon: "INV_Weapon_Bow_02",
        rare: 2,
        pos: 15,
        type: 31,
        c_lvl: 1,
        e_lvl: 1,
        effect: [],
        affix: [2, 15131]
    };

    equipment["test_two_hand_sword_str"] = {
        name: "测试用双手剑",
        type_name: "双手剑",
        icon: "INV_Sword_06",
        rare: 3,
        pos: 15,
        type: 25,
        effect: [],
        affix: [2, 15125, "random", "random"]
    };

    equipment["test_two_hand_bow"] = {
        name: "测试用长弓",
        rare: 4,
        pos: 15,
        type: 31,
        effect: [],
        affix: [2, 15131, "random", "random"]
    };

    equipment["test_one_hand_sword_str"] = {
        name: "测试用单手剑",
        rare: 3,
        pos: 15,
        type: 15,
        effect: [],
        affix: [1, 15115, "random", "random"]
    };

    equipment["test_one_hand_sword_int"] = {
        name: "测试用单手剑",
        rare: 3,
        pos: 15,
        type: 15,
        effect: [],
        affix: [1, 15215, "random", "random"]
    };

    equipment["test_shield_str"] = {
        name: "测试用盾牌",
        rare: 3,
        pos: 16,
        type: 41,
        effect: [
            "block_chance_final+=30"
        ],
        affix: [1, 16141, "random", "random"]
    };

    equipment["test_shield_int"] = {
        name: "测试用盾牌",
        rare: 3,
        pos: 16,
        type: 41,
        effect: [
            "block_chance_final+=30"
        ],
        affix: [1, 16241, "random", "random"]
    };

    equipment["test_book"] = {
        name: "测试用法典",
        rare: 3,
        pos: 16,
        type: 42,
        effect: [
            "magic_power_percent+=5"
        ],
        affix: [1, 16242, "random", "random"]
    };

    equipment["test_armor"] = {
        name: "测试用板甲",
        rare: 3,
        pos: 4,
        type: 104,
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
        rare: 3,
        pos: 4,
        type: 103,
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
        rare: 3,
        pos: 4,
        type: 102,
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
        rare: 3,
        pos: 4,
        type: 101,
        effect: [
            "str+=120",
            "agi+=120",
            "sta+=200",
            "int+=120",
            "spr+=120"
        ],
        affix: [1, 101]
    };

    return equipment;
}