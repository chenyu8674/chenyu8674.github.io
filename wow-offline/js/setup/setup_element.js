// 伤害类型
function setup_element() {
    let element = {};

    /* 伤害属性 */
    element.none = 0;
    element.physical = 10;// 物理
    element.fire = 20;// 火焰
    element.frost = 30;// 冰霜
    element.natural = 40;// 自然
    element.arcane = 50;// 奥术
    element.holy = 60;// 神圣
    element.dark = 70;// 暗影

    return element;
}

let m_element = setup_element();