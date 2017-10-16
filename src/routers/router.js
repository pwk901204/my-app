import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// containers
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Login/index').default);
  });
};
const FindPassWord = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/FindPassWord/index').default);
  });
};
const Register = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Register/index').default);
  });
};
const AddDoctorInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/AddInfo/AddDoctorInfo/index').default);
  });
};
const AddStudentInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/AddInfo/AddStudentInfo/index').default);
  });
};
const AddVisitorInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/AddInfo/AddVisitorInfo/index').default);
  });
};
const TabBar = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/TabBar/index').default);
  });
};
const VideoCollege = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/VideoCollege/index').default);
  });
};
const StreamList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/StreamList/index').default);
  });
};


const requireAuth = () => {
	setTimeout(() => {
		if (!localStorage['reduxPersist:userInfo']) {
		 	hashHistory.push('/Login');
		}
	}, 1000);
};

class Routers extends Component {
  render() {
    return (
      <Router history={hashHistory} key={Math.random()}>
        <Route path="/" getComponent={TabBar} onEnter={requireAuth} />
        <Route path="/Login" getComponent={Login} />
        <Route path="/FindPassWord" getComponent={FindPassWord} />
        <Route path="/Register" getComponent={Register} />
        <Route path="/AddDoctorInfo" getComponent={AddDoctorInfo} />
        <Route path="/AddStudentInfo" getComponent={AddStudentInfo} />
        <Route path="/AddVisitorInfo" getComponent={AddVisitorInfo} />
        <Route path="/VideoCollege" getComponent={VideoCollege} onEnter={requireAuth}/>
        <Route path="/StreamList" getComponent={StreamList} onEnter={requireAuth}/>
      </Router>
    );
  }
}
export default Routers;
