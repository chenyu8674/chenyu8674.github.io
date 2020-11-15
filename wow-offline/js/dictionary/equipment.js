/** 装备一览 **/
let dictionary_equipment = new_equipment();

function new_equipment() {
    let equipment = {}

    // 测试用单手剑(力量)
    equipment.test_one_hand_sword_str = [
        "attack_power+=200",
        "str+=20",
        "hit_rate+=50",
        "critical_rate+=50"
    ];

    // 测试用单手剑(智力)
    equipment.test_one_hand_sword_int = [
        "magic_power+=200",
        "int+=20",
        "hit_rate+=50",
        "critical_rate+=50"
    ];

    // 测试用双手剑(力量)
    equipment.test_two_hand_sword_str = [
        "attack_power+=400",
        "str+=40",
        "hit_rate+=100"
    ];

    // 测试用盾牌
    equipment.test_shield = [
        "block_rate+=200",
        "block_chance_final+=30",
        "block_value+=100",
        "armor_attack+=500",
        "sta+=40"
    ];

    // 测试用法典
    equipment.test_book = [
        "magic_power+=100",
        "int+=20",
        "sta+=20",
        "hit_rate+=50",
        "critical_rate+=50"
    ];

    // 测试用板甲（全套）
    equipment.test_armor = [
        "armor_attack+=4000",
        "armor_magic+=1000",
        "str+=200",
        "agi+=200",
        "sta+=200",
        "int+=200",
        "spr+=200",
        "spr+=200"
    ];

    // 测试用布甲（全套）
    equipment.test_cloth = [
        "armor_attack+=1000",
        "armor_magic+=4000",
        "str+=200",
        "agi+=200",
        "sta+=200",
        "int+=200",
        "spr+=200"
    ];

    // 测试用抗性
    equipment.test_res = [
        "res_physical+=" + max_res,
        "res_fire+=" + max_res,
        "res_frost+=" + max_res,
        "res_natural+=" + max_res,
        "res_arcane+=" + max_res,
        "res_holy+=" + max_res,
        "res_dark+=" + max_res
    ];

    // 测试怪物（套壳）
    equipment.test_monster = [
        "name='奥妮克希亚'",
        "health_point=20000",
        "attack_power+=1000",
        "magic_power+=1000",
        "heal_power+=1000",
        "critical_chance_final+=0",
        "hit_chance_final+=20",
        "dodge_chance_final+=0",
        "armor_attack+=0",
        "armor_magic+=0"
    ];

    return equipment;
}