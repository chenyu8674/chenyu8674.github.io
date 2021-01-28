/** 套装一览 **/
let dictionary_sets;
$(document).ready(function () {
    dictionary_sets = new_sets();
});

function new_sets() {
    let sets = {}

    sets["雷德双刀"] = {
        equipments: [12939, 12940],
        effects: [null, ["attack_power_percent+=10"]],
    };

    sets["黑暗迪菲亚护甲"] = {
        equipments: [10399, 10403, 10402, 10401, 10400],
        effects: [null, ["armor_all_percent+=5"], ["attr_percent+=5"], ["res_all+=5"], ["pierce_all+=5"]],
    };

    return sets;
}