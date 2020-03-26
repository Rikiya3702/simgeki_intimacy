import {
  INPUT,
  INPUT_GOALLV,
  INPUT_ITEM_S,
  INPUT_ITEM_M,
  INPUT_ITEM_L,
  INPUT_MONEY,
  BUTTON_LV,
  BUTTON_ITEM_S,
  BUTTON_ITEM_M,
  BUTTON_ITEM_L,
  BUTTON_MONEY
} from '../actions'

const initialState = {  lv:  {now: 0, goal: 600},
                        exp: {now: 0, goal: 29700},
                        item: {s: 0, m: 0, l: 0 },
                        money: 0
                      }

const loveLv2Exp = lv => {

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

const validate = (value, max) => {
  if( value >= 0 && value <= max){
    return Math.floor(value)
  }else if( value > max){
    return max
  }else{
    return 0
  }
}

export default (state = initialState, action) => {
  let new_lv = validate(action.lv, 800)
  let new_item = validate(action.item, 9999)
  let new_money = validate(action.money, 99999999)

  switch(action.type){
    case INPUT:
      return Object.assign({}, state,{
        exp: {now: loveLv2Exp(new_lv)},
        lv:  {now: new_lv}
      })

    case INPUT_GOALLV:
      return Object.assign({}, state,{
        exp: {goal: loveLv2Exp(new_lv)},
        lv:  {goal: new_lv}
      })

    case INPUT_ITEM_S:
      return Object.assign({}, state,{ item: {s: new_item} })

    case INPUT_ITEM_M:
      return Object.assign({}, state,{ item: {m: new_item} })

    case INPUT_ITEM_L:
      return Object.assign({}, state,{ item: {l: new_item} })

    case INPUT_MONEY:
      return Object.assign({}, state,{ money: new_money })

    case BUTTON_LV:
    new_lv = action.change === 0 ? 0 : validate(state.lv.now + action.change, 800)
    return Object.assign({}, state,{
      exp: { now: loveLv2Exp(new_lv)},
      lv:  { now: new_lv}
    })

    case BUTTON_ITEM_S:
      new_item = action.change === 0 ? 0 : validate(state.item.s + action.change, 9999)
      return Object.assign({}, state,{
        item: {s: new_item}
      })

    case BUTTON_ITEM_M:
      new_item = action.change === 0 ? 0 : validate(state.item.m + action.change, 9999)
      return Object.assign({}, state,{
        item: {m: new_item}
      })

    case BUTTON_ITEM_L:
      new_item = action.change === 0 ? 0 : validate(state.item.l + action.change, 9999)
      return Object.assign({}, state,{
        item: {l: new_item}
      })

    case BUTTON_MONEY:
      new_money = action.change === 0 ? 0 : validate(state.money + action.change, 99999999)
      return Object.assign({}, state,{
        money: new_money
      })

    default:
      return state
  }
}
