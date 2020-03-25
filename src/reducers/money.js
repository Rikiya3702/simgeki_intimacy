import { INPUT_MONEY, BUTTON_MONEY } from '../actions'

const initialState = { money: 370 }

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

  const new_money = action.change === 0 ? 0 : validateMoney(state.money + action.change)

  switch(action.type){

    case INPUT_MONEY:
      return { money: validateMoney(action.money) }

    case BUTTON_MONEY:
      return { money: new_money }

    default:
      return state
  }
}
