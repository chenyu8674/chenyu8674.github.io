// 减益
function setup_debuff() {
    let debuff = {};

    // 破甲：使敌方物理抗性-X，持续T回合
    debuff.warrior_3_T = 6;// 持续回合，-1为永久
    debuff.warrior_3_X = 2;
    debuff.warrior_3_Y = 0;
    debuff.warrior_3_Z = -0;
    debuff.warrior_3 = [
        debuff.warrior_3_T,
        "res_physical -= " + debuff.warrior_3_X
    ];

    return debuff;
}