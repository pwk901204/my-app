import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import './index.scss';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import moment from 'moment';
moment.lang('zh-cn');
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Routers from './routers/router';

const middleWares = [thunk]
if (process.env.NODE_ENV == "development") {
	const logger = createLogger();
	middleWares.push(logger)
}

const store = createStore(reducers, {}, applyMiddleware(...middleWares));


ReactDOM.render(
	(
		<Provider store={store}>
			<Routers />
		</Provider>
	)
	, document.getElementById('root')
	);
registerServiceWorker();
