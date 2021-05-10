import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import myReducer from './redux/reducers';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';

const myStore = createStore(myReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

