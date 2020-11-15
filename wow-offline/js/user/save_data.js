/** 存档管理 **/

let character_list = [];
let current_character;

/**
 * 创建测试人物
 */
$(document).ready(function () {
    current_character = new_character(11, "warrior_1", "牛牛");
    character_list[0] = current_character;
});

/**
 * 角色初始化（新建）
 * @param job
 * @param flag
 * @param name
 * @return {*}
 */
function new_character(job, flag, name) {
    let character = load_character(job, 0, name);
    character.buffs = eval("[dictionary_buff." + flag + "]");
    character.debuffs = [];
    character.equipments = [];
    character.skills = eval("[dictionary_skill." + flag + "_1(), dictionary_skill." + flag + "_2()]");
    return character;
}

/**
 * 角色初始化（读档）
 * @param job
 * @param exp
 * @param name
 * @return {*}
 */
function load_character(job, exp, name) {
    let character = new_base_character();
    character.job = job;
    character.name = dictionary_job.job_name[job];
    character = add_experience(character, exp);
    character = base_character_property(character);
    if (name != null) {
        character.name = name;
    }
    return character;
}