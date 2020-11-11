// 装备
function setup_equipment() {
    let equipment = {}

    // 测试用单手剑(力量)
    equipment.test_one_hand_sword_str = [
        "attack_power += 200",
        "str += 20",
        "hit_rate += 50",
        "critical_rate += 50"
    ];

    // 测试用单手剑(智力)
    equipment.test_one_hand_sword_int = [
        "magic_power += 200",
        "int += 20",
        "hit_rate += 50",
        "critical_rate += 50"
    ];

    // 测试用双手剑(力量)
    equipment.test_two_hand_sword_str = [
        "attack_power += 400",
        "str += 40",
        "hit_rate += 100"
    ];

    // 测试用盾牌
    equipment.test_shield = [
        "block_rate += 200",
        "block_chance_final += 30",
        "block_value += 100",
        "armor_attack += 500",
        "sta += 40"
    ];

    // 测试用盔甲（全套）
    equipment.test_armor = [
        "armor_attack += 5000",
        "str += 200",
        "agi += 200",
        "sta += 200",
        "int += 200",
        "spr += 200"
    ];

    // 测试怪物（套壳）
    equipment.test_monster = [
        "name = '范克里夫'",
        "health_point += 29900",
        "attack_power += 1000",
        "magic_power += 1000",
        "heal_power += 500",
        "critical_chance_final += 0",
        "hit_chance_final += 0",
        "dodge_chance_final += 0",
        "armor_attack += 0",
        "armor_magic += 0"
    ];

    return equipment;
}

let m_equipment = setup_equipment();