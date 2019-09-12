import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import todoListReducer from './store/reducers/todoListReducer'

const store = createStore(todoListReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

