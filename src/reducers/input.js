import { INPUT, INPUT_GOALLV, INPUT_ITEM_S, INPUT_ITEM_M, INPUT_ITEM_L, BUTTON_LV, BUTTON_ITEM, BUTTON_ITEM_S, BUTTON_ITEM_M, BUTTON_ITEM_L } from '../actions'

const initialState = {  lv:  {now: 0, goal: 600},
                        exp: {now: 0, goal: 29700},
                        item: {s: 0, m: 0, l: 0 },
                      }

const lovelv2exp2 = lv => {

  let count = 0

  for( let i = 0; i < lv; i++ ){
    if(i < 100){
      for( let j = Math.floor(i/10); j*10 <= i ; j++){
        count += 6 + (( j - 1 ) * 6)
      }
      count +=  6
    }

    else if(i >= 100 ){
      let h = Math.floor(i/100)
      const hi = i - h * 100;

      if( i >= 700){
        h = 21
      }
      else if( i >= 600){
        h = 14
      }

      for( let j = Math.floor(hi/10); j*10 <= hi ; j++){
        count += (6 + ( j - 1 ) * 6) * (1 + 0.2 * h )
      }
      count +=  6 *  (1 + 0.2 * h )
    }
  }
  return Math.round(count * 100) / 100
}

const validateLv = lv => {
  if( lv >= 0 && lv <= 800){
    return Math.floor(lv)
  }else if( lv > 800){
    return 800
  }else{
    return 0
  }
}

const validateItem = item => {
  if( item >= 0 && item <= 9999){
    return Math.floor(item)
  }else if( item > 9999){
    return 9999
  }else{
    return 0
  }
}

const validateMoney = money => {
  if( money >= 0 && money <= 99999999){
    return Math.floor(money)
  }else if( money > 99999999){
    return 99999999
  }else{
    return 0
  }
}

const getItemAl = (money, item) => {
  let exp = 0
  exp += Math.floor(money * 0.01)
  exp += item.s * 6
  exp += item.m * 20
  exp += item.l * 200
  return exp
}

export default (state = initialState, action) => {
  let new_item = validateItem(action.item)
  let new_lv = validateLv(action.lv)
  const money = validateMoney(action.money)

  switch(action.type){
    case INPUT:
      return {
        exp: { now: lovelv2exp2(new_lv),
              goal: state.exp.goal},
        lv: {  now: new_lv,
              goal: state.lv.goal },
        item: state.item,
      }

    case INPUT_GOALLV:
      return {
         exp: { now: state.exp.now,
                goal: lovelv2exp2(new_lv) },
          lv: { now: state.lv.now,
                goal: new_lv },
        item: state.item
      }

    case INPUT_ITEM_S:
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: new_item, m: state.item.m, l: state.item.l }
      }

    case INPUT_ITEM_M:
    return {
      exp: state.exp,
      lv:  state.lv,
      item: { s: state.item.s, m: new_item, l: state.item.l }
    }

    case INPUT_ITEM_L:
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: state.item.m, l: new_item }
      }

    case BUTTON_LV:
    new_lv = action.change === 0 ? 0 : validateLv(state.lv.now + action.change)
      return {
        exp: { now: lovelv2exp2(new_lv),
              goal: state.exp.goal},
        lv: {  now: new_lv,
              goal: state.lv.goal },
        item: state.item,
      }

    case BUTTON_ITEM_S:
      new_item = action.change === 0 ? 0 : validateItem(state.item.s + action.change)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: new_item, m: state.item.m, l: state.item.l }
      }
    case BUTTON_ITEM_M:
      new_item = action.change === 0 ? 0 : validateItem(state.item.m + action.change)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: new_item, l: state.item.l },
      }
    case BUTTON_ITEM_L:
      new_item = action.change === 0 ? 0 : validateItem(state.item.l + action.change)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: state.item.m, l: new_item }
      }

    default:
      return state
  }
}
