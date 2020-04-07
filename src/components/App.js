import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeartImage from '../image/onheart.png'
import './App.scss';

import { input, input_goal, input_item_s, input_item_m, input_item_l, input_money, input_juwel_end, input_juwel_all,
   button_change, button_play, radio_juweltype, check_itemflag } from '../actions'
import { JUWEL_END, JUWEL_ALL, ITEM_S, ITEM_M, ITEM_L, MONEY,
  BUTTON_LV,
  BUTTON_LV_GOAL,
  BUTTON_ITEM_S,
  BUTTON_ITEM_M,
  BUTTON_ITEM_L,
  BUTTON_MONEY,
  BUTTON_JUWEL_END,
  BUTTON_JUWEL_ALL } from '../actions'

const EXP_MONEY = 0.01
const EXP_ITEM_S = 6
const EXP_ITEM_M = 20
const EXP_ITEM_L = 200
const EXP_JUWEL_ALL = 0.5
const EXP_MONEYRUN_A = 55.5
const EXP_MONEYRUN_B = 54
const MONEYRUN_A = 5550
const MONEYRUN_B = 5400
const MONEYRUN_TIME = 50
const GAMEPLAY_TIME = 180
const EXPEC_JUWEL = 7.5
const EXPEC_MONEY = 200
const ONE_CREDIT = 300

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {kore: false}
  }
  handleClick = () => {
    this.setState( {kore: !this.state.kore})
  }
  render(){
    const props = this.props

    return (
      <div className="App">

        <h1 className="signboard">オンゲキ親密度シミュレーター</h1>
        <div id="section1">
          <div className="row w-450 mx-auto">
            <div className="col pt-2 px-1">
              <Heart label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
            </div>
            <div className="col pos-rel w-200 text-right">
              <InputLv className="" value={props.lv.now} changed={props.changed.lv} buttonChange={props.button_change} inputValue={props.input}/>
            </div>
          </div>
          <div className="row w-450 mx-auto pt-1">
            <div className="col pt-2 px-1">
              <Heart label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
            </div>
            <div className="col pos-rel w-200 text-right">
              <InputLvGoal  value={props.lv.goal} changed={props.changed.goal} buttonChange={props.button_change} inputValue={props.input_goal}/>
              <div>
                <p>EXP: {props.exp.now}</p>
                <p>目標EXP: {props.exp.goal}</p>
                <p>必要EXP: { Math.ceil(props.exp.goal - props.exp.now)}</p>
              </div>
            </div>
          </div>

          <div className="row w-450 mx-auto">
            <ExampleTable nesexp={ Math.max(props.exp.goal - props.exp.now, 0 ) } />
          </div>

          <div className="d-none">
            <div className="row pos-rel w-450 text-center mx-auto">
              <InputMoney value={props.money} changed={props.changed.money} buttonChange={props.button_change} inputValue={props.input_money}/>
            </div>

            <div id="Items" className="row pos_rel w-450 input_field text-center mx-auto">
              <p className="text-center">親密度上昇プレゼント</p>

              <div className="col w-150 pos_rel input_item">
                <InputItem type={BUTTON_ITEM_S} value={props.item.s} changed={props.changed.items} buttonChange={props.button_change} inputValue={props.input_item_s}/>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,1) } }>+1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,10)} }>+10</button>
                </div>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,-1)} }>-1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,-10)} }>-10</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,0)} } className="btn-reset">Clear</button>
                </div>
              </div>
              <div className="col w-150 pos_rel input_item">
                <InputItem type={BUTTON_ITEM_M} value={props.item.m} changed={props.changed.itemm} buttonChange={props.button_change} inputValue={props.input_item_m}/>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,1) } }>+1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,10)} }>+10</button>
                </div>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,-1)} }>-1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,-10)} }>-10</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,0)} } className="btn-reset">Clear</button>
                </div>
              </div>
              <div className="col w-150 pos_rel input_item">
                <InputItem type={BUTTON_ITEM_L} value={props.item.l} changed={props.changed.iteml} buttonChange={props.button_change} inputValue={props.input_item_l}/>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,1) } }>+1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,10)} }>+10</button>
                </div>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,-1)} }>-1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,-10)} }>-10</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,0)} } className="btn-reset">Clear</button>
                </div>
              </div>
            </div>

            <div className="row pos-rel w-450 text-center input_field mx-auto">
              <div className="col w-200 pos_rel input_juwel">
                <InputItem type={BUTTON_JUWEL_END} value={props.juwel.end} changed={props.changed.jend} buttonChange={props.button_change} inputValue={props.input_juwel_end}/>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,1) } }>+1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,10)} }>+10</button>
                </div>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,-1)} }>-1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,-10)} }>-10</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,0)} } className="btn-reset">Clear</button>
                </div>
              </div>
              <div className="col w-200 pos_rel input_juwel">
                <InputItem type={BUTTON_JUWEL_ALL} value={props.juwel.all} changed={props.changed.jall} buttonChange={props.button_change} inputValue={props.input_juwel_all}/>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,1) } }>+1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,10)} }>+10</button>
                </div>
                <div>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,-1)} }>-1</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,-10)} }>-10</button>
                  <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,0)} } className="btn-reset">Clear</button>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="row mx-auto pt-2 w-450">
            <div className="table_money">
              <table>
                <thead>
                  <tr><td colSpan="5">
                    <span className="table_title">アイテム使用後のレベルを計算</span>
                  </td></tr>
                  <tr>
                    <td>アイテム</td>
                    <td>EXP</td>
                    <td>所持数</td>
                    <td>獲得EXP</td>
                    <td>貢ぐ</td>
                  </tr>
                </thead>
                <tbody>
                  <MoneyTableRecordInput item={MONEY} stock={props.money} flag={props.itemflag.money} itemFlag={props.check_itemflag} inputValue={props.input_money}/>
                  <MoneyTableRecordInput item={ITEM_S} stock={props.item.s} flag={props.itemflag.s} itemFlag={props.check_itemflag} inputValue={props.input_item_s}/>
                  <MoneyTableRecordInput item={ITEM_M} stock={props.item.m} flag={props.itemflag.m} itemFlag={props.check_itemflag} inputValue={props.input_item_m}/>
                  <MoneyTableRecordInput item={ITEM_L} stock={props.item.l} flag={props.itemflag.l} itemFlag={props.check_itemflag} inputValue={props.input_item_l}/>
                  <MoneyTableRecordInput item={JUWEL_ALL} stock={props.juwel.all} flag={props.itemflag.jall} itemFlag={props.check_itemflag} inputValue={props.input_juwel_all}/>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5 w-450 mx-auto">
            <div className="col pt-2 px-1">
              <Heart label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + getItemExp(props))} par={ getExp2Lvper( props.exp.now + getItemExp(props)) } />
            </div>
            <div className="col pos-rel w-200 text-right">
              <p>現在のEXP: {props.exp.now}</p>
              <p>アイテムのEXP: {getItemExp(props)}</p>
              <p>合計EXP: {props.exp.now + getItemExp(props)}</p>
              <p>目標レベルのEXP: {props.exp.goal}</p>
            </div>
        </div>

          <div className="row mx-auto pt-2 w-450">
            <div className="table_lv">
              <table>
                <thead>
                  <tr><td colSpan="4">
                    <span className="table_title">アイテム使用後のレベル</span>
                  </td></tr>
                  <tr>
                    <td>目標の親密度</td>
                    <td>必要EXP</td>
                    <td>残りEXP</td>
                    <td>到達度</td>
                  </tr>
                </thead>
                <tbody>
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={100} expg={3300} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={200} expg={7260} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={300} expg={11880} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={400} expg={17160} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={500} expg={23100} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={600} expg={29700} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={700} expg={42240} />
                  <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp(props)} lv={800} expg={59400} />
                  <tr>
                    <td className="column_graph" colSpan="2">
                      <span className="graph_text">現在EXP</span>
                      <div className="progbar" ></div>
                      <div className="progbar_i" ></div>
                    </td>
                    <td className="column_graph" colSpan="2">
                      <span className="graph_text">アイテムEXP</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-none">
            <button className="btn-toggle" onClick={ this.handleClick }>{ this.state.kore ? "閉じ" : "開け" }まーす</button>
            <CSSTransition in={this.state.kore} classNames="door" timeout={1000}>
              <div className="door">
                <div id="Money">
                  <p>でしてー</p>
                </div>
              </div>
            </CSSTransition>
            <div>
              オンゲキ 1曲プレイ
              <br /><button onClick={ ()=> {props.button_play("play",0)} }>40 GP(デッキ0枚) でLet'sオンゲキ</button>
              <br /><button onClick={ ()=> {props.button_play("play",1)} }>40 GP(デッキ1枚)  でLet'sオンゲキ</button>
              <br /><button onClick={ ()=> {props.button_play("play",2)} }>40 GP(デッキ2枚)  でLet'sオンゲキ</button>
              <br /><button onClick={ ()=> {props.button_play("play",3)} }>40 GP(デッキ3枚)  でLet'sオンゲキ</button>
            </div>
            <div>
              <label>End Juwel</label>
              <input type="radio" name="aradio" checked={props.juweltype === JUWEL_END}
                     onChange={() => props.radio_juweltype(JUWEL_END)}/> <br />
              <label>All Juwel</label>
              <input type="radio" name="aradio" checked={props.juweltype === JUWEL_ALL}
                     onChange={() => props.radio_juweltype(JUWEL_ALL)}/>
            </div>

            <div className="lovelv">
              <h4>親密度</h4>
              <div className="lovelv_number">
                <h1>{ props.lv.now }</h1>
              </div>
              <h5>EXP　{ props.exp.now } </h5>
            </div>
            <div className="lovelv">
              <h4>future</h4>
              <div className="lovelv_number">
                <h1>{ getExp2Lv( props.exp.now + getItemExp(props)) }</h1>
                <h6>({ getExp2Lvper( props.exp.now + getItemExp(props)) } %)</h6>
              </div>
              <h5>貢げるEXP　{ getItemExp(props) } </h5>
              <h5>全捧げしたEXP　{ props.exp.now + getItemExp(props) } </h5>
            </div>

            <div className="lovelv">
              <h4>目標値</h4>
              <div className="lovelv_number">
                <h1>{ props.lv.goal }</h1>
              </div>
              <h5>EXP　{ props.exp.goal }
              <br />残り　{ props.exp.goal - props.exp.now } ({ Math.floor((props.exp.now / props.exp.goal)*100) } %)</h5>
            </div>
          </div>
          <div className="message_box">
            <Messages messages={props.mes} />
          </div>
        </div>
    </div>
    );
  }
}
const validate = values => {
  const errors = {}

  if( !values.lovep ) errors.lovep = "This is Err"
  return errors
}

const mapStateToProps = state => ({
  openflag: {menu1: false},
  mes: state.input.mes,
  lv: state.input.lv,
  exp: state.input.exp,
  item: state.input.item,
  money: state.input.money,
  juwel: state.input.juwel,
  juweltype: state.input.juweltype,
  changed: state.input.changed,
  itemflag: state.input.itemflag
 })

const mapDispatchToProps = ({
  input,
  input_goal,
  input_item_s,
  input_item_m,
  input_item_l,
  input_money,
  input_juwel_end,
  input_juwel_all,
  button_change,
  button_play,
  radio_juweltype,
  check_itemflag
})

class InputMoney extends Component {
  render(){
  return(
    <div className="input_field input_money">
      <label>所持マニー→</label>
      <input type='text' className="" value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,1000) } }>+1,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,10000)} }>+10,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,100000)} }>+100,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,MONEYRUN_B)} }>+360 GP</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,MONEYRUN_A)} }>+370 GP</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-1000)} }>-1,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-10000)} }>-10,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-100000)} }>-100,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,0)} } className="btn-reset">Clear</button>
      </div>
    </div>
  )}
}

class InputLv extends Component {
  render(){
  return(
    <div className="input_field">
      <label>現在レベル→</label>
      <input className="input_lv" type='text' value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 1)} }>+1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 10)} }>+10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 100)} }>+100</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -1)} }>-1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -10)} }>-10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -100)} }>-100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 0)} } className="btn-reset" >Clear</button>
      </div>
    </div>
  )}
}

class InputLvGoal extends Component {
  render(){
  return(
    <div className="input_field">
      <label>目標レベル→</label>
      <input className="input_lv" type='text' value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, -100)} }>-100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 100)} }>+100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 0)} } className="btn-reset" >Clear</button>
      </div>
    </div>
  )}
}

class InputItem extends Component {
  render(){
    const labeled = type => {
      switch(type){
        case BUTTON_ITEM_S: return "（小）→"
        case BUTTON_ITEM_M: return "（中）→"
        case BUTTON_ITEM_L: return "（大）→"
        case BUTTON_JUWEL_END: return "3章ジュエル"
        case BUTTON_JUWEL_ALL: return "1/2章ジュエル"
        default: return "（？）→"
      }
    }
    const label = labeled( this.props.type)
  return(
    <div className="input_field">
      <label>{label}</label>
      <input type='text' value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
    </div>
  )}
}

const Messages = props => {
  const messages = props.messages
  const ListItems = messages.map((mes,index) =>
    <li key={index}>{ mes }</li>
  )
  return (
    <ul>{ ListItems }</ul>
  )
}

const Heart = props => {
  const lv = props.lv >= 800 ? 800 : props.lv
  const par = lv === 800 ? 100 : props.par
  const barheight = par * 1.6
  const bartop = 180 - barheight
  const barstyle = { height: barheight, top: bartop}
  const backheight = 160 - barheight
  const backtop = bartop - backheight
  const backstyle = { height: backheight, top: backtop}

  return(
    <React.Fragment>
      <div className="heart" >
        <span className="heart_lovep">{props.label}</span>
        <span className="heart_lv">{ lv }</span>
        <img src={HeartImage} className="heart_out" alt="ハート"/>

        <div className="heart_bar" style={ barstyle }></div>
        <div className="heart_back" style={ backstyle }></div>
      </div>
    </React.Fragment>
  );
}

const ChangeValue = props => {
  const classname = "changed_value"
  const blue = { color: "rgb(40,40,240)"}
  const red = { color: "rgb(240,40,40)"}
  return(
    <React.Fragment>

      <TransitionGroup>
        {props.value.map((value, index) => (
          <CSSTransition
            key={index}
            classNames={classname}
            timeout={1000}
            unmountOnExit
            >
              <span className={classname} style={value >= 0 ? blue : red}>{value >= 0 ? "+"+value : value}</span>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </React.Fragment>
  );
}

const LoveTableWithItem = props => {

  const parse = Math.floor((props.exp / props.expg )*100)
  const parse_i = Math.floor((props.itemexp / props.expg )*100)
  let parsebar = 0
  let parsebar_i = 0

  if(parse >= 100){
    parsebar = 450
  }else if(parse + parse_i >= 100){
    parsebar = parse * 4.5
    parsebar_i = (100 - parse) / 100 * 450
  }else{
    parsebar = parse * 4.5
    parsebar_i = parse_i * 4.5
  }

  const barstyle = { width: parsebar }
  const barstyle_i = { width: parsebar_i, left: parsebar}

  return(
    <React.Fragment>
      <tr>
        <th className="column_lv">
          <span className="goal_lv">{props.lv}</span>
          <div className="progbar" style={barstyle}></div>
          <div className="progbar_i" style={barstyle_i}></div>
        </th>
        <td className="column_exp">{props.expg}</td>
        <td className="column_exp">{Math.round((props.expg - props.exp - props.itemexp) * 100) / 100 }</td>
        <td className="column_exp">{ parse + parse_i } %</td>
      </tr>
    </React.Fragment>
  );
}

const MoneyTableRecordInput = props => {
  let item_name = ""
  let item_exp = 0
  switch(props.item){
    case MONEY:
      item_name = "マニー"
      item_exp = EXP_MONEY
      break
    case ITEM_S:
      item_name = "プレゼント（小）"
      item_exp = EXP_ITEM_S
      break
    case ITEM_M:
      item_name = "プレゼント（中）"
      item_exp = EXP_ITEM_M
      break
    case ITEM_L:
      item_name = "プレゼント（大）"
      item_exp = EXP_ITEM_L
      break
    case JUWEL_ALL:
      item_name = "1章 & 2章ジュエル"
      item_exp = EXP_JUWEL_ALL
      break
    default:
      break
  }
  return(
    <React.Fragment>
      <tr>
        <th className="column_name">{item_name}</th>
        <td className="column_exp">{item_exp}</td>
        <td className="column_stock">
          <input type='text' className="table_input" value={props.stock} onChange={ (eve) => { props.inputValue(eve.target.value)} } />
        </td>
        <td className="column_getexp">{ Math.floor(item_exp * props.stock) }</td>
        <td className="column_check">
          <input type="checkbox" name="acheck" checked={props.flag}
             onChange={() => props.itemFlag(props.item)}/>
       </td>
      </tr>
    </React.Fragment>
  );
}

const ExampleTable = props => {
  return(
    <React.Fragment>
      <div className="table_example">
      <table>
        <thead>
          <tr><td colSpan="4">
            <span className="table_title">目標レベルまでの目安</span>
          </td></tr>
        </thead>
        <tbody>
          <tr>
            <th className="column_example">プレゼント (大)</th>
            <td className="column_count">{ Math.ceil(props.nesexp / EXP_ITEM_L) }個</td>
            <td className="column_cost text-center" colSpan="2">{ Math.ceil(props.nesexp / EXP_ITEM_L) * 20000 }マニー</td>
          </tr>
          <ExampleTableRecord label="マニーラン (370GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_A} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0} />
          <ExampleTableRecord label="マニーラン (360GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_B} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0}/>
          <ExampleTableRecord label="オンゲキ9曲 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME * 9} onejuwel={EXPEC_JUWEL}/>
          <ExampleTableRecord label="オンゲキ9曲 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME * 9} onejuwel={EXPEC_JUWEL}/>
          <ExampleTableRecord label="オンゲキ3曲3倍 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME * 3} onejuwel={EXPEC_JUWEL *3 }/>
          <ExampleTableRecord label="オンゲキ3曲3倍 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME * 3} onejuwel={EXPEC_JUWEL *3 }/>
        </tbody>
      </table>
      </div>
      <p>・マニーラン1セットにつき{MONEYRUN_TIME}秒
      <br />・オンゲキ1曲につき{GAMEPLAY_TIME}秒
      <br />・楽曲プレイで獲得するマニーは{EXPEC_MONEY}マニー、全て親密度に使う
      <br />・デッキ編成は親密度を上げたいキャラクター3枚編成
      <br />・獲得ジュエルは1曲あたり{EXPEC_JUWEL}個
      <br />・獲得したジュエルは親密度に使わず、計算に影響しない
      <br />・370GPはコンテニューなし(残った10GP→150マニーに変換)
      <br />・ログインボーナス、ミッション等は計算外
    </p>
    </React.Fragment>
  );
}

const ExampleTableRecord = props => {
  const nes_count = Math.ceil(props.nesexp / props.oneexp)
  const cost = props.cost ? props.cost : 0
  const realtime = props.onetime ? props.onetime : 0
  return(
    <React.Fragment>
      <tr>
        <th className="column_example">{props.label}</th>
        <td className="column_count">{nes_count}回</td>
        <td className="column_cost">{nes_count * cost}円</td>
        <td className="column_time">{convertTime(nes_count * realtime) }
          <br />ジュエル：{nes_count * props.onejuwel}</td>

      </tr>
    </React.Fragment>
  );
}

const convertTime = time => {
  let mes = ""
  if(time /60/60 > 0){
    mes += Math.floor(time /60/60) + "時間"
  }
  if(time %3600 /60 > 0){
    mes += Math.floor(time %3600 /60) + "分"
  }
  if(time%60 > 0){
    mes += Math.floor(time %60) + "秒"
  }
  return mes
}

const getItemExp = props => {
  let exp = 0
  if(props.itemflag.money){ exp += Math.floor(props.money * EXP_MONEY) }
  if(props.itemflag.s){ exp += props.item.s * EXP_ITEM_S }
  if(props.itemflag.m){ exp += props.item.m * EXP_ITEM_M }
  if(props.itemflag.l){ exp += props.item.l * EXP_ITEM_L }
  if(props.itemflag.jall){ exp += props.juwel.all * EXP_JUWEL_ALL }
  return exp
}

const getExp2Lv = exp => {
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

const getExp2Lvper = exp => {
  let parse = 0
  let count = exp * 10
  let next_exp = 0
  let i = 0

  if(exp >= 59400){ return 100}

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

    if(count === next_exp){
      parse = 0
      i++
      break
    }else if(count < next_exp){
      parse = Math.floor( (count / next_exp) * 100 ) / 10
      break
    }
  count -= next_exp
  }

  return parse * 10
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm( {validate, form: 'loveform'})(App))
