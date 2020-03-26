import {
  INPUT_MONEY,
  BUTTON_MONEY
} from '../actions'

const initialState = { money: 0 }

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

  const new_money = action.change === 0 ? 0 : validate(state.money + action.change, 99999999)

  switch(action.type){

    case INPUT_MONEY:
      return { money: validate(action.money, 99999999) }

    case BUTTON_MONEY:
      return { money: new_money }

    default:
      return state
  }
}
