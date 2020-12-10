/** 装备基础属性 **/
let dictionary_equipment_icon
$(document).ready(function () {
    dictionary_equipment_icon = new_equipment_icon()
})

function new_equipment_icon() {
    let equipment_icon = []
    // 位置 * 1000 + 倾向 * 100 + 类型
    // 头盔
    equipment_icon[101] = ["INV_Helmet_26", "INV_Helmet_27", "INV_Helmet_28", "INV_Helmet_29", "INV_Helmet_30", "INV_Helmet_31", "INV_Helmet_32", "INV_Helmet_33", "INV_Helmet_34", "INV_Helmet_50"]
    equipment_icon[102] = ["INV_Helmet_04", "INV_Helmet_07", "INV_Helmet_12", "INV_Helmet_14", "INV_Helmet_15", "INV_Helmet_17", "INV_Helmet_21", "INV_Helmet_24", "INV_Helmet_41"]
    equipment_icon[103] = ["INV_Helmet_05", "INV_Helmet_10", "INV_Helmet_11", "INV_Helmet_13", "INV_Helmet_16", "INV_Helmet_18", "INV_Helmet_19", "INV_Helmet_35", "INV_Helmet_38"]
    equipment_icon[104] = ["INV_Helmet_01", "INV_Helmet_02", "INV_Helmet_03", "INV_Helmet_06", "INV_Helmet_08", "INV_Helmet_09", "INV_Helmet_20", "INV_Helmet_22", "INV_Helmet_23", "INV_Helmet_25"]
    // 项链
    equipment_icon[299] = ["INV_Jewelry_Necklace_01", "INV_Jewelry_Necklace_02", "INV_Jewelry_Necklace_04", "INV_Jewelry_Necklace_05", "INV_Jewelry_Necklace_07", "INV_Jewelry_Necklace_09", "INV_Jewelry_Necklace_10", "INV_Jewelry_Necklace_11", "INV_Jewelry_Necklace_15", "INV_Jewelry_Necklace_21"]
    // 肩膀
    equipment_icon[301] = ["INV_Shoulder_02", "INV_Shoulder_05", "INV_Shoulder_09", "INV_Shoulder_17", "INV_Shoulder_18", "INV_Shoulder_19"]
    equipment_icon[302] = ["INV_Shoulder_06", "INV_Shoulder_07", "INV_Shoulder_08", "INV_Shoulder_23", "INV_Shoulder_24", "INV_Shoulder_25", "INV_Shoulder_28"]
    equipment_icon[303] = ["INV_Shoulder_10", "INV_Shoulder_11", "INV_Shoulder_12", "INV_Shoulder_13", "INV_Shoulder_14", "INV_Shoulder_15", "INV_Shoulder_16", "INV_Shoulder_29", "INV_Shoulder_30"]
    equipment_icon[304] = ["INV_Shoulder_01", "INV_Shoulder_03", "INV_Shoulder_04", "INV_Shoulder_20", "INV_Shoulder_21", "INV_Shoulder_22", "INV_Shoulder_26", "INV_Shoulder_27"]
    // 胸甲
    equipment_icon[401] = ["INV_Chest_Cloth_01", "INV_Chest_Cloth_05", "INV_Chest_Cloth_09", "INV_Chest_Cloth_13", "INV_Chest_Cloth_17", "INV_Chest_Cloth_21", "INV_Chest_Cloth_25", "INV_Chest_Cloth_29", "INV_Chest_Cloth_33", "INV_Chest_Cloth_37"]
    equipment_icon[402] = ["INV_Chest_Leather_01", "INV_Chest_Leather_02", "INV_Chest_Leather_03", "INV_Chest_Leather_04", "INV_Chest_Leather_05", "INV_Chest_Leather_06", "INV_Chest_Leather_07", "INV_Chest_Leather_08", "INV_Chest_Leather_09", "INV_Chest_Leather_10"]
    equipment_icon[403] = ["INV_Chest_Chain_03", "INV_Chest_Chain_05", "INV_Chest_Chain_06", "INV_Chest_Chain_07", "INV_Chest_Chain_08", "INV_Chest_Chain_09", "INV_Chest_Chain_10", "INV_Chest_Chain_12", "INV_Chest_Chain_14", "INV_Chest_Chain_16"]
    equipment_icon[404] = ["INV_Chest_Plate01", "INV_Chest_Plate02", "INV_Chest_Plate03", "INV_Chest_Plate04", "INV_Chest_Plate05", "INV_Chest_Plate07", "INV_Chest_Plate09", "INV_Chest_Plate10", "INV_Chest_Plate12", "INV_Chest_Plate15"]
    // 披风
    equipment_icon[501] = ["inv_misc_cape_01", "inv_misc_cape_03", "inv_misc_cape_05", "inv_misc_cape_07", "inv_misc_cape_10", "inv_misc_cape_12", "inv_misc_cape_13", "inv_misc_cape_16", "inv_misc_cape_19", "inv_misc_cape_20"]
    // 衬衫
    equipment_icon[699] = ["inv_shirt_01", "inv_shirt_02", "inv_shirt_08", "inv_shirt_11", "inv_shirt_12", "inv_shirt_13", "inv_shirt_14", "inv_shirt_15"]
    // 战袍
    equipment_icon[799] = ["inv_shirt_guildtabard_01"]
    // 手腕
    equipment_icon[801] = ["INV_Bracer_07", "INV_Bracer_10", "INV_Bracer_11", "INV_Bracer_12", "INV_Bracer_13"]
    equipment_icon[802] = ["INV_Bracer_01", "INV_Bracer_02", "INV_Bracer_04", "INV_Bracer_05", "INV_Bracer_08"]
    equipment_icon[803] = ["INV_Bracer_09", "INV_Bracer_16", "INV_Bracer_17", "INV_Bracer_18"]
    equipment_icon[804] = ["INV_Bracer_03", "INV_Bracer_06", "INV_Bracer_14", "INV_Bracer_15", "INV_Bracer_19"]
    // 手套
    equipment_icon[901] = ["INV_Gauntlets_06", "INV_Gauntlets_14", "INV_Gauntlets_15", "INV_Gauntlets_16", "INV_Gauntlets_17", "INV_Gauntlets_18", "INV_Gauntlets_20", "INV_Gauntlets_23", "INV_Gauntlets_27"]
    equipment_icon[902] = ["INV_Gauntlets_02", "INV_Gauntlets_05", "INV_Gauntlets_07", "INV_Gauntlets_08", "INV_Gauntlets_19", "INV_Gauntlets_21", "INV_Gauntlets_24", "INV_Gauntlets_25", "INV_Gauntlets_32"]
    equipment_icon[903] = ["INV_Gauntlets_01", "INV_Gauntlets_04", "INV_Gauntlets_10", "INV_Gauntlets_11", "INV_Gauntlets_12", "INV_Gauntlets_13", "INV_Gauntlets_22"]
    equipment_icon[904] = ["INV_Gauntlets_03", "INV_Gauntlets_09", "INV_Gauntlets_26", "INV_Gauntlets_28", "INV_Gauntlets_29", "INV_Gauntlets_30", "INV_Gauntlets_31"]
    // 腰带
    equipment_icon[1001] = ["INV_Belt_03", "INV_Belt_07", "INV_Belt_08", "INV_Belt_10", "INV_Belt_24", "INV_Belt_25", "INV_Belt_26"]
    equipment_icon[1002] = ["INV_Belt_01", "INV_Belt_02", "INV_Belt_04", "INV_Belt_05", "INV_Belt_21", "INV_Belt_22", "INV_Belt_23"]
    equipment_icon[1003] = ["INV_Belt_06", "INV_Belt_09", "INV_Belt_11", "INV_Belt_18", "INV_Belt_19", "INV_Belt_20", "INV_Belt_30", "INV_Belt_31", "INV_Belt_32"]
    equipment_icon[1004] = ["INV_Belt_12", "INV_Belt_13", "INV_Belt_14", "INV_Belt_15", "INV_Belt_16", "INV_Belt_17", "INV_Belt_27", "INV_Belt_28", "INV_Belt_29"]
    // 腿甲
    equipment_icon[1101] = ["INV_Pants_01", "INV_Pants_09", "INV_Pants_10", "INV_Pants_11", "inv_pants_cloth_01", "inv_pants_cloth_02", "inv_pants_cloth_03", "inv_pants_cloth_04"]
    equipment_icon[1102] = ["INV_Pants_02", "INV_Pants_06", "INV_Pants_07", "INV_Pants_08", "INV_Pants_12", "INV_Pants_13", "INV_Pants_14", "inv_pants_leather_01", "inv_pants_leather_02", "inv_pants_leather_10"]
    equipment_icon[1103] = ["INV_Pants_03", "INV_Pants_05", "inv_pants_leather_03", "inv_pants_leather_04", "inv_pants_leather_05", "inv_pants_leather_11", "inv_pants_leather_12"]
    equipment_icon[1104] = ["INV_Pants_04", "inv_pants_plate_03", "inv_pants_plate_04", "inv_pants_plate_05", "inv_pants_plate_06", "inv_pants_plate_15", "inv_pants_plate_16", "inv_pants_plate_17", "inv_pants_plate_18", "inv_pants_plate_19"]
    // 鞋子
    equipment_icon[1201] = ["inv_boots_cloth_01", "inv_boots_cloth_03", "inv_boots_cloth_05", "inv_boots_cloth_06", "inv_boots_cloth_08", "inv_boots_cloth_09", "inv_boots_cloth_10", "inv_boots_cloth_11", "inv_boots_cloth_13", "inv_boots_cloth_20"]
    equipment_icon[1202] = ["inv_boots_03", "inv_boots_04", "inv_boots_05", "inv_boots_06", "inv_boots_07", "inv_boots_08", "inv_boots_leather_05", "inv_boots_leather_11", "inv_boots_leather_12", "inv_boots_leather_14"]
    equipment_icon[1203] = ["inv_boots_02", "inv_boots_chain_01", "inv_boots_chain_02", "inv_boots_chain_03", "inv_boots_chain_04", "inv_boots_chain_05", "inv_boots_chain_06", "inv_boots_chain_07", "inv_boots_chain_08", "inv_boots_chain_09"]
    equipment_icon[1204] = ["inv_boots_01", "inv_boots_02", "inv_boots_plate_01", "inv_boots_plate_02", "inv_boots_plate_03", "inv_boots_plate_04", "inv_boots_plate_05", "inv_boots_plate_06", "inv_boots_plate_07", "inv_boots_plate_09"]
    // 戒指
    equipment_icon[1399] = ["INV_Jewelry_Ring_01", "INV_Jewelry_Ring_02", "INV_Jewelry_Ring_03", "INV_Jewelry_Ring_04", "INV_Jewelry_Ring_05", "INV_Jewelry_Ring_08", "INV_Jewelry_Ring_09", "INV_Jewelry_Ring_10", "INV_Jewelry_Ring_11", "INV_Jewelry_Ring_15"]
    // 饰品
    equipment_icon[1499] = ["INV_Jewelry_Talisman_01", "INV_Jewelry_Talisman_02", "INV_Jewelry_Talisman_03", "INV_Jewelry_Talisman_04", "INV_Jewelry_Talisman_05", "INV_Jewelry_Talisman_06", "INV_Jewelry_Talisman_07", "INV_Jewelry_Talisman_08", "INV_Jewelry_Talisman_09", "INV_Jewelry_Talisman_10"]
    // 匕首
    equipment_icon[1511] = ["INV_Weapon_ShortBlade_01", "INV_Weapon_ShortBlade_02", "INV_Weapon_ShortBlade_03", "INV_Weapon_ShortBlade_04", "INV_Weapon_ShortBlade_05", "INV_Weapon_ShortBlade_06", "INV_Weapon_ShortBlade_07", "INV_Weapon_ShortBlade_08", "INV_Weapon_ShortBlade_09", "INV_Weapon_ShortBlade_10", "INV_Weapon_ShortBlade_11", "INV_Weapon_ShortBlade_12", "INV_Weapon_ShortBlade_13", "INV_Weapon_ShortBlade_14", "INV_Weapon_ShortBlade_15", "INV_Weapon_ShortBlade_16", "INV_Weapon_ShortBlade_17", "INV_Weapon_ShortBlade_18", "INV_Weapon_ShortBlade_19", "INV_Weapon_ShortBlade_20"]
    // 拳套
    equipment_icon[1512] = ["INV_Gauntlets_01", "INV_Gauntlets_02", "INV_Gauntlets_07", "INV_Gauntlets_08", "INV_Gauntlets_03", "INV_Gauntlets_09"]
    // 单手斧
    equipment_icon[1513] = ["INV_Axe_01", "INV_Axe_02", "INV_Axe_03", "INV_Axe_04", "INV_Axe_05", "INV_Axe_06", "INV_Axe_07", "INV_Axe_08", "INV_Axe_11", "INV_Axe_12"]
    // 单手锤
    equipment_icon[1514] = ["INV_Hammer_03", "INV_Hammer_04", "INV_Hammer_05", "INV_Hammer_06", "INV_Hammer_07", "INV_Hammer_08", "INV_Hammer_11", "INV_Hammer_12", "INV_Hammer_18", "INV_Hammer_19"]
    // 单手剑
    equipment_icon[1515] = ["INV_Sword_01", "INV_Sword_04", "INV_Sword_05", "INV_Sword_10", "INV_Sword_12", "INV_Sword_20", "INV_Sword_24", "INV_Sword_30", "INV_Sword_36", "INV_Sword_40"]
    // 长柄
    equipment_icon[1521] = ["INV_Spear_01", "INV_Spear_02", "INV_Spear_03", "INV_Spear_04", "INV_Spear_05", "INV_Spear_06", "INV_Spear_07", "INV_Spear_08", "INV_Weapon_Halberd_02", "INV_Weapon_Halberd_03"]
    // 法杖
    equipment_icon[1522] = ["INV_Staff_01", "INV_Staff_02", "INV_Staff_04", "INV_Staff_05", "INV_Staff_06", "INV_Staff_07", "INV_Staff_08", "INV_Staff_09", "INV_Staff_10", "INV_Staff_11"]
    // 双手斧
    equipment_icon[1523] = ["INV_Axe_09", "INV_Axe_10", "INV_Axe_17", "INV_Axe_18", "INV_Axe_21", "INV_Axe_22", "INV_Axe_23", "INV_Axe_24"]
    // 双手锤
    equipment_icon[1524] = ["INV_Hammer_09", "INV_Hammer_10", "INV_Hammer_13", "INV_Hammer_15", "INV_Hammer_16", "INV_Hammer_17", "INV_Hammer_22", "INV_Hammer_23"]
    // 双手剑
    equipment_icon[1525] = ["INV_Sword_06", "INV_Sword_07", "INV_Sword_08", "INV_Sword_13", "INV_Sword_19", "INV_Sword_28", "INV_Sword_37", "INV_Sword_38", "INV_Sword_39", "INV_Sword_46"]
    // 弓
    equipment_icon[1531] = ["INV_Weapon_Bow_02", "INV_Weapon_Bow_03", "INV_Weapon_Bow_04", "INV_Weapon_Bow_05", "INV_Weapon_Bow_06", "INV_Weapon_Bow_07", "INV_Weapon_Bow_08", "INV_Weapon_Bow_12"]
    // 弩
    equipment_icon[1532] = ["INV_Weapon_Crossbow_01", "INV_Weapon_Crossbow_02", "INV_Weapon_Crossbow_03", "INV_Weapon_Crossbow_04", "INV_Weapon_Crossbow_05", "INV_Weapon_Crossbow_06", "INV_Weapon_Crossbow_07", "INV_Weapon_Crossbow_08", "INV_Weapon_Crossbow_09", "INV_Weapon_Crossbow_10"]
    // 枪
    equipment_icon[1533] = ["INV_Weapon_Rifle_01", "INV_Weapon_Rifle_02", "INV_Weapon_Rifle_03", "INV_Weapon_Rifle_04", "INV_Weapon_Rifle_05", "INV_Weapon_Rifle_06", "INV_Weapon_Rifle_07", "INV_Weapon_Rifle_08", "INV_Weapon_Rifle_09", "INV_Weapon_Rifle_10"]
    // 盾牌
    equipment_icon[1641] = ["INV_Shield_03", "INV_Shield_04", "INV_Shield_05", "INV_Shield_06", "INV_Shield_07", "INV_Shield_09", "INV_Shield_10", "INV_Shield_11", "INV_Shield_12", "INV_Shield_13"]
    // 副手
    equipment_icon[1642] = ["inv_misc_book_01", "inv_misc_book_05", "inv_misc_book_06", "inv_misc_orb_01", "inv_misc_orb_03", "inv_misc_orb_05", "inv_wand_02", "inv_wand_03", "inv_wand_10", "inv_misc_lantern_01"]

    return equipment_icon
}