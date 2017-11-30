import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.css';
import { Icon } from 'antd-mobile';
import ReactIScroll from 'react-iscroll';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import iScroll from 'iscroll/build/iscroll-probe.js';
import votes_rank from 'images/votes_rank.png';
import rank1 from 'svg/rank1.svg';
import rank2 from 'svg/rank2.svg';
import rank3 from 'svg/rank3.svg';
import { Toast } from 'antd-mobile';

class VotesRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      endTime: ''
    };
  }
  componentDidMount() {
    window
      .HOCFetch({ needToken: false })(
        global.url.readVote +
          '/ranking' +
          '?token=' +
          this.props.userInfo.token +
          '&course_id=' +
          '37'
      )
      .then(response => response.json())
      .then(data => {
        if (data.vote_end_at) {
          this.setState({
            listData: data.vote_users,
            endTime: data.vote_end_at
          });
        } else {
          Toast.info('网络错误');
        }
      });
  }
  render() {
    let date = moment(this.state.endTime).toDate();
    let rank = [
      <Icon type={rank1} />,
      <Icon type={rank2} />,
      <Icon type={rank3} />
    ];
    return (
      <div className={style.votes_rank}>
        <ReactIScroll iScroll={iScroll} options={{ ...global.iscrollOptions }}>
          <div>
            <div className={style.time}>
              {this.state.endTime && (
                <Countdown
                  renderer={({
                    total,
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds,
                    completed
                  }) => {
                    if (completed) {
                      return <span>投票已截止</span>;
                    } else {
                      if (days > 0) {
                        return (
                          <span>
                            投票倒计时：{days}天{hours}小时{minutes}分钟
                          </span>
                        );
                      } else {
                        return (
                          <span>
                            投票倒计时：{hours}小时{minutes}分钟{seconds}秒
                          </span>
                        );
                      }
                    }
                  }}
                  date={date}
                />
              )}
            </div>
            <div className={style.rank_list}>
              <div className={style.rank_title}>
                <img src={votes_rank} alt="" />
                <p>实时排名</p>
              </div>
              <ul>
                <li className={style.head}>
                  <div className={style.first}>排名</div>
                  <div className={style.border + ' ' + style.middle}>
                    参赛选手
                  </div>
                  <div className={style.last} style={{ textAlign: 'center' }}>
                    票数
                  </div>
                </li>
                {this.state.listData.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={style.first}>
                        {index < 3 ? rank[index] : index + 1}
                      </div>
                      <div className={style.middle}>
                        <img
                          src={item.avator_data.middle}
                          alt={item.user_name}
                        />
                        <span>{item.user_name}</span>
                      </div>
                      <div className={style.last}>
                        <i>{item.votes_count}</i>
                        <span>票</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ReactIScroll>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      userInfo: state.userInfo
    };
  }
)(VotesRank);
