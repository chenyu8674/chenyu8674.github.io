/** 装备属性结算 **/

/**
 * 生成装备
 * @param name 装备识别名称
 * @param c_lvl 角色等级
 * @param e_lvl 物品等级
 */
function create_equipment(name, c_lvl, e_lvl) {
    let equipment = {};
    let model = new_equipment()[name];
    let equipment_name = [];
    equipment.rare = model.rare;
    equipment.pos = model.pos;
    equipment.type = model.type;
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
                func = dictionary_affix[index];// 装备固有属性
            } else {
                if (equipment_name.length === 0) {
                    equipment_name.push(index + "之");
                } else {
                    equipment_name.push(index + "的");
                }
                func = dictionary_affix_random[index];// 随机词缀
            }
            let effect_list = func(e_lvl, equipment.rare, multiple);
            for (let j = 0; j < effect_list.length; j++) {
                equipment.effect.push(effect_list[j]);
            }
        }
    }
    equipment_name.push(model.name);
    equipment.name = equipment_name.join(" ");
    return equipment;
}