export const INPUT = "INPUT"
export const INPUT_GOALLV = "INPUT_GOALLV"
export const INPUT_ITEM_S = "INPUT_ITEM_S"
export const INPUT_ITEM_M = "INPUT_ITEM_M"
export const INPUT_ITEM_L = "INPUT_ITEM_L"
export const INPUT_MONEY = "INPUT_MONEY"
export const INPUT_JUWEL_END = "INPUT_JUWEL_END"
export const INPUT_JUWEL_ALL = "INPUT_JUWEL_ALL"
export const BUTTON_LV = "BUTTON_LV"
export const BUTTON_ITEM = "BUTTON_ITEM"
export const BUTTON_ITEM_S = "BUTTON_ITEM_S"
export const BUTTON_ITEM_M = "BUTTON_ITEM_M"
export const BUTTON_ITEM_L = "BUTTON_ITEM_L"
export const BUTTON_MONEY = "BUTTON_MONEY"
export const BUTTON_JUWEL_END = "BUTTON_JUWEL_END"
export const BUTTON_JUWEL_ALL = "BUTTON_JUWEL_ALL"
export const BUTTON_PLAY = "BUTTON_PLAY"
export const RADIO_JUWEL = "RADIO_JUWEL"

export const ITEM_S = "ITEM_S"
export const ITEM_M = "ITEM_M"
export const ITEM_L = "ITEM_L"
export const JUWEL_END = "JUWEL_END"
export const JUWEL_ALL = "JUWEL_ALL"

const types = (type) => {
  switch(type){
    case "s":     return BUTTON_ITEM_S
    case "m":     return BUTTON_ITEM_M
    case "l":     return BUTTON_ITEM_L
    case "lv":    return BUTTON_LV
    case "money": return BUTTON_MONEY
    case "je":    return BUTTON_JUWEL_END
    case "ja":    return BUTTON_JUWEL_ALL
    default:      return BUTTON_MONEY
  }
}

export const input = (lv) => ({
  type: INPUT,
  lv: lv
})

export const input_goal = (lv) => ({
  type: INPUT_GOALLV,
  lv: lv
})

export const input_item_s = (item) => ({
  type: INPUT_ITEM_S,
  item: item
})
export const input_item_m = (item) => ({
  type: INPUT_ITEM_M,
  item: item
})
export const input_item_l = (item) => ({
  type: INPUT_ITEM_L,
  item: item
})

export const input_money = (money) => ({
  type: INPUT_MONEY,
  money: money
})

export const input_juwel_end = (juwel) => ({
  type: INPUT_JUWEL_END,
  juwel: juwel
})

export const input_juwel_all = (juwel) => ({
  type: INPUT_JUWEL_ALL,
  juwel: juwel
})

export const radio_juweltype = (juwel) => ({
  type: RADIO_JUWEL,
  juwel: juwel
})

export const button_change = (type, value) => ({
  type: types(type),
  change: value,
})

export const button_play = (type, value) => ({
  type: BUTTON_PLAY,
  womens: value,
})
