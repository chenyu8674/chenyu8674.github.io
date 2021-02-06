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
        monster["雪豹幼崽"] = {species: 2, type: 6, rare: 1}
        monster["霜鬃巨魔新兵"] = {species: 1, type: 5, rare: 1, skills: "冰法"}
        monster["雪怪幼崽"] = {species: 1, type: 2, rare: 1, skills: "冰攻"}
        monster["雪豹"] = {species: 2, type: 6, rare: 2, skills: "撕咬"}
        monster["冬狼"] = {species: 2, type: 2, rare: 2, skills: "撕咬"}
        monster["冰爪熊"] = {species: 2, type: 1, rare: 1, skills: "寒冰爪"}
        monster["霜鬃先知"] = {species: 1, type: 4, rare: 2, skills: "电法"}
        monster["霜鬃暗法师"] = {species: 1, type: 9, rare: 2, skills: "暗法"}
        monster["石腭断骨者"] = {species: 1, type: 1, rare: 2, skills: "冲锋"}
        monster["雪怪"] = {species: 1, type: 6, rare: 2, skills: "冰攻"}
        monster["麻疯侏儒"] = {species: 1, type: 2, rare: 2, effect: ["block_chance_final+=30", "block_value+=30"]}
        monster["黑铁间谍"] = {species: 1, type: 1, rare: 2, skills: "伏击"}

        monster["饥饿的雪怪"] = {species: 1, type: 1, rare: 3, skills: "冰攻"}
        monster["霜鬃长老"] = {species: 1, type: 2, rare: 3, skills: "治疗波", effect: ["armor_attack_percent+=50"]}
        monster["游荡的冰爪熊"] = {species: 2, type: 5, rare: 3, skills: ["撕裂", "寒冰爪"], effect: ["health_percent+=20"]}

        monster["瓦加什"] = {species: 1, type: 1, rare: 4, x: 620, y: 466, skills: ["冰攻", "冰霜新星"]}
    }// 丹莫罗
    {
        monster["兔子"] = monster["野兔"] = {species: 8, type: 6, rare: 1}
        monster["鹿"] = {species: 8, type: 0, rare: 1}
        monster["迪菲亚暴徒"] = {species: 1, type: 1, rare: 2}
        monster["迪菲亚流浪巫师"] = {species: 1, type: 9, rare: 2, skills: "冰法"}
        monster["狗头人矿工"] = {species: 1, type: 1, rare: 1, skills: "刺穿护甲"}
        monster["狗头人地卜师"] = {species: 1, type: 4, rare: 2, skills: "火法"}
        monster["鱼人潜伏者"] = {species: 1, type: 6, rare: 2, skills: "伏击"}
        monster["石皮野猪"] = {species: 2, type: 5, rare: 2, skills: "冲锋", effect: ["health_percent+=50"]}
        monster["森林蜘蛛"] = {species: 2, type: 6, rare: 2, skills: "毒药"}
        monster["森林灰狼"] = {species: 2, type: 2, rare: 2, skills: "撕咬"}
        monster["森林熊幼崽"] = {species: 2, type: 1, rare: 2, skills: "撕咬"}

        monster["监工纳尔格"] = {species: 1, type: 2, rare: 3, skills: "战斗怒吼"}
        monster["狡猾的莫加尼"] = {species: 1, type: 6, rare: 3, skills: "伏击"}
        monster["母蜘蛛"] = {species: 2, type: 3, rare: 3, skills: "毒药"}

        monster["霍格"] = {species: 1, type: 1, rare: 4, x: 27, y: 90, skills: "刺穿护甲"}
    }// 艾尔文森林
    {
        monster["蟾蜍"] = {species: 8, type: 0, rare: 1}
        monster["树林蜘蛛"] = {species: 2, type: 3, rare: 2, skills: "毒药"}
        monster["树林毒蜘蛛"] = {species: 2, type: 6, rare: 2, skills: "毒药"}
        monster["夜刃豹"] = {species: 2, type: 6, rare: 2, skills: "撕咬"}
        monster["沼精"] = {species: 5, type: 2, rare: 2}
        monster["林精碎木者"] = {species: 5, type: 1, rare: 2, skills: "刺穿护甲"}
        monster["恶灵劣魔"] = {species: 4, type: 9, rare: 2, skills: "精灵之火"}
        monster["暗魂劣魔"] = {species: 4, type: 1, rare: 2, skills: "致盲"}
        monster["瘤背战士"] = {species: 1, type: 2, rare: 2, skills: "英勇打击"}
        monster["瘤背萨满祭司"] = {species: 1, type: 4, rare: 2, skills: "治疗波"}

        monster["瑟雷基尔"] = {species: 4, type: 6, rare: 3, skills: "英勇打击"}
        monster["格雷莫尔"] = {species: 1, type: 1, rare: 3, skills: "撕咬"}
        monster["恶臭的黑苔兽"] = {species: 5, type: 1, rare: 3, effect: ["health_percent+=20"]}

        monster["奥肯斯古尔"] = {species: 5, type: 1, rare: 4, x: 527, y: 748, effect: ["health_percent+=20"]}
    }// 泰达希尔
    {
        monster["草原土拨鼠"] = {species: 8, type: 0, rare: 1}
        monster["平原陆行鸟"] = {species: 8, type: 3, rare: 1}
        monster["刺背野猪人"] = {species: 1, type: 2, rare: 2}
        monster["刺背萨满祭司"] = {species: 1, type: 4, rare: 2, skills: "电法"}
        monster["刺背斗猪"] = {species: 2, type: 5, rare: 2, skills: "冲锋"}
        monster["消瘦的猛鹫"] = {species: 2, type: 6, rare: 2}
        monster["猛鹫"] = {species: 2, type: 2, rare: 2, skills: "挥砍"}
        monster["加拉克半人马"] = {species: 1, type: 1, rare: 2, skills: "冲锋", effect: ["block_chance_final+=30", "block_value+=30"]}
        monster["加拉克前锋"] = {species: 1, type: 6, rare: 2, skills: "多重射击"}
        monster["风险投资公司工人"] = {species: 1, type: 2, rare: 2, skills: "毒药"}
        monster["风险投资公司监工"] = {species: 1, type: 1, rare: 2, skills: "火攻"}

        monster["马兹拉纳其"] = {species: 2, type: 3, rare: 3, skills: "冲锋"}
        monster["执行者埃米尔冈德"] = {species: 1, type: 0, rare: 3, effect: ["health_percent+=100"]}
        monster["鬼嚎"] = {species: 2, type: 1, rare: 3, effect: "撕咬"}

        monster["菲兹普罗克主管"] = {species: 1, type: 2, rare: 4, x: 454, y: 849, skills: ["冲锋", "英勇打击"]}
    }// 莫高雷
    {
        monster["蝰蛇"] = {species: 8, type: 0, rare: 1}
        monster["巨钳龙虾人"] = {species: 1, type: 2, rare: 2}
        monster["厚壳龙虾人"] = {species: 1, type: 1, rare: 2}
        monster["钢鬃野猪人"] = {species: 1, type: 1, rare: 2}
        monster["钢鬃斥候"] = {species: 1, type: 2, rare: 2, skills: "多重射击"}
        monster["科卡尔苦工"] = {species: 1, type: 1, rare: 2, skills: "致盲"}
        monster["硬甲蝎"] = {species: 2, type: 6, rare: 2, skills: "毒药"}
        monster["毒尾蝎"] = {species: 2, type: 3, rare: 2, skills: "毒药"}
        monster["血爪锐齿龙"] = {species: 2, type: 3, rare: 2, skills: ["冲锋", "撕咬"]}
        monster["雷霆蜥蜴"] = {species: 2, type: 4, rare: 2, skills: "电法", effect: ["health_percent+=50"]}

        monster["科卡尼斯"] = {species: 1, type: 2, rare: 3, skills: "雷霆一击"}
        monster["吉欧洛德·杂斑"] = {species: 1, type: 4, rare: 3, skills: ["电法", "治疗波"]}
        monster["死亡毒蝎"] = {species: 2, type: 6, rare: 3, effect: ["毒药", "撕咬"]}

        monster["斯考恩"] = {species: 1, type: 8, rare: 4, x: 545, y: 9.8, skills: "暗法"}
    }// 杜隆塔尔
    {
        monster["食腐狼幼崽"] = {species: 2, type: 1, rare: 1}
        monster["无脑的僵尸"] = {species: 3, type: 5, rare: 1}
        monster["血色信徒"] = {species: 1, type: 6, rare: 2}
        monster["血色战士"] = {species: 1, type: 2, rare: 2, skills: "闪避"}
        monster["血色狂热者"] = {species: 1, type: 1, rare: 2, skills: "冲锋"}
        monster["暗眼骷髅法师"] = {species: 3, type: 9, rare: 2, skills: "冰法"}
        monster["游荡的幽灵"] = {species: 3, type: 5, rare: 2}
        monster["腐烂的古尸"] = {species: 3, type: 5, rare: 2}
        monster["吸血夜行蝙蝠"] = {species: 2, type: 6, rare: 2, skills: "撕咬"}
        monster["邪恶的夜行蜘蛛"] = {species: 2, type: 3, rare: 2, skills: "毒药"}
        monster["饥饿的黑暗犬"] = {species: 4, type: 1, rare: 2}

        monster["毒针雷萨恩"] = {species: 2, type: 3, rare: 3, skills: "毒药"}
        monster["痛苦的灵魂"] = {species: 3, type: 9, rare: 3, effect: "暗法"}
        monster["菲林森特的阴影"] = {species: 3, type: 9, rare: 3, effect: "奥法"}

        monster["达高尔队长"] = {species: 3, type: 2, rare: 4, x: 521, y: 281, skills: ["冲锋", "英勇打击"]}
    }// 提瑞斯法林地
    {
        monster["生锈的麦田魔像"] = {species: 7, type: 0, rare: 1, effect: ["armor_attack_percent+=100"]}
        monster["小碎尸鸟"] = {species: 2, type: 3, rare: 1}

        monster["看守傀儡"] = {species: 7, type: 2, rare: 2, effect: ["armor_attack_percent+=100"]}
        monster["收割傀儡"] = {species: 7, type: 6, rare: 2, skills: "挥砍", effect: ["armor_attack_percent+=100"]}
        monster["碎尸鸟"] = {species: 2, type: 5, rare: 2, skills: "撕裂"}
        monster["大碎尸鸟"] = {species: 2, type: 1, rare: 2, skills: "撕裂"}
        monster["河爪豺狼人"] = {species: 1, type: 0, rare: 2}
        monster["河爪斥候"] = {species: 1, type: 3, rare: 2, skills: "多重射击"}
        monster["河爪秘法师"] = {species: 1, type: 4, rare: 2, skills: ["治疗波", "电法"]}
        monster["迪菲亚走私者"] = {species: 1, type: 6, rare: 2, skills: "伏击"}
        monster["迪菲亚巡路者"] = {
            species: 1, type: 8, rare: 2, skills: "盾牌猛击", effect: ["block_chance_final+=30", "block_value+=50"]
        }
        monster["迪菲亚袭击者"] = {species: 1, type: 1, rare: 2, skills: "英勇打击"}

        monster["乌尔图斯"] = {species: 2, type: 6, rare: 3, skills: "撕裂"}
        monster["利爪队长"] = {species: 1, type: 1, rare: 3, skills: "战斗怒吼"}
        monster["死神4000型"] = {species: 7, type: 2, rare: 3, skills: "挥砍"}

        monster["克拉文·摩特维克"] = {
            species: 1, type: 6, rare: 4, x: 70, y: 78, skills: "伏击",
            effect: ["critical_chance_final+=99", "attack_power_percent-=50"]
        }
    }// 西部荒野
    {
        monster["绵羊"] = {species: 8, type: 0, rare: 1}
        monster["山羊"] = {species: 8, type: 5, rare: 1}

        monster["坑道鼠歹徒"] = {species: 1, type: 2, rare: 2}
        monster["坑道鼠地卜师"] = {species: 1, type: 4, rare: 2, skills: "火法"}
        monster["老黑熊"] = {species: 2, type: 2, rare: 2, skills: "撕咬"}
        monster["灰斑黑熊"] = {species: 2, type: 1, rare: 2, skills: "撕咬"}
        monster["碎石怪先知"] = {species: 1, type: 4, rare: 2, skills: "电法"}
        monster["碎石怪击颅者"] = {species: 1, type: 6, rare: 2, skills: "凿击"}
        monster["黑铁伏击者"] = {species: 1, type: 3, rare: 2, skills: "伏击"}
        monster["黑铁袭击者"] = {species: 1, type: 2, rare: 2, skills: "英勇打击"}
        monster["林木潜伏者"] = {species: 1, type: 6, rare: 2, skills: "毒药"}

        monster["纺织者杉达"] = {species: 2, type: 6, rare: 3, skills: "毒药"}
        monster["大型洛克鳄"] = {species: 2, type: 1, rare: 3, skills: "撕咬"}
        monster["摧毁者埃摩戈"] = {species: 1, type: 5, rare: 3, effect: ["health_percent+=50"]}

        monster["卓克苏尔"] = {species: 1, type: 1, rare: 4, x: 78, y: 16, skills: "英勇打击"}
    }// 洛克莫丹
    {
        monster["生病的鹿"] = {species: 8, type: 0, rare: 1}

        monster["被诅咒的贵族"] = {species: 3, type: 4, rare: 2, skills: "致盲"}
        monster["挣扎的贵族"] = {species: 3, type: 5, rare: 2, skills: "致盲"}
        monster["月夜猛虎"] = {species: 2, type: 6, rare: 2, skills: "撕咬"}
        monster["狂暴蓟熊"] = {species: 2, type: 1, rare: 2, skills: "撕咬"}
        monster["月爪枭兽"] = {species: 1, type: 2, rare: 2, skills: "痛击"}
        monster["月夜枭兽"] = {species: 1, type: 4, rare: 2, skills: "痛击"}
        monster["雷鳞战士"] = {species: 1, type: 1, rare: 2, effect: ["block_chance_final+=30", "block_value+=50"]}
        monster["雷鳞巫师"] = {species: 1, type: 9, rare: 2, skills: "冰法"}
        monster["石巨兽"] = {species: 5, type: 1, rare: 2, effect: ["armor_attack_percent+=100"]}

        monster["影爪"] = {species: 2, type: 3, rare: 3, skills: ["伏击", "撕咬"]}
        monster["利斯林"] = {species: 4, type: 8, rare: 3, skills: "暗法"}
        monster["残忍的弗拉格莫克"] = {species: 1, type: 4, rare: 3, skills: "英勇打击"}

        monster["折磨者奥利加尔"] = {species: 4, type: 1, rare: 4, x: 78, y: 16, skills: "英勇打击"}
    }// 黑海岸
    {
        monster["强壮的烈焰猎犬"] = {species: 3, type: 5, rare: 4, skills: "撕裂"}
        monster["成年的烈焰猎犬"] = {species: 3, type: 2, rare: 4, skills: "撕咬"}
        monster["堕落的驯犬人"] = {species: 1, type: 1, rare: 4, skills: "暗攻"}
        monster["阿达罗格"] = {
            species: 3, type: 3, rare: 5, skills: ["火攻", "冲锋"], drop: [82879, 82772, 82880],
            detail: "怒焰裂谷穴居人的人数近几个月急剧下跌，原因只有一个：阿达罗格。这只贪吃的怪物是最早被黑暗萨满从火焰之地赶离的烈焰猎犬之一。阿达罗格的驯养员每天喂这只狂怒难驯的巨兽吃超出他体重两倍的穴居人肉块，以使他心平气和。"
        }
        monster["黑暗萨满助手"] = {
            species: 1, type: 4, rare: 4, skills: "火法", effect: ["block_chance_final+=30", "block_value+=80"]
        }
        monster["黑暗萨满研究者"] = {species: 1, type: 4, rare: 4, skills: ["火法", "熔岩爆裂"]}
        monster["黑暗萨满柯兰萨"] = {
            species: 1, type: 4, rare: 5, skills: ["暗法", "暗影风暴"], drop: [82882, 82877, 82881, 132551],
            detail: "柯兰萨始终认为凶蛮之力是控制艾泽拉斯元素的唯一方法。正是这一极端观点使他加入了邪恶的暮光之锤。当教派衰落后，这位兽人和其它志同道合的萨满一同潜入了怒焰裂谷，继续从事他们的邪恶勾当。"
        }
        monster["熔岩元素"] = {species: 5, type: 1, rare: 4, skills: "火攻", effect: ["armor_attack_percent+=30"]}
        monster["怒焰穴居人"] = {species: 1, type: 6, rare: 4}
        monster["怒焰萨满祭司"] = {species: 1, type: 4, rare: 4, skills: ["火法", "熔岩爆裂"]}
        monster["焰喉"] = {
            species: 2, type: 9, rare: 5, skills: ["火法", "岩浆喷吐"], drop: [82885, 82884, 82878, 132552],
            detail: "事实证明，与其它被黑暗萨满奴役的熔岩虫不同，焰喉几乎不受任何控制。这只猛兽在地下深处恣意钻掘，对其行动引发的后果毫不在意，谁要是挡了它的路也只能自认倒霉。"
        }
        monster["燃刃信徒"] = {species: 1, type: 6, rare: 4, skills: "伏击"}
        monster["燃刃执行者"] = {
            species: 1, type: 1, rare: 4, skills: "英勇打击",
            effect: ["block_chance_final+=30", "block_value+=80"]
        }
        monster["熔岩守卫戈多斯"] = {
            species: 1, type: 2, rare: 5, skills: ["战斗怒吼", "英勇打击"], drop: [82888, 82886, 82883],
            detail: "在狂妄的驱使下，才华横溢的萨满戈多斯变成了汲取火焰之地力量的活体导管。他和同伴想要效仿暮光之锤创造的元素升腾者。结果，能量汇聚而引发的爆炸使戈多斯陷入疯狂，还把他的身体扭曲成了令人惨不忍睹的形态。"
        }
    }// 怒焰裂谷
    {
        monster["迪菲亚掘地工"] = {species: 1, type: 6, rare: 4}
        monster["迪菲亚匪徒"] = {
            species: 1, type: 1, rare: 4, skills: "盾牌猛击",
            effect: ["block_chance_final+=30", "block_value+=80"]
        }
        monster["亡灵挖掘者"] = {species: 3, type: 5, rare: 4}
        monster["亡灵爆破者"] = {species: 3, type: 9, rare: 4, skills: "火法"}
        monster["格拉布托克"] = {
            species: 1, type: 4, rare: 5, skills: ["烈焰之拳", "寒冰之拳", "烈焰绽放", "寒冰绽放"],
            effect: ["health_percent+=40"], drop: [5444, 5195, 2169],
            detail: "只是一阵心血来潮，格拉布托克就释放出强大的魔法力量，把他的食人魔山给夷为了平地。听到这个消息，迪菲亚立刻雇佣了这只硕大的食人魔法师作为死亡矿井的工头，借助他毁灭性的天赋来监督那些劳工。"
        }
        monster["地精工程师"] = {species: 1, type: 2, rare: 4}
        monster["地精工匠"] = {species: 1, type: 9, rare: 4, skills: "火法"}
        monster["赫利克斯·破甲"] = {
            species: 1, type: 2, rare: 5, skills: "黏性炸弹", drop: [5191, 132556, 5443, 151062, 5199, 151063, 5200],
            detail: "赫利克斯从前是锈水财阀的工匠，可之后他收到了迪菲亚兄弟会的一笔款项，足以让他那样的无名部落工程师所做的一切都一文不值。就像所有精明的地精会做的那样，他迅速接下了这份工作，声称不再对前任雇主效忠。"
        }
        monster["活火"] = {species: 5, type: 5, rare: 4, skills: "火攻"}
        monster["迈赫米死神原型机"] = {species: 7, type: 1, rare: 4, skills: "多重射击"}
        monster["死神5000"] = {
            species: 7, type: 2, rare: 5, skills: ["挥砍", "安全限制离线"],
            effect: ["attack_power_percent-=20"], drop: [5201, 151065, 5187, 151066, 1937, 151064],
            detail: "迪菲亚的工程师们在死神4000的基础上，日以继夜地想要完善出一种新型号的收割机。兄弟会相信，只要完工，这台恐怖的机械就能像割麦子一样从暴风城的武装士兵中杀出一条路来。"
        }
        monster["迪菲亚哨兵"] = {species: 1, type: 6, rare: 4}
        monster["迪菲亚法师"] = {species: 1, type: 9, rare: 4, skills: "冰法"}
        monster["迪菲亚恶棍"] = {species: 1, type: 1, rare: 4, skills: "多重射击"}
        monster["迪菲亚塑风师"] = {species: 1, type: 4, rare: 4, skills: ["治疗波", "电法"]}
        monster["撕心狼将军"] = {
            species: 1, type: 6, rare: 5, skills: ["撕心", "直取要害"], drop: ["5196+30", "872+30", "1156+40"],
            detail: "詹姆斯·哈林顿身中狼人的诅咒后，在一个刺骨的寒夜里毁掉了钟爱的家庭和他的远洋航海生涯。在那之后，他改名为撕心狼，逃到了西部荒野，之后更是接受了任命，指挥迪菲亚兄弟会可怖的无畏舰。"
        }
        monster["“船长”曲奇"] = {
            species: 1, type: 5, rare: 5, skills: ["治疗波", "火攻", "火法", "冰攻", "冰法", "电攻", "电法"],
            drop: [5202, 5197, 5198, 5192, 5193],
            detail: "随着迪菲亚兄弟会前任无畏舰指挥官的死亡，曲奇自封为船长。尽管他在主厨的工作上仍然尽职尽责，但若是有谁质疑其船长的头衔来得是否光明磊落，那人就会因为严重的食物中毒而倒地不起。"
        }
        monster["梵妮莎·范克里夫"] = {
            species: 1, type: 6, rare: 5, appear: 50, skills: ["多重射击", "闪避", "炽热火焰"],
            effect: ["health_percent+=20"], drop: [63478, 63485, 65178, 63479, 63486, 63482, 63483],
            detail: "当梵妮莎还是一个小女孩的时候，她亲眼目睹了父亲艾德温·范克里夫的悲惨下场。作为前任迪菲亚兄弟会领袖之女，她接过父亲领袖的衣钵，在迪菲亚兄弟会据点死亡矿井的黑暗回廊里厉兵秣马，谋划着对暴风城的复仇。"
        }
    }// 死亡矿井
    return monster;
}