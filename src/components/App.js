import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeartImage from '../images/onheart.png'
import { getExp2Lv } from '../reducers/input.js'
import './App.scss';

import {
  input, input_goal,
  input_item_s, input_item_m, input_item_l, input_money,
  input_juwel_end, input_juwel_all,
  button_change, button_play, radio_juweltype, check_itemflag
  } from '../actions'

import {
  ITEM_S, ITEM_M, ITEM_L, MONEY, JUWEL_END, JUWEL_ALL,
  BUTTON_LV,  BUTTON_LV_GOAL,
  BUTTON_ITEM_S,  BUTTON_ITEM_M,  BUTTON_ITEM_L,  BUTTON_MONEY,
  BUTTON_JUWEL_END,  BUTTON_JUWEL_ALL
  } from '../actions/'

const TABLE_HIDDEN_FLAG_360GP = "FLAG_360GP"
const TABLE_HIDDEN_FLAG_370GP = "FLAG_370GP"
const TABLE_HIDDEN_FLAG_BOTH = "FLAG_BOTH"
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
const SE = "SE"
const SP = "SP"
const TB = "TB"
const PC = "PC"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      simcon_flag: false,
      about_flag: false,
      table_hidden_flag: "TABLE_HIDDEN_FLAG_BOTH"
    }
  }
  simconHandleClick = () => {
    this.setState( {simcon_flag: !this.state.simcon_flag} )
  }
  updatedHandleClick = () => {
    this.setState( {updated_flag: !this.state.updated_flag} )
  }
  aboutHandleClick = () => {
    this.setState( {about_flag: !this.state.about_flag} )
  }
  render(){
    const props = this.props

    return (
      <div id="App">
        <div className="container">

          {/* スピリット・左側 */}
          <div id="Menubar" className="vis-pc">
            {/* inputとbuttonたち */}
            <div id="Menu">

              {/* レベル */}
              <div className="input-block input-lv">
                <InputLv value={props.lv.now} changed={props.changed.lv} buttonChange={props.button_change} inputValue={props.input}/>
              </div>
              <div className="input-block input-lv">
                <InputLvGoal value={props.lv.goal} changed={props.changed.goal} buttonChange={props.button_change} inputValue={props.input_goal}/>
              </div>
              <hr />
              {/* マニー */}
              <div className="input-block w-250">
                <h2>マニー</h2>
                <InputMoney value={props.money} changed={props.changed.money} buttonChange={props.button_change} inputValue={props.input_money}/>
              </div>
              <hr />
              {/* アイテム */}
              <div className="row">
                <h2>親密度上昇プレゼント</h2>
                <div className="d-flex">
                  <div className="input-block input-item">
                    <InputItem type={BUTTON_ITEM_S} value={props.item.s} changed={props.changed.items} buttonChange={props.button_change} inputValue={props.input_item_s}/>
                  </div>
                  <div className="input-block input-item">
                    <InputItem type={BUTTON_ITEM_M} value={props.item.m} changed={props.changed.itemm} buttonChange={props.button_change} inputValue={props.input_item_m}/>
                  </div>
                  <div className="input-block input-item">
                    <InputItem type={BUTTON_ITEM_L} value={props.item.l} changed={props.changed.iteml} buttonChange={props.button_change} inputValue={props.input_item_l}/>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <h2>ジュエル</h2>
                <div className="d-flex">
                  <div className="input-block input-juwel">
                    <InputItem type={BUTTON_JUWEL_ALL} value={props.juwel.all} changed={props.changed.jall} buttonChange={props.button_change} inputValue={props.input_juwel_all}/>
                  </div>
                  <div className="input-block input-juwel">
                    <InputItem type={BUTTON_JUWEL_END} value={props.juwel.end} changed={props.changed.jend} buttonChange={props.button_change} inputValue={props.input_juwel_end}/>
                  </div>
                </div>
              </div>
            </div>

            {/* シミュレート部 */}
            <div id="Simulate">
              <div className="row text-center">
                <h2>オンゲキ 1曲プレイ</h2>

                <br /><button onClick={ ()=> {props.button_play("play",0)} }>40 GP(デッキ0枚) でLet'sオンゲキ</button>
                <br /><button onClick={ ()=> {props.button_play("play",1)} }>40 GP(デッキ1枚)  でLet'sオンゲキ</button>
                <br /><button onClick={ ()=> {props.button_play("play",2)} }>40 GP(デッキ2枚)  でLet'sオンゲキ</button>
                <br /><button onClick={ ()=> {props.button_play("play",3)} }>40 GP(デッキ3枚)  でLet'sオンゲキ</button>
                <br />

                <label>End Juwel</label>
                <input type="radio" name="aradio" checked={props.juweltype === JUWEL_END}
                       onChange={() => props.radio_juweltype(JUWEL_END)}/> <br />
                <label>All Juwel</label>
                <input type="radio" name="aradio" checked={props.juweltype === JUWEL_ALL}
                       onChange={() => props.radio_juweltype(JUWEL_ALL)}/>
              </div>
            </div>
          </div>

        {/* スピリット・右側 */}
        <div id="Contents" className="row">
        <header>
          <h1>オンゲキ親密度シミュレーター</h1>
          <hr />
        </header>

          <div className="row">
            <div className="btn-about">
              <button className="btn-toggle btn-about" onClick={ this.aboutHandleClick }>{ this.state.about_flag ? "戻る" : "About" }</button>
            </div>
          </div>
          <CSSTransition in={this.state.about_flag} classNames="sidedoor" timeout={1000}>
            <div className="sidedoor row mt-3">
              <div id="About">
                <About updated={props.updated}/>
              </div>

              <div id="Main">

                {/* 親密度Lv.入力 */}
                <div className="row vis-se vis-sp vis-tb">
                  <div className="col-2 mx-auto pt-2 pl-1">
                      {/* 現在ハート */}
                      <div className="vis-se">
                        <Heart mode={SE} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                      </div>
                      <div className="vis-sp">
                        <Heart mode={SP} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                      </div>
                      <div className="vis-tb">
                        <Heart mode={TB} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                      </div>
                    <div className="row vis-se vis-sp">
                      <p className="text-right pr-3">
                          EXP: <span className="bold">{props.exp.now}</span>
                        <br />
                        目標EXP: <span className="bold">{props.exp.goal}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-2 pos-rel text-right">
                    <InputLv value={props.lv.now} changed={props.changed.lv} buttonChange={props.button_change} inputValue={props.input}/>
                  </div>
                </div>
                {/* 目標Lv.入力 */}
                <div className="row vis-se vis-sp vis-tb pt-1">
                  <div className="col-2 pt-2 pl-1">
                    {/* 目標ハート */}
                    <div className="vis-se">
                      <Heart mode={SE} label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
                    </div>
                    <div className="vis-sp">
                      <Heart mode={SP} label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
                    </div>
                    <div className="vis-tb">
                      <Heart mode={TB} label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
                    </div>
                    <div className="vis-se vis-sp">
                      <p className="text-right pr-3">
                        必要EXP: <span className="bold">{ Math.ceil(props.exp.goal - props.exp.now)}</span>
                      <br />
                        到達度: <span className="bold">{ Math.round( (props.exp.now / props.exp.goal)*10000)/100}%</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-2 pos-rel text-right">
                    <InputLvGoal value={props.lv.goal} changed={props.changed.goal} buttonChange={props.button_change} inputValue={props.input_goal}/>
                    <div className="vis-tb text-right w-200">
                      <p>EXP: <span className="bold">{props.exp.now}</span></p>
                      <p>目標EXP: <span className="bold">{props.exp.goal}</span></p>
                      <p>必要EXP: <span className="bold">{ Math.ceil(props.exp.goal - props.exp.now)}</span></p>
                      <p>到達度: <span className="bold">{ Math.round( (props.exp.now / props.exp.goal)*10000)/100}%</span></p>
                    </div>
                  </div>
                </div>

                <div className="row vis-pc">
                  <div className="col-2 vis-pc">
                    <Heart mode={PC} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                      <p>EXP: <span className="bold">{props.exp.now}</span></p>
                      <p>目標EXP: <span className="bold">{props.exp.goal}</span></p>
                  </div>
                  <div className="col-2 vis-pc pl-2">
                    <Heart mode={PC} label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
                      <p>必要EXP: <span className="bold">{ Math.ceil(props.exp.goal - props.exp.now)}</span></p>
                      <p>到達度: <span className="bold">{ Math.round( (props.exp.now / props.exp.goal)*10000)/100}%</span></p>
                  </div>
                </div>


                {/* 目安テーブル */}
                <div className="row">
                  <ExampleTable lv={props.lv.now} goal={props.lv.goal} nesexp={ Math.max(props.exp.goal - props.exp.now, 0 ) } tableflag={this.state.table_hidden_flag}/>
                </div>
                <div className="row py-2 text-right">
                  <div className="col-2 pb-1">
                    <select className="hidden-select ml-2" value={this.state.table_hidden_flag} onChange={ e => this.setState({table_hidden_flag: e.target.value}) }>
                      <option value={TABLE_HIDDEN_FLAG_BOTH}>全て表示</option>
                      <option value={TABLE_HIDDEN_FLAG_360GP}>370GPのみ</option>
                      <option value={TABLE_HIDDEN_FLAG_370GP}>360GPのみ</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <button className="btn-toggle" onClick={ this.simconHandleClick }>シミュレート条件{ this.state.simcon_flag ? "を閉じる" : "" }</button>
                  </div>
                  <div className="row">
                    <CSSTransition in={this.state.simcon_flag} classNames="door" timeout={1000}>
                      <div className="door mx-auto">
                        <ul className="example-list">
                          <li>マニーラン1セットにつき{MONEYRUN_TIME}秒</li>
                          <li>オンゲキ1曲につき{GAMEPLAY_TIME}秒</li>
                          <li>1曲で獲得するマニーは{EXPEC_MONEY}マニー、全て親密度に使う</li>
                          <li>デッキ編成は親密度を上げるキャラクター3枚編成</li>
                          <li>獲得ジュエルは1曲あたり{EXPEC_JUWEL}個</li>
                          <li>獲得したジュエルは親密度に使わず、計算に影響しない</li>
                          <li>370GPはコンテニューなし(余る10GP→150マニーに変換)</li>
                          <li>ログインボーナス、ミッション等は計算外</li>
                        </ul>
                      </div>
                    </CSSTransition>
                  </div>
                </div>


                <hr />

                {/* アイテム数テーブル */}
                <div className="row pt-2">
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
                          <td>献上</td>
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

                {/* 使用後の親密度ハート */}
                <div className="row mt-2 pl-1">
                  <div className="col-2 pt-2 heart-with-item">
                    {/* 使用後ハート */}
                    <div className="vis-se">
                      <Heart mode={SE} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-sp">
                      <Heart mode={SP} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-tb">
                      <Heart mode={TB} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-pc">
                      <Heart mode={PC} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                  </div>
                  <div className="col-2 pos-rel mt-4 text-right mw-200">
                    <p>現在のEXP: <span className="bold">{props.exp.now}</span></p>
                    <p>アイテムのEXP: <span className="bold">{props.itemexp}</span></p>
                    <p>合計EXP: <span className="bold">{props.exp.now + props.itemexp}</span></p>
                    <p>目標レベルのEXP: <span className="bold">{props.exp.goal}</span></p>
                    <p>到達度: <span className="bold">{ Math.round( ((props.exp.now + props.itemexp) / props.exp.goal)*10000)/100}%</span></p>
                  </div>
                </div>

                {/* 使用後の親密度テーブル */}
                <div className="row table-progbar">
                  <div className="vis-se">
                    <ProgbarTable mode={SE} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-sp">
                    <ProgbarTable mode={SP} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-tb">
                    <ProgbarTable mode={TB} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-pc">
                    <ProgbarTable mode={PC} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                </div>



                <div className="message_box mx-auto mt-5 ">
                  <Messages messages={props.mes} />
                </div>

              </div>
            </div>
          </CSSTransition>
        </div>




      </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}
  return errors
}

const mapStateToProps = state => ({
  updated: state.input.updated,
  mes: state.input.mes,
  lv: state.input.lv,
  exp: state.input.exp,
  item: state.input.item,
  money: state.input.money,
  juwel: state.input.juwel,
  juweltype: state.input.juweltype,
  changed: state.input.changed,
  itemflag: state.input.itemflag,
  itemexp: getItemExp(state.input)
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

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updated_flag: false,
    }
  }
  updatedHandleClick = () => {
    this.setState( {updated_flag: !this.state.updated_flag} )
  }

  render(){
    return(
      <div className="about-content">
        <h2>このアプリについて</h2>
        <div className="mx-auto ">
          <div className="text-right">
            <button className="btn-toggle mt-2" onClick={ this.updatedHandleClick }>更新履歴{ this.state.updated_flag ? "を閉じる" : "" }</button>
          </div>
          <CSSTransition in={this.state.updated_flag} classNames="door" timeout={1000}>
            <div className="door mx-auto">
              <div className="message_box updated">
                <Messages messages={this.props.updated} />
              </div>
            </div>
          </CSSTransition>
        </div>
        <ul>
          <li>オンゲキ非公式の親密度シミュレータです。</li>
          <li>計算式は<a href="https://ongeki.gamerch.com/%E8%A6%AA%E5%AF%86%E5%BA%A6" rel="noopener noreferrer" target="_blank">wiki</a>の情報を元に作成しましたが、誤差があったらごめんなさい。</li>
          <li>必ずしも実機と同じ数値になる保証はありません、マニーラン等は自己責任でお願いします。</li>
          <li>あなたのオンゲキライフがより良い物となりますように。</li>
        </ul>
        <ul>
          <li>作者はプログラミング初心者で、Reactの勉強も兼ねて本アプリを制作しました。</li>
          <li>バグ報告や感想・要望など頂けたら励みになります。</li>
          <li>Twitter</li>
          <li>YouTube</li>
        </ul>
        <div className="mx-auto mt-2">
          <MailForm />
        </div>
      </div>
    )
  }
}

class MailForm extends Component {
  constructor(props) {
  super(props)
  this.state = {value: ""}
  this.handleChange = this.handleChange.bind(this)
  this.sendEmail = this.sendEmail.bind(this)
  }

  handleChange(event) {
  this.setState({value: event.target.value});
  }

  sendEmail = (event) => {
    if(window.confirm('送信してもよろしいですか？')){
      fetch('https://s3en248yra.execute-api.ap-northeast-1.amazonaws.com/slack/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {"subject":"SIMGEKI 親密度", "body": this.state.value} )
      })
      }
    }

  render(){
    return(
      <React.Fragment>
        <form className="mailform" onSubmit={ this.sendEmail }>
          <textarea placeholder="管理人にメッセージを送る&#13;&#10;返信をご希望の方はTwitterへどうぞ" value={this.state.value} onChange={this.handleChange}></textarea>
          <input type="submit" value="送信する" className="btn-submit"></input>
        </form>
      </React.Fragment>
    )
  }
}

class InputMoney extends Component {
  render(){
  return(
    <div className="input-field input-money">
      <input
        type="tel"
        autoComplete="off"
        value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,10000) } }>+10k</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,100000)} }>+100k</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,1000000)} }>+1m</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-10000)} }>-10k</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-100000)} }>-100k</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-1000000)} }>-1m</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,0)} } className="btn-reset">リセット</button>
      </div>
    </div>
  )}
}

class InputLv extends Component {
  render(){
  return(
    <div className="input-field">
      <label>現在レベル→</label>
      <input
        type="tel"
        autoComplete="off"
        maxLength="3"
        size="3"
        value={this.props.value}
        onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 1)} }>+1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 10)} }>+10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 100)} }>+100</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -1)} }>-1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -10)} }>-10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -100)} }>-100</button><br />
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 0)} } className="btn-reset" >リセット</button>
      </div>
    </div>
  )}
}

class InputLvGoal extends Component {
  render(){
  return(
    <div className="input-field">
      <label>目標レベル→</label>
      <input
        type="tel"
        autoComplete="off"
        maxLength="3"
        size="3"
        value={this.props.value}
        onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, -100)} }>-100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 100)} }>+100</button><br />
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 0)} } className="btn-reset" >リセット</button>
      </div>
    </div>
  )}
}

class InputItem extends Component {
  render(){
    const labeled = type => {
      switch(type){
        case BUTTON_ITEM_S: return "（小）"
        case BUTTON_ITEM_M: return "（中）"
        case BUTTON_ITEM_L: return "（大）"
        case BUTTON_JUWEL_END: return "3章 "
        case BUTTON_JUWEL_ALL: return "1/2章 "
        default: return "（？）→"
      }
    }
    const label = labeled( this.props.type)

    const isItem = type =>{
      switch(type){
        case BUTTON_ITEM_S:
        case BUTTON_ITEM_M:
        case BUTTON_ITEM_L:
          return true
        case BUTTON_JUWEL_END:
        case BUTTON_JUWEL_ALL:
        default:
          return false
      }
    }
  return(
    <div className="input-field">
      <label>{label}</label>
      <input
        type="tel"
        autoComplete="off"
        maxLength="4"
        size="4"
        value={this.props.value}
        onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      {isItem(this.props.type) &&
       <InputItemButtons buttonChange={this.props.buttonChange} type={this.props.type} />
       }
      {!isItem(this.props.type) &&
       <InputJuwelButtons buttonChange={this.props.buttonChange} type={this.props.type} />
       }
    </div>
  )}
}

const InputItemButtons = props => {
  return(
    <React.Fragment>
      <div>
      <button onClick={ ()=> {props.buttonChange(props.type,1)} }>+1</button>
      <button onClick={ ()=> {props.buttonChange(props.type,10)} }>+10</button>
    </div>
    <div>
      <button onClick={ ()=> {props.buttonChange(props.type,-1)} }>-1</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-10)} }>-10</button><br />
      <button onClick={ ()=> {props.buttonChange(props.type,0)} } className="btn-reset">リセット</button>
    </div>
  </React.Fragment>
  )
}
const InputJuwelButtons = props => {
  return(
    <React.Fragment>
      <div>
      <button onClick={ ()=> {props.buttonChange(props.type,10)} }>+10</button>
      <button onClick={ ()=> {props.buttonChange(props.type,100)} }>+100</button>
      <button onClick={ ()=> {props.buttonChange(props.type,1000)} }>+1000</button>
    </div>
    <div>
      <button onClick={ ()=> {props.buttonChange(props.type,-10)} }>-10</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-100)} }>-100</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-1000)} }>-1000</button><br />
      <button onClick={ ()=> {props.buttonChange(props.type,0)} } className="btn-reset">リセット</button>
    </div>
  </React.Fragment>
  )
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
  let max_size = 0
  let option_top = 0
  switch(props.mode){
    case TB:
    case PC:
      max_size = 184
      option_top = 36
      break
    case SE:
    case SP:
    default:
      max_size = 120
      option_top = 20
      break
  }
  const lv = props.lv >= 800 ? 800 : props.lv
  const par = lv === 800 ? 100 : props.par
  const barheight = par * max_size/100
  const bartop = max_size + option_top - barheight
  const barstyle = { height: barheight, top: bartop}
  const backheight = max_size - barheight
  const backtop = bartop - backheight
  const backstyle = { height: backheight, top: backtop}

  return(
    <div className="heart-block">
      <div className="heart">
        <span className="heart-label">{props.label}</span>
        <span className="heart-lv">{ lv }</span>
        <img src={HeartImage} className="heart-img" alt="親密度ハート"/>

        <div className="">
          <div className="heart-bar" style={ barstyle }></div>
          <div className="heart-back" style={ backstyle }></div>
        </div>
      </div>
      <input type="range" min="0" max="800" step="1" value="600" />
    </div>
  )
}

const ChangeValue = props => {
  const classname = "changed-value"
  const blue = { color: "rgb(40,40,240)"}
  const red = { color: "rgb(240,40,40)"}

  return(
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
  );
}

const ExampleTable = props => {
  return(
    <div className="table_example">
      <table>
        <thead>
          <tr className=""><td colSpan="4">
            Lv.{props.lv}からLv.{props.goal}までの目安
          </td></tr>
        </thead>
        <tbody>
          <tr>
            <th className="w-150 text-center">プレゼント (大)</th>
            <td className="w-50">{ Math.ceil(props.nesexp / EXP_ITEM_L) }個</td>
            <td className="w-70 text-center">＝</td>
            <td className="text-left">{ Math.ceil(props.nesexp / EXP_ITEM_L) * 20000 }マニー</td>
          </tr>

          <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="マニーラン (370GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_A} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0} />

          <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="マニーラン (360GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_B} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0}/>

            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="オンゲキ9曲 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *9} onejuwel={EXPEC_JUWEL *9}/>

            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="オンゲキ9曲 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *9} onejuwel={EXPEC_JUWEL *9}/>

            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="オンゲキ3曲3倍 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *3} onejuwel={EXPEC_JUWEL *3 *3 }/>

            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="オンゲキ3曲3倍 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *3} onejuwel={EXPEC_JUWEL *3 *3 }/>
        </tbody>
      </table>
    </div>
  );
}

const ExampleTableRecord = props => {
  const nes_count = Math.ceil(props.nesexp / props.oneexp)
  const cost = props.cost ? props.cost : 0
  const realtime = props.onetime ? props.onetime : 0
  const trstyle = props.flag ? {} : {padding: 0, borderBottom: "none"}
  return(
    <tr>
        <th className="w-150 text-center"  style={trstyle}>
          <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
              <div className="hidden-table">
              {props.label}
            </div>
          </CSSTransition>
        </th>

        <td className="w-50" style={trstyle}>
          <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
              <div className="hidden-table">
          { nes_count }回
        </div>
      </CSSTransition>
    </td>

        <td className="w-70" style={trstyle}>
          <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
              <div className="hidden-table">
          { nes_count * cost }円
        </div>
      </CSSTransition>
    </td>

        <td className="w-120" style={trstyle}>
          <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
              <div className="hidden-table">
          { convertTime(nes_count * realtime) }
          <br />ジュエル：{ Math.floor(nes_count * props.onejuwel) }
          </div>
        </CSSTransition>
      </td>
    </tr>
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
    <tr>
      <th className="w-130">{item_name}</th>
      <td className="w-20 text-right">{item_exp}</td>
      <td className="w-100 text-right">
        <input className="table_input"
          type="tel"
          autoComplete="off"
          value={props.stock}
          onChange={ (eve) => { props.inputValue(eve.target.value)} } />
      </td>
      <td className="w-40 text-right">{ Math.floor(item_exp * props.stock) }</td>
      <td className="w-15 text-center">
        <input type="checkbox" name="itemcheck" checked={props.flag}
           onChange={() => props.itemFlag(props.item)}/>
     </td>
    </tr>
  );
}

const ProgbarTable = props => {
  return(
    <table>
      <ProgbarTableHead />
      <tbody>
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={100} expg={3300} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={200} expg={7260} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={300} expg={11880} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={400} expg={17160} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={500} expg={23100} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={600} expg={29700} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={700} expg={42240} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={800} expg={59400} />
        <ProgbarTableSamplebar />
      </tbody>
    </table>
  );
}
const ProgbarRecord = props => {
  let table_width = 0
  switch(props.mode){
    case SE:
      table_width = 308; break
    case TB:
    case PC:
      table_width = 474; break
    case SP:
    default:
      table_width = 360; break
  }

  const parse = Math.floor((props.exp / props.expg )*100)
  const parse_i = Math.floor((props.itemexp / props.expg )*100)
  let parsebar = 0
  let parsebar_i = 0

  if(parse >= 100){
    parsebar = table_width
  }else if(parse + parse_i >= 100){
    parsebar = parse * table_width / 100
    parsebar_i = (100 - parse) / 100 * table_width
  }else{
    parsebar = parse * table_width / 100
    parsebar_i = parse_i * table_width / 100
  }

  const barstyle = { width: parsebar }
  const barstyle_i = { width: parsebar_i, left: parsebar}

  return(
    <tr>
      <th className="column-lv">
        <span className="goal-lv">{props.mode}-{props.lv}</span>
        <div className="progbar progbar-lv" style={barstyle}></div>
        <div className="progbar progbar-item" style={barstyle_i}></div>
      </th>
      <td className="column-exp">{props.expg}</td>
      <td className="column-exp">{Math.round((props.expg - props.exp - props.itemexp) * 100) / 100 }</td>
      <td className="column-exp">{ parse + parse_i } %</td>
    </tr>
  )
}
const ProgbarTableHead = () => {
  return(
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
  )
}
const ProgbarTableSamplebar = () => {
  return(
    <tr>
      <td className="text-center" colSpan="2">
        <span className="graph-text color-red">現在EXP</span>
        <div className="progbar progbar-lv" ></div>
        <div className="progbar progbar-item" ></div>
      </td>
      <td className="text-center" colSpan="2">
        <span className="graph-text color-yellow">アイテムEXP</span>
      </td>
    </tr>
  )
}

//計算系メソッド
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
