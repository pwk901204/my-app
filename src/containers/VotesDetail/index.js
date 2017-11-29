import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.css';
import Countdown from 'react-countdown-now';
import moment from 'moment';
import { Toast, ActivityIndicator } from 'antd-mobile';
import QRCode from 'qrcode.react';

class VotesDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData: null,
      endTime: '',
      loading: false,
      modal: false,
      complete: false,
      QRCodeImg: ''
    };
    this.onVote = this.onVote.bind(this);
    this.getVoteDetail = this.getVoteDetail.bind(this);
    this.converQRCanvasToImage = this.converQRCanvasToImage.bind(this);
    //this.QRref = this.QRref.bind(this);
  }
  onVote(){
    if(this.state.complete) return;
    let url = global.url.writeVote;
    let data = {
      token: this.props.userInfo.token,
      vote_user_id: this.state.userData.id,
    };
    data = JSON.stringify(data);
    this.setState({ loading: true });
    window
      .HOCFetch({ needToken: true })(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: data
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          this.getVoteDetail();
          this.setState({ loading: false });
          Toast.info('您已成功为 ' + this.state.userData.id + '号 ' + this.state.userData.user_name + ' 投票！');
        } else {
          this.setState({ loading: false });
          Toast.info(data.msg);
        }
      });
  }
  getVoteDetail(){
    let url = global.url.readVote + '/' + this.props.params.id + '?course_id=' + '37';
    window
      .HOCFetch({ needToken: false })(url)
      .then(response => response.json())
      .then(data => {
        if (data.vote_end_at){
          this.setState({
            userData: data.vote_user,
            endTime: data.vote_end_at
          });
        } else {
          Toast.info('网络错误');
        }
      });
  }
  converQRCanvasToImage(canvas){
    this.setState({
      QRCodeImg: canvas.toDataURL("image/png")
    });
  }
  componentDidMount(){
    this.getVoteDetail();
    this.converQRCanvasToImage(this.instance._canvas);
  }
  render() {
    let date = moment(this.state.endTime).toDate();
    let userData = this.state.userData;
    return (
      <div className={style.vote_detail}>
        <div className={style.time}>
          {
            this.state.endTime &&
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
              onComplete={()=>{ this.setState({ complete: true }) }}
              date={date}
            />
          }
        </div>
        <div className={style.box}>
          <div className={style.head}>
            <img
              src={
                userData ? userData.avator_data.middle : ''
              }
              className={style.img}
              alt={userData ? userData.user_name : ''}
            />
            <div className={style.headBox}>
              <p>
                {
                  userData ? userData.user_name : ''
                }
                <small>{userData ? '（' + userData.title + '）' : ''}</small>
                <span>{userData ? userData.no + '号' : ''}</span>
              </p>
              <span className={style.des}>{userData ? userData.hospital_name + ' ' + userData.department_name : ''}</span>
            </div>
          </div>
          <div className={style.body}>
            <p>排名 {userData ? userData.sort : ''}</p>
            <i>{userData ? userData.votes_count : ''}</i>
            <span>已获得票数</span>
          </div>
        </div>
        <div className={style.bottom}>
          <span
            onClick={()=>{
              if(this.state.complete) return;
              this.setState({ modal: true })
            }}
            className={ this.state.complete ? style.share + ' ' + style.complete : style.share }>拉票</span>
          <span onClick={this.onVote} className={ this.state.complete ? style.throw + ' ' + style.complete : style.throw}>投票</span>
        </div>
        <div className={this.state.modal ? style._modal : style._modal + ' none'}>
          <h4>请点击右上角邀请好友投票哦~</h4>
          <div className={style._modal_img}>
            <p>或长按下方二维码保存，发送给好友，邀请好友扫码，给你投票吧！</p>
            <div className={style.QRCode}>
              <QRCode size={400} ref={(instance) => this.instance = instance} value={window.location.href} />
              <img src={this.state.QRCodeImg} alt="QRCode" />
            </div>
          </div>
        </div>
        <ActivityIndicator toast animating={this.state.loading} />
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
)(VotesDetail);
