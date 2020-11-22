/** 经验、等级结算 **/

let LVL_EXP = [];// 升级经验表
let MONSTER_EXP = [];// 怪物经验表

$(document).ready(function () {
    /**
     * 经验表初始化
     */
    for (let i = 0; i < MAX_LVL - 1; i++) {
        // 怪物基础经验
        let monster_exp = Math.round(Math.pow(1.1, i) * 10);
        if (monster_exp >= 5000) {
            monster_exp = Math.round(monster_exp / 100) * 100;
        } else if (monster_exp >= 1800) {
            monster_exp = Math.round(monster_exp / 50) * 50;
        } else if (monster_exp >= 500) {
            monster_exp = Math.round(monster_exp / 10) * 10;
        } else if (monster_exp >= 140) {
            monster_exp = Math.round(monster_exp / 5) * 5;
        }
        // 升级所需击杀数
        let lvl_count = 10 + Math.round(Math.pow(i, 1.8));
        let exp = Math.round(monster_exp * lvl_count / 10) * 10;
        if (exp >= 1000000) {
            exp = Math.round(exp / 10000) * 10000;
        } else if (exp >= 100000) {
            exp = Math.round(exp / 1000) * 1000;
        } else if (exp >= 10000) {
            exp = Math.round(exp / 100) * 100;
        }
        LVL_EXP[i] = exp;
        MONSTER_EXP[i] = monster_exp;
        MAX_EXP += exp;
    }
});

/**
 * 计算当前等级经验百分比
 */
function get_exp_percent(lvl, exp) {
    for (let i = 1; i < lvl; i++) {
        exp -= LVL_EXP[i - 1];
    }
    return exp / LVL_EXP[lvl - 1];
}

/**
 * 获得经验
 * @param character
 * @param exp
 * @return {*}
 */
function add_experience(character, exp) {
    character.exp += exp;
    if (character.exp > MAX_EXP) {
        character.exp = MAX_EXP;
    }
    character.lvl = get_level(character.exp);
    return character;
}

/**
 * 计算经验对应的等级
 * @param exp
 * @return {number}
 */
function get_level(exp) {
    let lvl = 1;
    for (let i = 0; i < LVL_EXP.length; i++) {
        if (exp >= LVL_EXP[i]) {
            lvl++;
            exp -= LVL_EXP[i];
        }
    }
    if (lvl > MAX_LVL) {
        lvl = MAX_LVL;
    }
    return lvl;
}