import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core'; //fontawesomeのコアファイル
import { fab } from '@fortawesome/free-brands-svg-icons'; //fontawesomeのbrandアイコンのインポート
import { fas } from '@fortawesome/free-solid-svg-icons'; //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons'; //fontawesomeのregularアイコンのインポート

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './index.css';
import reducer from './reducers'

import App from './components/App';
import * as serviceWorker from './serviceWorker';

library.add(fab, fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理？
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
   document.getElementById('root'));
serviceWorker.unregister();
