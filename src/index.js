import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import todoListReducer from './store/reducers/todoListReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store =>{
  return next =>{
    return action =>{
      console.log('[MiddleWare] action :  ',action);
      const result = next(action);
      console.log('[MiddleWare] nextState :  ',store.getState());
      return result;
    }
  }
}

const store = createStore(todoListReducer,composeEnhancers(applyMiddleware(logger))); 

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

