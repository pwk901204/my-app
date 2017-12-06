import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import wxShare from 'common/wxShare';
// containers
const MiniNav = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/MiniNav/index').default);
  });
};

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

const WXLogin = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/WXLogin').default);
  });
};

const NotFoundPage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/NotFoundPage').default);
  });
};

//双鹤杯
const DoubleCrane = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/DoubleCrane').default);
  });
};
const Votes = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Votes').default);
  });
};
const VotesDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/VotesDetail').default);
  });
};
const VotesRank = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/VotesRank').default);
  });
};
const Partner = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/Partner').default);
  });
};
const SuZuFei = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('containers/SuZuFei').default);
  });
};

const requireAuth = (
  { title = '麦迪森在线', needLogin = true, needShare = true } = {}
) => {
  //微信分享
  return () => {
    document.title = title;
    // if (needLogin) {
    //   setTimeout(() => {
    //     if (!localStorage['reduxPersist:userInfo']) {
    //       global.customizeHistory.push('/Login');
    //     }
    //   }, 1000);
    // }
    needShare &&
      setTimeout(() => {
        wxShare();
      });
  };
};

class Routers extends Component {
  render() {
    return (
      <Router history={global.customizeHistory} key={Math.random()}>
        <Route path="/" getComponent={TabBar} onEnter={requireAuth()} />
        <Route path="/WXLogin" getComponent={WXLogin} />
        <Route
          path="/HomePage(/:index)"
          getComponent={TabBar}
          onEnter={requireAuth()}
        />
        <Route
          path="/Login"
          getComponent={Login}
          onEnter={requireAuth({ title: '登录' })}
        />
        <Route
          path="/FindPassWord"
          getComponent={FindPassWord}
          onEnter={requireAuth({ title: '找回密码' })}
        />
        <Route
          path="/Register"
          getComponent={Register}
          onEnter={requireAuth({ title: '注册' })}
        />
        <Route
          path="/AddDoctorInfo"
          getComponent={AddDoctorInfo}
          onEnter={requireAuth({ title: '填写资料' })}
        />
        <Route
          path="/AddStudentInfo"
          getComponent={AddStudentInfo}
          onEnter={requireAuth({ title: '填写资料' })}
        />
        <Route
          path="/AddVisitorInfo"
          getComponent={AddVisitorInfo}
          onEnter={requireAuth({ title: '填写资料' })}
        />

        <Route getComponent={MiniNav}>
          <Route
            path="/VideoCollege"
            getComponent={VideoCollege}
            onEnter={requireAuth({ title: '视频学院' })}
          />
          <Route
            path="/StreamList"
            getComponent={StreamList}
            onEnter={requireAuth({ title: '热门直播' })}
          />
          <Route
            path="/RecordList"
            getComponent={RecordList}
            onEnter={requireAuth({ title: '精彩录播' })}
          />
          <Route
            path="/SeriesList"
            getComponent={SeriesList}
            onEnter={requireAuth({ title: '系列课程' })}
          />
          <Route
            path="/StreamDetail/:id"
            getComponent={StreamDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />

          <Route
            path="/RecordDetail/:id"
            getComponent={RecordDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/SeriesDetail/:id"
            getComponent={SeriesDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/Meet"
            getComponent={Meet}
            onEnter={requireAuth({ title: '医学会议' })}
          />
          <Route
            path="/MeetOffLineList"
            getComponent={MeetOffLineList}
            onEnter={requireAuth({ title: '线下会议' })}
          />
          <Route
            path="/MeetStreamList"
            getComponent={MeetStreamList}
            onEnter={requireAuth({ title: '直播会议' })}
          />
          <Route
            path="/MeetRecordList"
            getComponent={MeetRecordList}
            onEnter={requireAuth({ title: '录播会议' })}
          />
          <Route
            path="/MeetOffLineDetail/:id"
            getComponent={MeetOffLineDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/MeetOffLineEnroll/:id"
            getComponent={MeetOffLineEnroll}
            onEnter={requireAuth({ title: '详情' })}
          />
          <Route
            path="/MeetStreamDetail/:id/:stream_id"
            getComponent={MeetStreamDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/MeetRecordDetail/:id"
            getComponent={MeetRecordDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/ComingSoonPage"
            getComponent={ComingSoonPage}
            onEnter={requireAuth({ title: '敬请期待' })}
          />
          <Route
            path="/PayPage"
            getComponent={PayPage}
            onEnter={requireAuth({ title: '支付页面', needShare: false })}
          />
          <Route
            path="/TestList"
            getComponent={TestList}
            onEnter={requireAuth({ title: '系列试题' })}
          />
          <Route
            path="/TestDetail/:id"
            getComponent={TestDetail}
            onEnter={requireAuth({ title: '详情', needShare: false })}
          />
          <Route
            path="/TestRanking/:id"
            getComponent={TestRanking}
            onEnter={requireAuth({ title: '答题排行榜' })}
          />
          <Route
            path="/TestQuestionDetail/:id"
            getComponent={TestQuestionDetail}
            onEnter={requireAuth({ title: '详情' })}
          />
          <Route
            path="/MyStreamList"
            getComponent={MyStreamList}
            onEnter={requireAuth({ title: '我的直播' })}
          />
          <Route
            path="/MyRecordList"
            getComponent={MyRecordList}
            onEnter={requireAuth({ title: '我的录播' })}
          />
          <Route
            path="/MySeriesList"
            getComponent={MySeriesList}
            onEnter={requireAuth({ title: '我的系列课程' })}
          />
          <Route
            path="/MyMeetList"
            getComponent={MyMeetList}
            onEnter={requireAuth({ title: '我的会议' })}
          />
          <Route
            path="/ModifyInfo"
            getComponent={ModifyInfo}
            onEnter={requireAuth({ title: '修改资料' })}
          />
          <Route
            path="/Introduction"
            getComponent={Introduction}
            onEnter={requireAuth({ title: '擅长与简介' })}
          />
          <Route
            path="/Setting"
            getComponent={Setting}
            onEnter={requireAuth({ title: '设置' })}
          />
          <Route
            path="/Accounts"
            getComponent={Accounts}
            onEnter={requireAuth({ title: '设置' })}
          />
          <Route
            path="/BindPhone"
            getComponent={BindPhone}
            onEnter={requireAuth({ title: '绑定手机号' })}
          />
          <Route
            path="/ChangePassword"
            getComponent={ChangePassword}
            onEnter={requireAuth({ title: '更改密码' })}
          />
          <Route
            path="/AboutMds"
            getComponent={AboutMds}
            onEnter={requireAuth({ title: '关于我们' })}
          />
          <Route
            path="/Pwk"
            getComponent={Pwk}
            onEnter={requireAuth({ title: '关于我们' })}
          />
          <Route
            path="/DoubleCrane"
            getComponent={DoubleCrane}
            onEnter={requireAuth({ title: '华润双鹤杯' })}
          />
        </Route>
        <Route
          path="/Votes"
          getComponent={Votes}
          onEnter={requireAuth({ title: '投票拼人气' })}
        />
        <Route
          path="/Votes/:id"
          getComponent={VotesDetail}
          onEnter={requireAuth({ title: '投票详情' })}
        />
        <Route
          path="/VotesRank"
          getComponent={VotesRank}
          onEnter={requireAuth({ title: '投票排行榜' })}
        />
        <Route
          path="/Partner"
          getComponent={Partner}
          onEnter={requireAuth({ title: '选择结对医师' })}
        />
        <Route
          path="/SuZuFei"
          getComponent={SuZuFei}
          onEnter={requireAuth({ title: '苏祖斐学院' })}
        />

        <Route path="*" getComponent={NotFoundPage} />
      </Router>
    );
  }
}
export default Routers;
