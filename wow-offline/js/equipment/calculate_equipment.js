/** 装备属性结算 **/

let random_pre_names = [
    "尊贵", "巨神", "恶魔", "领军", "符文", "英雄", "光荣", "君王", "翡翠", "前锋", "圣殿", "巨熊", "崇高", "鬼魂", "战铸", "酋长", "阳鳞", "亡魂", "霸主", "勇武",
    "血铸", "蛮兽", "哥特", "暴君", "烙铁", "使者", "雕花", "野战", "符记", "盐石", "乌贼", "胜利", "水银", "战击", "华丽", "深奥", "雕饰", "嗜血", "黑陶", "巢穴",
    "残忍", "乌木", "荣誉", "辐光", "保卫", "贵族", "蝎壳", "敬畏", "好战", "可汗", "勇士", "黑炉", "无情", "远古", "黑水", "黎明", "军旅", "破坏", "坚定", "血斑",
    "狂徒", "主将", "掠夺", "耐久", "变节", "劫掠", "军用", "玉髓", "邪恶", "镶带", "屠杀", "野人", "微光", "斥候", "森林", "先驱", "战痕", "抛光", "奇袭", "精兵",
    "久战", "探险", "冲锋", "冒险", "至高", "不屈", "噩梦", "豪华", "无双", "天使", "豪族", "暴徒", "火风", "近卫", "行者", "正直", "权力", "纹章", "怒爪", "秘术",
    "追踪", "勘探", "手工", "壮丽", "帝王", "骑兵", "游侠", "迅猛", "午夜", "秘文", "狡诈", "卫戍", "鹰眼", "徽记", "猎头", "守护", "间谍", "妖鬼", "纹饰", "拓荒",
    "粗鲁", "骨纹", "溪流", "僧侣", "争斗", "黑豹", "粗野", "刚硬", "歹徒", "迷彩", "野性", "铭文", "山地", "凶猛", "雏龙", "诗人", "典礼", "月光", "狩猎", "豺狼",
    "流浪", "原始", "大师", "永恒", "苍穹", "月语", "光辉", "优美", "微风", "天国", "幻影", "巫纹", "白骨", "信徒", "议员", "精灵", "奥秘", "丰饶", "皇家", "夜纹",
    "誓言", "盖亚", "逐风", "守望", "黑雾", "极光", "水晶", "地狱", "末日", "预言", "夜空", "活力", "狂热", "长者", "耐用", "贤者", "亡语", "星结", "虚灵", "夜行",
    "风霜", "明亮", "异教", "沼泽", "上古", "幻光", "法官", "礼节", "鲜血", "海盗", "水蛇", "小丑", "耳语", "土著", "蛮族", "夏至", "招魂", "天然", "收割", "监护",
    "女妖", "先祖", "旅者", "沉睡", "克星", "牺牲", "神圣", "奔行", "英勇", "黑暗", "毁灭", "暗彩", "闪光", "赐福", "珊瑚", "坚固", "圣战", "死战", "魔化", "清算",
    "次元", "无畏", "海潮", "狂暴", "佣兵", "骷髅", "鹰爪", "屠夫", "优雅", "北地", "袭击", "月神", "家传", "彩饰", "白骨", "珍珠", "痛苦", "峭壁", "野蛮", "粉碎"
];

/**
 * 生成属性词条
 * @param X 基础系数
 * @param lvl 装备等级
 * @param rare 装备稀有度
 * @param multiple 属性倍率
 */
function get_effect_value(X, lvl, rare, multiple) {
    multiple = multiple == null ? 1 : multiple;
    multiple *= get_multiple_by_rare(rare);
    return Math.ceil(lvl * multiple * X);
}

/**
 * rare 稀有度
 * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
 *
 * pos 装备位置
 * 99-其他
 * 左：01-头盔 02-项链 03-护肩 04-胸甲 05-披风 06-衬衫 07-战袍 08-护腕
 * 右：09-手套 10-腰带 11-腿甲 12-靴子 13-戒指 14-饰物
 * 下：15-主手 16-副手
 *
 * inclination 装备倾向
 * 9-其他
 * 1-物理 2-法系
 *
 * type 装备类型（非武器）
 * 99-其他
 * 01-布甲 02-皮甲 03-锁甲 04-板甲
 *
 * type 装备类型（武器）
 * 99-其他
 * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
 * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
 * 31-弓 32-弩 33-枪
 * 41-盾牌 42-副手
 */

/**
 * 生成随机装备
 */
function create_random_equipment(lvl, rare, pos, inclination, type) {
    let model = {};
    // 稀有度
    if (rare == null) {
        rare = 100 * Math.random();
        if (rare <= 10) {
            rare = 1;// 10%
        } else if (rare <= 25) {
            rare = 2;// 15%
        } else if (rare <= 90) {
            rare = 3;// 65%
        } else if (rare <= 98) {
            rare = 4;// 8%
        } else {
            rare = 5;// 2%
        }
        // rare = 5;
    }
    // 装备位置
    if (pos == null) {
        pos = 100 * Math.random();
        if (pos <= 5) {
            pos = 1;
        } else if (pos <= 10) {
            pos = 2;
        } else if (pos <= 15) {
            pos = 3;
        } else if (pos <= 20) {
            pos = 4;
        } else if (pos <= 25) {
            pos = 5;
        } else if (pos <= 30) {
            pos = 8;
        } else if (pos <= 35) {
            pos = 9;
        } else if (pos <= 40) {
            pos = 10;
        } else if (pos <= 45) {
            pos = 11;
        } else if (pos <= 50) {
            pos = 12;
        } else if (pos <= 60) {
            pos = 13;
        } else if (pos <= 70) {
            pos = 14;
        } else if (pos <= 75) {
            pos = 16;
        } else if (pos <= 100) {
            pos = 15;
        }
    }
    // 装备倾向
    if (inclination == null) {
        inclination = Math.round(Math.random()) + 1;
        // inclination_random = 1;
    }
    // 装备类型
    if (type == null) {
        if (pos === 1 || pos === 3 || pos === 4 || pos === 8 || pos === 9 || pos === 10 || pos === 11 || pos === 12) {
            type = Math.ceil(Math.random() * 4);// 布皮锁板装备
            // type_random = 4;
        } else if (pos === 2 || pos === 6 || pos === 7 || pos === 13 || pos === 14) {
            type = 99;// 2项链 6衬衫 7战袍 13戒指 14饰品
        } else if (pos === 5) {
            type = 1;// 披风
        } else if (pos === 15) {
            type = random_in_array([11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33]);// 武器
        } else if (pos === 16) {
            type = random_in_array([41, 42]);// 副手
        }
    }

    let attribute = get_attribute_by_pos(pos, type);
    // 装备属性系数
    let multiple = attribute[0];
    // 装备名称
    let name = attribute[1];
    // 装备类型
    let type_name = attribute[2];
    model.name = random_in_array(random_pre_names) + name;
    model.type_name = type_name;
    model.rare = rare;
    model.pos = pos;
    model.type = type;
    model.c_lvl = lvl;
    model.e_lvl = lvl;
    model.effect = [];
    model.icon = create_equipment_icon(model);
    model.affix = [multiple, pos * 1000 + inclination * 100 + type, "random", "random"];
    // console.log(model);
    return create_equipment_by_model(model);
}

/**
 * 生成固定装备
 */
function create_target_equipment(target_equipment) {
    let model = {};
    let attribute = get_attribute_by_pos(target_equipment.pos, target_equipment.type);
    model.type_name = attribute[2];
    model.name = target_equipment.name;
    model.rare = target_equipment.rare;
    model.pos = target_equipment.pos;
    model.type = target_equipment.type;
    model.c_lvl = target_equipment.c_lvl;
    model.e_lvl = target_equipment.e_lvl;
    model.effect = target_equipment.effect;
    model.icon = target_equipment.icon;
    model.affix = target_equipment.affix;
    // console.log(model);
    return create_equipment_by_model(model);
}

/**
 * 获取装备的属性系数和名称
 * @param pos
 * @param type
 * @return {(number|string)[]}
 */
function get_attribute_by_pos(pos, type) {
    let multiple = 0;
    let name = "";
    let type_name = "";
    switch (pos) {
        case 1:
            multiple = 0.8;
            type_name = "头部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "头冠";
                    break;
                case 2:
                    name = "皮盔";
                    break;
                case 3:
                    name = "面甲";
                    break;
                case 4:
                    name = "重盔";
                    break;
            }
            break;
        case 2:
            multiple = 0.6;
            type_name = "颈部";
            name = "项链";
            break;
        case 3:
            multiple = 0.8;
            type_name = "肩部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "披肩";
                    break;
                case 2:
                    name = "护肩";
                    break;
                case 3:
                    name = "肩甲";
                    break;
                case 4:
                    name = "肩铠";
                    break;
            }
            break;
        case 4:
            multiple = 1;
            type_name = "胸部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "罩袍";
                    break;
                case 2:
                    name = "皮衣";
                    break;
                case 3:
                    name = "链甲";
                    break;
                case 4:
                    name = "胸铠";
                    break;
            }
            break;
        case 5:
            multiple = 0.6;
            type_name = "背部 " + get_type_name(type);
            name = "斗篷";
            break;
        case 6:
            multiple = 0;
            type_name = name = "衬衫";
            break;
        case 7:
            multiple = 0;
            type_name = name = "战袍";
            break;
        case 8:
            multiple = 0.6;
            type_name = "手腕 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "护腕";
                    break;
                case 2:
                    name = "护臂";
                    break;
                case 3:
                    name = "腕轮";
                    break;
                case 4:
                    name = "腕甲";
                    break;
            }
            break;
        case 9:
            multiple = 0.8;
            type_name = "手部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "裹手";
                    break;
                case 2:
                    name = "手套";
                    break;
                case 3:
                    name = "护手";
                    break;
                case 4:
                    name = "手甲";
                    break;
            }
            break;
        case 10:
            multiple = 0.6;
            type_name = "腰部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "束腰";
                    break;
                case 2:
                    name = "皮带";
                    break;
                case 3:
                    name = "腰带";
                    break;
                case 4:
                    name = "护腰";
                    break;
            }
            break;
        case 11:
            multiple = 1;
            type_name = "腿部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "裹腿";
                    break;
                case 2:
                    name = "护腿";
                    break;
                case 3:
                    name = "腿甲";
                    break;
                case 4:
                    name = "腿铠";
                    break;
            }
            break;
        case 12:
            multiple = 0.8;
            type_name = "脚部 " + get_type_name(type);
            switch (type) {
                case 1:
                    name = "便鞋";
                    break;
                case 2:
                    name = "皮靴";
                    break;
                case 3:
                    name = "重靴";
                    break;
                case 4:
                    name = "护胫";
                    break;
            }
            break;
        case 13:
            multiple = 0.6;
            type_name = name = "戒指";
            break;
        case 14:
            multiple = 0.6;
            type_name = name = "饰品";
            break;
        case 15:
            switch (type) {
                case 11:
                    multiple = 1;
                    type_name = name = "匕首";
                    break;
                case 12:
                    multiple = 1;
                    type_name = name = "拳套";
                    break;
                case 13:
                    multiple = 1;
                    name = "轻斧";
                    type_name = "单手斧";
                    break;
                case 14:
                    multiple = 1;
                    name = "轻锤";
                    type_name = "单手锤";
                    break;
                case 15:
                    multiple = 1;
                    name = "轻剑";
                    type_name = "单手剑";
                    break;
                case 21:
                    multiple = 2;
                    name = "长矛";
                    type_name = "长柄武器";
                    break;
                case 22:
                    multiple = 2;
                    type_name = name = "法杖";
                    break;
                case 23:
                    multiple = 2;
                    name = "巨斧";
                    type_name = "双手斧";
                    break;
                case 24:
                    multiple = 2;
                    name = "巨锤";
                    type_name = "双手锤";
                    break;
                case 25:
                    multiple = 2;
                    name = "巨剑";
                    type_name = "双手剑";
                    break;
                case 31:
                    multiple = 2;
                    name = "长弓";
                    type_name = "远程武器";
                    break;
                case 32:
                    multiple = 2;
                    name = "强弩";
                    type_name = "远程武器";
                    break;
                case 33:
                    multiple = 2;
                    name = "步枪";
                    type_name = "远程武器";
                    break;
            }
            break;
        case 16:
            multiple = 1;
            switch (type) {
                case 41:
                    name = "之盾";
                    type_name = "副手 盾牌";
                    break;
                case 42:
                    name = "法器";
                    type_name = "副手 法器";
                    break;
            }
            break;
    }
    return [multiple, name, type_name];
}

/**
 * 生成装备
 * @param model 装备模板
 */
function create_equipment_by_model(model) {
    let equipment = {};
    let equipment_name = [];
    equipment.icon = model.icon;
    equipment.rare = model.rare;
    equipment.pos = model.pos;
    equipment.type = model.type;
    equipment.type_name = model.type_name;
    equipment.c_lvl = model.c_lvl;
    equipment.e_lvl = model.e_lvl;
    equipment.effect = model.effect == null ? [] : model.effect;
    if (model.affix != null) {
        let multiple = model.affix[0];
        for (let i = 1; i < model.affix.length; i++) {
            let index = model.affix[i];
            let func;
            if (typeof index == "number") {
                func = dictionary_affix_base[index];// 装备固有属性
            } else {
                if (index === "random") {
                    let affix_array;
                    let affix_length;
                    if (equipment_name.length === 0) {
                        affix_array = dictionary_affix_prefix;
                        affix_length = dictionary_affix_prefix_length;
                    } else {
                        affix_array = dictionary_affix_suffix;
                        affix_length = dictionary_affix_suffix_length;
                    }
                    let random = Math.floor(Math.random() * affix_length);
                    let index = 0;
                    for (let affix in affix_array) {
                        if (index === random) {
                            if (equipment_name.length === 0) {
                                equipment_name.push(affix + "之");
                            } else {
                                equipment_name.push(affix + "的");
                            }
                            func = affix_array[affix];// 随机词缀
                            break;
                        }
                        index++;
                    }
                } else {
                    if (equipment_name.length === 0) {
                        func = dictionary_affix_prefix[index];
                        equipment_name.push(index + "之");
                    } else {
                        func = dictionary_affix_suffix[index];
                        equipment_name.push(index + "的");
                    }
                }
            }
            let effect_list = func(equipment.e_lvl, equipment.rare, multiple);
            for (let j = 0; j < effect_list.length; j++) {
                equipment.effect.push(effect_list[j]);
            }
        }
    }
    equipment_name.push(model.name);
    equipment.name = equipment_name.join(" ");
    // console.log(equipment);
    return equipment;
}

function get_type_name(type) {
    switch (type) {
        case 1:
            return "布甲";
        case 2:
            return "皮甲";
        case 3:
            return "锁甲";
        case 4:
            return "板甲";
    }
}

/**
 * 生成装备图标
 */
function create_equipment_icon(model) {
    let type = model.pos * 100 + model.type;
    let equipment_icon = dictionary_equipment_icon[type];
    let index = Math.floor(Math.random() * equipment_icon.length);
    return equipment_icon[index];
}

/**
 * 判断是否可装备
 * @param equipment
 */
function check_can_equip(equipment) {
    let pos = equipment.pos;
    let type = equipment.type;
    if (pos === 2 || pos === 5 || pos === 6 || pos === 7 || pos === 13 || pos === 14) {
        return true;// 2项链 5披风 6衬衫 7战袍 13戒指 14饰品
    } else if (pos === 1 || pos === 3 || pos === 4 || pos === 8 || pos === 9 || pos === 10 || pos === 11 || pos === 12) {
        if (current_character.job < 30) {
            return type <= 4;// 板甲职业
        } else if (current_character.job < 50) {
            return type <= 3;// 锁甲职业
        } else if (current_character.job < 70) {
            return type <= 2;// 皮甲职业
        } else {
            return type <= 1;// 布甲职业
        }
    } else if (pos === 15 || pos === 16) {
        if (current_character.job < 20) {
            return is_in_array(type, [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 41]);
        } else if (current_character.job < 30) {
            return is_in_array(type, [13, 14, 15, 21, 23, 24, 25, 41]);
        } else if (current_character.job < 40) {
            return is_in_array(type, [31, 32, 33]);
        } else if (current_character.job < 50) {
            return is_in_array(type, [12, 13, 14, 22, 23, 24, 41, 42]);
        } else if (current_character.job < 60) {
            return is_in_array(type, [11, 14, 21, 22, 24, 42]);
        } else if (current_character.job < 70) {
            return is_in_array(type, [11, 12, 13, 14, 15]);
        } else if (current_character.job < 80) {
            return is_in_array(type, [11, 14, 22, 42]);
        } else if (current_character.job < 90) {
            return is_in_array(type, [11, 15, 22, 42]);
        } else {
            return is_in_array(type, [11, 15, 22, 42]);
        }
    }
    return false;
}
