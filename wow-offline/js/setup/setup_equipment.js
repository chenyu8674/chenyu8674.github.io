// 装备
function setup_equipment() {
    let equipment = {}

    // 测试用单手剑
    equipment.test_one_hand_sword = [
        "attack_power += 200",
        "str += 20",
        "hit_rate += 50",
        "critical_rate += 50"
    ];

    // 测试用双手剑
    equipment.test_two_hand_sword = [
        "attack_power += 400",
        "str += 40",
        "hit_rate += 100"
    ];

    // 测试用盾牌
    equipment.test_shield = [
        "block_rate += 200",
        "block_chance_final += 20",
        "block_value += 100",
        "armor_attack += 500",
        "sta += 40"
    ];

    // 测试用盔甲（全套）
    equipment.test_armor = [
        "armor_attack += 5000",
        "str += 200",
        "sta += 200"
    ];

    return equipment;
}

let m_equipment = setup_equipment();