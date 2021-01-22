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
 *
 * c_lvl-可装备等级
 * e_lvl-物品等级
 */

/**
 * 生成随机装备模板(掉落)
 */
function get_random_equipment_model(max_count, lvl, rare, pos, inclination, type) {
    let model = create_random_equipment_model(lvl, rare, pos, inclination, type);
    let try_count = 0;
    while (try_count < max_count && !check_can_equip(create_equipment_by_model(model))) {
        try_count++;
        model = create_random_equipment_model(lvl, rare, pos, inclination, type);
    }
    return model;
}

/**
 * 生成随机装备模板
 */
function create_random_equipment_model(lvl, rare, pos, inclination, type) {
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
        // rare = 6;
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
        // inclination = 1;
    }
    // 装备类型
    if (type == null) {
        if (pos === 1 || pos === 3 || pos === 4 || pos === 8 || pos === 9 || pos === 10 || pos === 11 || pos === 12) {
            // 布皮锁板装备
            type = 100 * Math.random();
            if (type <= 25) {
                type = 1;
            } else if (type <= 50) {
                type = 2;
            } else if (type <= 75) {
                type = 3;
            } else {
                type = 4;
            }
            // type = 4;
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
    model.icon = create_equipment_icon(model, pos, type);
    let attribute = get_attribute_by_pos(pos, type, model.icon);
    // 装备名称
    model.name = random_in_array(random_pre_names) + attribute[1];
    model.rare = rare;
    model.c_lvl = lvl;
    model.e_lvl = lvl;
    // 生成随机前缀
    let affix_prefix = Math.floor(Math.random() * dictionary_affix_prefix_length);
    while (dictionary_affix_prefix[affix_prefix] == null || dictionary_affix_prefix[affix_prefix]() == null) {
        affix_prefix = Math.floor(Math.random() * dictionary_affix_prefix_length);
    }
    // 生成随机后缀，双手/远程武器不会有格挡词缀
    let affix_suffix_length = (model.type > 20 && model.type < 40) ? dictionary_affix_suffix_length - 1 : dictionary_affix_suffix_length;
    let affix_suffix = Math.floor(Math.random() * affix_suffix_length);
    while (dictionary_affix_suffix[affix_suffix] == null || dictionary_affix_suffix[affix_suffix]() == null) {
        affix_suffix = Math.floor(Math.random() * affix_suffix_length);
    }
    model.affix = [pos * 1000 + inclination * 100 + type, affix_prefix, affix_suffix];
    return model;
}

/**
 * 生成固定装备模板
 */
function create_static_equipment_model(name) {
    let base_model = new_equipment()[name];
    let model = {};
    let affix = base_model.affix;
    if (affix == null) {
        alert(base_model.name + " 数据异常");
        affix = [];
    }
    if (typeof affix === "number") {
        affix = [affix];
    }
    if (base_model.pos == null || base_model.type == null) {
        model.pos = Math.floor(affix[0] / 1000);
        model.type = affix[0] % 100;
    } else {
        model.pos = base_model.pos;
        model.type = base_model.type;
    }
    if (base_model.c_lvl == null || base_model.e_lvl == null) {
        model.c_lvl = 1;
        model.e_lvl = 1;
    } else {
        model.c_lvl = base_model.c_lvl;
        model.e_lvl = base_model.e_lvl;
    }
    let attribute = get_attribute_by_pos(model.pos, model.type, base_model.icon);
    model.type_name = attribute[2];
    model.name = name;
    model.rare = base_model.rare;
    model.effect = base_model.effect;
    model.icon = base_model.icon;
    model.detail = base_model.detail;
    model.skill = base_model.skill;
    model.affix = affix;
    return model;
}

/**
 * 生成装备
 * @param model 装备模板
 */
function create_equipment_by_model(model) {
    let equipment = {};
    let equipment_name = [];
    let affix = model.affix;
    if (affix == null) {
        if (model.effect != null) {
            equipment.effect = model.effect;
            return equipment;
        } else {
            alert("装备生成异常");
            return equipment;
        }
    }
    equipment.pos = Math.floor(affix[0] / 1000);
    equipment.type = affix[0] % 100;
    let attribute = get_attribute_by_pos(equipment.pos, equipment.type, model.icon);
    // 装备属性系数
    let multiple = attribute[0];
    equipment.type_name = attribute[2];
    equipment.icon = model.icon;
    equipment.rare = model.rare;
    equipment.c_lvl = model.c_lvl;
    equipment.e_lvl = model.e_lvl;
    equipment.detail = model.detail;
    equipment.effect = model.effect == null ? [] : model.effect;
    if (model.skill != null) {
        equipment.skill = eval("dictionary_equipment_skill." + model.skill + "()");
    }

    // 装备固有属性
    let affix_base_index = model.affix[0];
    let affix_base_func = dictionary_affix_base[affix_base_index];
    let affix_base_effect = affix_base_func(equipment.e_lvl, equipment.rare, multiple);
    equipment.effect = affix_base_effect.concat(equipment.effect);
    // 装备前缀属性
    let affix_prefix_index = model.affix[1];
    if (affix_prefix_index != null) {
        let affix_prefix_name = dictionary_affix_prefix[affix_prefix_index](true);
        equipment_name.push(affix_prefix_name + "之");
        let affix_prefix_func = dictionary_affix_prefix[affix_prefix_name];
        let affix_prefix_effect = affix_prefix_func(equipment.e_lvl, equipment.rare, multiple);
        equipment.effect = equipment.effect.concat(affix_prefix_effect);
    }
    // 装备后缀属性
    let affix_suffix_index = model.affix[2];
    if (affix_suffix_index != null) {
        let affix_suffix_name = dictionary_affix_suffix[affix_suffix_index](true);
        equipment_name.push(affix_suffix_name + "的");
        let affix_suffix_func = dictionary_affix_suffix[affix_suffix_name];
        let affix_suffix_effect = affix_suffix_func(equipment.e_lvl, equipment.rare, multiple);
        equipment.effect = equipment.effect.concat(affix_suffix_effect);
    }
    equipment_name.push(model.name);
    equipment.name = equipment_name.join(" ");
    return equipment;
}

/**
 * 获取装备的属性系数和名称
 * @param pos
 * @param type
 * @param icon
 * @return {(number|string)[]}
 */
function get_attribute_by_pos(pos, type, icon) {
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
            name = random_in_array(["项链", "挂坠"]);
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
            name = random_in_array(["斗篷", "披风"]);
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
            type_name = "戒指";
            name = random_in_array(["戒指", "指环"]);
            break;
        case 14:
            multiple = 0.6;
            type_name = "饰品";
            name = random_in_array(["饰品", "饰物", "挂件"]);
            break;
        case 15:
            switch (type) {
                case 11:
                    multiple = 0.6;
                    type_name = "匕首";
                    name = random_in_array(["匕首", "短刀", "长匕"]);
                    break;
                case 12:
                    multiple = 0.6;
                    type_name = "拳套";
                    name = random_in_array(["拳套", "指虎", "拳刃"]);
                    break;
                case 13:
                    multiple = 0.6;
                    name = random_in_array(["之斧", "轻斧", "短斧"]);
                    type_name = "单手斧";
                    break;
                case 14:
                    multiple = 0.6;
                    name = random_in_array(["之锤", "轻锤", "短锤"]);
                    type_name = "单手锤";
                    break;
                case 15:
                    multiple = 0.6;
                    name = random_in_array(["之剑", "轻剑", "刺剑"]);
                    type_name = "单手剑";
                    break;
                case 21:
                    multiple = 1.2;
                    name = random_in_array(["之矛", "之戟", "长矛"]);
                    type_name = "长柄武器";
                    break;
                case 22:
                    multiple = 1.2;
                    type_name = "法杖";
                    name = random_in_array(["之杖", "法杖", "长杖"]);
                    break;
                case 23:
                    multiple = 1.2;
                    name = random_in_array(["之斧", "巨斧", "重斧"]);
                    type_name = "双手斧";
                    break;
                case 24:
                    multiple = 1.2;
                    name = random_in_array(["之锤", "巨锤", "重锤"]);
                    type_name = "双手锤";
                    break;
                case 25:
                    multiple = 1.2;
                    name = random_in_array(["之剑", "巨剑", "重剑"]);
                    type_name = "双手剑";
                    break;
                case 31:
                    multiple = 1.2;
                    name = random_in_array(["之弓", "强弓", "长弓"]);
                    type_name = "远程武器";
                    break;
                case 32:
                    multiple = 1.2;
                    name = random_in_array(["之弩", "强弩", "巨弩"]);
                    type_name = "远程武器";
                    break;
                case 33:
                    multiple = 1.2;
                    name = random_in_array(["火枪", "步枪", "火炮"]);
                    type_name = "远程武器";
                    break;
            }
            break;
        case 16:
            multiple = 0.6;
            switch (type) {
                case 41:
                    name = random_in_array(["之盾", "护盾", "壁垒"]);
                    type_name = "副手 盾牌";
                    break;
                case 42:
                    if (icon.indexOf("book") > 0) {
                        name = random_in_array(["之书", "法典", "魔典"]);
                    } else if (icon.indexOf("orb") > 0) {
                        name = random_in_array(["法球", "宝珠", "宝石"]);
                    } else if (icon.indexOf("wand") > 0) {
                        name = random_in_array(["短杖", "魔杖", "魔棒"]);
                    } else if (icon.indexOf("lantern") > 0) {
                        name = "灯笼";
                    }
                    type_name = "副手 法器";
                    break;
            }
            break;
    }
    return [multiple, name, type_name];
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
function create_equipment_icon(model, pos, type) {
    type = pos * 100 + type;
    let equipment_icon = dictionary_equipment_icon[type];
    let index = Math.floor(Math.random() * equipment_icon.length);
    return equipment_icon[index];
}

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
        /**
         * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
         * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
         * 31-弓 32-弩 33-枪
         * 41-盾牌 42-副手
         */
        if (current_character.job < 20) {
            return is_in_array(type, [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 41]);
        } else if (current_character.job < 30) {
            return is_in_array(type, [13, 14, 15, 21, 23, 24, 25, 41]);
        } else if (current_character.job < 40) {
            return is_in_array(type, [31, 32, 33]);
        } else if (current_character.job < 50) {
            return is_in_array(type, [11, 12, 13, 14, 22, 23, 24, 41, 42]);
        } else if (current_character.job < 60) {
            return is_in_array(type, [11, 12, 14, 21, 22, 24, 42]);
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

/**
 * 获取装备卖店价格
 * @param equipment
 * @return {number}
 */
function get_equipment_price(equipment) {
    if (equipment.pos === 6 || equipment.pos === 7) {
        return 1;
    }
    let base_price = 10;
    switch (equipment.pos) {
        case 2:
        case 5:
        case 8:
        case 10:
        case 13:
        case 14:
            base_price += 6;
            break;
        case 1:
        case 3:
        case 9:
        case 12:
            base_price += 8;
            break;
        case 4:
        case 11:
            base_price += 10;
            break;
        case 15:
            if (equipment.type < 20) {
                base_price += 20;
            } else if (equipment.type < 30) {
                base_price += 40;
            } else {
                base_price += 35;
            }
            break;
        case 16:
            if (equipment.type === 41) {
                base_price += 25;
            } else {
                base_price += 12;
            }
            break;
    }
    base_price *= Math.pow(equipment.e_lvl + 5, 1.6) / 2;
    switch (equipment.type) {
        case 2:
            base_price *= 1.1;
            break;
        case 3:
            base_price *= 1.2;
            break;
        case 4:
            base_price *= 1.3;
            break;
    }
    base_price *= Math.pow(get_multiple_by_rare(equipment.rare), 4);
    return Math.round(base_price);
}

/**
 * 计算全身装备等级
 */
function get_equipment_lvl(role) {
    let equipment_lvl_list = [];
    let equipments = role.equipments;
    let ring_count = 0;
    let trinket_count = 0;
    let weapon_count = 0;
    for (let i = 0; i < equipments.length; i++) {
        let module = equipments[i];
        if (typeof module === "string") {
            module = create_static_equipment_model(module);
        }
        let equipment = create_equipment_by_model(module);
        let pos_new = equipment.pos;
        if (equipment.pos === 13) {
            pos_new += ring_count;
            ring_count++;
        }
        if (equipment.pos === 14) {
            pos_new += 1 + trinket_count;
            trinket_count++;
        }
        if (equipment.pos === 15) {
            pos_new += 2 + weapon_count;
            weapon_count++;
        }
        if (equipment.pos === 16) {
            pos_new = 18;
        }
        equipment_lvl_list[pos_new] = equipment.e_lvl;
    }
    if (has_equip_two_hand_weapon(role)) {
        equipment_lvl_list[18] = equipment_lvl_list[17];
    }
    let equipment_lvl = 0;
    for (let i = 0; i < equipment_lvl_list.length; i++) {
        if (equipment_lvl_list[i] != null) {
            equipment_lvl += equipment_lvl_list[i];
        }
    }
    return Math.ceil(equipment_lvl / 18);
}
