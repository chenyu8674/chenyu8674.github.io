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
     * type1 装备倾向
     * 9-其他
     * 1-物理 2-法系
     *
     * type2 装备类型（非武器）
     * 99-其他
     * 01-布甲 02-皮甲 03-锁甲 04-板甲
     *
     * type2 装备类型（武器）
     * 99-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     *
     * c_lvl-可装备等级
     * e_lvl-物品等级
     */

    equipment["新手衬衫"] = {name: "新手衬衫", icon: "inv_shirt_01", rare: 2, affix: 6199};
    equipment["训练双手剑"] = {name: "训练双手剑", icon: "inv_sword_06", rare: 2, affix: 15125};
    equipment["训练单手剑"] = {name: "训练单手剑", icon: "inv_sword_04", rare: 2, affix: 15115};
    equipment["训练单手锤"] = {name: "训练单手锤", icon: "inv_mace_06", rare: 2, affix: 15214};
    equipment["训练盾牌"] = {name: "训练盾牌", icon: "inv_shield_03", rare: 2, affix: 16141};
    equipment["训练之弓"] = {name: "训练之弓", icon: "inv_weapon_bow_02", rare: 2, affix: 15131};
    equipment["训练长杖"] = {name: "训练长杖", icon: "inv_staff_09", rare: 2, affix: 15122};
    equipment["训练法杖"] = {name: "训练法杖", icon: "inv_staff_08", rare: 2, affix: 15222};

    equipment["训练罩袍"] = {name: "训练罩袍", icon: "inv_chest_cloth_21", rare: 2, affix: 4101};
    equipment["训练皮衣"] = {name: "训练皮衣", icon: "inv_chest_leather_01", rare: 2, affix: 4102};
    equipment["训练链甲"] = {name: "训练链甲", icon: "inv_chest_chain_16", rare: 2, affix: 4103};
    equipment["训练胸铠"] = {name: "训练胸铠", icon: "inv_chest_plate01", rare: 2, affix: 4104};

    equipment["阿什坎迪，兄弟会之剑"] = {
        rare: 5, c_lvl: 60, e_lvl: 81, name: "阿什坎迪，兄弟会之剑", icon: "inv_sword_50",
        affix: 15125, effect: ["sta+=33", "attack_power+=86"], detail: "\"刀柄上刻有大写字母A.L。\""
    };

    equipment["萨弗拉斯，炎魔拉格纳罗斯之手"] = {
        rare: 6, c_lvl: 1, e_lvl: 1, name: "萨弗拉斯，炎魔拉格纳罗斯之手", icon: "inv_hammer_unique_sulfuras",
        affix: 15124, effect: ["str+=1", "sta+=1", "res_fire+=30"], detail: "\"让火焰净化一切！\"", skill: "fire_of_sulfuras"
    };

    {
        equipment["环刺护腕"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "环刺护腕", icon: "inv_bracer_07",
            affix: 8104, effect: ["str+=1", "int+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["咆哮之口长裤"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "咆哮之口长裤", icon: "inv_pants_06",
            affix: 11101, effect: ["int+=2", "sta+=3", "hit_rate+=1", "critical_rate+=3"]
        };
        equipment["阿达罗格之牙"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "阿达罗格之牙", icon: "inv_weapon_shortblade_25",
            affix: 15111, effect: ["agi+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["焦灼的炽焰猎犬之靴"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "焦灼的炽焰猎犬之靴", icon: "inv_boots_05",
            affix: 12102, effect: ["agi+=2", "int+=2", "sta+=2", "hit_rate+=3", "critical_rate+=1"]
        };
        equipment["骨炭护腰"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "骨炭护腰", icon: "inv_belt_16",
            affix: 10103, effect: ["agi+=2", "int+=2", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["黑暗仪式斗篷"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "黑暗仪式斗篷", icon: "inv_misc_cape_18",
            affix: 5101, effect: ["str+=1", "agi+=1", "int+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["破碎图腾之握"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "破碎图腾之握", icon: "inv_chest_leather_08",
            affix: 4102, effect: ["agi+=2", "int+=2", "sta+=3", "hit_rate+=3", "critical_rate+=1"]
        };
        equipment["黑色元素腕轮"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "黑色元素腕轮", icon: "inv_bracer_13",
            affix: 8101, effect: ["int+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["黑暗萨满卫衣"] = {
            rare: 4, c_lvl: 7, e_lvl: 9, name: "黑暗萨满卫衣", icon: "inv_chest_leather_08",
            affix: 4103, effect: ["agi+=2", "int+=2", "sta+=3", "hit_rate+=1", "critical_rate+=3"]
        };
        equipment["焦灼链甲"] = {
            rare: 4, c_lvl: 7, e_lvl: 10, name: "焦灼链甲", icon: "inv_chest_chain",
            affix: 4103, effect: ["str+=2", "int+=2", "sta+=3", "hit_rate+=3", "critical_rate+=1"]
        };
        equipment["角质护腕"] = {
            rare: 4, c_lvl: 7, e_lvl: 10, name: "角质护腕", icon: "inv_bracer_05",
            affix: 8102, effect: ["agi+=1", "int+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["萤火法袍"] = {
            rare: 4, c_lvl: 7, e_lvl: 10, name: "萤火法袍", icon: "inv_chest_cloth_24",
            affix: 4101, effect: ["int+=2", "sta+=3", "hit_rate+=3", "critical_rate+=1"]
        };
        equipment["甲质腕轮"] = {
            rare: 4, c_lvl: 7, e_lvl: 10, name: "甲质腕轮", icon: "inv_bracer_05",
            affix: 8103, effect: ["agi+=1", "int+=1", "sta+=2", "critical_rate+=1"]
        };
        equipment["熬心之杖"] = {
            rare: 4, c_lvl: 7, e_lvl: 11, name: "熬心之杖", icon: "inv_staff_13",
            affix: 15222, effect: ["int+=9", "sta+=3", "hit_rate+=1", "critical_rate+=3"]
        };
        equipment["踏血锁靴"] = {
            rare: 4, c_lvl: 7, e_lvl: 11, name: "踏血锁靴", icon: "inv_boots_01",
            affix: 12104, effect: ["str+=2", "int+=2", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["血咒魔刃"] = {
            rare: 4, c_lvl: 7, e_lvl: 11, name: "血咒魔刃", icon: "inv_weapon_shortblade_12",
            affix: 15111, effect: ["str+=1", "agi+=1", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["无边怒火腰带"] = {
            rare: 4, c_lvl: 7, e_lvl: 11, name: "无边怒火腰带", icon: "inv_belt_37a",
            affix: 10102, effect: ["agi+=2", "int+=2", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
        equipment["戈多斯的碾压之手"] = {
            rare: 4, c_lvl: 7, e_lvl: 11, name: "戈多斯的碾压之手", icon: "inv_gauntlets_03",
            affix: 9103, effect: ["agi+=2", "int+=2", "sta+=2", "hit_rate+=1", "critical_rate+=1"]
        };
    }// 怒焰裂谷

    return equipment;
}