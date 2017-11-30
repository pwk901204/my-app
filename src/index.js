import React from 'react';
import ReactDOM from 'react-dom';
import 'react-photoswipe/dist/photoswipe.css';

import './index.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import Routers from './routers/router';
import reducers from './reduxs/index';
import {persistStore, autoRehydrate} from 'redux-persist';
import "./common/global.js";
import VConsole from "vconsole";


const middleWares = [thunk];

let autoRehydrateLog = false;

new VConsole();

if (process.env.NODE_ENV === "development") {
	const logger = createLogger();
	middleWares.push(logger)
	autoRehydrateLog = true;
}

const store = createStore(
	reducers,
	{},
	compose(
	    applyMiddleware(...middleWares),
	    autoRehydrate({
	    	log:autoRehydrateLog
		})
	)
);

persistStore(store, {
	whitelist: ['userInfo']
}, ()=>{
	ReactDOM.render((
		<Provider store={store}>
			<Routers />
		</Provider>
	)
	, document.getElementById('root')
	);
})


if (process.env.NODE_ENV === "development")  registerServiceWorker();





















