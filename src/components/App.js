import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeartImage from '../image/onheart.png'
import './App.scss';

import { input, input_goal, input_item_s, input_item_m, input_item_l, input_money,
   button_change } from '../actions'

class App extends Component {

  render(){
    const props = this.props

    return (
      <div className="App">
        <div id="section1">
          <Heart lv={getExp2Lv( props.exp.now )}
                par={ getExp2Lvper( props.exp.now ) } />
        <div className="inputs">
          <div>
            <label>現在レベル→</label>
            <input type='text' className="input_lv" value={props.lv.now} onChange={ (eve) => { props.input(eve.target.value)} } />
            <div>
              <button onClick={ ()=> {props.button_change("lv",1)} }>+1</button>
              <button onClick={ ()=> {props.button_change("lv",10)} }>+10</button>
              <button onClick={ ()=> {props.button_change("lv",100)} }>+100</button>
            </div>
            <div>
              <button onClick={ ()=> {props.button_change("lv",-1)} }>-1</button>
              <button onClick={ ()=> {props.button_change("lv",-10)} }>-10</button>
              <button onClick={ ()=> {props.button_change("lv",-100)} }>-100</button>
              <button onClick={ ()=> {props.button_change("lv",0)} }>Clear</button>
            </div>
          </div>
          <div>
            <label>目標レベル→</label>
            <input type='text' className="input_lv" value={props.lv.goal} onChange={ (eve) => { props.input_goal(eve.target.value)} }/>
          </div>
          <div>
            <label>親密度上昇プレゼント（小）→</label>
            <input type='text' className="input_item" value={props.item.s} onChange={ (eve) => { props.input_item_s(eve.target.value)} } />
            <div>
              <button onClick={ ()=> {props.button_change("s",1)} }>+1</button>
              <button onClick={ ()=> {props.button_change("s",10)} }>+10</button>
              <button onClick={ ()=> {props.button_change("s",-10)} }>-10</button>
              <button onClick={ ()=> {props.button_change("s",0)} }>Clear</button>
            </div>
          </div>
          <div>
            <label>親密度上昇プレゼント（中）→</label>
            <input type='text' className="input_item" value={props.item.m} onChange={ (eve) => { props.input_item_m(eve.target.value)} } />
            <div>
              <button onClick={ ()=> {props.button_change("m",1)} }>+1</button>
              <button onClick={ ()=> {props.button_change("m",10)} }>+10</button>
              <button onClick={ ()=> {props.button_change("m",-10)} }>-10</button>
              <button onClick={ ()=> {props.button_change("m",0)} }>Clear</button>
            </div>
          </div>
          <div>
            <label>親密度上昇プレゼント（大）→</label>
            <input type='text' className="input_item" value={props.item.l} onChange={ (eve) => { props.input_item_l(eve.target.value)} } />
            <div>
              <button onClick={ ()=> {props.button_change("l",1)} }>+1</button>
              <button onClick={ ()=> {props.button_change("l",10)} }>+10</button>
              <button onClick={ ()=> {props.button_change("l",-10)} }>-10</button>
              <button onClick={ ()=> {props.button_change("l",0)} }>Clear</button>
            </div>
          </div>
          <div>
            <label>所持マニー→</label>
            <input type='text' className="input_money" value={props.money} onChange={ (eve) => { props.input_money(eve.target.value)} } />
            <div>
              <button onClick={ ()=> {props.button_change("money",100)} }>+100</button>
              <button onClick={ ()=> {props.button_change("money",10000)} }>+10,000</button>
              <button onClick={ ()=> {props.button_change("money",100000)} }>+100,000</button>
              <button onClick={ ()=> {props.button_change("money",5400)} }>+360 GP</button>
              <button onClick={ ()=> {props.button_change("money",5550)} }>+370 GP</button>
            </div>
            <div>
              <button onClick={ ()=> {props.button_change("money",-100)} }>-100</button>
              <button onClick={ ()=> {props.button_change("money",-10000)} }>-10,000</button>
              <button onClick={ ()=> {props.button_change("money",-100000)} }>-100,000</button>
              <button onClick={ ()=> {props.button_change("money",0)} }>Clear</button>
            </div>
          </div>
        </div>
        <Heart lv={getExp2Lv( props.exp.now + getItemExp(props.money, props.item))}
              par={ getExp2Lvper( props.exp.now + getItemExp(props.money, props.item)) } />
        <div className="lovelv">
          <h4>親密度</h4>
          <div className="lovelv_number">
            <h1>{ props.lv.now }</h1>
          </div>
          <h5>EXP　{ props.exp.now } </h5>
        </div>
      <i class="fas fa-heart"></i>
        <div className="lovelv">
          <h4>future</h4>
          <div className="lovelv_number">
            <h1>{ getExp2Lv( props.exp.now + getItemExp(props.money, props.item)) }</h1>
            <h6>({ getExp2Lvper( props.exp.now + getItemExp(props.money, props.item)) } %)</h6>
          </div>
          <h5>貢げるEXP　{ getItemExp(props.money, props.item) } </h5>
          <h5>全捧げしたEXP　{ props.exp.now + getItemExp(props.money, props.item) } </h5>
        </div>
      </div>

      <div className="table_lv">
        <table>
          <thead>
            <tr>
              <td>目標の親密度</td>
              <td>必要EXP</td>
              <td>残りEXP</td>
              <td>到達度</td>
            </tr>
          </thead>
          <tbody>
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={100} expg={3300} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={200} expg={7260} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={300} expg={11880} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={400} expg={17160} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={500} expg={23100} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={600} expg={29700} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={700} expg={42240} />
            <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item )} lv={800} expg={59400} />
          </tbody>
        </table>
      </div>

      <div className="table_money">
        <table>
          <thead>
            <tr>
              <td>アイテム</td>
              <td>EXP</td>
              <td>所持数</td>
              <td>獲得EXP</td>
            </tr>
          </thead>
          <tbody>
            <MoneyTableRecord item="マニー" exp={0.01} stock={props.money} />
            <MoneyTableRecord item="プレゼント（小）" exp={6} stock={props.item.s} />
            <MoneyTableRecord item="プレゼント（中）" exp={20} stock={props.item.m} />
            <MoneyTableRecord item="プレゼント（大）" exp={200} stock={props.item.l} />
          </tbody>
        </table>
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
    );
  }
}
const validate = values => {
  const errors = {}

  if( !values.lovep ) errors.lovep = "This is Err"
  return errors
}

const mapStateToProps = state => ({

  lv: state.input.lv,
  exp: state.input.exp,
  item: state.input.item,
  money: state.money.money
 })

const mapDispatchToProps = ({
  input,
  input_goal,
  input_item_s,
  input_item_m,
  input_item_l,
  input_money,
  button_change
})

function Heart(props) {
  const lv = props.lv >= 800 ? 800 : props.lv
  const par = lv === 800 ? 100 : props.par
  const barheight = par * 2.4
  const bartop = 270 - barheight
  const barstyle = { height: barheight, top: bartop}
  const backheight = 240 - barheight
  const backtop = bartop - backheight
  const backstyle = { height: backheight, top: backtop}

  return(
    <React.Fragment>
      <div className="heart">
        <span className="heart_lovep">親密度Lv.</span>
        <span className="heart_lv">{ lv }</span>
        <img src={HeartImage} className="heart_out"/>

        <div className="heart_bar" style={ barstyle }></div>
        <div className="heart_back" style={ backstyle }></div>
      </div>
    </React.Fragment>
  );
}

function LoveTableWithItem(props) {

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

function MoneyTableRecord(props) {
    return(
      <React.Fragment>
        <tr>
          <th className="column_name">{props.item}</th>
          <td className="column_exp">{props.exp}</td>
          <td className="column_stock">{props.stock }</td>
          <td className="column_exp">{ props.exp * props.stock }</td>
        </tr>
      </React.Fragment>
    );
}

function getItemExp(money, item){
  let exp = 0
  exp += Math.floor(money * 0.01)
  exp += item.s * 6
  exp += item.m * 20
  exp += item.l * 200
  return exp
}

function getExp2Lv(exp){
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

function getExp2Lvper(exp){
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
      console.log("i:" +i + " hi:" + hi + " next_exp:" + next_exp + " count:" + count)

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
