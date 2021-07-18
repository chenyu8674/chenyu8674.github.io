/** 职业一览 **/
let dictionary_job;
$(document).ready(function () {
    dictionary_job = new_job();
});

function new_job() {
    let job = {};

    /**
     战士   #C69B6D 198, 155, 109
     圣骑士 #F48CBA 244, 140, 186
     猎人   #AAD372 170, 211, 114
     萨满   #2359FF 35, 89, 255
     德鲁伊 #FF7C0A 255, 124, 10
     潜行者 #FFF468 255, 244, 104
     牧师   #F0EBE0 240, 235, 224
     术士   #9382C9 147, 130, 201
     法师   #68CCEF 104, 204, 239
     https://bbs.nga.cn/read.php?&tid=4947369
     */
    job.job_color = [];// 职业颜色
    job.job_name = [];// 职业名称
    job.job_flag = [];// 职业标识
    job.job_info = [];// 职业简介
    job.job_main = [];// 职业主属性
    job.job_second = [];// 职业次属性
    job.base_property = [];// 初始属性
    job.upgrade_property = [];// 属性成长

    // 职业：怪物
    job.monster = 0;
    job.base_property[job.monster] = [10, 10, 20, 10, 10];
    job.upgrade_property[job.monster] = [1.0, 1.0, 2.0, 1.0, 1.0];

    // 职业：战士
    job.warrior = 10;
    job.warrior_1 = 11;
    job.warrior_2 = 12;
    job.warrior_3 = 13;

    job.job_color[job.warrior] = "#C69B6D";
    job.job_name[job.warrior] = "战士";
    job.job_flag[job.warrior] = "warrior";
    job.base_property[job.warrior] = [18, 8, 16, 4, 4];
    job.upgrade_property[job.warrior] = [1.8, 0.8, 1.6, 0.4, 0.4];

    job.job_name[job.warrior_1] = "武器战士";
    job.job_info[job.warrior_1] = "久经沙场的武器大师，移动灵活，攻击充满压制性。";
    job.job_main[job.warrior_1] = "str";
    job.job_second[job.warrior_1] = "agi";
    job.job_name[job.warrior_2] = "狂暴战士";
    job.job_info[job.warrior_2] = "暴怒的狂战士，掀起的暴力飓风能够将敌人切碎。";
    job.job_main[job.warrior_2] = "str";
    job.job_second[job.warrior_2] = "agi";
    job.job_name[job.warrior_3] = "防御战士";
    job.job_info[job.warrior_3] = "坚毅的保护者，使用盾牌为团队构筑可靠的防御。";
    job.job_main[job.warrior_3] = "str";
    job.job_second[job.warrior_3] = "agi";

    // 职业：圣骑士
    job.paladin = 20;
    job.paladin_1 = 21;
    job.paladin_2 = 22;
    job.paladin_3 = 23;

    job.job_color[job.paladin] = "#F48CBA";
    job.job_name[job.paladin] = "圣骑士";
    job.job_flag[job.paladin] = "paladin";
    job.base_property[job.paladin] = [14, 6, 14, 14, 10];
    job.upgrade_property[job.paladin] = [1.4, 0.6, 1.4, 1.4, 1.0];

    job.job_name[job.paladin_1] = "神圣圣骑士";
    job.job_info[job.paladin_1] = "唤起圣光之力来保护和治疗盟友并驱逐邪恶。";
    job.job_main[job.paladin_1] = "spr";
    job.job_second[job.paladin_1] = "int";
    job.job_name[job.paladin_2] = "防护圣骑士";
    job.job_info[job.paladin_2] = "使用神圣的魔法为自己和盟友提供信仰防护。";
    job.job_main[job.paladin_2] = "str";
    job.job_second[job.paladin_2] = "agi";
    job.job_name[job.paladin_3] = "惩戒圣骑士";
    job.job_info[job.paladin_3] = "正义的十字军，用神圣魔法和武器审判并制裁敌人。";
    job.job_main[job.paladin_3] = "str";
    job.job_second[job.paladin_3] = "agi";

    // 职业：猎人
    job.hunter = 30;
    job.hunter_1 = 31
    job.hunter_2 = 32
    job.hunter_3 = 33

    job.job_color[job.hunter] = "#AAD372";
    job.job_name[job.hunter] = "猎人";
    job.job_flag[job.hunter] = "hunter";
    job.base_property[job.hunter] = [14, 18, 10, 4, 4];
    job.upgrade_property[job.hunter] = [1.4, 1.8, 1.0, 0.4, 0.4];

    job.job_name[job.hunter_1] = "兽王猎人";
    job.job_info[job.hunter_1] = "对荒野了如指掌，驯服多种多样的野兽来协助作战。";
    job.job_main[job.hunter_1] = "agi";
    job.job_second[job.hunter_1] = "str";
    job.job_name[job.hunter_2] = "射击猎人";
    job.job_info[job.hunter_2] = "百步穿杨的神射手，擅长远距离夺走敌人的性命。";
    job.job_main[job.hunter_2] = "agi";
    job.job_second[job.hunter_2] = "str";
    job.job_name[job.hunter_3] = "生存猎人";
    job.job_info[job.hunter_3] = "机敏的游侠，擅长剧毒、炸药和动物协同攻击。";
    job.job_main[job.hunter_3] = "agi";
    job.job_second[job.hunter_3] = "str";

    // 职业：萨满
    job.shaman = 40;
    job.shaman_1 = 41;
    job.shaman_2 = 42;
    job.shaman_3 = 43;

    job.job_color[job.shaman] = "#2359FF";
    job.job_name[job.shaman] = "萨满";
    job.job_flag[job.shaman] = "shaman";
    job.base_property[job.shaman] = [10, 14, 10, 14, 10];
    job.upgrade_property[job.shaman] = [1.0, 1.4, 1.0, 1.4, 1.0];

    job.job_name[job.shaman_1] = "元素萨满";
    job.job_info[job.shaman_1] = "驾驭元素的施法者，使用自然的毁灭之力打击敌人。";
    job.job_main[job.shaman_1] = "int";
    job.job_second[job.shaman_1] = "spr";
    job.job_name[job.shaman_2] = "增强萨满";
    job.job_info[job.shaman_2] = "信仰图腾之力，使用灌注元素能量的武器攻击敌人。";
    job.job_main[job.shaman_2] = "agi";
    job.job_second[job.shaman_2] = "str";
    job.job_name[job.shaman_3] = "恢复萨满";
    job.job_info[job.shaman_3] = "召唤先祖之魂和水之净化能量来治愈盟友的创伤。";
    job.job_main[job.shaman_3] = "spr";
    job.job_second[job.shaman_3] = "int";

    // 职业：德鲁伊
    job.druid = 50;
    job.druid_1 = 51;
    job.druid_2 = 52;
    job.druid_3 = 53;
    job.druid_4 = 54;

    job.job_color[job.druid] = "#FF7C0A";
    job.job_name[job.druid] = "德鲁伊";
    job.job_flag[job.druid] = "druid";
    job.base_property[job.druid] = [12, 12, 12, 12, 12];
    job.upgrade_property[job.druid] = [1.2, 1.2, 1.2, 1.2, 1.2];

    job.job_name[job.druid_1] = "平衡德鲁伊";
    job.job_info[job.druid_1] = "变形为强大的枭兽，释放奥术和自然的平衡之力。";
    job.job_main[job.druid_1] = "int";
    job.job_second[job.druid_1] = "spr";
    job.job_name[job.druid_2] = "野性德鲁伊";
    job.job_info[job.druid_2] = "致命的猎豹形态，利用撕咬和流血造成大量伤害。";
    job.job_main[job.druid_2] = "agi";
    job.job_second[job.druid_2] = "str";
    job.job_name[job.druid_3] = "守护德鲁伊";
    job.job_info[job.druid_3] = "强大的巨熊形态，以强壮身躯吸收伤害并保护盟友。";
    job.job_main[job.druid_3] = "str";
    job.job_second[job.druid_3] = "agi";
    job.job_name[job.druid_4] = "恢复德鲁伊";
    job.job_info[job.druid_4] = "化身生命之树，使用自然魔法使盟友重焕活力。";
    job.job_main[job.druid_4] = "spr";
    job.job_second[job.druid_4] = "int";

    // 职业：盗贼
    job.rogue = 60;
    job.rogue_1 = 61;
    job.rogue_2 = 62;
    job.rogue_3 = 63;

    job.job_color[job.rogue] = "#FFF468";
    job.job_name[job.rogue] = "盗贼";
    job.job_flag[job.rogue] = "rogue";
    job.base_property[job.rogue] = [16, 16, 10, 4, 4];
    job.upgrade_property[job.rogue] = [1.6, 1.6, 1.0, 0.4, 0.4];

    job.job_name[job.rogue_1] = "刺杀盗贼";
    job.job_info[job.rogue_1] = "致命的使毒高手，能用匕首迅速而冷酷地除掉敌人。";
    job.job_main[job.rogue_1] = "agi";
    job.job_second[job.rogue_1] = "str";
    job.job_name[job.rogue_2] = "战斗盗贼";
    job.job_info[job.rogue_2] = "无情的游荡剑客，擅长与敌人短兵相接。";
    job.job_main[job.rogue_2] = "agi";
    job.job_second[job.rogue_2] = "str";
    job.job_name[job.rogue_3] = "敏锐盗贼";
    job.job_info[job.rogue_3] = "阴影中的追猎者，擅长对猎物发起致命的伏击。";
    job.job_main[job.rogue_3] = "agi";
    job.job_second[job.rogue_3] = "str";

    // 职业：牧师
    job.priest = 70;
    job.priest_1 = 71;
    job.priest_2 = 72;
    job.priest_3 = 73;

    job.job_color[job.priest] = "#F0EBE0";
    job.job_name[job.priest] = "牧师";
    job.job_flag[job.priest] = "priest";
    job.base_property[job.priest] = [4, 4, 10, 16, 18];
    job.upgrade_property[job.priest] = [0.4, 0.4, 1.0, 1.6, 1.8];

    job.job_name[job.priest_1] = "戒律牧师";
    job.job_info[job.priest_1] = "使用魔法护盾保护盟友，也能治愈他们的伤口。";
    job.job_main[job.priest_1] = "spr";
    job.job_second[job.priest_1] = "int";
    job.job_name[job.priest_2] = "神圣牧师";
    job.job_info[job.priest_2] = "多才多艺，使用神圣力量照顾单体和团队。";
    job.job_main[job.priest_2] = "spr";
    job.job_second[job.priest_2] = "int";
    job.job_name[job.priest_3] = "暗影牧师";
    job.job_info[job.priest_3] = "使用邪恶的暗影魔法和可怕的虚空魔法来根除敌人。";
    job.job_main[job.priest_3] = "int";
    job.job_second[job.priest_3] = "spr";

    // 职业：术士
    job.warlock = 80;
    job.warlock_1 = 81;
    job.warlock_2 = 82;
    job.warlock_3 = 83;

    job.job_color[job.warlock] = "#9382C9";
    job.job_name[job.warlock] = "术士";
    job.job_flag[job.warlock] = "warlock";
    job.base_property[job.warlock] = [4, 4, 16, 16, 10];
    job.upgrade_property[job.warlock] = [0.4, 0.4, 1.6, 1.6, 1.0];

    job.job_name[job.warlock_1] = "痛苦术士";
    job.job_info[job.warlock_1] = "暗影魔法大师，擅长吸取能量和持续伤害法术。";
    job.job_main[job.warlock_1] = "int";
    job.job_second[job.warlock_1] = "spr";
    job.job_name[job.warlock_2] = "恶魔术士";
    job.job_info[job.warlock_2] = "恶魔指挥官，化身恶魔卫士来施展破坏之力。";
    job.job_main[job.warlock_2] = "int";
    job.job_second[job.warlock_2] = "spr";
    job.job_name[job.warlock_3] = "毁灭术士";
    job.job_info[job.warlock_3] = "混乱魔法的大师，能用灾厄的烈焰将敌人焚烧殆尽。";
    job.job_main[job.warlock_3] = "int";
    job.job_second[job.warlock_3] = "spr";

    // 职业：法师
    job.mage = 90;
    job.mage_1 = 91;
    job.mage_2 = 92;
    job.mage_3 = 93;

    job.job_color[job.mage] = "#68CCEF";
    job.job_name[job.mage] = "法师";
    job.job_flag[job.mage] = "mage";
    job.base_property[job.mage] = [4, 6, 10, 18, 12];
    job.upgrade_property[job.mage] = [0.4, 0.6, 1.0, 1.8, 1.2];

    job.job_name[job.mage_1] = "奥术法师";
    job.job_info[job.mage_1] = "操纵奥术之力，以压倒性的能量毁灭敌人。";
    job.job_main[job.mage_1] = "int";
    job.job_second[job.mage_1] = "spr";
    job.job_name[job.mage_2] = "火焰法师";
    job.job_info[job.mage_2] = "使用灼热的火球和燃烧的烈焰烧尽敌人。";
    job.job_main[job.mage_2] = "int";
    job.job_second[job.mage_2] = "spr";
    job.job_name[job.mage_3] = "冰霜法师";
    job.job_info[job.mage_3] = "使用冰霜魔法冻结敌人，再彻底粉碎他们的身体。";
    job.job_main[job.mage_3] = "int";
    job.job_second[job.mage_3] = "spr";

    return job;
}