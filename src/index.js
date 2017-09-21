// import React from 'react';
// import ReactDOM from 'react-dom';
// // import {Provider} from 'react-redux';
// // import {createStore,applyMiddleware} from 'redux';
// // import './index.scss';
// // import thunk from 'redux-thunk';
// // import createLogger from 'redux-logger';
// // import moment from 'moment';
// // moment.lang('zh-cn');
// import registerServiceWorker from './registerServiceWorker';
// // import Routers from './routers/router';
// // import reducers from 'reducers/index';
// import HomePage from './containers/HomePage/index';

// //const middleWares = [thunk];
// // if (process.env.NODE_ENV == "development") {
// // 	const logger = createLogger();
// // 	middleWares.push(logger)
// // }

// //const store = createStore(reducers, {}, applyMiddleware(...middleWares));

// //dcoument.documentElement.style.fontSize = window.innerWidth * 100 / 750 + 'px';//新增
// //console.log(document.documentElement.clientWidth)

// ReactDOM.render(
// 	<HomePage />
// 	, document.getElementById('root')
// 	);
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
