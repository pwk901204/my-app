import React, { Component } from 'react';
import style from './index.css';
import Countdown from 'react-countdown-now';
import moment from 'moment';

export default class VotesDetail extends Component {
  render() {
    let date = moment().set({
      year: 2017,
      month: 10,
      date: 29,
      hour: 16,
      minute: 57,
      second: 0,
      millisecond: 0
    });
    date = date.toDate();
    return (
      <div className={style.vote_detail}>
        <div className={style.time}>
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
        </div>
        <div className={style.box}>
          <div className={style.head}>
            <div className={style.img} />
            <div className={style.headBox}>
              <p>
                刘晓梅<small>（主治医生）</small>
                <span>0001号</span>
              </p>
              <span className={style.des}>湖南湘雅医院 心内科</span>
            </div>
          </div>
          <div className={style.body}>
            <p>排名 12</p>
            <i>2361</i>
            <span>已获得票数</span>
          </div>
        </div>
        <div className={style.bottom}>
          <span className={style.share}>拉票</span>
          <span className={style.throw}>投票</span>
        </div>
        <div className={style._modal}>
          <h4>请点击右上角邀请好友投票哦~</h4>
          <div className={style._modal_img}>
            <p>或长按下方二维码保存，发送给好友，邀请好友扫码，给你投票吧！</p>
            <img
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
