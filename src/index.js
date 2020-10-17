import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import App from './Components/App';

const store = createStore(rootReducer, composeWithDevTools());

const app = <Provider store = {store}>
    <App />
</Provider>

ReactDOM.render(app, document.getElementById('root'));
