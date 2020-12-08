/** 基础角色属性 **/
function new_role_base() {
    let role_base = {};
    role_base.job = 0;// 职业
    role_base.name = "";// 名称
    role_base.exp = 0;// 经验
    role_base.lvl = 1;// 等级
    role_base.str = 0;// 力量
    role_base.agi = 0;// 敏捷
    role_base.sta = 0;// 耐力
    role_base.int = 0;// 智力
    role_base.spr = 0;// 精神
    role_base.buffs = [];
    role_base.debuffs = [];
    role_base.dots = [];
    role_base.equipments = [];
    role_base.items = [];
    role_base.skills = [];
    return role_base;
}