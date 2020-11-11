// 职业
function setup_job() {
    let job = {};

    job.job_name = [];
    // 初始属性
    job.base_property = [];
    // 属性成长
    job.upgrade_property = [];

    job.test_monster = 100;
    job.base_property[job.test_monster] = [0, 0, 0, 0, 0];
    job.upgrade_property[job.test_monster] = [0, 0, 0, 0, 0];
    job.job_name[job.test_monster] = "测试怪物";

    // 职业：战士
    job.warrior = 10;
    job.base_property[job.warrior] = [18, 10, 18, 4, 3];
    job.upgrade_property[job.warrior] = [3.6, 2, 3.6, 0.8, 0.6];

    job.warrior_1 = 11;
    job.warrior_2 = 12;
    job.warrior_3 = 13;
    job.job_name[job.warrior] = "战士";
    job.job_name[job.warrior_1] = "武器战士";
    job.job_name[job.warrior_2] = "狂暴战士";
    job.job_name[job.warrior_3] = "防御战士";

    // 职业：圣骑士
    job.paladin = 20;
    job.base_property[job.paladin] = [14, 6, 14, 10, 14];
    job.upgrade_property[job.paladin] = [2.8, 1.2, 2.8, 2, 2.8];

    job.paladin_1 = 21;
    job.paladin_2 = 22;
    job.paladin_3 = 23;
    job.job_name[job.paladin] = "圣骑士";
    job.job_name[job.paladin_1] = "神圣圣骑士";
    job.job_name[job.paladin_2] = "防护圣骑士";
    job.job_name[job.paladin_3] = "惩戒圣骑士";

    // 职业：猎人
    job.hunter = 30;
    // 兽王
    // 蝰蛇守护：每次命中目标时，回复X%的最大生命值
    // 人宠攻击：造成X%攻击强度的物理伤害2次
    // 杀戮命令：每隔X回合使用，造成Y%攻击强度的物理伤害Z次，当前生命值百分比越低攻击次数越多
    job.hunter_1 = 31
    // 射击
    // 雄鹰守护：攻击强度+X%
    // 奥术射击：造成X%攻击强度的奥术伤害
    // 瞄准射击：造成X%攻击强度的物理伤害，战斗回合数越久伤害越高
    job.hunter_2 = 32
    // 生存
    // 灵猴守护：闪避等级+X%
    // 猛禽一击：造成X%攻击强度的物理伤害
    // 爆炸射击：每隔X回合使用，每回合造成Y%攻击强度的火焰伤害，持续Z回合
    job.hunter_3 = 33

    // 职业：萨满
    job.shaman = 40;
    // 元素
    // 灼热图腾：每回合造成X%法术强度的火焰伤害
    // 闪电箭：造成X%法术强度的自然伤害
    // 冰霜震击：每隔X回合使用，造成X%法术强度的冰霜伤害，并使敌人下一次攻击的伤害降低Y%
    job.shaman_1 = 41;
    // 增强
    // 大地之力图腾：力量和敏捷+X%
    // 风怒打击：造成X%攻击强度的物理伤害，有Y%的几率再次攻击
    // 幽灵狼：每隔X回合使用，每回合造成2次Y%攻击强度的物理伤害，持续Z回合
    job.shaman_2 = 42;
    // 恢复
    // 治疗之泉图腾：每回合回复X%治疗强度的生命
    // 闪电箭：造成X%法术强度的自然伤害
    // 治疗波：每隔X回合使用，回复X%治疗强度的生命
    job.shaman_3 = 43;

    // 职业：德鲁伊
    job.druid = 50;
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

    // 职业：盗贼
    job.rogue = 60;
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

    // 职业：牧师
    job.priest = 70;
    // 戒律/神圣/法术/
    job.priest_1 = 71;
    // 神圣/神圣/法术/
    job.priest_2 = 72;
    // 暗影/暗影/法术/
    job.priest_3 = 73;

    // 职业：术士
    job.warlock = 80;
    // 痛苦/暗影/法术/
    job.warlock_1 = 81;
    // 恶魔/物理/法术/
    job.warlock_2 = 82;
    // 毁灭/火焰/法术/
    job.warlock_3 = 83;

    // 职业：法师
    job.mage = 90;
    // 奥术/奥术/法术/
    job.mage_1 = 91;
    // 火焰/火焰/法术/
    job.mage_2 = 92;
    // 冰霜/冰霜/法术/
    job.mage_3 = 93;

    job.job_name[job.hunter] = "猎人";
    job.job_name[job.shaman] = "萨满";
    job.job_name[job.druid] = "德鲁伊";
    job.job_name[job.rogue] = "盗贼";
    job.job_name[job.priest] = "牧师";
    job.job_name[job.warlock] = "术士";
    job.job_name[job.mage] = "法师";

    job.base_property[job.hunter] = [12, 16, 10, 8, 4];
    job.base_property[job.shaman] = [14, 8, 6, 14, 14];
    job.base_property[job.druid] = [12, 12, 12, 12, 12];
    job.base_property[job.rogue] = [16, 18, 8, 4, 4];
    job.base_property[job.priest] = [5, 6, 8, 16, 18];
    job.base_property[job.warlock] = [6, 6, 14, 16, 10];
    job.base_property[job.mage] = [6, 6, 8, 18, 12];

    job.upgrade_property[job.hunter] = [2.4, 3.2, 2, 1.6, 0.8];
    job.upgrade_property[job.shaman] = [2.8, 1.6, 1.2, 2.8, 2.8];
    job.upgrade_property[job.druid] = [2.4, 2.4, 2.4, 2.4, 2.4];
    job.upgrade_property[job.rogue] = [3.2, 3.6, 1.6, 0.8, 0.8];
    job.upgrade_property[job.priest] = [1, 1.2, 1.6, 3.2, 3.6];
    job.upgrade_property[job.warlock] = [1.2, 1.2, 2.8, 3.2, 2];
    job.upgrade_property[job.mage] = [1.2, 1.2, 1.6, 3.6, 2.4];

    return job;
}

let m_job = setup_job();