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
const RecordList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/RecordList/index').default);
  });
};

const SeriesList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/SeriesList/index').default);
  });
};

const StreamDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/StreamDetail/index').default);
  });
};
const RecordDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/RecordDetail/index').default);
  });
};
const SeriesDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/SeriesDetail/index').default);
  });
};

const Meet = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Meet/index').default);
  });
};

const MeetOffLineList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MeetOffLineList/index').default);
  });
};

const MeetStreamList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MeetStreamList/index').default);
  });
};

const MeetRecordList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MeetRecordList/index').default);
  });
};

const MeetOffLineDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/MeetOffLineDetail/index').default);
  });
};

const MeetOffLineEnroll = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/MeetOffLineEnroll/index').default);
  });
};

const MeetStreamDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/MeetStreamDetail/index').default);
  });
};

const MeetRecordDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/MeetRecordDetail/index').default);
  });
};

const ComingSoonPage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/ComingSoonPage/index').default);
  });
};
const PayPage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/PayPage/index').default);
  });
};
const TestList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/TestList/index').default);
  });
};

const TestDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/TestDetail/index').default);
  });
};

const TestRanking = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/TestRanking/index').default);
  });
};

const TestQuestionDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/TestQuestionDetail/index').default);
  });
};

const MyStreamList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MyStreamList/index').default);
  });
};

const MyRecordList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MyRecordList/index').default);
  });
};

const MySeriesList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MySeriesList/index').default);
  });
};

const MyMeetList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/List/MyMeetList/index').default);
  });
};

const ModifyInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/ModifyInfo').default);
  });
};

const Introduction = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Introduction').default);
  });
};
const Setting = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Setting').default);
  });
};
const Accounts = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Setting/Accounts').default);
  });
};

const BindPhone = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Setting/BindPhone').default);
  });
};

const ChangePassword = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Setting/ChangePassword').default);
  });
};

const AboutMds = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Setting/AboutMds').default);
  });
};

const Pwk = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Pwk').default);
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
        <Route
          path="/HomePage(/:index)"
          getComponent={TabBar}
          onEnter={requireAuth}
        />
        <Route path="/Login" getComponent={Login} />
        <Route path="/FindPassWord" getComponent={FindPassWord} />
        <Route path="/Register" getComponent={Register} />
        <Route path="/AddDoctorInfo" getComponent={AddDoctorInfo} />
        <Route path="/AddStudentInfo" getComponent={AddStudentInfo} />
        <Route path="/AddVisitorInfo" getComponent={AddVisitorInfo} />
        <Route
          path="/VideoCollege"
          getComponent={VideoCollege}
          onEnter={requireAuth}
        />
        <Route
          path="/StreamList"
          getComponent={StreamList}
          onEnter={requireAuth}
        />
        <Route
          path="/RecordList"
          getComponent={RecordList}
          onEnter={requireAuth}
        />
        <Route
          path="/SeriesList"
          getComponent={SeriesList}
          onEnter={requireAuth}
        />
        <Route
          path="/StreamDetail/:id"
          getComponent={StreamDetail}
          onEnter={requireAuth}
        />

        <Route
          path="/RecordDetail/:id"
          getComponent={RecordDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/SeriesDetail/:id"
          getComponent={SeriesDetail}
          onEnter={requireAuth}
        />
        <Route path="/Meet" getComponent={Meet} onEnter={requireAuth} />
        <Route
          path="/MeetOffLineList"
          getComponent={MeetOffLineList}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetStreamList"
          getComponent={MeetStreamList}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetRecordList"
          getComponent={MeetRecordList}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetOffLineDetail/:id"
          getComponent={MeetOffLineDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetOffLineEnroll/:id"
          getComponent={MeetOffLineEnroll}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetStreamDetail/:id/:stream_id"
          getComponent={MeetStreamDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/MeetRecordDetail/:id"
          getComponent={MeetRecordDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/ComingSoonPage"
          getComponent={ComingSoonPage}
          onEnter={requireAuth}
        />
        <Route path="/PayPage" getComponent={PayPage} onEnter={requireAuth} />
        <Route path="/TestList" getComponent={TestList} onEnter={requireAuth} />
        <Route
          path="/TestDetail/:id"
          getComponent={TestDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/TestRanking/:id"
          getComponent={TestRanking}
          onEnter={requireAuth}
        />
        <Route
          path="/TestQuestionDetail/:id"
          getComponent={TestQuestionDetail}
          onEnter={requireAuth}
        />
        <Route
          path="/MyStreamList"
          getComponent={MyStreamList}
          onEnter={requireAuth}
        />
        <Route
          path="/MyRecordList"
          getComponent={MyRecordList}
          onEnter={requireAuth}
        />
        <Route
          path="/MySeriesList"
          getComponent={MySeriesList}
          onEnter={requireAuth}
        />
        <Route
          path="/MyMeetList"
          getComponent={MyMeetList}
          onEnter={requireAuth}
        />
        <Route
          path="/ModifyInfo"
          getComponent={ModifyInfo}
          onEnter={requireAuth}
        />
        <Route
          path="/Introduction"
          getComponent={Introduction}
          onEnter={requireAuth}
        />
        <Route path="/Setting" getComponent={Setting} onEnter={requireAuth} />
        <Route path="/Accounts" getComponent={Accounts} onEnter={requireAuth} />
        <Route
          path="/BindPhone"
          getComponent={BindPhone}
          onEnter={requireAuth}
        />
        <Route
          path="/ChangePassword"
          getComponent={ChangePassword}
          onEnter={requireAuth}
        />
        <Route path="/AboutMds" getComponent={AboutMds} onEnter={requireAuth} />

        <Route path="/Pwk" getComponent={Pwk} />
      </Router>
    );
  }
}
export default Routers;
