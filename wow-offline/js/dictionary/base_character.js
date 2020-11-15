/** 基础角色属性 **/
function new_base_character() {
    let character = {};
    character.job = 0;// 职业
    character.name = "";// 名称
    character.exp = 0;// 经验
    character.lvl = 1;// 等级
    character.str = 0;// 力量
    character.agi = 0;// 敏捷
    character.sta = 0;// 耐力
    character.int = 0;// 智力
    character.spr = 0;// 精神
    return character;
}

/**
 * 计算人物基础属性
 * @param character
 * @return {*}
 */
function base_character_property(character) {
    let job = 10 * Math.floor(character.job / 10);
    character.str = Math.floor(dictionary_job.base_property[job][0] + character.lvl * dictionary_job.upgrade_property[job][0]);// 力量
    character.agi = Math.floor(dictionary_job.base_property[job][1] + character.lvl * dictionary_job.upgrade_property[job][1]);// 敏捷
    character.sta = Math.floor(dictionary_job.base_property[job][2] + character.lvl * dictionary_job.upgrade_property[job][2]);// 耐力
    character.int = Math.floor(dictionary_job.base_property[job][3] + character.lvl * dictionary_job.upgrade_property[job][3]);// 智力
    character.spr = Math.floor(dictionary_job.base_property[job][4] + character.lvl * dictionary_job.upgrade_property[job][4]);// 精神
    return character;
}