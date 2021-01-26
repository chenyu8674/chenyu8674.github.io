/** 装备一览 **/
let dictionary_equipment;
$(document).ready(function () {
    dictionary_equipment = new_equipment();
});

function new_equipment() {
    let equipment = {}
    /**
     * rare 稀有度
     * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
     *
     * pos 装备位置
     * 99-其他
     * 左：01-头盔 02-项链 03-肩膀 04-胸甲 05-披风 06-衬衫 07-战袍 08-手腕
     * 右：09-手套 10-腰带 11-腿甲 12-鞋子 13-戒指 14-饰品
     * 下：15-主手 16-副手
     *
     * inclination 装备倾向
     * 9-其他
     * 1-物理 2-法系
     *
     * type 装备类型（非武器）
     * 99-其他
     * 01-布甲 02-皮甲 03-锁甲 04-板甲
     *
     * type 装备类型（武器）
     * 99-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     *
     * c_lvl-可装备等级
     * e_lvl-物品等级
     */
    {
        equipment[11] = {name: "训练双手剑", icon: "inv_sword_06", rare: 2, affix: 15125};
        equipment[12] = {name: "训练单手剑", icon: "inv_sword_04", rare: 2, affix: 15115};
        equipment[13] = {name: "训练单手锤", icon: "inv_mace_06", rare: 2, affix: 15214};
        equipment[14] = {name: "训练盾牌", icon: "inv_shield_03", rare: 2, affix: 16141};
        equipment[15] = {name: "训练之弓", icon: "inv_weapon_bow_02", rare: 2, affix: 15131};
        equipment[16] = {name: "训练长杖", icon: "inv_staff_09", rare: 2, affix: 15122};
        equipment[17] = {name: "训练法杖", icon: "inv_staff_08", rare: 2, affix: 15222};

        equipment[31] = {name: "新兵衬衫", icon: "inv_shirt_01", rare: 2, affix: 6199};
        equipment[32] = {name: "新兵战袍", icon: "inv_shirt_guildtabard_01", rare: 2, affix: 7199};

        equipment[21] = {name: "训练罩袍", icon: "inv_chest_cloth_21", rare: 2, affix: 4101};
        equipment[22] = {name: "训练皮衣", icon: "inv_chest_leather_01", rare: 2, affix: 4102};
        equipment[23] = {name: "训练链甲", icon: "inv_chest_chain_16", rare: 2, affix: 4103};
        equipment[24] = {name: "训练胸铠", icon: "inv_chest_plate01", rare: 2, affix: 4104};
    }// 初始装备
    {
    equipment[12940] = {name: "雷德的神圣控诉者", rare: 4, c_lvl: 1, e_lvl: 1, icon: "inv_sword_43", affix: 15115, effect: ["str+=1", "sta+=1", "critical_rate+=1"], sets: "雷德双刀"};
    equipment[12939] = {name: "雷德的部族护卫者", rare: 4, c_lvl: 1, e_lvl: 1, icon: "inv_sword_40", affix: 15115, effect: ["str+=1", "sta+=1", "critical_rate+=1"], sets: "雷德双刀"};

    equipment[17182] = {name: "萨弗拉斯，炎魔拉格纳罗斯之手", rare: 6, c_lvl: 1, e_lvl: 1, icon: "inv_hammer_unique_sulfuras", affix: 15124, effect: ["str+=1", "sta+=1", "res_fire+=30"], detail: "\"让火焰净化一切！\"", skill: 21162};
    equipment[22589] = {name: "埃提耶什，守护者的传说之杖", rare: 6, c_lvl: 1, e_lvl: 1, icon: "inv_staff_medivh", affix: 15222, effect: ["int+=1", "sta+=1", "magic_power_percent+=5", "heal_power_percent+=5"], detail: "麦迪文的气息令你如芒刺在背……", skill: 28148};
    equipment[19019] = {name: "雷霆之怒，逐风者的祝福之剑", rare: 6, c_lvl: 1, e_lvl: 1, icon: "inv_sword_39", affix: 15115, effect: ["agi+=1", "sta+=1", "res_fire+=5", "res_natural+=5"], detail: "\"英雄，愿你有一份不悔的爱情。\"", skill: 21992};
    }// 测试装备
    /*
     * 左：01-头盔 02-项链 03-护肩 04-胸甲 05-披风 06-衬衫 07-战袍 08-护腕
     * 右：09-手套 10-腰带 11-腿甲 12-靴子 13-戒指 14-饰物
     * 下：15-主手 16-副手
     */
    {
        // 阿达罗格
        equipment[82880] = {name: "阿达罗格之牙", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_weapon_shortblade_04", affix: 15111, effect: ["agi+=3", "sta+=2"]};
        equipment[82772] = {name: "咆哮之口长裤", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_pants_06", affix: 11101, effect: ["int+=5", "sta+=5"]};
        equipment[82879] = {name: "环刺护腕", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_bracer_07", affix: 8104, effect: ["main+=3", "sta+=3"]};
        // 黑暗萨满柯兰萨
        equipment[82881] = {name: "黑色元素腕轮", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_bracer_13", affix: 8101, effect: ["main+=3", "sta+=3", "dodge_rate+=2"]};
        equipment[82882] = {name: "黑暗仪式斗篷", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_helmet_48", affix: 5101, effect: ["main+=3", "sta+=3"]};
        equipment[82877] = {name: "破碎图腾之握", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_chest_leather_10", affix: 4102, effect: ["main+=5", "sta+=5", "dodge_rate+=4"]};
        equipment[132551] = {name: "黑暗萨满卫衣", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_chest_leather_10", affix: 4103, effect: ["main+=5", "sta+=5", "dodge_rate+=4"]};
        // 焰喉
        equipment[82885] = {name: "焦灼链甲", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_chest_chain", affix: 4104, effect: ["main+=5", "sta+=5", "critical_rate+=4"]};
        equipment[82878] = {name: "萤火法袍", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_chest_cloth_18", affix: 4101, effect: ["int+=5", "sta+=5", "critical_rate+=5"]};
        equipment[132552] = {name: "甲质腕轮", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_bracer_05", affix: 8103, effect: ["main+=3", "sta+=3", "critical_rate+=2"]};
        equipment[82884] = {name: "角质护腕", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_bracer_05", affix: 8102, effect: ["main+=3", "sta+=3", "critical_rate+=2"]};
        // 熔岩守卫戈多斯
        equipment[82886] = {name: "踏血锁靴", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_boots_01", affix: 12104, effect: ["main+=4", "sta+=4", "critical_rate+=3"]};
        equipment[82888] = {name: "熬心之杖", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_staff_13", affix: 15222, effect: ["int+=4", "sta+=6", "critical_rate+=4"]};
        equipment[82883] = {name: "血咒魔刃", rare: 4, c_lvl: 13, e_lvl: 18, icon: "inv_weapon_shortblade_12", affix: 15111, effect: [], skill: 18381};
    }// 怒焰裂谷
    {
        // 黑暗迪菲亚
        equipment[10403] = {name: "黑暗迪菲亚腰带", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_belt_03", affix: 10102, effect: ["main+=4", "sta+=6"], sets: "黑暗迪菲亚护甲"};
        equipment[10402] = {name: "黑暗迪菲亚长靴", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_boots_05", affix: 12102, effect: ["main+=4", "sta+=6"], sets: "黑暗迪菲亚护甲"};
        equipment[10401] = {name: "黑暗迪菲亚手套", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_gauntlets_05", affix: 9102, effect: ["main+=4", "sta+=6"], sets: "黑暗迪菲亚护甲"};
        equipment[10400] = {name: "黑暗迪菲亚护腿", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_pants_12", affix: 11102, effect: ["main+=7", "sta+=7"], sets: "黑暗迪菲亚护甲"};
        equipment[10399] = {name: "黑暗迪菲亚护甲", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_chest_leather_08", affix: 4102, effect: ["main+=7", "sta+=7"], sets: "黑暗迪菲亚护甲"};
        // 格拉布托克
        equipment[5444] = {name: "矿工斗篷", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_misc_cape_02", affix: 5101, effect: ["main+=3", "sta+=3", "critical_rate+=3", "hit_rate+=2"]};
        equipment[5195] = {name: "金斑手套", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_gauntlets_23", affix: 9101, effect: ["int+=4", "sta+=4", "critical_rate+=2", "dodge_rate+=4"]};
        equipment[2169] = {name: "蜂鸣之刃", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_weapon_shortblade_05", affix: 15111, effect: ["agi+=2", "sta+=3", "critical_rate+=3"]};
        // 赫利克斯·破甲
        equipment[5191] = {name: "残酷倒钩", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_sword_04", affix: 15115, effect: ["main+=2", "sta+=3", "critical_rate+=2", "hit_rate+=1"]};
        equipment[132556] = {name: "熔炼师的长裤", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_pants_02", affix: 11103, effect: ["main+=5", "sta+=5", "critical_rate+=4", "dodge_rate+=3"]};
        equipment[5443] = {name: "镀金圆盾", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_shield_09", affix: 16141, effect: ["main+=3", "sta+=3", "hit_rate+=2", "dodge_rate+=2"]};
        equipment[151062] = {name: "流亡建筑师的护臂", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_bracer_robe_dungeonrobe_c_03", affix: 8201, effect: ["int+=3", "sta+=3", "critical_rate+=2", "hit_rate+=3"]};
        equipment[5199] = {name: "铁匠短裤", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_pants_02", affix: 11102, effect: ["main+=5", "sta+=5", "critical_rate+=4", "dodge_rate+=3"]};
        equipment[151063] = {name: "符记手铠", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_glove_plate_dungeonplate_c_03", affix: 9104, effect: ["main+=4", "sta+=4", "hit_rate+=3", "dodge_rate+=3"]};
        equipment[5200] = {name: "穿刺鱼叉", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_spear_06", affix: 15121, effect: ["agi+=5", "sta+=8", "critical_rate+=5", "dodge_rate+=3"]};
        // 死神5000
        equipment[5201] = {name: "火石法杖", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_staff_13", affix: 15222, effect: ["int+=29", "sta+=8", "critical_rate+=4", "dodge_rate+=3"]};
        equipment[151065] = {name: "老友的手套", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_gauntlets_mail_dungeonmail_c_03", affix: 9103, effect: ["main+=4", "sta+=4", "critical_rate+=2", "hit_rate+=3"]};
        equipment[5187] = {name: "死神之锤", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_hammer_04", affix: 15124, effect: ["str+=5", "sta+=8", "critical_rate+=3", "hit_rate+=4"]};
        equipment[151066] = {name: "失踪外交家的肩甲", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_shoulder_plate_dungeonplate_c_03", affix: 3104, effect: ["main+=4", "sta+=4", "hit_rate+=3", "dodge_rate+=2"]};
        equipment[1937] = {name: "电锯", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_sword_24", affix: 15115, effect: ["agi+=2", "sta+=3", "critical_rate+=2", "hit_rate+=1"]};
        equipment[151064] = {name: "好奇访客的外套", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_chest_leather_31", affix: 4102, effect: ["main+=5", "sta+=5", "hit_rate+=4", "dodge_rate+=3"]};
        // 撕心狼将军
        equipment[5196] = {name: "重拳先生的战斧", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_axe_01", affix: 15113, effect: ["str+=2", "sta+=3", "critical_rate+=2", "hit_rate+=1"]};
        equipment[872] = {name: "切石者", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_throwingaxe_01", affix: 15123, effect: ["agi+=5", "sta+=8", "critical_rate+=5", "hit_rate+=3"]};
        equipment[1156] = {name: "豪华珠宝戒指", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_jewelry_ring_09", affix: 13199, effect: ["sta+=3", "critical_rate+=7", "hit_rate+=3"]};
        // “船长”曲奇
        equipment[5202] = {name: "海盗的罩衫", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_shirt_08", affix: 4101, effect: ["int+=5", "sta+=5", "critical_rate+=3", "dodge_rate+=4"]};
        equipment[5197] = {name: "曲奇的吹火棍", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_misc_flute_01", affix: 15114, effect: ["str+=2", "sta+=3", "critical_rate+=2", "dodge_rate+=1"]};
        equipment[5198] = {name: "曲奇的搅汤棒", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_staff_02", affix: 16242, effect: ["int+=11", "sta+=3", "critical_rate+=2", "dodge_rate+=1"]};
        equipment[5192] = {name: "盗贼之刃", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_sword_24", affix: 15115, effect: ["agi+=2", "sta+=3", "critical_rate+=1", "dodge_rate+=2"]};
        equipment[5193] = {name: "兄弟会斗篷", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_helmet_48", affix: 5101, effect: ["main+=3", "sta+=3", "hit_rate+=2", "dodge_rate+=2"]};
        // 梵妮莎·范克里夫
        equipment[63478] = {name: "石匠之盔", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_helmet_plate_dungeonplate_c_03", affix: 1104, effect: ["main+=5", "sta+=5", "critical_rate+=4", "hit_rate+=3"]};
        equipment[63485] = {name: "反叛罩帽", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_helmet_104", affix: 1102, effect: ["main+=5", "sta+=5", "mastery_rate+=4", "dodge_rate+=3"]};
        equipment[65178] = {name: "范克里夫的靴子", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_boots_leather_15", affix: 12102, effect: ["main+=4", "sta+=4", "mastery_rate+=3", "hit_rate+=2"]};
        equipment[63479] = {name: "显要腕甲", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_bracer_mail_dungeonmail_c_03", affix: 8103, effect: ["main+=3", "sta+=3", "critical_rate+=3", "hit_rate+=2"]};
        equipment[63486] = {name: "背弃镣铐", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_bracer_mail_dungeonmail_c_03", affix: 8103, effect: ["main+=3", "sta+=3", "hit_rate+=3", "dodge_rate+=2"]};
        equipment[63482] = {name: "女儿之手", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_gauntlets_robe_dungeonrobe_c_03", affix: 9101, effect: ["main+=4", "sta+=4", "critical_rate+=3", "dodge_rate+=2"]};
        equipment[63483] = {name: "会长的战靴", rare: 4, c_lvl: 15, e_lvl: 20, icon: "inv_boots_plate_dungeonplate_c_03", affix: 12104, effect: ["main+=4", "sta+=4", "mastery_rate+=3", "dodge_rate+=2"]};

    }// 死亡矿井

    return equipment;
}