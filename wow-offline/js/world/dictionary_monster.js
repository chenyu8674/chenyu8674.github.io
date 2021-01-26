/** 装备基础属性 **/
let dictionary_monster;
$(document).ready(function () {
    dictionary_monster = new_monster();
});

function new_monster() {
    let monster = {};

    /**
     * species 种族 1-人形 2-野兽 3-亡灵 4-恶魔 5-元素生物 6-龙类 7-机械 8-小动物 9-未知
     * type 类型 0-均衡型 1-战士 2-圣骑士 3-猎人 4-萨满 5-德鲁伊 6-盗贼 7-牧师 8-术士 9-法师 99-特殊
     * rare 怪物阶级 1-爪牙 2-怪物 3-稀有 4-精英 5-首领 6-团队首领
     * multiple 属性倍数
     */
    {
        monster["兔子"] = {species: 8, type: 6, rare: 1}
        monster["鹿"] = {species: 8, type: 0, rare: 1}
        monster["迪菲亚暴徒"] = {species: 1, type: 1, rare: 2}
        monster["迪菲亚流浪巫师"] = {
            species: 1, type: 9, rare: 2,
            skill: [dictionary_monster_skill.frost_cast()]
        }
        monster["狗头人矿工"] = {species: 1, type: 1, rare: 1}
        monster["狗头人地卜师"] = {
            species: 1, type: 4, rare: 2,
            skill: [dictionary_monster_skill.natural_cast()]
        }
        monster["鱼人潜伏者"] = {species: 1, type: 6, rare: 2}
        monster["石皮野猪"] = {
            species: 2, type: 5, rare: 2,
            effect: ["health_percent+=40"]
        }
        monster["森林蜘蛛"] = {species: 2, type: 6, rare: 2}
        monster["染病的幼狼"] = {species: 2, type: 0, rare: 1}
        monster["森林灰狼"] = {species: 2, type: 1, rare: 2}

        monster["监工纳尔格"] = {species: 1, type: 1, rare: 3}
        monster["迪菲亚码头主管"] = {species: 1, type: 3, rare: 3}
        monster["母蜘蛛"] = {species: 2, type: 6, rare: 3}

        monster["霍格"] = {
            species: 1, type: 1, rare: 4, x: 27, y: 90,
            skill: [dictionary_monster_skill.bash()]
        }
    }// 艾尔文森林
    {
        monster["生锈的麦田魔像"] = {
            species: 7, type: 0, rare: 1,
            effect: ["armor_attack_percent+=100"]
        }
        monster["看守傀儡"] = {
            species: 7, type: 2, rare: 2,
            effect: ["armor_attack_percent+=100"]
        }
        monster["收割傀儡"] = {
            species: 7, type: 6, rare: 2,
            effect: ["armor_attack_percent+=100"]
        }
        monster["小碎尸鸟"] = {species: 2, type: 3, rare: 1}
        monster["碎尸鸟"] = {species: 2, type: 5, rare: 2}
        monster["大碎尸鸟"] = {species: 2, type: 1, rare: 2}
        monster["河爪豺狼人"] = {species: 1, type: 0, rare: 2}
        monster["河爪斥候"] = {
            species: 1, type: 3, rare: 2,
            skill: [dictionary_monster_skill.multi_shot()]
        }
        monster["河爪秘法师"] = {
            species: 1, type: 4, rare: 2,
            skill: [dictionary_monster_skill.natural_cast(), dictionary_monster_skill.nature_heal()]
        }
        monster["迪菲亚走私者"] = {species: 1, type: 6, rare: 2}
        monster["迪菲亚咒术师"] = {
            species: 1, type: 8, rare: 2,
            skill: [dictionary_monster_skill.fire_cast()]
        }
        monster["迪菲亚拳匪"] = {
            species: 1, type: 1, rare: 2,
            skill: [dictionary_monster_skill.blood_thirst()]
        }

        monster["乌尔图斯"] = {species: 2, type: 6, rare: 3}
        monster["利爪队长"] = {species: 1, type: 1, rare: 3}
        monster["死神4000型"] = {
            species: 7, type: 2, rare: 3,
            skill: [dictionary_monster_skill.natural_attack()]
        }

        monster["克拉文·摩特维克"] = {
            species: 1, type: 6, rare: 4, x: 70, y: 78,
            effect: ["critical_chance_final+=100", "attack_power_percent-=30"]
        }
    }// 西部荒野
    {
        monster["强壮的烈焰猎犬"] = {species: 3, type: 5, rare: 4}
        monster["成年的烈焰猎犬"] = {
            species: 3, type: 2, rare: 4,
            skill: [dictionary_monster_skill.rake()]
        }
        monster["堕落的驯犬人"] = {
            species: 1, type: 1, rare: 4,
            skill: [dictionary_monster_skill.mortal_strike()]
        }
        monster["阿达罗格"] = {
            species: 3, type: 3, rare: 5,
            skill: [dictionary_monster_skill.fire_attack()],
            drop: [82879, 82772, 82880]
        }
        monster["黑暗萨满助手"] = {
            species: 1, type: 4, rare: 4,
            effect: ["block_chance_final+=30", "block_value=100"],
            skill: [dictionary_monster_skill.fire_cast()]
        }
        monster["黑暗萨满研究者"] = {
            species: 1, type: 4, rare: 4,
            effect: ["damage_fire+=50"],
            skill: [dictionary_monster_skill.fire_cast()]
        }
        monster["黑暗萨满柯兰萨"] = {
            species: 1, type: 4, rare: 5,
            skill: [dictionary_monster_skill.shadow_cast()],
            drop: [82882, 82877, 82881, 132551]
        }
        monster["熔岩元素"] = {
            species: 5, type: 1, rare: 4,
            effect: ["armor_attack_percent+=30"],
            skill: [dictionary_monster_skill.fire_attack()]
        }
        monster["怒焰穴居人"] = {species: 1, type: 6, rare: 4}
        monster["怒焰萨满祭司"] = {
            species: 1, type: 4, rare: 4,
            skill: [dictionary_monster_skill.natural_cast()]
        }
        monster["焰喉"] = {
            species: 2, type: 9, rare: 5,
            skill: [dictionary_monster_skill.fire_cast()],
            drop: [82885, 82884, 82878, 132552]
        }
        monster["燃刃术士"] = {
            species: 1, type: 8, rare: 4,
            skill: [dictionary_monster_skill.shadow_cast()]
        }
        monster["燃刃信徒"] = {species: 1, type: 6, rare: 4}
        monster["燃刃执行者"] = {
            species: 1, type: 1, rare: 4,
            skill: [dictionary_monster_skill.mortal_strike()]
        }
        monster["熔岩守卫戈多斯"] = {
            species: 1, type: 2, rare: 5,
            skill: [dictionary_monster_skill.bash()],
            drop: [82888, 82886, 82883]
        }
    }// 怒焰裂谷
    {
        monster["迪菲亚掘地工"] = {species: 1, type: 6, rare: 4}
        monster["迪菲亚匪徒"] = {species: 1, type: 1, rare: 4}
        monster["亡灵挖掘者"] = {species: 3, type: 5, rare: 4}
        monster["亡灵爆破者"] = {
            species: 3, type: 9, rare: 4,
            skill: [dictionary_monster_skill.fire_cast()]
        }
        monster["格拉布托克"] = {
            species: 1, type: 8, rare: 5,
            skill: [dictionary_monster_skill.fire_cast()],
            drop: [5444, 5195, 2169]
        }
        monster["地精工程师"] = {species: 1, type: 2, rare: 4}
        monster["地精工匠"] = {
            species: 1, type: 9, rare: 4,
            skill: [dictionary_monster_skill.fire_cast()]
        }
        monster["赫利克斯·破甲"] = {
            species: 1, type: 6, rare: 5,
            effect: ["attack_power_percent-=20"],
            skill: [dictionary_monster_skill.bash(), dictionary_monster_skill.sunder()],
            drop: [5191, 132556, 5443, 151062, 5199, 151063, 5200]
        }
        monster["活火"] = {
            species: 5, type: 5, rare: 4,
            skill: [dictionary_monster_skill.fire_attack()]
        }
        monster["迈赫米死神原型机"] = {
            species: 7, type: 1, rare: 4,
            skill: [dictionary_monster_skill.mortal_strike()]
        }
        monster["死神5000"] = {
            species: 7, type: 2, rare: 5,
            skill: [dictionary_monster_skill.mortal_strike()],
            drop: [5201, 151065, 5187, 151066, 1937, 151064]
        }
        monster["迪菲亚哨兵"] = {species: 1, type: 6, rare: 4}
        monster["迪菲亚法师"] = {
            species: 1, type: 9, rare: 4,
            skill: [dictionary_monster_skill.frost_cast()]
        }
        monster["迪菲亚恶棍"] = {
            species: 1, type: 1, rare: 4,
            skill: [dictionary_monster_skill.mortal_strike()]
        }
        monster["迪菲亚塑风师"] = {
            species: 1, type: 4, rare: 4,
            skill: [dictionary_monster_skill.natural_cast(), dictionary_monster_skill.nature_heal()]
        }
        monster["撕心狼将军"] = {
            species: 1, type: 6, rare: 5,
            effect: ["attack_power_percent-=10"],
            skill: [dictionary_monster_skill.rake()],
            drop: ["5196+30", "872+30", "1156+40"]
        }
        monster["“船长”曲奇"] = {
            species: 1, type: 5, rare: 5,
            skill: [dictionary_monster_skill.frost_attack(),
                dictionary_monster_skill.nature_heal()],
            drop: [5202, 5197, 5198, 5192, 5193]
        }
        monster["梵妮莎·范克里夫"] = {
            species: 1, type: 6, rare: 5,
            skill: [dictionary_monster_skill.multi_shot()],
            drop: [63478, 63485, 65178, 63479, 63486, 63482, 63483]
        }
    }// 死亡矿井
    return monster;
}