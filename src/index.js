import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import FastClick from 'fastclick';
import Routers from './routers/router';
import reducers from './reducers/index';
import {persistStore, autoRehydrate} from 'redux-persist';

const middleWares = [thunk];


let autoRehydrateLog = false;
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

window.addEventListener("load", ()=>{
	FastClick.attach(document.body);
})

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


registerServiceWorker();





















