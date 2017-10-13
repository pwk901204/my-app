import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import FastClick from 'fastclick';
import Routers from './routers/router';
import reducers from './reducers/index';

const middleWares = [thunk];
console.log(process.env)

if (process.env.NODE_ENV === "development") {
	const logger = createLogger();
	middleWares.push(logger)
}
const store = createStore(reducers, {}, applyMiddleware(...middleWares));

window.addEventListener("load", ()=>{
	FastClick.attach(document.body);
})




ReactDOM.render((
		<Provider store={store}>
			<Routers />
		</Provider>
	)
	, document.getElementById('root')
	);
registerServiceWorker();





















