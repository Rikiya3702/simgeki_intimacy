import {
  INPUT,
  INPUT_GOALLV,
  INPUT_ITEM_S,
  INPUT_ITEM_M,
  INPUT_ITEM_L,
  INPUT_MONEY,
  INPUT_JUWEL_END,
  INPUT_JUWEL_ALL,
  BUTTON_LV,
  BUTTON_LV_GOAL,
  BUTTON_ITEM_S,
  BUTTON_ITEM_M,
  BUTTON_ITEM_L,
  BUTTON_MONEY,
  BUTTON_JUWEL_END,
  BUTTON_JUWEL_ALL,
  BUTTON_PLAY,
  BUTTON_MONEYRUN,
  BUTTON_CREDIT_MODE,
  MONEY,
  ITEM_S,
  ITEM_M,
  ITEM_L,
  JUWEL_END,
  JUWEL_ALL,
  RADIO_JUWEL,
  RADIO_TABLE_HIDDEN,
  RADIO_BOOST,
  SELECT_CARDS,
  SELECT_TUNES,
  SELECT_RUNS,
  CHECK_ITEMFLAG,
  TABLE_HIDDEN_FLAG_BOTH,
  ONE_CREDIT, MONEYRUN_TIME, GAMEPLAY_TIME,
  MODE_360, MODE_370
} from '../actions'

const MAX_LV = 800
const MAX_ITEM = 9999
const MAX_MONEY = 99999999
const MAX_JUWEL = 99999
const MIN_ZERO = 0

const updateMessage = () =>{
  let mes = []
  mes.push("更新履歴")
  mes.push("")
  mes.push("2020/05/01　シミュレート・マニーラン機能")
  mes.push("2020/04/28　ボタンからスライダーバーへUI変更")
  mes.push("2020/04/27　メールフォーム修正")
  mes.push("2020/04/24　レスポンシブ化")
  mes.push("2020/04/19　メールフォーム追加、ハートのデザイン調整")
  mes.push("2020/04/16　360/370GPのON/OFF機能追加")
  mes.push("2020/04/13　デザイン調整、About追加")
  mes.push("2020/04/12　公開")
  return mes
}

const initialState = {  mes: ["ようこそ"],
                        updated: updateMessage(),
                        lv:  {now: 0, goal: 600},
                        exp: {now: 0, goal: 29700},
                        item: {s: 0, m: 0, l: 0 },
                        money: 0,
                        juwel: {end: 0, all: 0},
                        juweltype: JUWEL_END,
                        table_hidden: TABLE_HIDDEN_FLAG_BOTH,
                        gps: 0,
                        credits: 0,
                        playtime: 0,
                        boost: 1,
                        cards: 3,
                        credit_mode: MODE_360,
                        tunes: 1,
                        runs: 1,
                        itemflag: {s: true, m: true, l: true, money: true, jall: true},
                        changed: {lv: [], goal:[], items: [], itemm: [], iteml: [], money: [], jend: [], jall: []}
                      }

const getLv2Exp = lv => {

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

export const getExp2Lv = exp => {
  let count = exp * 10
  let next_exp = 0
  let i = 0

  for( i = 0; count > 0; i++ ){
    next_exp = 0
    if(i < 100){
      for( let j = Math.floor(i/10); j*10 <= i ; j++){
        next_exp += 60 + (( j - 1 ) * 60)
      }
      next_exp +=  60
    }
    else if(i >= 100 ){
      let h = Math.floor(i/100)
      const hi = i - h * 100;

      if(       i >= 700){ h = 21 }
      else if(  i >= 600){ h = 14 }

      for( let j = Math.floor(hi/10); j*10 <= hi ; j++){
        next_exp += (6 + ( j - 1 ) * 6) * (10 + 2 * h )
      }
      next_exp +=  6 *  (10 + 2 * h )
    }
    if(count - next_exp === 0){
      i++
      break
    }else if(count - next_exp < 0){
      break
    }
  count -= next_exp
  }
  return i
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

const changeds = (type, changed, value) => {
  let retobj = {}
  switch(type){
    case BUTTON_LV:
      retobj = Object.assign({}, changed, {lv: changed.lv.concat( value )})
      break
    case BUTTON_LV_GOAL:
      retobj = Object.assign({}, changed, {goal: changed.goal.concat( value )})
      break
    case BUTTON_ITEM_S:
      retobj = Object.assign({}, changed, {items: changed.items.concat( value )})
      break
    case BUTTON_ITEM_M:
      retobj = Object.assign({}, changed, {itemm: changed.itemm.concat( value )})
      break
    case BUTTON_ITEM_L:
      retobj = Object.assign({}, changed, {iteml: changed.iteml.concat( value )})
      break
    case BUTTON_MONEY:
      retobj = Object.assign({}, changed, {money: changed.money.concat( value )})
      break
    case BUTTON_JUWEL_END:
      retobj = Object.assign({}, changed, {jend: changed.jend.concat( value )})
      break
    case BUTTON_JUWEL_ALL:
      retobj = Object.assign({}, changed, {jall: changed.jall.concat( value )})
      break
    default:
      retobj = changed
      break;
    }
  return retobj
}

const flag_toggle = (type, itemflag) => {
  let retobj = {}
  switch(type){
    case ITEM_S:
      retobj = Object.assign({}, itemflag, {s: !itemflag.s})
      break
    case ITEM_M:
      retobj = Object.assign({}, itemflag, {m: !itemflag.m})
      break
    case ITEM_L:
      retobj = Object.assign({}, itemflag, {l: !itemflag.l})
      break
    case MONEY:
      retobj = Object.assign({}, itemflag, {money: !itemflag.money})
      break
    case JUWEL_ALL:
      retobj = Object.assign({}, itemflag, {jall: !itemflag.jall})
      break
    default:
      retobj = itemflag
      break
  }
  return retobj
}

const getMoney = tunes => {
  let money = 0
  for( let i = 0; i < tunes; i++){
    money += Math.floor(Math.random() * 100) %100 +150
  }
  return money
}
const getJuwel = (tunes, boost) => {
  let juwel = 0
  for( let i = 0; i < tunes; i++){
    juwel += (Math.floor(Math.random() * 6) %6 +5 ) * boost
  }
  return juwel
}


export default (state = initialState, action) => {
  let new_lv = validate(action.lv, MAX_LV)
  let new_item = validate(action.item, MAX_ITEM)
  let new_money = validate(action.money, MAX_MONEY)
  let new_juwel = validate(action.juwel, MAX_JUWEL)
  let new_exp = getLv2Exp(new_lv)
  let changed_value = 0
  const mes = []

  const messageItem = (size, new_value, now_value) => {
      const got = new_value - now_value
      let mes = ""
      switch(size){
        case ITEM_S:
          mes = "親密度プレゼント（小）を"
          break
        case ITEM_M:
          mes = "親密度プレゼント（中）を"
          break
        case ITEM_L:
          mes = "親密度プレゼント（大）を"
          break
        default:
          mes = "なんかおかしいです。"
          break
      }

      if(action.change === 0){
        mes += "リセットしました"
      }else if(got === 0){
        if( new_value === MIN_ZERO){ mes = "プレゼントは" +MIN_ZERO+ "個未満には出来ません。" }
        else if( new_value === MAX_ITEM){ mes = "プレゼントは" +MAX_ITEM+ "個までしか持てません。" }
      }else if( got > 0){
        mes += got +"個増やして"+ new_value +"個になりました。"
      }else if( got < 0){
        mes += (got *-1) + "個減らして"+ new_value +"個になりました。"
      }
    return mes
  }

  const messageJuwel = (type, new_value, now_value) => {
      const got = new_value - now_value
      let mes = ""
      switch(type){
        case JUWEL_END:
          mes = "エンドジュエルを"
          break
        case JUWEL_ALL:
          mes = "オールマイティジュエルを"
          break
        default:
          mes = "なんかおかしいです。"
          break
      }

      if(action.change === 0){
        mes += "リセットしました"
      }else if(got === 0){
        if( new_value === MIN_ZERO){ mes = "ジュエルは" +MIN_ZERO+ "個未満には出来ません。" }
        else if( new_value === MAX_JUWEL){ mes = "ジュエルは" +MAX_JUWEL+ "個までしか持てません。" }
      }else if( got > 0){
        mes += got +"個増やして"+ new_value +"個になりました。"
      }else if( got < 0){
        mes += (got *-1) + "個減らして"+ new_value +"個になりました。"
      }
    return mes
  }

  const messageMoney = (new_value, now_value) => {
      let got = new_value - now_value
      let mes = ""

      if(action.change === 0){
        mes += "マニーをリセットしました。"
      }else if(got === 0){
        if( new_value === MIN_ZERO){ mes = "マニーは" +MIN_ZERO+ "未満には出来ません。" }
        else if( new_value === MAX_MONEY){ mes = "マニーは" +MAX_MONEY+ "までしか持てません。" }
      }else if( got > 0){
        mes += got +"マニー増やして"+ new_value +"マニーになりました。"
      }else if( got < 0){
        mes += (got *-1) + "マニー減らして"+ new_value +"マニーになりました。"
      }
    return mes
  }

  switch(action.type){
    case INPUT:
      return Object.assign({}, state,{
        exp: {now: new_exp, goal: state.exp.goal },
        lv:  {now: new_lv, goal: state.lv.goal },
      })

    case INPUT_GOALLV:
      return Object.assign({}, state,{
        exp: {goal: new_exp, now: state.exp.now },
        lv:  {goal: new_lv, now: state.lv.now }
      })

    case INPUT_ITEM_S:
      return Object.assign({}, state,{ item: {s: new_item, m: state.item.m, l: state.item.l} })

    case INPUT_ITEM_M:
      return Object.assign({}, state,{ item: {m: new_item, s: state.item.s, l: state.item.l} })

    case INPUT_ITEM_L:
      return Object.assign({}, state,{ item: {l: new_item, s: state.item.s, m: state.item.m} })

    case INPUT_MONEY:
      return Object.assign({}, state,{ money: new_money })

    case INPUT_JUWEL_END:
      return Object.assign({}, state,{ juwel: {end: new_juwel, all: state.juwel.all } })

    case INPUT_JUWEL_ALL:
      return Object.assign({}, state,{ juwel: {all: new_juwel, end: state.juwel.end } })

    case RADIO_JUWEL:
      return Object.assign({}, state,{ juweltype: action.juwel })

    case RADIO_TABLE_HIDDEN:
      return Object.assign({}, state,{ table_hidden: action.value })

    case RADIO_BOOST:
      return Object.assign({}, state,{ boost: action.value })

    case SELECT_CARDS:
      return Object.assign({}, state,{ cards: Math.floor(action.value) })

    case SELECT_TUNES:
      return Object.assign({}, state,{ tunes: Math.floor(action.value) })

    case SELECT_RUNS:
      return Object.assign({}, state,{ runs: Math.floor(action.value) })

    case BUTTON_LV:
      new_lv = action.change === 0 ? 0 : validate(state.lv.now + action.change, MAX_LV)
      new_exp = getLv2Exp(new_lv)
      let got_lv = new_lv - state.lv.now
      let got_exp = Math.round( (new_exp - state.exp.now)*100)/100
      changed_value = action.change === 0 ? "リセット" : new_lv - state.lv.now

      if(action.change === 0){
        mes.push("レベルをリセットしました")
      }else if(got_lv === 0){
        if( new_lv === MIN_ZERO ){ mes.push("最低レベルです") }
        else if( new_lv === MAX_LV ){ mes.push("最高レベルです") }
      }else if( got_lv > 0){
        mes.push(got_lv +"レベル上げてLv "+ new_lv +"になりました（獲得EXP:"+ got_exp +"）")
      }else if( got_lv < 0){
        mes.push((got_lv *-1) + "レベル下げてLv "+ new_lv +"になりました（喪失EXP:" + (got_exp *-1) + "）")
      }
      return Object.assign({}, state,{
        exp: { now: new_exp, goal: state.exp.goal },
        lv:  { now: new_lv, goal: state.lv.goal},
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_LV_GOAL:
      new_lv = action.change === 0 ? 600 : validate(state.lv.goal + action.change, MAX_LV)
      new_exp = getLv2Exp(new_lv)
      changed_value = action.change === 0 ? "リセット" : new_lv - state.lv.goal

      if(action.change === 0){
        mes.push("目標レベルを600にしました")
      }else if(new_lv === state.lv.goal){
        if( new_lv === MIN_ZERO ){ mes.push("最低レベルです") }
        else if( new_lv === MAX_LV ){ mes.push("最高レベルです") }
      }else{
        mes.push("目標レベルを"+ new_lv +"にしました")
      }
      return Object.assign({}, state,{
        exp: { now: state.exp.now, goal: new_exp },
        lv:  { now: state.lv.now, goal: new_lv},
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_ITEM_S:
      new_item = action.change === 0 ? 0 : validate(state.item.s + action.change, MAX_ITEM)
      changed_value = action.change === 0 ? "リセット" : new_item - state.item.s
      mes.push( messageItem(ITEM_S, new_item, state.item.s))

      return Object.assign({}, state,{
        item: {s: new_item, m: state.item.m, l: state.item.l},
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_ITEM_M:
      new_item = action.change === 0 ? 0 : validate(state.item.m + action.change, MAX_ITEM)
      changed_value = action.change === 0 ? "リセット" : new_item - state.item.m
      mes.push( messageItem(ITEM_M, new_item, state.item.m))

      return Object.assign({}, state,{
        item: {m: new_item, s: state.item.s, l: state.item.l},
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_ITEM_L:
      new_item = action.change === 0 ? 0 : validate(state.item.l + action.change, MAX_ITEM)
      changed_value = action.change === 0 ? "リセット" : new_item - state.item.l
      mes.push( messageItem(ITEM_L, new_item, state.item.l))

      return Object.assign({}, state,{
        item: {l: new_item, m: state.item.m, s: state.item.s},
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_JUWEL_END:
      new_juwel = action.change === 0 ? 0 : validate(state.juwel.end + action.change, MAX_JUWEL)
      changed_value = action.change === 0 ? "リセット" : new_juwel - state.juwel.end
      mes.push( messageJuwel(JUWEL_END, new_juwel, state.juwel.end))

      return Object.assign({}, state,{
        juwel: {end: new_juwel, all: state.juwel.all },
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_JUWEL_ALL:
      new_juwel = action.change === 0 ? 0 : validate(state.juwel.all + action.change, MAX_JUWEL)
      changed_value = action.change === 0 ? "リセット" : new_juwel - state.juwel.all
      mes.push( messageJuwel(JUWEL_ALL, new_juwel, state.juwel.all))

      return Object.assign({}, state,{
        juwel: {end: state.juwel.end, all: new_juwel },
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_MONEY:
      new_money = action.change === 0 ? 0 : validate(state.money + action.change, MAX_MONEY)
      changed_value = action.change === 0 ? "リセット" : new_money - state.money
      mes.push( messageMoney(new_money, state.money) )

      return Object.assign({}, state,{
        money: new_money,
        mes: mes.concat( state.mes ),
        changed: changeds(action.type, state.changed, changed_value)
      })

    case BUTTON_PLAY:
      const get_money = getMoney(state.tunes)
      const get_juwel = getJuwel(state.tunes, state.boost)
      const get_juweltype = state.juweltype === JUWEL_END ? "エンド" : "オールマイティ"
      let boost_mes = ""
      let changed = {}
      new_exp = state.exp.now + (state.cards * state.tunes)
      new_money = state.money + get_money
      switch(state.juweltype){
        case JUWEL_END:
          new_juwel = {end: state.juwel.end + get_juwel, all: state.juwel.all}
          changed = Object.assign({}, state.changed, {jend: state.changed.jend.concat( get_juwel ), money: state.changed.money.concat( get_money ) })
          break
        case JUWEL_ALL:
          new_juwel = {end: state.juwel.end , all: state.juwel.all + get_juwel}
          changed = Object.assign({}, state.changed, {jall: state.changed.jall.concat( get_juwel ), money: state.changed.money.concat( get_money ) })
          break
        default: break
      }
      if(state.boost !== 1){
        boost_mes = "(" +state.boost+ "倍ブースト)"
      }
      mes.push("デッキ" +state.cards+ "枚編成で" +state.tunes+ "曲" +boost_mes+ "オンゲキしました。（獲得EXP: " +state.cards * state.tunes+ "　マニー: " +get_money+ "　" +get_juweltype+ "ジュエル: " +get_juwel+ "）")

      new_lv = getExp2Lv(new_exp)
      if( new_lv > state.lv.now){
        mes.push(new_lv - state.lv.now+ "レベル上昇！" +new_lv+ "レベルになりました")
      }

      return Object.assign({}, state, {
        lv: {now: new_lv, goal: state.lv.goal },
        exp:{now: new_exp, goal: state.exp.goal},
        money: new_money,
        juwel: new_juwel,
        gps: state.gps + ( 40 * state.boost * state.tunes),
        playtime: state.playtime + GAMEPLAY_TIME * state.tunes,
        mes: mes.concat( state.mes ),
        changed: changed
       })

   case BUTTON_MONEYRUN:
     new_money = validate(state.money + action.value * state.runs, MAX_MONEY)
     changed_value = new_money - state.money
     mes.push( action.value /15 *state.runs +"GP（" +state.runs * ONE_CREDIT+ "円）でマニーランしました。（" +action.value * state.runs+ "マニー獲得）")
     return Object.assign({}, state,{
       money: new_money,
       mes: mes.concat( state.mes ),
       gps: state.gps + ( action.value /15 ),
       playtime: state.playtime + MONEYRUN_TIME * state.runs,
       changed: changeds(action.type, state.changed, changed_value)
     })

   case BUTTON_CREDIT_MODE:
     return Object.assign({}, state,{
       credit_mode: action.value
     })

    case CHECK_ITEMFLAG:
      return Object.assign({}, state, {
        itemflag: flag_toggle(action.check, state.itemflag)
       })

    default:
      return state
  }
}
