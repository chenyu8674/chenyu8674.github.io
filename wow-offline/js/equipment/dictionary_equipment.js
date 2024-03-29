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
        equipment[18] = {name: "训练匕首", icon: "inv_weapon_shortblade_01", rare: 2, affix: 15111};
        equipment[19] = {name: "训练单手斧", icon: "inv_axe_01", rare: 2, affix: 15113};

        equipment[31] = {name: "新兵衬衫", icon: "inv_shirt_01", rare: 2, affix: 6199};
        equipment[32] = {
            name: "新兵战袍", icon: "inv_shirt_guildtabard_01", rare: 2, affix: 7199,
            effect: ["speed_battle+=10"]
        };
        equipment[33] = {
            name: "大佬衬衫", icon: "inv_shirt_01", rare: 6, affix: 6199, detail: "ONLY FOR NOOB",
            effect: ["speed_move+=400"]
        };
        equipment[34] = {
            name: "基情战袍", icon: "inv_shirt_guildtabard_01", rare: 6, affix: 7199, detail: "DAISY BOOM",
            effect: ["speed_battle+=200", "speed_resource+=200"]
        };

        equipment[21] = {name: "训练罩袍", icon: "inv_chest_cloth_21", rare: 2, affix: 4101};
        equipment[22] = {name: "训练皮衣", icon: "inv_chest_leather_01", rare: 2, affix: 4102};
        equipment[23] = {name: "训练链甲", icon: "inv_chest_chain_16", rare: 2, affix: 4103};
        equipment[24] = {name: "训练胸铠", icon: "inv_chest_plate01", rare: 2, affix: 4104};
    }// 初始装备
    {
        equipment[12940] = {
            name: "雷德的神圣控诉者", rare: 4, icon: "inv_sword_43", affix: 15115,
            effect: ["万用", "暴击"], sets: "雷德双刀"
        };
        equipment[12939] = {
            name: "雷德的部族护卫者", rare: 4, icon: "inv_sword_40", affix: 15115,
            effect: ["万用", "暴击"], sets: "雷德双刀"
        };

        equipment[17182] = {
            name: "萨弗拉斯，炎魔拉格纳罗斯之手", rare: 6, icon: "inv_hammer_unique_sulfuras", affix: 15124,
            effect: ["力量耐力", "res_fire+=30"],
            detail: "“让火焰净化一切！”", skill: 21162
        };
        equipment[22589] = {
            name: "埃提耶什，守护者的传说之杖", rare: 6, icon: "inv_staff_medivh", affix: 15222,
            effect: ["智力耐力", "magic_power_percent+=5", "heal_power_percent+=5"],
            detail: "麦迪文的气息令你如芒刺在背……", skill: 28148
        };
        equipment[19019] = {
            name: "雷霆之怒，逐风者的祝福之剑", rare: 6, icon: "inv_sword_39", affix: 15115,
            effect: ["敏捷耐力", "res_fire+=5", "res_natural+=5"],
            detail: "觉醒吧，雷霆之怒！", skill: 21992
        };
    }// 测试装备
    {
        // 阿达罗格
        equipment[82879] = {
            name: "环刺护腕", rare: 4, c_lvl: 12, icon: "inv_bracer_07", affix: 8104,
            effect: ["万用", "暴击全能"]
        };
        equipment[82772] = {
            name: "咆哮之口长裤", rare: 4, c_lvl: 12, icon: "inv_pants_06", affix: 11101,
            effect: ["万用", "暴击急速"]
        };
        equipment[82880] = {
            name: "阿达罗格之牙", rare: 4, c_lvl: 12, icon: "inv_weapon_shortblade_04", affix: 15111,
            effect: ["敏捷耐力", "暴击急速"]
        };
        equipment[151421] = {
            name: "焦灼的炽焰猎犬之靴", rare: 4, c_lvl: 12, icon: "inv_boots_05", affix: 12102,
            effect: ["万用", "暴击全能"]
        };
        equipment[151422] = {
            name: "骨炭护腰", rare: 4, c_lvl: 12, icon: "inv_belt_16", affix: 10103,
            effect: ["万用", "暴击全能"]
        };
        // 黑暗萨满柯兰萨
        equipment[82882] = {
            name: "黑暗仪式斗篷", rare: 4, c_lvl: 12, icon: "inv_helmet_48", affix: 5101,
            effect: ["万用", "暴击急速"]
        };
        equipment[82877] = {
            name: "破碎图腾之握", rare: 4, c_lvl: 12, icon: "inv_chest_leather_10", affix: 4102,
            effect: ["万用", "急速全能"]
        };
        equipment[82881] = {
            name: "黑色元素腕轮", rare: 4, c_lvl: 12, icon: "inv_bracer_13", affix: 8101,
            effect: ["万用", "暴击全能"]
        };
        equipment[132551] = {
            name: "黑暗萨满卫衣", rare: 4, c_lvl: 12, icon: "inv_chest_leather_10", affix: 4103,
            effect: ["万用", "急速全能"]
        };
        // 焰喉
        equipment[82885] = {
            name: "焦灼链甲", rare: 4, c_lvl: 12, icon: "inv_chest_chain", affix: 4104,
            effect: ["万用", "急速全能"]
        };
        equipment[82884] = {
            name: "角质护腕", rare: 4, c_lvl: 12, icon: "inv_bracer_05", affix: 8102,
            effect: ["万用", "暴击全能"]
        };
        equipment[82878] = {
            name: "萤火法袍", rare: 4, c_lvl: 12, icon: "inv_chest_cloth_18", affix: 4101,
            effect: ["万用", "暴击急速"]
        };
        equipment[132552] = {
            name: "甲质腕轮", rare: 4, c_lvl: 12, icon: "inv_bracer_05", affix: 8103,
            effect: ["万用", "暴击全能"]
        };
        // 熔岩守卫戈多斯
        equipment[82888] = {
            name: "熬心之杖", rare: 4, c_lvl: 12, icon: "inv_staff_13", affix: 15222,
            effect: ["智力耐力", "急速全能"]
        };
        equipment[82886] = {
            name: "踏血锁靴", rare: 4, c_lvl: 12, icon: "inv_boots_01", affix: 12104,
            effect: ["万用", "暴击急速"]
        };
        equipment[82883] = {
            name: "血咒魔刃", rare: 4, c_lvl: 12, icon: "inv_weapon_shortblade_12", affix: 15111,
            effect: ["万用"], skill: 18381
        };
        equipment[151424] = {
            name: "无边怒火腰带", rare: 4, c_lvl: 12, icon: "inv_belt_37a", affix: 10102,
            effect: ["万用", "急速全能"]
        };
        equipment[151425] = {
            name: "戈多斯的碾压之手", rare: 4, c_lvl: 12, icon: "inv_gauntlets_03", affix: 9103,
            effect: ["万用", "急速全能"]
        };
    }// 12 怒焰裂谷
    {
        equipment[10412] = {
            name: "尖牙腰带", rare: 4, c_lvl: 14, icon: "inv_belt_03", affix: 10102,
            effect: ["万用", "暴击全能"], sets: "毒蛇的拥抱"
        };// 安娜科德拉
        equipment[10411] = {
            name: "尖牙足垫", rare: 4, c_lvl: 14, icon: "inv_boots_04", affix: 12102,
            effect: ["万用", "急速全能"], sets: "毒蛇的拥抱"
        };// 瑟芬迪斯
        equipment[10413] = {
            name: "尖牙手套", rare: 4, c_lvl: 14, icon: "inv_gauntlets_18", affix: 9102,
            effect: ["万用", "精通"], sets: "毒蛇的拥抱", bind: 1
        };// 尖牙德鲁伊
        equipment[10410] = {
            name: "尖牙护腿", rare: 4, c_lvl: 14, icon: "inv_pants_02", affix: 11102,
            effect: ["万用", "暴击急速"], sets: "毒蛇的拥抱"
        };// 考布莱恩
        equipment[6473] = {
            name: "尖牙铠甲", rare: 4, c_lvl: 14, icon: "inv_shirt_16", affix: 4102,
            effect: ["万用", "急速全能"], sets: "毒蛇的拥抱"
        };// 皮萨斯
        // 安娜科德拉
        equipment[5404] = {
            name: "坚硬的肩垫", rare: 4, c_lvl: 14, icon: "inv_shoulder_08", affix: 3102,
            effect: ["万用", "暴击急速"]
        };
        equipment[132737] = {
            name: "洞穴蛇行者肩甲", rare: 4, c_lvl: 14, icon: "inv_shoulder_08", affix: 3103,
            effect: ["万用", "暴击急速"]
        };
        equipment[151427] = {
            name: "驯蛇人之冠", rare: 4, c_lvl: 14, icon: "inv_helmet_22", affix: 1104,
            effect: ["万用", "暴击急速"]
        };
        equipment[151426] = {
            name: "安娜科德拉的绸缎护腕", rare: 4, c_lvl: 14, icon: "inv_bracer_12", affix: 8201,
            effect: ["万用", "暴击急速"]
        };
        // 皮萨斯
        equipment[6472] = {
            name: "毒蛇之刺", rare: 4, c_lvl: 14, icon: "inv_wand_10", affix: 15114,
            effect: [], skill: 18197
        };
        equipment[151429] = {
            name: "皮萨斯的肩甲", rare: 4, c_lvl: 14, icon: "inv_shoulder_20", affix: 3104,
            effect: ["万用", "暴击全能"]
        };
        equipment[151428] = {
            name: "休眠之丝腰带", rare: 4, c_lvl: 14, icon: "inv_belt_43c", affix: 10101,
            effect: ["万用", "暴击全能"]
        };
        // 考布莱恩
        equipment[6460] = {
            name: "考布莱恩的腰带", rare: 4, c_lvl: 14, icon: "inv_belt_03", affix: 10104,
            effect: ["万用", "暴击急速"]
        };
        equipment[6465] = {
            name: "水蛇法袍", rare: 4, c_lvl: 14, icon: "inv_chest_cloth_36", affix: 4101,
            effect: ["万用", "急速全能"]
        };
        // 克雷什
        equipment[6447] = {
            name: "破旧的龟壳盾牌", rare: 4, c_lvl: 14, icon: "inv_shield_21", affix: 16141,
            effect: ["万用", "精通格挡"]
        };
        equipment[13245] = {
            name: "克雷什之背", rare: 4, c_lvl: 14, icon: "inv_shield_18", affix: 16141,
            effect: ["万用", "防御格挡"]
        };
        equipment[151430] = {
            name: "铁锈龟壳吊坠", rare: 4, c_lvl: 14, icon: "inv_misc_necklacea1", affix: 2199,
            effect: ["sta+=3", "critical_rate+=9", "haste_rate+=3"]
        };
        // 斯卡姆
        equipment[6449] = {
            name: "发光的蜥蜴披风", rare: 4, c_lvl: 14, icon: "inv_chest_cloth_15", affix: 5101,
            effect: ["万用", "暴击急速"]
        };
        equipment[6448] = {
            name: "尾钉", rare: 4, c_lvl: 14, icon: "inv_weapon_shortblade_10", affix: 15111,
            effect: ["敏捷耐力", "急速全能"]
        };
        // 变异精灵龙
        equipment[5243] = {
            name: "彩火魔杖", rare: 4, c_lvl: 14, icon: "inv_wand_11", affix: 15216,
            multiple: 1.2, effect: ["智力耐力"]
        };
        equipment[6632] = {
            name: "灵鳞披风", rare: 4, c_lvl: 14, icon: "inv_misc_cape_13", affix: 5101,
            multiple: 1.2, effect: ["万用"]
        };
        // 瑟芬迪斯
        equipment[5970] = {
            name: "毒蛇手套", rare: 4, c_lvl: 14, icon: "inv_gauntlets_19", affix: 9101,
            effect: ["万用", "暴击全能"]
        };
        equipment[6459] = {
            name: "野蛮锁靴", rare: 4, c_lvl: 14, icon: "inv_boots_01", affix: 12103,
            effect: ["万用", "暴击全能"]
        };
        equipment[6469] = {
            name: "毒蛇", rare: 4, c_lvl: 14, icon: "inv_weapon_bow_10", affix: 15131,
            effect: ["敏捷耐力"], skill: 29636
        };
        // 永生者沃尔丹
        equipment[6629] = {
            name: "蜘蛛斗篷", rare: 4, c_lvl: 14, icon: "inv_misc_cape_17", affix: 5101,
            effect: ["万用", "暴击全能"]
        };
        equipment[6630] = {
            name: "淡云圆盾", rare: 4, c_lvl: 14, icon: "inv_shield_10", affix: 16141,
            effect: ["万用", "暴击全能"]
        };
        equipment[6631] = {
            name: "生命之根", rare: 4, c_lvl: 14, icon: "inv_staff_25", affix: 15222,
            effect: ["万用", "暴击急速"]
        };
        // 吞噬者穆坦努斯
        equipment[6463] = {
            name: "深渊之戒", rare: 4, c_lvl: 14, icon: "inv_jewelry_ring_15", affix: 13199,
            effect: ["sta+=3", "critical_rate+=3", "hit_rate+=7"]
        };
        equipment[6461] = {
            name: "粘液覆盖的垫肩", rare: 4, c_lvl: 14, icon: "inv_shoulder_05", affix: 3101,
            effect: ["万用", "急速全能"]
        };
        equipment[6627] = {
            name: "变异板甲", rare: 4, c_lvl: 14, icon: "inv_chest_plate08", affix: 4104,
            effect: ["万用", "暴击全能"]
        };
        equipment[8350] = {
            name: "至尊一戒", rare: 6, c_lvl: 14, icon: "inv_jewelry_ring_03", affix: 13199, detail: "“比至尊二戒稍差那么一点”",
            multiple: 0.1, effect: ["多彩", "命中", "暴击全能", "急速防御", "精通韧性"]
        };
    }// 14 哀嚎洞穴
    {
        // 黑暗迪菲亚
        equipment[10403] = {
            name: "黑暗迪菲亚腰带", rare: 4, c_lvl: 16, icon: "inv_belt_03", affix: 10102,
            multiple: 1.2, effect: ["万用"], sets: "黑暗迪菲亚护甲", bind: 1
        };
        equipment[10402] = {
            name: "黑暗迪菲亚长靴", rare: 4, c_lvl: 16, icon: "inv_boots_05", affix: 12102,
            multiple: 1.2, effect: ["万用"], sets: "黑暗迪菲亚护甲", bind: 1
        };
        equipment[10401] = {
            name: "黑暗迪菲亚手套", rare: 4, c_lvl: 16, icon: "inv_gauntlets_05", affix: 9102,
            multiple: 1.2, effect: ["万用"], sets: "黑暗迪菲亚护甲", bind: 1
        };
        equipment[10400] = {
            name: "黑暗迪菲亚护腿", rare: 4, c_lvl: 16, icon: "inv_pants_12", affix: 11102,
            multiple: 1.2, effect: ["万用"], sets: "黑暗迪菲亚护甲", bind: 1
        };
        equipment[10399] = {
            name: "黑暗迪菲亚护甲", rare: 4, c_lvl: 16, icon: "inv_chest_leather_08", affix: 4102,
            multiple: 1.2, effect: ["万用"], sets: "黑暗迪菲亚护甲", bind: 1
        };
        // 格拉布托克
        equipment[5444] = {
            name: "矿工斗篷", rare: 4, c_lvl: 16, icon: "inv_misc_cape_02", affix: 5101,
            effect: ["万用", "暴击急速"]
        };
        equipment[5195] = {
            name: "金斑手套", rare: 4, c_lvl: 16, icon: "inv_gauntlets_23", affix: 9101,
            effect: ["万用", "暴击全能"]
        };
        equipment[2169] = {
            name: "蜂鸣之刃", rare: 4, c_lvl: 16, icon: "inv_weapon_shortblade_05", affix: 15111,
            effect: ["敏捷耐力", "暴击"]
        };
        equipment[151064] = {
            name: "好奇访客的外套", rare: 4, c_lvl: 16, icon: "inv_chest_leather_31", affix: 4102,
            effect: ["万用", "急速全能"]
        };
        // 赫利克斯·破甲
        equipment[5191] = {
            name: "残酷倒钩", rare: 4, c_lvl: 16, icon: "inv_sword_04", affix: 15115,
            effect: ["万用", "暴击急速"]
        };
        equipment[132556] = {
            name: "熔炼师的长裤", rare: 4, c_lvl: 16, icon: "inv_pants_02", affix: 11103,
            effect: ["万用", "暴击全能"]
        };
        equipment[5443] = {
            name: "镀金圆盾", rare: 4, c_lvl: 16, icon: "inv_shield_02", affix: 16141,
            effect: ["万用", "急速全能"]
        };
        equipment[151062] = {
            name: "流亡建筑师的护臂", rare: 4, c_lvl: 16, icon: "inv_bracer_robe_dungeonrobe_c_03", affix: 8201,
            effect: ["万用", "暴击急速"]
        };
        equipment[5199] = {
            name: "铁匠短裤", rare: 4, c_lvl: 16, icon: "inv_pants_02", affix: 11102,
            effect: ["万用", "暴击全能"]
        };
        equipment[151063] = {
            name: "符记手铠", rare: 4, c_lvl: 16, icon: "inv_glove_plate_dungeonplate_c_03", affix: 9104,
            effect: ["万用", "急速全能"]
        };
        equipment[5200] = {
            name: "穿刺鱼叉", rare: 4, c_lvl: 16, icon: "inv_spear_06", affix: 15121,
            effect: ["敏捷耐力", "暴击全能"]
        };
        // 死神5000
        equipment[5201] = {
            name: "火石法杖", rare: 4, c_lvl: 16, icon: "inv_staff_13", affix: 15222,
            effect: ["智力耐力", "暴击全能"]
        };
        equipment[151065] = {
            name: "老友的手套", rare: 4, c_lvl: 16, icon: "inv_gauntlets_mail_dungeonmail_c_03", affix: 9103,
            effect: ["万用", "暴击急速"]
        };
        equipment[5187] = {
            name: "死神之锤", rare: 4, c_lvl: 16, icon: "inv_hammer_04", affix: 15124,
            effect: ["力量耐力", "暴击急速"]
        };
        equipment[151066] = {
            name: "失踪外交家的肩甲", rare: 4, c_lvl: 16, icon: "inv_shoulder_plate_dungeonplate_c_03", affix: 3104,
            effect: ["万用", "急速全能"]
        };
        equipment[1937] = {
            name: "电锯", rare: 4, c_lvl: 16, icon: "inv_sword_24", affix: 15115,
            effect: ["敏捷耐力", "暴击急速"]
        };
        // 撕心狼将军
        equipment[5196] = {
            name: "重拳先生的战斧", rare: 4, c_lvl: 16, icon: "inv_axe_01", affix: 15113,
            effect: ["力量耐力", "暴击急速"]
        };
        equipment[872] = {
            name: "切石者", rare: 4, c_lvl: 16, icon: "inv_throwingaxe_01", affix: 15123,
            effect: ["敏捷耐力", "暴击急速"]
        };
        equipment[1156] = {
            name: "豪华珠宝戒指", rare: 4, c_lvl: 16, icon: "inv_jewelry_ring_09", affix: 13199,
            effect: ["sta+=3", "critical_rate+=7", "haste_rate+=3"]
        };
        // “船长”曲奇
        equipment[5202] = {
            name: "海盗的罩衫", rare: 4, c_lvl: 16, icon: "inv_shirt_08", affix: 4101,
            effect: ["万用", "暴击全能"]
        };
        equipment[5197] = {
            name: "曲奇的吹火棍", rare: 4, c_lvl: 16, icon: "inv_misc_flute_01", affix: 15214,
            effect: ["万用", "暴击全能"]
        };
        equipment[5198] = {
            name: "曲奇的搅汤棒", rare: 4, c_lvl: 16, icon: "inv_staff_02", affix: 15216,
            effect: ["万用", "暴击全能"]
        };
        equipment[5192] = {
            name: "盗贼之刃", rare: 4, c_lvl: 16, icon: "inv_sword_24", affix: 15115,
            effect: ["敏捷耐力", "暴击全能"]
        };
        equipment[5193] = {
            name: "兄弟会斗篷", rare: 4, c_lvl: 16, icon: "inv_helmet_48", affix: 5101,
            effect: ["万用", "急速全能"]
        };
        // 梵妮莎·范克里夫
        equipment[63478] = {
            name: "石匠之盔", rare: 4, c_lvl: 16, icon: "inv_helmet_plate_dungeonplate_c_03", affix: 1104,
            effect: ["万用", "暴击急速"]
        };
        equipment[63485] = {
            name: "反叛罩帽", rare: 4, c_lvl: 16, icon: "inv_helmet_104", affix: 1102,
            effect: ["万用", "精通全能"]
        };
        equipment[65178] = {
            name: "范克里夫的靴子", rare: 4, c_lvl: 16, icon: "inv_boots_leather_15", affix: 12102,
            effect: ["万用", "精通急速"]
        };
        equipment[63479] = {
            name: "显要腕甲", rare: 4, c_lvl: 16, icon: "inv_bracer_mail_dungeonmail_c_03", affix: 8103,
            effect: ["万用", "暴击急速"]
        };
        equipment[63486] = {
            name: "背弃镣铐", rare: 4, c_lvl: 16, icon: "inv_bracer_mail_dungeonmail_c_03", affix: 8103,
            effect: ["万用", "急速全能"]
        };
        equipment[63482] = {
            name: "女儿之手", rare: 4, c_lvl: 16, icon: "inv_gauntlets_robe_dungeonrobe_c_03", affix: 9101,
            effect: ["万用", "暴击全能"]
        };
        equipment[63483] = {
            name: "会长的战靴", rare: 4, c_lvl: 16, icon: "inv_boots_plate_dungeonplate_c_03", affix: 12104,
            effect: ["万用", "精通全能"]
        };

    }// 16 死亡矿井
    {
        // 灰葬男爵
        equipment[6314] = {
            name: "狼王斗篷", rare: 4, c_lvl: 18, icon: "inv_misc_cape_10", affix: 5101,
            effect: ["万用", "暴击急速"]
        };
        equipment[6324] = {
            name: "阿鲁高法袍", rare: 4, c_lvl: 18, icon: "inv_chest_cloth_31", affix: 4101,
            effect: ["万用", "暴击全能"]
        };
        equipment[6323] = {
            name: "巴隆的节杖", rare: 4, c_lvl: 18, icon: "inv_mace_02", affix: 15114,
            effect: ["万用", "暴击急速"]
        };
        equipment[23173] = {
            name: "憎恶皮护腿", rare: 4, c_lvl: 18, icon: "inv_pants_06", affix: 11101,
            effect: ["万用", "暴击"]
        };
        // 席瓦莱恩男爵
        equipment[5943] = {
            name: "地狱护腕", rare: 4, c_lvl: 18, icon: "inv_bracer_03", affix: 8104,
            effect: ["万用", "暴击全能"]
        };
        equipment[6321] = {
            name: "席瓦莱恩家族徽记", rare: 4, c_lvl: 18, icon: "inv_belt_29", affix: 13199,
            effect: ["haste_rate+=10", "hit_rate+=6"]
        };
        equipment[132567] = {
            name: "盲眼守护者腰链", rare: 4, c_lvl: 18, icon: "inv_belt_03", affix: 10103,
            effect: ["万用", "急速全能"]
        };
        equipment[132568] = {
            name: "影牙肩甲", rare: 4, c_lvl: 18, icon: "inv_shoulder_08", affix: 3103,
            effect: ["万用", "暴击急速"]
        };
        equipment[6319] = {
            name: "盲者束带", rare: 4, c_lvl: 18, icon: "inv_belt_03", affix: 10102,
            effect: ["万用", "暴击全能"]
        };
        equipment[5254] = {
            name: "皱褶肩甲", rare: 4, c_lvl: 18, icon: "inv_shoulder_08", affix: 3102,
            effect: ["万用", "急速全能"]
        };
        // 指挥官斯普林瓦尔
        equipment[6320] = {
            name: "指挥官纹章盾", rare: 4, c_lvl: 18, icon: "inv_shield_03", affix: 16141,
            effect: ["万用", "命中防御"]
        };
        equipment[3191] = {
            name: "曲刃战斧", rare: 4, c_lvl: 18, icon: "inv_axe_06", affix: 15123,
            effect: ["万用", "暴击急速"]
        };
        equipment[151067] = {
            name: "萦绕悲伤之靴", rare: 4, c_lvl: 18, icon: "inv_boots_robe_dungeonrobe_c_03", affix: 12101,
            effect: ["万用", "暴击全能"]
        };
        equipment[151068] = {
            name: "掠食者之靴", rare: 4, c_lvl: 18, icon: "inv_boots_leather_15", affix: 12102,
            effect: ["万用", "暴击急速"]
        };
        equipment[151070] = {
            name: "格雷迈恩之墙手甲", rare: 4, c_lvl: 18, icon: "inv_glove_plate_dungeonplate_c_03", affix: 9104,
            effect: ["万用", "暴击全能"]
        };
        equipment[151069] = {
            name: "静寂之心胸甲", rare: 4, c_lvl: 18, icon: "inv_chest_mail_dungeonmail_c_03", affix: 4103,
            effect: ["万用", "急速全能"]
        };
        // 死亡之誓
        equipment[6641] = {
            name: "鬼魂之刃", rare: 4, c_lvl: 18, icon: "inv_sword_17", affix: 15125,
            effect: ["力量耐力", "急速全能"]
        };
        equipment[6642] = {
            name: "幻影之甲", rare: 4, c_lvl: 18, icon: "inv_chest_chain_05", affix: 4104,
            effect: ["万用", "暴击急速"]
        };
        // 沃登勋爵
        equipment[6341] = {
            name: "怪异的马厩灯笼", rare: 4, c_lvl: 18, icon: "inv_misc_lantern_01", affix: 16242,
            effect: ["智力耐力", "暴击急速"]
        };
        equipment[3230] = {
            name: "黑狼护腕", rare: 4, c_lvl: 18, icon: "inv_bracer_07", affix: 8102,
            effect: ["万用", "暴击全能"]
        };
        equipment[1292] = {
            name: "屠夫的切肉斧", rare: 4, c_lvl: 18, icon: "inv_axe_23", affix: 15113,
            effect: ["万用", "暴击全能"]
        };
        equipment[132566] = {
            name: "黑狼裹腕", rare: 4, c_lvl: 18, icon: "inv_bracer_07", affix: 8103,
            effect: ["万用", "暴击急速"]
        };
        // 高弗雷勋爵
        equipment[6318] = {
            name: "奥杜之杖", rare: 4, c_lvl: 18, icon: "inv_staff_27", affix: 15222,
            effect: ["万用", "暴击全能"]
        };
        equipment[3748] = {
            name: "猎豹衬肩", rare: 4, c_lvl: 18, icon: "inv_shoulder_05", affix: 3101,
            effect: ["万用", "急速全能"]
        };
        equipment[6220] = {
            name: "流星碎片", rare: 4, c_lvl: 18, icon: "inv_weapon_shortblade_25", affix: 15111,
            effect: ["敏捷耐力"], skill: 245729
        };
        equipment[151073] = {
            name: "误导腿铠", rare: 4, c_lvl: 18, icon: "inv_pants_plate_dungeonplate_c_03", affix: 11104,
            effect: ["万用", "急速全能"]
        };
        equipment[151071] = {
            name: "换盏手甲", rare: 4, c_lvl: 18, icon: "inv_gauntlets_25", affix: 9102,
            effect: ["万用", "暴击全能"]
        };
        equipment[151072] = {
            name: "狼人猎手之盔", rare: 4, c_lvl: 18, icon: "inv_helmet_mail_dungeonmail_c_03", affix: 1103,
            effect: ["万用", "急速全能"]
        };
    }// 18 影牙城堡
    {
        equipment[63344] = {
            name: "标准型囚犯短靴", rare: 4, c_lvl: 20, icon: "inv_boots_05", affix: 12102,
            effect: ["万用", "暴击全能"]
        };
        equipment[63345] = {
            name: "贵族长袍", rare: 4, c_lvl: 20, icon: "inv_chest_cloth_38", affix: 4101,
            effect: ["万用", "暴击全能"]
        };
        equipment[63346] = {
            name: "邪恶短匕", rare: 4, c_lvl: 20, icon: "inv_weapon_shortblade_04", affix: 15111,
            effect: ["敏捷耐力", "暴击全能"]
        };
        equipment[132570] = {
            name: "失窃的卫兵链甲靴", rare: 4, c_lvl: 20, icon: "inv_boots_05", affix: 12103,
            effect: ["万用", "暴击急速"]
        };
        equipment[151077] = {
            name: "生铁腰铠", rare: 4, c_lvl: 20, icon: "inv_belt_48c", affix: 10104,
            effect: ["万用", "暴击急速"]
        };
        equipment[2168] = {
            name: "踏尸长靴", rare: 4, c_lvl: 20, icon: "inv_boots_03", affix: 12101,
            effect: ["万用", "急速全能"]
        };
        equipment[1934] = {
            name: "霍格的长裤", rare: 4, c_lvl: 20, icon: "inv_pants_02", affix: 11102,
            effect: ["万用", "暴击全能"]
        };
        equipment[1959] = {
            name: "冷铁镐", rare: 4, c_lvl: 20, icon: "inv_pick_01", affix: 15123,
            effect: ["万用", "暴击急速"]
        };
        equipment[132569] = {
            name: "失窃的狱卒护胫", rare: 4, c_lvl: 20, icon: "inv_pants_02", affix: 11103,
            effect: ["万用", "暴击急速"]
        };
        equipment[151074] = {
            name: "狱卒的护肩", rare: 4, c_lvl: 20, icon: "inv_shoulder_13", affix: 3104,
            effect: ["万用", "暴击全能"]
        };
        equipment[4676] = {
            name: "骷髅护手", rare: 4, c_lvl: 20, icon: "inv_gauntlets_03", affix: 9104,
            effect: ["万用", "急速全能"]
        };
        equipment[1929] = {
            name: "丝织长裤", rare: 4, c_lvl: 20, icon: "inv_pants_02", affix: 11101,
            effect: ["万用", "急速全能"]
        };
        equipment[5967] = {
            name: "贵族束带", rare: 4, c_lvl: 20, icon: "inv_belt_10", affix: 10101,
            effect: ["万用", "暴击急速"]
        };
        equipment[151076] = {
            name: "淬火镣铐", rare: 4, c_lvl: 20, icon: "inv_bracer_29", affix: 8103,
            effect: ["万用", "急速全能"]
        };
        equipment[151075] = {
            name: "烬线外套", rare: 4, c_lvl: 20, icon: "inv_chest_leather_03", affix: 4102,
            effect: ["万用", "急速全能"]
        };
    }// 20 监狱
    {

    }// 22 黑暗深渊
    {

    }// 24 剃刀沼泽
    {

    }// 26 血色修道院-墓园
    {

    }// 28 血色修道院-图书馆
    {

    }// 30 诺莫瑞根-前门
    {

    }// 32 诺莫瑞根-后门
    {

    }// 34 血色修道院-军械库
    {

    }// 36 血色修道院-大教堂
    {

    }// 38 剃刀高地
    {

    }// 40 玛拉顿-邪恶洞穴
    {

    }// 42 玛拉顿-毒菇洞穴
    {

    }// 44 祖尔法拉克
    {

    }// 46 厄运之槌-扭木广场
    {

    }// 48 厄运之槌-中心花园
    {

    }// 50 厄运之槌-戈多克议会
    {

    }// 52 阿塔哈卡神庙
    {

    }// 54 黑石深渊-禁闭室
    {

    }// 56 黑石深渊-暗炉城
    {

    }// 58 黑石塔-下层
    {

    }// 58 斯坦索姆-血色区
    {

    }// 60 黑石塔-上层
    {

    }// 60 斯坦索姆-天灾区
    {

    }// 60 通灵学院
    {

    }// 61团 祖尔格拉布
    {

    }// 61团 安其拉废墟
    {

    }// 63团 熔火之心
    {

    }// 65团 奥妮克希亚的巢穴
    {

    }// 65团 黑翼之巢
    {

    }// 67团 安其拉
    {

    }// 70团 纳克萨玛斯
    /*
     * 左：01-头盔 02-项链 03-护肩 04-胸甲 05-披风 06-衬衫 07-战袍 08-护腕
     * 右：09-手套 10-腰带 11-腿甲 12-靴子 13-戒指 14-饰物
     * 下：15-主手 16-副手
     *
     * 99-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     */
    return equipment;
}