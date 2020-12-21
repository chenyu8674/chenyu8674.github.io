/** 职业一览 **/
let dictionary_job;
$(document).ready(function () {
    dictionary_job = new_job();
});

function new_job() {
    let job = {};

    /**
     * 战士 #C69B6D 198, 155, 109
     猎人 #AAD372 170, 211, 114
     萨满 #2359FF 35, 89, 255
     圣骑士 #F48CBA 244, 140, 186
     牧师 #F0EBE0 240, 235, 224
     术士 #9382C9 147, 130, 201
     潜行者 #FFF468 255, 244, 104
     法师 #68CCEF 104, 204, 239
     德鲁伊 #FF7C0A 255, 124, 10
     死亡骑士 #C41E3B 196, 30, 59
     https://bbs.nga.cn/read.php?&tid=4947369
     */
    job.job_color = [];// 职业颜色
    job.job_name = [];// 职业名称
    job.job_flag = [];// 职业标识
    job.job_info = [];// 职业简介
    job.base_property = [];// 初始属性
    job.upgrade_property = [];// 属性成长

    // 职业：战士
    job.warrior = 10;
    job.warrior_1 = 11;
    job.warrior_2 = 12;
    job.warrior_3 = 13;

    job.job_color[job.warrior] = "#C69B6D";
    job.job_name[job.warrior] = "战士";
    job.job_flag[job.warrior] = "warrior";
    job.base_property[job.warrior] = [18, 8, 16, 4, 4];
    job.upgrade_property[job.warrior] = [3.6, 1.6, 3.2, 0.8, 0.8];

    job.job_name[job.warrior_1] = "武器战士";
    job.job_info[job.warrior_1] = "久经沙场的武器大师，移动灵活，攻击充满压制性。";
    job.job_name[job.warrior_2] = "狂暴战士";
    job.job_info[job.warrior_2] = "暴怒的狂战士，掀起的暴力飓风能够将敌人切碎。";
    job.job_name[job.warrior_3] = "防御战士";
    job.job_info[job.warrior_3] = "坚毅的保护者，使用盾牌为团队构筑可靠的防御。";

    // 职业：圣骑士
    job.paladin = 20;
    job.paladin_1 = 21;
    job.paladin_2 = 22;
    job.paladin_3 = 23;

    job.job_color[job.paladin] = "#F48CBA";
    job.job_name[job.paladin] = "圣骑士";
    job.job_flag[job.paladin] = "paladin";
    job.base_property[job.paladin] = [14, 6, 14, 14, 10];
    job.upgrade_property[job.paladin] = [2.8, 1.2, 2.8, 2.8, 2];

    job.job_name[job.paladin_1] = "神圣圣骑士";
    job.job_info[job.paladin_1] = "唤起圣光之力来保护和治疗盟友并驱逐邪恶。";
    job.job_name[job.paladin_2] = "防护圣骑士";
    job.job_info[job.paladin_2] = "使用神圣的魔法为自己和盟友提供信仰防护。";
    job.job_name[job.paladin_3] = "惩戒圣骑士";
    job.job_info[job.paladin_3] = "正义的十字军，用神圣魔法和武器审判并制裁敌人。";

    // 职业：猎人
    job.hunter = 30;
    job.hunter_1 = 31
    job.hunter_2 = 32
    job.hunter_3 = 33

    job.job_color[job.hunter] = "#AAD372";
    job.job_name[job.hunter] = "猎人";
    job.job_flag[job.hunter] = "hunter";
    job.base_property[job.hunter] = [14, 18, 10, 4, 4];
    job.upgrade_property[job.hunter] = [2.8, 3.6, 2, 0.8, 0.8];

    job.job_name[job.hunter_1] = "兽王猎人";
    job.job_info[job.hunter_1] = "对荒野了如指掌，驯服多种多样的野兽来协助作战。";
    job.job_name[job.hunter_2] = "射击猎人";
    job.job_info[job.hunter_2] = "百步穿杨的神射手，擅长远距离夺走敌人的性命。";
    job.job_name[job.hunter_3] = "生存猎人";
    job.job_info[job.hunter_3] = "机敏的游侠，擅长剧毒、炸药和动物协同攻击。";

    // 职业：萨满
    job.shaman = 40;
    job.base_property[job.shaman] = [14, 6, 10, 14, 14];
    job.upgrade_property[job.shaman] = [2.8, 1.2, 2, 2.8, 2.8];
    // 元素
    // 灼热图腾：每回合造成X%法术强度的火焰伤害
    // 地震术：造成X%法术强度的自然伤害，并使敌人下一次攻击的伤害降低Y%
    // 冰霜震击：造成X%法术强度的冰霜伤害，并使敌人的敏捷降低Y%，持续Z回合
    job.shaman_1 = 41;
    // 增强
    // 风怒图腾：有Y%的几率再次攻击
    // 风怒打击：造成X%攻击强度的物理伤害
    // 风暴打击：造成2次Y%攻击强度的物理伤害
    job.shaman_2 = 42;
    // 恢复
    // 治疗之泉图腾：每回合回复X%治疗强度的生命
    // 闪电箭：造成X%法术强度的自然伤害
    // 治疗波：每隔X回合使用，回复X%治疗强度的生命
    job.shaman_3 = 43;
    job.job_name[job.shaman] = "萨满";

    // 职业：德鲁伊
    job.druid = 50;
    job.base_property[job.druid] = [12, 12, 12, 12, 12];
    job.upgrade_property[job.druid] = [2.4, 2.4, 2.4, 2.4, 2.4];
    // 平衡
    // 枭兽形态：护甲+X%，暴击率+Y%
    // 星火术：造成X%攻击强度的奥术伤害
    // 虫群：每隔X回合使用，每回合造成Y%攻击强度的自然伤害，持续Z回合
    job.druid_1 = 51;
    // 野性-熊
    // 熊形态：护甲+X%，造成暴击时获得Y%攻击强度的伤害吸收护盾
    // 重殴：造成X%攻击强度的物理伤害
    // 猛击：每隔X回合使用，造成X%攻击强度的物理伤害，Y%的几率打断敌人下一次攻击
    job.druid_2 = 52;
    // 野性-豹
    // 豹形态：敏捷+Y%，造成暴击时下一次凶猛撕咬的伤害提高Y%
    // 爪击：造成X%攻击强度的物理伤害
    // 凶猛撕咬：每隔X回合使用，造成Y%攻击强度的物理伤害
    job.druid_3 = 53;
    // 自然
    // 生命之树形态：法术强度-X%，治疗强度+Y%
    // 愤怒：造成X%攻击强度的自然伤害
    // 回春术：每隔X回合使用，每回合回复Y%治疗强度的生命，持续Z回合
    job.druid_4 = 54;
    job.job_name[job.druid] = "德鲁伊";

    // 职业：盗贼
    job.rogue = 60;
    job.base_property[job.rogue] = [16, 16, 10, 4, 4];
    job.upgrade_property[job.rogue] = [3.2, 3.2, 2, 0.8, 0.8];
    // 刺杀
    // 背刺
    // 伏击
    job.rogue_1 = 61;
    // 战斗
    // 邪恶攻击
    // 剔骨
    job.rogue_2 = 62;
    // 敏锐
    // 出血
    // 消失
    job.rogue_3 = 63;
    job.job_name[job.rogue] = "盗贼";

    // 职业：牧师
    job.priest = 70;
    job.base_property[job.priest] = [4, 4, 10, 16, 18];
    job.upgrade_property[job.priest] = [0.8, 0.8, 2, 3.2, 3.6];
    // 戒律/神圣/法术/
    job.priest_1 = 71;
    // 神圣/神圣/法术/
    job.priest_2 = 72;
    // 暗影/暗影/法术/
    job.priest_3 = 73;
    job.job_name[job.priest] = "牧师";

    // 职业：术士
    job.warlock = 80;
    job.base_property[job.warlock] = [4, 4, 14, 16, 12];
    job.upgrade_property[job.warlock] = [0.8, 0.8, 2.8, 3.2, 2.4];
    // 痛苦/暗影/法术/
    job.warlock_1 = 81;
    // 恶魔/物理/法术/
    job.warlock_2 = 82;
    // 毁灭/火焰/法术/
    job.warlock_3 = 83;
    job.job_name[job.warlock] = "术士";

    // 职业：法师
    job.mage = 90;
    job.base_property[job.mage] = [4, 4, 10, 18, 14];
    job.upgrade_property[job.mage] = [0.8, 0.8, 2, 3.6, 2.8];
    // 奥术/奥术/法术/
    job.mage_1 = 91;
    // 火焰/火焰/法术/
    job.mage_2 = 92;
    // 冰霜/冰霜/法术/
    job.mage_3 = 93;
    job.job_name[job.mage] = "法师";
    job.job_name[job.mage_1] = "奥术法师";
    job.job_name[job.mage_2] = "火焰法师";
    job.job_name[job.mage_3] = "冰霜法师";

    return job;
}