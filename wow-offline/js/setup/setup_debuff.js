// 减益
function setup_debuff() {
    let debuff = {};

    // 致死打击：使敌方受到的治疗-Y，持续T回合
    debuff.warrior_1_T = 2;// 持续回合，-1为永久
    debuff.warrior_1_X = 45;
    debuff.warrior_1 = [
        debuff.warrior_1_T,
        "taken_heal_percent -= " + debuff.warrior_1_X
    ];

    // 破甲：使敌方物理抗性-X，持续T回合
    debuff.warrior_3_T = 6;// 持续回合，-1为永久
    debuff.warrior_3_X = 2;
    debuff.warrior_3 = [
        debuff.warrior_3_T,
        "res_physical -= " + debuff.warrior_3_X
    ];

    return debuff;
}

let m_debuff = setup_debuff();