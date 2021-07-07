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
function get_random_equipment_model(param, max_count) {
    if (typeof param === "number") {
        let c_lvl = param;
        param = {};
        param.c_lvl = c_lvl;
    }
    max_count = max_count ? max_count : 1;
    let model = create_random_equipment_model(param);
    let try_count = 0;
    while (try_count < max_count && !check_can_equip(current_character, create_equipment_by_model(model))) {
        try_count++;
        model = create_random_equipment_model(param);
    }
    return model;
}

/**
 * 生成随机装备模板
 */
function create_random_equipment_model(param) {
    let model = {};
    // 稀有度
    let rare = param.rare;
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
    model.rare = rare;
    // 装备位置
    let pos = param.pos;
    if (pos == null) {
        pos = 100 * Math.random();
        if (pos <= 6) {
            pos = 1;// 6% 头部
        } else if (pos <= 12) {
            pos = 2;// 6% 项链
        } else if (pos <= 18) {
            pos = 3;// 6% 肩部
        } else if (pos <= 24) {
            pos = 4;// 6% 胸部
        } else if (pos <= 30) {
            pos = 5;// 6% 披风
        } else if (pos <= 36) {
            pos = 8;// 6% 手腕
        } else if (pos <= 42) {
            pos = 9;// 6% 手部
        } else if (pos <= 48) {
            pos = 10;// 6% 腰部
        } else if (pos <= 54) {
            pos = 11;// 6% 腿部
        } else if (pos <= 60) {
            pos = 12;// 6% 脚部
        } else if (pos <= 68) {
            pos = 13;// 8% 戒指
        } else if (pos <= 75) {
            pos = 14;// 7% 饰品
        } else if (pos <= 80) {
            pos = 16;// 5% 副手
        } else if (pos <= 100) {
            pos = 15;// 20% 主手
        }
    }
    // 灰白色项链戒指饰品升格为绿色
    if (model.rare < 3 && (pos === 2 || pos === 13 || pos === 14)) {
        model.rare = 3;
    }
    // 装备倾向
    let inclination = random_list([1, 2]);
    // inclination = 1;
    // 装备类型
    let type = param.type;
    if (type == null) {
        if (pos === 1 || pos === 3 || pos === 4 || pos === 8 || pos === 9 || pos === 10 || pos === 11 || pos === 12) {
            // 布皮锁板装备
            type = random_list([1, 2, 3, 4]);
            // type = 4;
        } else if (pos === 2 || pos === 6 || pos === 7 || pos === 13 || pos === 14) {
            type = 99;// 2项链 6衬衫 7战袍 13戒指 14饰品
        } else if (pos === 5) {
            type = 1;// 披风
        } else if (pos === 15) {
            type = random_list([11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 31, 32, 33]);// 武器
        } else if (pos === 16) {
            type = random_list([41, 42]);// 副手
        }
    }
    // 装备后绑定
    model.bind = model.rare >= 3 ? 1 : 0;
    // 装备图标
    model.icon = create_equipment_icon(model, pos, type);
    // 装备名称
    let attribute = get_attribute_by_pos(pos, type, model.icon);
    model.name = random_list(random_pre_names) + attribute[1];
    // 装备等级
    model.c_lvl = param.c_lvl;
    model.e_lvl = param.e_lvl ? param.e_lvl : Math.round(param.c_lvl * get_multiple_by_rare(model.rare));
    // 装备词缀
    model.affix = [pos * 1000 + inclination * 100 + type];
    let affix_suffix_length = (type > 20 && type < 40) ? dictionary_affix_suffix_length - 1 : dictionary_affix_suffix_length;
    // if (model.rare >= 3) {
    if (model.rare >= 0) {
        // 生成随机前缀
        let affix_prefix;
        if (pos !== 14) {
            affix_prefix = Math.floor(Math.random() * dictionary_affix_prefix_length);
            while (dictionary_affix_prefix[affix_prefix] == null || dictionary_affix_prefix[affix_prefix]() == null) {
                affix_prefix = Math.floor(Math.random() * dictionary_affix_prefix_length);
            }
        } else {
            affix_prefix = Math.floor(Math.random() * affix_suffix_length);
            while (dictionary_affix_suffix[affix_prefix] == null || dictionary_affix_suffix[affix_prefix]() == null) {
                affix_prefix = Math.floor(Math.random() * affix_suffix_length);
            }
        }
        model.affix.push(affix_prefix);
    }
    // if (model.rare >= 5) {
    if (model.rare >= 0) {
        // 生成随机后缀，双手/远程武器不会有格挡词缀
        let affix_suffix = Math.floor(Math.random() * affix_suffix_length);
        while (dictionary_affix_suffix[affix_suffix] == null || dictionary_affix_suffix[affix_suffix]() == null) {
            affix_suffix = Math.floor(Math.random() * affix_suffix_length);
        }
        model.affix.push(affix_suffix);
    }
    return model;
}

/**
 * 生成固定装备模板
 */
function create_static_equipment_model(name) {
    let base_model = new_equipment()[name];
    if (base_model == null) {
        return;
    }
    let model = {};
    let affix = base_model.affix;
    if (affix == null) {
        alert("装备数据异常：" + name);
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
    // 装备后绑定
    if (base_model.bind) {
        model.bind = base_model.bind;
    }
    model.name = base_model.name;
    model.rare = base_model.rare;
    model.effect = base_model.effect;
    model.icon = base_model.icon;
    model.detail = base_model.detail;
    model.skill = base_model.skill;
    model.sets = base_model.sets;
    model.multiple = base_model.multiple;
    model.affix = affix;
    return model;
}

/**
 * 生成装备
 * @param model 装备模板
 */
function create_equipment_by_model(model) {
    model = get_equipment_by_model(model)[1];
    if (model == null) {
        return;
    }
    let equipment = {};
    let equipment_name = [];
    let affix = model.affix;
    if (affix == null) {
        if (model.effect == null) {
            return;
        }
        equipment.effect = model.effect;
        return equipment;
    }
    equipment.pos = Math.floor(affix[0] / 1000);
    equipment.type = affix[0] % 100;
    let attribute = get_attribute_by_pos(equipment.pos, equipment.type, model.icon);
    // 装备属性系数
    let multiple = model.multiple != null ? attribute[0] * model.multiple : attribute[0];
    equipment.type_name = attribute[2];
    equipment.bind = model.bind;
    equipment.icon = model.icon;
    equipment.rare = model.rare;
    equipment.c_lvl = model.c_lvl;
    equipment.e_lvl = model.e_lvl;
    equipment.detail = model.detail;
    equipment.sets = model.sets;
    // 装备属性转化
    let equipment_effects = [];
    let model_effects = model.effect;
    if (model_effects != null && model_effects.length > 0) {
        if (typeof dictionary_affix_prefix[model_effects[0]] === "function") {
            equipment_effects.push(...dictionary_affix_prefix[model_effects[0]](model.e_lvl, model.rare, multiple));
        } else {
            equipment_effects.push(model_effects[0]);
        }
        for (let i = 1; i < model_effects.length; i++) {
            if (typeof dictionary_affix_suffix[model_effects[i]] === "function") {
                equipment_effects.push(...dictionary_affix_suffix[model_effects[i]](model.e_lvl, model.rare, multiple));
            } else {
                equipment_effects.push(model_effects[i]);
            }
        }
    }
    model.effect = equipment_effects;
    equipment.effect = model.effect == null ? [] : model.effect;
    let effects = equipment.effect;
    for (let i = 0; i < effects.length; i++) {
        effects[i] = get_main_effect(effects[i], equipment);
    }
    if (model.skill != null) {
        equipment.skill = dictionary_equipment_skill[model.skill]();
    }
    // 装备固有属性
    let affix_base_index = model.affix[0];
    let affix_base_func = dictionary_affix_base[affix_base_index];
    let affix_base_effect = affix_base_func(equipment.e_lvl, equipment.rare);
    equipment.effect = affix_base_effect.concat(equipment.effect);
    // 装备前缀属性
    let affix_prefix_index = model.affix[1];
    if (affix_prefix_index != null) {
        let dictionary_affix = equipment.pos === 14 ? dictionary_affix_suffix : dictionary_affix_prefix;
        let affix_prefix_name = dictionary_affix[affix_prefix_index](true);
        equipment_name.push(affix_prefix_name + "之");
        let affix_prefix_func = dictionary_affix[affix_prefix_name];
        let affix_prefix_effect = affix_prefix_func(equipment.e_lvl, equipment.rare, multiple);
        for (let i = 0; i < affix_prefix_effect.length; i++) {
            affix_prefix_effect[i] = get_main_effect(affix_prefix_effect[i], equipment);
        }
        equipment.effect = equipment.effect.concat(affix_prefix_effect);
    }
    // 装备后缀属性
    let affix_suffix_index = model.affix[2];
    if (affix_suffix_index != null) {
        let affix_suffix_name = dictionary_affix_suffix[affix_suffix_index](true);
        equipment_name.push(affix_suffix_name + "的");
        let affix_suffix_func = dictionary_affix_suffix[affix_suffix_name];
        let affix_suffix_effect = affix_suffix_func(equipment.e_lvl, equipment.rare, multiple);
        for (let i = 0; i < affix_suffix_effect.length; i++) {
            affix_suffix_effect[i] = get_main_effect(affix_suffix_effect[i], equipment);
        }
        equipment.effect = equipment.effect.concat(affix_suffix_effect);
    }
    equipment_name.push(model.name);
    equipment.name = equipment_name.join(" ");
    return equipment;
}

/**
 * 将存储的装备转化为装备对象
 */
function get_equipment_by_model(model) {
    let name;
    let item;
    if (typeof model === "number") {
        name = model;
        item = create_static_equipment_model(model);
        delete item.bind;
    } else if (typeof model[0] === "number") {
        name = model[0];
        item = create_static_equipment_model(model[0]);
        item.bind = model[1];
    } else {
        item = model;
    }
    return [name, item];
}

/**
 * 装备排序算法
 * @param a
 * @param b
 * @return {number}
 */
function sort_equipment(a, b) {
    if (a == null) {
        return 1;
    }
    if (b == null) {
        return -1;
    }
    if (typeof a === "number") {
        a = create_static_equipment_model(a);
    }
    if (typeof b === "number") {
        b = create_static_equipment_model(b);
    }
    a = create_equipment_by_model(a);
    b = create_equipment_by_model(b);
    if (a.rare === 6 && b.rare !== 6) {
        return -1;
    }
    if (b.rare === 6 && a.rare !== 6) {
        return 1;
    }
    if (a.pos !== b.pos) {
        return a.pos - b.pos;
    }
    if (a.type !== b.type) {
        return a.type - b.type;
    }
    if (a.rare !== b.rare) {
        return a.rare - b.rare;
    }
    if (a.c_lvl !== b.c_lvl) {
        return a.c_lvl - b.c_lvl;
    }
    if (a.e_lvl !== b.e_lvl) {
        return a.e_lvl - b.e_lvl;
    }
    if (a.icon !== b.icon) {
        return a.icon > b.icon ? 1 : -1;
    }
    return a.name > b.name ? 1 : -1;
}

/** 获取当前职业的主属性 **/
function get_main_effect(effect, equipment) {
    if (effect.startsWith("main")) {
        let main = current_character == null ? "str" : dictionary_job.job_main[current_character.job];
        if (equipment != null) {
            if (equipment.type === 1 && equipment.pos !== 5 && (main === "str" || main === "agi")) {
                main = "int";
            } else if (equipment.type === 3 && main === "str") {
                main = "agi";
            } else if (equipment.type === 4 && main === "agi") {
                main = "str";
            } else if (equipment.type === 4 && main === "spr") {
                main = "int";
            }
        }
        return effect.replace("main", main);
    } else if (effect.startsWith("second")) {
        let second = current_character == null ? "agi" : dictionary_job.job_second[current_character.job];
        if (equipment != null) {
            if (equipment.type === 1 && equipment.pos !== 5 && (second === "str" || second === "agi")) {
                second = "spr";
            } else if (equipment.type === 3 && second === "agi") {
                second = "str";
            } else if (equipment.type === 4 && second === "str") {
                second = "agi";
            } else if (equipment.type === 4 && second === "int") {
                second = "spr";
            }
        }
        return effect.replace("second", second);
    } else {
        return effect;
    }
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
            multiple = MULTIPLE_1;
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
            multiple = MULTIPLE_2;
            type_name = "颈部";
            name = random_list(["项链", "挂坠"]);
            break;
        case 3:
            multiple = MULTIPLE_3;
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
            multiple = MULTIPLE_4;
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
            multiple = MULTIPLE_5;
            type_name = "背部 " + get_type_name(type);
            name = random_list(["斗篷", "披风"]);
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
            multiple = MULTIPLE_8;
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
            multiple = MULTIPLE_9;
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
            multiple = MULTIPLE_10;
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
            multiple = MULTIPLE_11;
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
            multiple = MULTIPLE_12;
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
            multiple = MULTIPLE_13;
            type_name = "戒指";
            name = random_list(["戒指", "指环"]);
            break;
        case 14:
            multiple = MULTIPLE_14;
            type_name = "饰品";
            name = random_list(["饰品", "饰物", "挂件"]);
            break;
        case 15:
            switch (type) {
                case 11:
                    multiple = MULTIPLE_15_1;
                    type_name = "匕首";
                    name = random_list(["匕首", "短刀", "长匕"]);
                    break;
                case 12:
                    multiple = MULTIPLE_15_1;
                    type_name = "拳套";
                    name = random_list(["拳套", "指虎", "拳刃"]);
                    break;
                case 13:
                    multiple = MULTIPLE_15_1;
                    name = random_list(["之斧", "轻斧", "短斧"]);
                    type_name = "单手斧";
                    break;
                case 14:
                    multiple = MULTIPLE_15_1;
                    name = random_list(["之锤", "轻锤", "短锤"]);
                    type_name = "单手锤";
                    break;
                case 15:
                    multiple = MULTIPLE_15_1;
                    name = random_list(["之剑", "轻剑", "刺剑"]);
                    type_name = "单手剑";
                    break;
                case 16:
                    multiple = MULTIPLE_15_1;
                    name = random_list(["魔杖", "魔棒", "节杖"]);
                    type_name = "魔杖";
                    break;
                case 21:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之矛", "之戟", "长矛"]);
                    type_name = "长柄武器";
                    break;
                case 22:
                    multiple = MULTIPLE_15_2;
                    type_name = "法杖";
                    name = random_list(["之杖", "法杖", "长杖"]);
                    break;
                case 23:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之斧", "巨斧", "重斧"]);
                    type_name = "双手斧";
                    break;
                case 24:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之锤", "巨锤", "重锤"]);
                    type_name = "双手锤";
                    break;
                case 25:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之剑", "巨剑", "重剑"]);
                    type_name = "双手剑";
                    break;
                case 31:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之弓", "强弓", "长弓"]);
                    type_name = "远程武器";
                    break;
                case 32:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["之弩", "强弩", "巨弩"]);
                    type_name = "远程武器";
                    break;
                case 33:
                    multiple = MULTIPLE_15_2;
                    name = random_list(["火枪", "步枪", "火炮"]);
                    type_name = "远程武器";
                    break;
            }
            break;
        case 16:
            multiple = MULTIPLE_16;
            switch (type) {
                case 41:
                    name = random_list(["之盾", "护盾", "壁垒"]);
                    type_name = "副手 盾牌";
                    break;
                case 42:
                    if (icon.indexOf("book") > 0) {
                        name = random_list(["之书", "法典", "魔典"]);
                    } else if (icon.indexOf("orb") > 0) {
                        name = random_list(["法球", "宝珠", "宝石"]);
                    } else if (icon.indexOf("wand") > 0) {
                        name = random_list(["短杖", "魔杖", "魔棒"]);
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

/**
 * 阶级系数
 * @param rare
 */
function get_multiple_by_rare(rare) {
    switch (rare) {
        case 1:
            return 0.5;
        case 2:
            return 1;
        case 3:
            return 1.05;
        case 4:
            return 1.15;
        case 5:
            return 1.25;
        case 6:
            return 1.4;
    }
}

/**
 * 阶级名称
 * @param rare
 */
function get_type_name_by_rare(rare) {
    switch (rare) {
        case 1:
            return "劣质";
        case 2:
            return "普通";
        case 3:
            return "优秀";
        case 4:
            return "精良";
        case 5:
            return "史诗";
        case 6:
            return "传说";
    }
}

/**
 * 装备类型
 * @param type
 * @return {string}
 */
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
    return random_list(equipment_icon);
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
    return Math.ceil(lvl * multiple * X);
}

/**
 * 判断是否可装备
 */
function check_can_equip(role, equipment) {
    let pos = equipment.pos;
    let type = equipment.type;
    if (pos === 2 || pos === 5 || pos === 6 || pos === 7 || pos === 13 || pos === 14) {
        return true;// 2项链 5披风 6衬衫 7战袍 13戒指 14饰品
    } else if (pos === 1 || pos === 3 || pos === 4 || pos === 8 || pos === 9 || pos === 10 || pos === 11 || pos === 12) {
        if (is_in_array(role.job, [10, 11, 12, 13, 20, 21, 22, 23])) {
            return type <= 4;// 板甲职业
        } else if (is_in_array(role.job, [30, 31, 32, 33, 40, 41, 42, 43])) {
            return type <= 3;// 锁甲职业
        } else if (is_in_array(role.job, [50, 51, 52, 53, 54, 60, 61, 62, 63])) {
            return type <= 2;// 皮甲职业
        } else if (is_in_array(role.job, [70, 71, 72, 73, 80, 81, 82, 83, 90, 91, 92, 93])) {
            return type <= 1;// 布甲职业
        }
    } else if (pos === 15 || pos === 16) {
        /**
         * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑 16-魔杖
         * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
         * 31-弓 32-弩 33-枪
         * 41-盾牌 42-副手
         */
        if (is_in_array(role.job, [10, 11, 12, 13])) {
            return is_in_array(type, [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 41]);
        } else if (is_in_array(role.job, [20, 21, 22, 23])) {
            return is_in_array(type, [13, 14, 15, 21, 23, 24, 25, 41]);
        } else if (is_in_array(role.job, [30, 31, 32])) {
            return is_in_array(type, [31, 32, 33]);
        } else if (is_in_array(role.job, [33])) {
            return is_in_array(type, [11, 12, 13, 15, 21, 22, 23, 25, 31, 32, 33]);// 生存猎人
        } else if (is_in_array(role.job, [40, 41, 43])) {
            return is_in_array(type, [11, 12, 13, 14, 22, 41, 42]);
        } else if (is_in_array(role.job, [42])) {
            return is_in_array(type, [11, 12, 13, 14, 22, 23, 24, 41, 42]);// 增强萨满
        } else if (is_in_array(role.job, [50, 51, 52, 53, 54])) {
            return is_in_array(type, [11, 12, 14, 21, 22, 24, 42]);
        } else if (is_in_array(role.job, [60, 61, 62, 63])) {
            return is_in_array(type, [11, 12, 13, 14, 15]);
        } else if (is_in_array(role.job, [70, 71, 72, 73])) {
            return is_in_array(type, [11, 14, 16, 22, 42]);
        } else if (is_in_array(role.job, [80, 81, 82, 83])) {
            return is_in_array(type, [11, 15, 16, 22, 42]);
        } else if (is_in_array(role.job, [90, 91, 92, 93])) {
            return is_in_array(type, [11, 15, 16, 22, 42]);
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
    base_price *= Math.pow(0.6 + (get_multiple_by_rare(equipment.rare) - 0.5), 6);
    return Math.round(base_price);
}

/**
 * 计算全身装备等级
 */
function get_equipment_lvl(role) {
    let equipment_lvl_list = [];
    let equipments = role.equipments;
    if (equipments == null) {
        return 0;
    }
    let ring_count = 0;
    let trinket_count = 0;
    let weapon_count = 0;
    for (let i = 0; i < equipments.length; i++) {
        let module = equipments[i];
        let equipment = create_equipment_by_model(module);
        if (equipment.pos === 6 || equipment.pos === 7) {
            continue;
        }
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
    return Math.ceil(equipment_lvl / 16);
}

/**
 * 判断当前是否装备了某件装备
 * @param role
 * @param name
 */
function is_equip_equipment(role, name) {
    let equipments = role.equipments;
    if (equipments == null) {
        return false;
    }
    for (let i = 0; i < equipments.length; i++) {
        let module = equipments[i];
        if (module === name) {
            return true;
        }
    }
    return false;
}

function get_set_effects(role) {
    let calculated_sets = [];
    let result_effects = [];
    let equipments = role.equipments;
    if (equipments == null) {
        return [];
    }
    for (let i = 0; i < equipments.length; i++) {
        let model = equipments[i];
        let equipment = create_equipment_by_model(model);
        if (equipment.sets == null) {
            continue;
        }
        let sets_name = equipment.sets;
        if (is_in_array(sets_name, calculated_sets)) {
            continue;
        }
        calculated_sets.push(sets_name);
        let sets = dictionary_sets[sets_name];
        let set_equipments = sets.equipments;
        let effects = sets.effects;
        let count_equip = 0;
        for (let j = 0; j < set_equipments.length; j++) {
            let equipment = set_equipments[j];
            if (is_equip_equipment(role, equipment)) {
                count_equip++;
            }
        }
        for (let j = 0; j < effects.length; j++) {
            let effect = effects[j];
            if (effect == null) {
                continue;
            }
            if (count_equip > j) {
                for (let k = 0; k < effect.length; k++) {
                    result_effects.push(effect[k]);
                }
            }
        }
    }
    return result_effects;
}