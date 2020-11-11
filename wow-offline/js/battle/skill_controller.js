// 技能控制

let m_skill_states = [];

function init_skill_states() {
    m_skill_states = [];
}

function skill_state(flag, id, last_turn) {
    let skill_state = {};
    skill_state.flag = flag;
    skill_state.id = id;
    skill_state.last_turn = last_turn;// 上次施放回合
    return skill_state;
}

function regist_skill_state(state) {
    m_skill_states[state.flag + state.id] = state;
}

function get_skill_state(flag, id) {
    return m_skill_states[flag + id];
}

// 计算攻击护甲免伤
function calculate_armor_attack(attacker, target) {
    let armor_point = target.armor_attack;
    // 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 攻击者等级 + 400)
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

// 计算法术护甲免伤
function calculate_armor_magic(attacker, target) {
    let armor_point = target.armor_magic;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

// 计算命中率
function calculate_hit(attacker, target) {
    let hit_rate = attacker.hit_rate;// 最终命中等级
    let dodge_rate = target.dodge_rate;// 最终闪避等级
    let hit_chance = (hit_rate * hit_coefficient / attacker.lvl + attacker.hit_chance_final);
    let dodge_chance = dodge_rate * dodge_coefficient / target.lvl + target.dodge_chance_final;
    hit_chance = (base_hit_chance + hit_chance - dodge_chance) / 100;
    // log("命中率：" + hit_chance * 100);
    return hit_chance;
}

// 计算暴击率
function calculate_critical(attacker, target) {
    let critical_rate = attacker.critical_rate;// 最终暴击等级
    let critical_chance = (critical_rate * critical_coefficient / attacker.lvl + attacker.critical_chance_final) / 100;
    // log("暴击率：" + critical_chance * 100);
    return critical_chance;
}

// 计算格挡率
function calculate_block(attacker, target) {
    let block_rate = target.block_rate;
    let block_chance = (block_rate * block_coefficient / target.lvl + target.block_chance_final) / 100;
    // log("格挡率：" + block_chance * 100);
    return block_chance;
}