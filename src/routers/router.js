import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
// containers
const Index = (location, cb) => {require.ensure([], require => {cb(null, require('../containers/HomePage/index').default)})};

class Routers extends Component{
	render(){
		return (
            <Router history={hashHistory} key={Math.random()}>
                <Route path="/" getComponent={Roots}>
                    <IndexRoute  getComponent={Index} />
                </Route>
            </Router>
		)
	}
}
export default Routers;
