// 角色基础属性

let MAX_LVL = 60;// 等级上限
let MAX_EXP = 177000;// 经验上限

function setup_character() {
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

// 角色初始化（新建）
function new_character(job) {
    return load_character(job, 0);
}

// 角色初始化（读档）
function load_character(job, exp) {
    let character = setup_character();
    character.job = job;
    character.name = m_job.job_name[job];
    character = get_experience(character, exp);
    character = check_property(character);
    return character;
}

// 获得经验
function get_experience(character, exp) {
    character.exp += exp;
    if (character.exp > MAX_EXP) {
        character.exp = MAX_EXP;
    }
    character.lvl = check_level(character.exp);
    return character;
}

// 升级经验表
let lvl_exp = [
    100, 200, 300, 400, 500, 600, 700, 800, 900,
    1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
    2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
    3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900,
    4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900,
    5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900,
];

// 计算等级
function check_level(exp) {
    let lvl = 1;
    for (let i = 0; i < lvl_exp.length; i++) {
        if (exp >= lvl_exp[i]) {
            lvl++;
            exp -= lvl_exp[i];
        }
    }
    if (lvl > MAX_LVL) {
        lvl = MAX_LVL;
    }
    return lvl;
}


// 计算人物基础属性
function check_property(character) {
    let job = 10 * Math.floor(character.job / 10);
    character.str = Math.floor(m_job.base_property[job][0] + character.lvl * m_job.upgrade_property[job][0]);// 力量
    character.agi = Math.floor(m_job.base_property[job][1] + character.lvl * m_job.upgrade_property[job][1]);// 敏捷
    character.sta = Math.floor(m_job.base_property[job][2] + character.lvl * m_job.upgrade_property[job][2]);// 耐力
    character.int = Math.floor(m_job.base_property[job][3] + character.lvl * m_job.upgrade_property[job][3]);// 智力
    character.spr = Math.floor(m_job.base_property[job][4] + character.lvl * m_job.upgrade_property[job][4]);// 精神
    return character;
}