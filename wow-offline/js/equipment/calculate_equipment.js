/** 装备属性结算 **/

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
function create_random_equipment(lvl) {
    let model = {};
    // 稀有度
    let rare_random = 100 * Math.random();
    if (rare_random <= 15) {
        rare_random = 1;
    } else if (rare_random <= 35) {
        rare_random = 2;
    } else if (rare_random <= 95) {
        rare_random = 3;
    } else if (rare_random <= 99) {
        rare_random = 4;
    } else {
        rare_random = 5;
    }
    // 装备位置
    let pos_random = Math.floor(16 * Math.random() + 1);
    while (pos_random === 6 || pos_random === 7) {
        pos_random = Math.floor(16 * Math.random() + 1);
    }
    // 装备倾向
    let inclination_random = Math.round(Math.random()) + 1;
    // 装备类型
    let type_random = 0;
    if (pos_random === 1 || pos_random === 3 || pos_random === 4 || pos_random === 8 || pos_random === 9 || pos_random === 10 || pos_random === 11 || pos_random === 12) {
        // 布皮锁板装备
        type_random = Math.ceil(Math.random() * 4);
    } else if (pos_random === 2 || pos_random === 6 || pos_random === 7 || pos_random === 13 || pos_random === 14) {
        // 项链 衬衫 战袍 戒指 饰品
        type_random = 99;
    } else if (pos_random === 5) {
        // 披风
        type_random = 1;
    } else if (pos_random === 15) {
        // 武器
        let list = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33];
        type_random = list[Math.floor(Math.random() * list.length)];
    } else if (pos_random === 16) {
        // 副手
        let list = [41, 42];
        type_random = list[Math.floor(Math.random() * list.length)];
    }
    // 装备属性系数
    let multiple = 0;
    let name = "";
    let type_name = "";
    switch (pos_random) {
        case 1:
            multiple = 0.8;
            type_name = name = "头盔";
            icon = "INV_Helmet_" + icon_index;
            break;
        case 2:
            multiple = 0.6;
            type_name = name = "项链";
            icon = "INV_Jewelry_Necklace_" + icon_index;
            break;
        case 3:
            multiple = 0.8;
            type_name = name = "护肩";
            icon = "INV_Shoulder_" + icon_index;
            break;
        case 4:
            multiple = 1;
            type_name = name = "胸甲";
            switch (type_random) {
                case 1:
                    icon = "INV_Chest_Cloth_" + icon_index;
                    break;
                case 2:
                    icon = "INV_Chest_Leather_" + icon_index;
                    break;
                case 3:
                    icon = "INV_Chest_Chain_" + icon_index;
                    break;
                case 4:
                    icon = "INV_Chest_Plate" + icon_index;
                    break;
            }
            break;
        case 5:
            multiple = 0.6;
            type_name = name = "披风";
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
            type_name = name = "护腕";
            break;
        case 9:
            multiple = 0.8;
            type_name = name = "手套";
            break;
        case 10:
            multiple = 0.6;
            type_name = name = "腰带";
            break;
        case 11:
            multiple = 1;
            type_name = name = "腿甲";
            break;
        case 12:
            multiple = 0.8;
            type_name = name = "靴子";
            break;
        case 13:
            multiple = 0.6;
            type_name = name = "戒指";
            break;
        case 14:
            multiple = 0.6;
            type_name = name = "饰物";
            break;
        case 15:
            switch (type_random) {
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
                    name = "之矛";
                    type_name = "长柄武器";
                    break;
                case 22:
                    multiple = 2;
                    name = "法杖";
                    type_name = "法杖";
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
                    name = "之弓";
                    type_name = "弓";
                    break;
                case 32:
                    multiple = 2;
                    name = "之弩";
                    type_name = "弩";
                    break;
                case 33:
                    multiple = 2;
                    name = "之枪";
                    type_name = "枪";
                    break;
            }
            break;
        case 16:
            multiple = 1;
            switch (type_random) {
                case 41:
                    name = "之盾";
                    type_name = "盾牌";
                    break;
                case 42:
                    name = "之书";
                    type_name = "法器";
                    break;
            }
            break;
    }
    let lvl_name;
    if (lvl <= 5) {
        lvl_name = "新手";
    } else if (lvl <= 10) {
        lvl_name = "训练";
    } else if (lvl <= 15) {
        lvl_name = "学员";
    } else if (lvl <= 20) {
        lvl_name = "列兵";
    } else if (lvl <= 25) {
        lvl_name = "下士";
    } else if (lvl <= 30) {
        lvl_name = "军士";
    } else if (lvl <= 35) {
        lvl_name = "士官";
    } else if (lvl <= 40) {
        lvl_name = "骑士";
    } else if (lvl <= 45) {
        lvl_name = "中尉";
    } else if (lvl <= 50) {
        lvl_name = "护卫";
    } else if (lvl <= 55) {
        lvl_name = "少校";
    } else if (lvl <= 60) {
        lvl_name = "元帅";
    } else {
        lvl_name = "神秘";
    }
    model.name = lvl_name + name;
    model.type_name = type_name;
    model.rare = rare_random;
    model.pos = pos_random;
    model.type = type_random;
    model.lvl_max = lvl;
    model.effect = [];
    model.affix = [multiple, pos_random * 1000 + inclination_random * 100 + type_random, "random", "random"];
    console.log(model);
    return create_equipment_by_model(model, lvl, lvl);
}

/**
 * 生成基础装备
 * @param name 装备识别名称
 * @param c_lvl 角色等级
 * @param e_lvl 物品等级
 */
function create_base_equipment(name, c_lvl, e_lvl) {
    let model = new_equipment()[name];
    return create_equipment_by_model(model, c_lvl, e_lvl)
}

/**
 * 生成装备
 * @param model 装备模板
 * @param c_lvl 角色等级
 * @param e_lvl 物品等级
 */
function create_equipment_by_model(model, c_lvl, e_lvl) {
    let equipment = {};
    let equipment_name = [];
    equipment.icon = model.icon;
    equipment.rare = model.rare;
    equipment.pos = model.pos;
    equipment.type = model.type;
    equipment.type_name = model.type_name;
    if (c_lvl > model.lvl_max) {
        c_lvl = model.lvl_max;
    }
    if (e_lvl > model.lvl_max) {
        e_lvl = model.lvl_max;
    }
    equipment.c_lvl = c_lvl;
    equipment.e_lvl = e_lvl;
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
                        equipment_name.push(index + "之");
                    } else {
                        equipment_name.push(index + "的");
                    }
                    func = dictionary_affix[index];// 随机词缀
                }
            }
            let effect_list = func(e_lvl, equipment.rare, multiple);
            for (let j = 0; j < effect_list.length; j++) {
                equipment.effect.push(effect_list[j]);
            }
        }
    }
    equipment_name.push(model.name);
    equipment.name = equipment_name.join(" ");
    console.log(equipment);
    return equipment;
}