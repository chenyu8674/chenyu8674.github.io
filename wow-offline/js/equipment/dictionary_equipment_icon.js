/** 装备基础属性 **/
let dictionary_equipment_icon
$(document).ready(function () {
    dictionary_equipment_icon = new_equipment_icon()
})

function new_equipment_icon() {
    let equipment_icon = []
    // 位置 * 1000 + 倾向 * 100 + 类型
    // 头盔
    equipment_icon[101] = ["inv_helmet_26", "inv_helmet_27", "inv_helmet_28", "inv_helmet_29", "inv_helmet_30", "inv_helmet_31", "inv_helmet_32", "inv_helmet_33", "inv_helmet_34", "inv_helmet_50"]
    equipment_icon[102] = ["inv_helmet_04", "inv_helmet_07", "inv_helmet_12", "inv_helmet_14", "inv_helmet_15", "inv_helmet_17", "inv_helmet_21", "inv_helmet_24", "inv_helmet_41"]
    equipment_icon[103] = ["inv_helmet_05", "inv_helmet_10", "inv_helmet_11", "inv_helmet_13", "inv_helmet_16", "inv_helmet_18", "inv_helmet_19", "inv_helmet_35", "inv_helmet_38"]
    equipment_icon[104] = ["inv_helmet_01", "inv_helmet_02", "inv_helmet_03", "inv_helmet_06", "inv_helmet_08", "inv_helmet_09", "inv_helmet_20", "inv_helmet_22", "inv_helmet_23", "inv_helmet_25"]
    // 项链
    equipment_icon[299] = ["inv_jewelry_necklace_01", "inv_jewelry_necklace_02", "inv_jewelry_necklace_04", "inv_jewelry_necklace_05", "inv_jewelry_necklace_07", "inv_jewelry_necklace_09", "inv_jewelry_necklace_10", "inv_jewelry_necklace_11", "inv_jewelry_necklace_15", "inv_jewelry_necklace_21"]
    // 肩膀
    equipment_icon[301] = ["inv_shoulder_02", "inv_shoulder_05", "inv_shoulder_09", "inv_shoulder_17", "inv_shoulder_18", "inv_shoulder_19"]
    equipment_icon[302] = ["inv_shoulder_06", "inv_shoulder_07", "inv_shoulder_08", "inv_shoulder_23", "inv_shoulder_24", "inv_shoulder_25", "inv_shoulder_28"]
    equipment_icon[303] = ["inv_shoulder_10", "inv_shoulder_11", "inv_shoulder_12", "inv_shoulder_13", "inv_shoulder_14", "inv_shoulder_15", "inv_shoulder_16", "inv_shoulder_29", "inv_shoulder_30"]
    equipment_icon[304] = ["inv_shoulder_01", "inv_shoulder_03", "inv_shoulder_04", "inv_shoulder_20", "inv_shoulder_21", "inv_shoulder_22", "inv_shoulder_26", "inv_shoulder_27"]
    // 胸甲
    equipment_icon[401] = ["inv_chest_cloth_01", "inv_chest_cloth_05", "inv_chest_cloth_09", "inv_chest_cloth_13", "inv_chest_cloth_17", "inv_chest_cloth_21", "inv_chest_cloth_25", "inv_chest_cloth_29", "inv_chest_cloth_33", "inv_chest_cloth_37"]
    equipment_icon[402] = ["inv_chest_leather_01", "inv_chest_leather_02", "inv_chest_leather_03", "inv_chest_leather_04", "inv_chest_leather_05", "inv_chest_leather_06", "inv_chest_leather_07", "inv_chest_leather_08", "inv_chest_leather_09", "inv_chest_leather_10"]
    equipment_icon[403] = ["inv_chest_chain_03", "inv_chest_chain_05", "inv_chest_chain_06", "inv_chest_chain_07", "inv_chest_chain_08", "inv_chest_chain_09", "inv_chest_chain_10", "inv_chest_chain_12", "inv_chest_chain_14", "inv_chest_chain_16"]
    equipment_icon[404] = ["inv_chest_plate01", "inv_chest_plate02", "inv_chest_plate03", "inv_chest_plate04", "inv_chest_plate05", "inv_chest_plate07", "inv_chest_plate09", "inv_chest_plate10", "inv_chest_plate12", "inv_chest_plate15"]
    // 披风
    equipment_icon[501] = ["inv_misc_cape_01", "inv_misc_cape_03", "inv_misc_cape_05", "inv_misc_cape_07", "inv_misc_cape_10", "inv_misc_cape_12", "inv_misc_cape_13", "inv_misc_cape_16", "inv_misc_cape_19", "inv_misc_cape_20"]
    // 衬衫
    equipment_icon[699] = ["inv_shirt_01", "inv_shirt_02", "inv_shirt_08", "inv_shirt_11", "inv_shirt_12", "inv_shirt_13", "inv_shirt_14", "inv_shirt_15"]
    // 战袍
    equipment_icon[799] = ["inv_shirt_guildtabard_01"]
    // 手腕
    equipment_icon[801] = ["inv_bracer_07", "inv_bracer_10", "inv_bracer_11", "inv_bracer_12", "inv_bracer_13"]
    equipment_icon[802] = ["inv_bracer_01", "inv_bracer_02", "inv_bracer_04", "inv_bracer_05", "inv_bracer_08"]
    equipment_icon[803] = ["inv_bracer_09", "inv_bracer_16", "inv_bracer_17", "inv_bracer_18"]
    equipment_icon[804] = ["inv_bracer_03", "inv_bracer_06", "inv_bracer_14", "inv_bracer_15", "inv_bracer_19"]
    // 手套
    equipment_icon[901] = ["inv_gauntlets_06", "inv_gauntlets_14", "inv_gauntlets_15", "inv_gauntlets_16", "inv_gauntlets_17", "inv_gauntlets_18", "inv_gauntlets_20", "inv_gauntlets_23", "inv_gauntlets_27"]
    equipment_icon[902] = ["inv_gauntlets_02", "inv_gauntlets_05", "inv_gauntlets_07", "inv_gauntlets_08", "inv_gauntlets_19", "inv_gauntlets_21", "inv_gauntlets_24", "inv_gauntlets_25", "inv_gauntlets_32"]
    equipment_icon[903] = ["inv_gauntlets_01", "inv_gauntlets_04", "inv_gauntlets_10", "inv_gauntlets_11", "inv_gauntlets_12", "inv_gauntlets_13", "inv_gauntlets_22"]
    equipment_icon[904] = ["inv_gauntlets_03", "inv_gauntlets_09", "inv_gauntlets_26", "inv_gauntlets_28", "inv_gauntlets_29", "inv_gauntlets_30", "inv_gauntlets_31"]
    // 腰带
    equipment_icon[1001] = ["inv_belt_03", "inv_belt_07", "inv_belt_08", "inv_belt_10", "inv_belt_24", "inv_belt_25", "inv_belt_26"]
    equipment_icon[1002] = ["inv_belt_01", "inv_belt_02", "inv_belt_04", "inv_belt_05", "inv_belt_21", "inv_belt_22", "inv_belt_23"]
    equipment_icon[1003] = ["inv_belt_06", "inv_belt_09", "inv_belt_11", "inv_belt_18", "inv_belt_19", "inv_belt_20", "inv_belt_30", "inv_belt_31", "inv_belt_32"]
    equipment_icon[1004] = ["inv_belt_12", "inv_belt_13", "inv_belt_14", "inv_belt_15", "inv_belt_16", "inv_belt_17", "inv_belt_27", "inv_belt_28", "inv_belt_29"]
    // 腿甲
    equipment_icon[1101] = ["inv_pants_01", "inv_pants_09", "inv_pants_10", "inv_pants_11", "inv_pants_cloth_01", "inv_pants_cloth_02", "inv_pants_cloth_03", "inv_pants_cloth_04"]
    equipment_icon[1102] = ["inv_pants_02", "inv_pants_06", "inv_pants_07", "inv_pants_08", "inv_pants_12", "inv_pants_13", "inv_pants_14", "inv_pants_leather_01", "inv_pants_leather_02", "inv_pants_leather_10"]
    equipment_icon[1103] = ["inv_pants_03", "inv_pants_05", "inv_pants_leather_03", "inv_pants_leather_04", "inv_pants_leather_05", "inv_pants_leather_11", "inv_pants_leather_12"]
    equipment_icon[1104] = ["inv_pants_04", "inv_pants_plate_03", "inv_pants_plate_04", "inv_pants_plate_05", "inv_pants_plate_06", "inv_pants_plate_15", "inv_pants_plate_16", "inv_pants_plate_17", "inv_pants_plate_18", "inv_pants_plate_19"]
    // 鞋子
    equipment_icon[1201] = ["inv_boots_cloth_01", "inv_boots_cloth_03", "inv_boots_cloth_05", "inv_boots_cloth_06", "inv_boots_cloth_08", "inv_boots_cloth_09", "inv_boots_cloth_10", "inv_boots_cloth_11", "inv_boots_cloth_13", "inv_boots_cloth_20"]
    equipment_icon[1202] = ["inv_boots_03", "inv_boots_04", "inv_boots_05", "inv_boots_06", "inv_boots_07", "inv_boots_08", "inv_boots_leather_05", "inv_boots_leather_11", "inv_boots_leather_12", "inv_boots_leather_14"]
    equipment_icon[1203] = ["inv_boots_02", "inv_boots_chain_01", "inv_boots_chain_02", "inv_boots_chain_03", "inv_boots_chain_04", "inv_boots_chain_05", "inv_boots_chain_06", "inv_boots_chain_07", "inv_boots_chain_08", "inv_boots_chain_09"]
    equipment_icon[1204] = ["inv_boots_01", "inv_boots_02", "inv_boots_plate_01", "inv_boots_plate_02", "inv_boots_plate_03", "inv_boots_plate_04", "inv_boots_plate_05", "inv_boots_plate_06", "inv_boots_plate_07", "inv_boots_plate_09"]
    // 戒指
    equipment_icon[1399] = ["inv_jewelry_ring_01", "inv_jewelry_ring_02", "inv_jewelry_ring_03", "inv_jewelry_ring_04", "inv_jewelry_ring_05", "inv_jewelry_ring_08", "inv_jewelry_ring_09", "inv_jewelry_ring_10", "inv_jewelry_ring_11", "inv_jewelry_ring_15"]
    // 饰品
    equipment_icon[1499] = ["inv_jewelry_talisman_01", "inv_jewelry_talisman_02", "inv_jewelry_talisman_03", "inv_jewelry_talisman_04", "inv_jewelry_talisman_05", "inv_jewelry_talisman_06", "inv_jewelry_talisman_07", "inv_jewelry_talisman_08", "inv_jewelry_talisman_09", "inv_jewelry_talisman_10"]
    // 匕首
    equipment_icon[1511] = ["inv_weapon_shortblade_01", "inv_weapon_shortblade_02", "inv_weapon_shortblade_03", "inv_weapon_shortblade_04", "inv_weapon_shortblade_05", "inv_weapon_shortblade_06", "inv_weapon_shortblade_07", "inv_weapon_shortblade_08", "inv_weapon_shortblade_09", "inv_weapon_shortblade_10", "inv_weapon_shortblade_11", "inv_weapon_shortblade_12", "inv_weapon_shortblade_13", "inv_weapon_shortblade_14", "inv_weapon_shortblade_15", "inv_weapon_shortblade_16", "inv_weapon_shortblade_17", "inv_weapon_shortblade_18", "inv_weapon_shortblade_19", "inv_weapon_shortblade_20"]
    // 拳套
    equipment_icon[1512] = ["inv_gauntlets_01", "inv_gauntlets_02", "inv_gauntlets_07", "inv_gauntlets_08", "inv_gauntlets_03", "inv_gauntlets_09"]
    // 单手斧
    equipment_icon[1513] = ["inv_axe_01", "inv_axe_02", "inv_axe_03", "inv_axe_04", "inv_axe_05", "inv_axe_06", "inv_axe_07", "inv_axe_08", "inv_axe_11", "inv_axe_12"]
    // 单手锤
    equipment_icon[1514] = ["inv_hammer_03", "inv_hammer_04", "inv_hammer_05", "inv_hammer_06", "inv_hammer_07", "inv_hammer_08", "inv_hammer_11", "inv_hammer_12", "inv_hammer_18", "inv_hammer_19"]
    // 单手剑
    equipment_icon[1515] = ["inv_sword_01", "inv_sword_04", "inv_sword_05", "inv_sword_10", "inv_sword_12", "inv_sword_20", "inv_sword_24", "inv_sword_30", "inv_sword_36", "inv_sword_40"]
    // 魔杖
    equipment_icon[1516] = ["inv_wand_01", "inv_wand_02", "inv_wand_03", "inv_wand_04", "inv_wand_05", "inv_wand_06", "inv_wand_07", "inv_wand_08", "inv_wand_09", "inv_wand_10", "inv_wand_11", "inv_wand_12"]
    // 长柄
    equipment_icon[1521] = ["inv_spear_01", "inv_spear_02", "inv_spear_03", "inv_spear_04", "inv_spear_05", "inv_spear_06", "inv_spear_07", "inv_spear_08", "inv_weapon_halberd_02", "inv_weapon_halberd_03"]
    // 法杖
    equipment_icon[1522] = ["inv_staff_01", "inv_staff_02", "inv_staff_04", "inv_staff_05", "inv_staff_06", "inv_staff_07", "inv_staff_08", "inv_staff_09", "inv_staff_10", "inv_staff_11"]
    // 双手斧
    equipment_icon[1523] = ["inv_axe_09", "inv_axe_10", "inv_axe_17", "inv_axe_18", "inv_axe_21", "inv_axe_22", "inv_axe_23", "inv_axe_24"]
    // 双手锤
    equipment_icon[1524] = ["inv_hammer_09", "inv_hammer_10", "inv_hammer_13", "inv_hammer_15", "inv_hammer_16", "inv_hammer_17", "inv_hammer_22", "inv_hammer_23"]
    // 双手剑
    equipment_icon[1525] = ["inv_sword_06", "inv_sword_07", "inv_sword_08", "inv_sword_13", "inv_sword_19", "inv_sword_28", "inv_sword_37", "inv_sword_38", "inv_sword_39", "inv_sword_46"]
    // 弓
    equipment_icon[1531] = ["inv_weapon_bow_02", "inv_weapon_bow_03", "inv_weapon_bow_04", "inv_weapon_bow_05", "inv_weapon_bow_06", "inv_weapon_bow_07", "inv_weapon_bow_08", "inv_weapon_bow_12"]
    // 弩
    equipment_icon[1532] = ["inv_weapon_crossbow_01", "inv_weapon_crossbow_02", "inv_weapon_crossbow_03", "inv_weapon_crossbow_04", "inv_weapon_crossbow_05", "inv_weapon_crossbow_06", "inv_weapon_crossbow_07", "inv_weapon_crossbow_08", "inv_weapon_crossbow_09", "inv_weapon_crossbow_10"]
    // 枪
    equipment_icon[1533] = ["inv_weapon_rifle_01", "inv_weapon_rifle_02", "inv_weapon_rifle_03", "inv_weapon_rifle_04", "inv_weapon_rifle_05", "inv_weapon_rifle_06", "inv_weapon_rifle_07", "inv_weapon_rifle_08", "inv_weapon_rifle_09", "inv_weapon_rifle_10"]
    // 盾牌
    equipment_icon[1641] = ["inv_shield_03", "inv_shield_04", "inv_shield_05", "inv_shield_06", "inv_shield_07", "inv_shield_09", "inv_shield_10", "inv_shield_11", "inv_shield_12", "inv_shield_13"]
    // 副手
    equipment_icon[1642] = ["inv_misc_book_01", "inv_misc_book_05", "inv_misc_book_06", "inv_misc_orb_01", "inv_misc_orb_03", "inv_misc_orb_05", "inv_wand_02", "inv_wand_03", "inv_wand_10", "inv_misc_lantern_01"]

    return equipment_icon
}