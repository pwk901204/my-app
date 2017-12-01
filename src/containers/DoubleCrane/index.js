import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.css';
import { Link } from 'react-router';
import {
  WhiteSpace,
  Tabs,
  List,
  Toast,
  Modal,
  Button,
  InputItem,
  ActivityIndicator
} from 'antd-mobile';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll/build/iscroll-probe.js';
import EnterBtn from 'components/EnterBtn';
import enter from 'images/enter2.png';
const TabPane = Tabs.TabPane;
const Item = List.Item;

class DoubleCrane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      topic_status: '',
      super_watchers: [],
      common_watchers: [],
      judge_users: [],
      modal: false,
      inputValue: '',
      loading: false
    };
    this.onLinkToSubject = this.onLinkToSubject.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
  }
  onChangeInput(val) {
    this.setState({
      inputValue: val + ''
    });
  }
  onModalSubmit() {
    let data = {
      token: this.props.userInfo.token
    };
    if (this.state.inputValue.length < 4) {
      data.display = 0;
    } else {
      data.code = this.state.inputValue;
      this.setState({ loading: true });
    }
    window
      .HOCFetch({ needToken: true })(global.url.inviteCodeSubmit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'error') {
          this.setState({ loading: false });
          Toast.info(data.msg, 1);
        } else {
          this.setState({ loading: false, modal: false });
        }
      });
  }
  getDetail() {
    if (!this.props.userInfo.token) return;
    window
      .HOCFetch({ needToken: false })(
        global.url.topics +
          '/97?course_id=37' +
          '&token=' +
          this.props.userInfo.token
      )
      .then(response => response.json())
      .then(data => {
        if (data.topic) {
          this.setState({
            subjects: data.topic.children,
            topic_status: data.topic.topic_status
          });
        }
      });
  }
  getWatcher() {
    if (!this.props.userInfo.token) return;
    window
      .HOCFetch({ needToken: false })(
        global.url.topics +
          '/' +
          '97' +
          '/watchers' +
          '/?token=' +
          this.props.userInfo.token
      )
      .then(response => response.json())
      .then(data => {
        if (data.super_watchers.length) {
          //document.title=data.course.topic;
          this.setState({
            super_watchers: data.super_watchers,
            common_watchers: data.common_watchers,
            judge_users: data.judge_users
          });
        } else {
          Toast.info('网络错误');
        }
      });
  }
  getModalstatus() {
    window
      .HOCFetch({ needToken: true })(
        global.url.showInviteModal + '/?token=' + this.props.userInfo.token
      )
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          //document.title=data.course.topic;
          this.setState({
            modal: data.display
          });
        } else if (data.status === 'fail') {
          Toast.info(data.message, 1);
        }
      });
  }
  onLinkToSubject(index) {
    switch (this.state.topic_status) {
      case 'starting':
        let data = {
          flag: 'game',
          index: index
        }
        global.customizeHistory.push({
          pathname: '/TestQuestionDetail/' + '97',
          state: data
        });
        break;
      case 'not_start':
        Toast.info('试题暂未开始...', 1);
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.getModalstatus();
    this.getDetail();
    this.getWatcher();
  }
  render() {
    return (
      <div className={style.DoubleCrane}>
        <EnterBtn src={enter} title="投票" linkTo="/Votes" color="#ff6666" />
        <img
          src="https://ss3.bdstatic.com/lPoZeXSm1A5BphGlnYG/skin/114.jpg?2"
          alt=""
          className="banner"
        />
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="大赛信息">
            <div className={style.warp}>
              <ReactIScroll
                iScroll={iScroll}
                options={{ ...global.iscrollOptions }}
              >
                <div>
                  <WhiteSpace size="sm" />
                  <div className={style.sessionbox}>
                    <div className={style.session}>
                      <h2>比赛介绍</h2>
                      <p>
                        各位心内科，心外科，急诊科，重症医学科，老年科，麻醉科以及心电相关临床一线同道：为推动临床一线的医师学习心电图及电生理知识，提高诊断与处理各种常见及疑难临床问题的综合能力。
                        “第一届“华润双鹤杯”网络心电图及电生理知识巅峰赛”将于12月闪亮登场！参加这次大赛，您不但可以通过努力公平地与国内最顶尖的心电及电生理专家教授PK，而且还有机会得大奖。机会难得，可不要错过哦。注意，大家都是在同一起跑线上，谁怕谁？
                      </p>
                    </div>
                    <div className={style.session}>
                      <h2>比赛规则</h2>
                      <p>
                        ①此次比赛将通过国际心血管病学会(ISCVD)和麦迪森公众号发放试题；
                      </p>
                      <p>
                        ②共5道试题，为解析题；解析可以在规定的时间内修改，答题时间为1周；
                      </p>
                      <p>
                        ③通过麦迪森系统答题系统答题，所以参赛人员请务必提前注册；
                      </p>
                      <p>
                        ④试题公布后，参赛人员可以翻书，查阅资料、文献等；并鼓励参赛人员与心电专业医生结对答题，
                        也可请教国内国际心电和电生理专家；
                      </p>
                      <p>
                        ⑤得奖的解析将公示，以求透明和公平。每个参赛人员的解析都会经过二级评审（评委，裁判）。当有不分上下的解析，
                        将根据最后提交时间评判。
                      </p>
                    </div>
                    <div className={style.session}>
                      <h2>奖项设置</h2>
                      <p>回答正确并附有精彩解析的将获重奖:</p>
                      <p>一等奖一名，奖金1万元（人民币）；</p>
                      <p>二等奖两名，奖金各5千元；</p>
                      <p>三等奖三名，奖金各3千元。</p>
                      <p>
                        同时比赛还设20个鼓励奖（500元），主要奖励副主任医师以下参赛人员。不参赛者，也会有若干名抽奖机会奥。礼品<span
                          role="img"
                          aria-label="1"
                        >
                          🎁🎁
                        </span>{' '}
                        多多，就等你拿哈！<span role="img" aria-label="1">
                          🎉🎉🎉
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </ReactIScroll>
            </div>
          </TabPane>
          <TabPane key="2" tab="试题列表">
            <div className={style.warp}>
              <ReactIScroll
                iScroll={iScroll}
                options={{ ...global.iscrollOptions }}
              >
                <div>
                  <WhiteSpace size="sm" />
                  {this.state.subjects.map((item, index) => {
                    return (
                      <Link key={index} onClick={()=>{
                        this.onLinkToSubject(item.topic_index);
                      }}>
                        <List className="my-list">
                          <Item extra={item.topic_answers_count + '人已作答'}>
                            第{item.topic_index}题
                          </Item>
                          <Item arrow="horizontal">{item.content}</Item>
                        </List>
                        <WhiteSpace size="sm" />
                      </Link>
                    );
                  })}
                </div>
              </ReactIScroll>
            </div>
          </TabPane>
          <TabPane key="3" tab="评委介绍">
            <div className={style.warp}>
              <ReactIScroll
                iScroll={iScroll}
                options={{ ...global.iscrollOptions }}
              >
                <div>
                  <WhiteSpace size="sm" />
                  <h4>
                    <i />特邀裁判长
                  </h4>
                  <ul className={style.rater_item_1}>
                    {this.state.super_watchers.map((item, index) => {
                      return (
                        <li key={index}>
                          <img
                            src={item.avatar_data.big}
                            alt={item.doctor_name}
                          />
                          <p>{item.doctor_name}</p>
                          <span>{item.introduction}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <h4>
                    <i />特邀裁判
                  </h4>
                  <ul className={style.rater_item_2}>
                    {this.state.common_watchers.map((item, index) => {
                      return (
                        <li key={index}>
                          <img
                            src={item.avatar_data.big}
                            alt={item.doctor_name}
                          />
                          <p>{item.doctor_name}</p>
                          <div style={{ '-webkit-box-orient': 'vertical' }}>
                            {item.hospital_name}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <h4>
                    <i />特邀评委
                  </h4>
                  <ul className={style.rater_item_3}>
                    {this.state.judge_users.map((item, index) => {
                      return (
                        <li key={index}>
                          <p>{item.doctor_name}</p>
                          <span>{item.hospital_name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ReactIScroll>
            </div>
          </TabPane>
        </Tabs>
        {/*modal*/}
        <Modal
          title="邀请码"
          transparent
          maskClosable={false}
          visible={this.state.modal}
          footer={[
            {
              text: '下次再说',
              style: 'default',
              onPress: () => {
                this.setState({ modal: false });
              }
            },
            {
              text: this.state.inputValue.length === 4 ? '提交' : '不再提示',
              onPress: this.onModalSubmit
            }
          ]}
        >
          <div>
            <InputItem
              className={style.invite_code}
              value={this.state.inputValue}
              type="number"
              placeholder="请输入邀请码"
              clear
              maxLength={4}
              onChange={this.onChangeInput}
            />
          </div>
        </Modal>
        <ActivityIndicator toast animating={this.state.loading} />
      </div>
    );
  }
}

export default connect(state => {
  return {
    userInfo: state.userInfo
  };
})(DoubleCrane);
