import React, { Component } from 'react';
import style from './index.css';
import {SearchBar} from 'antd-mobile'
import {Link} from 'react-router';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import EnterBtn from 'components/EnterBtn'
import enter from 'images/enter3.png';
import Countdown from 'react-countdown-now';
import moment from 'moment';

export default class Votes extends Component {
	onScroll(a){

	}
	render() {
		let date = moment().set({'year': 2017, 'month': 10, 'date': 29, 'hour': 16, 'minute': 57, 'second': 0, 'millisecond': 0});
		date = date.toDate();
		return (
			<div className={style.votes + ' votes'}>
				<EnterBtn src={enter} title='排行榜' linkTo='/VotesRank' color='#df8600'/>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
					onScrollEnd={()=>{console.log(123)}}
				>
					<div>
						<SearchBar placeholder="请输入选手编号" autoFocus/>
						<div className={style.head}>
							<div className={style['pull-left']}>
								<p>累计投票</p>
								<span>24110</span>
							</div>
							<div className={style['pull-right']}>
								<p>投票倒计时</p>
									<Countdown
							      renderer={({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
							        if(completed){
							          return (<span>投票已截止</span>)
							        } else {
							          if (days > 0) {
							            return (<span>{days}天{hours}小时{minutes}分钟</span>)
							          } else {
							            return (<span>{hours}小时{minutes}分钟{seconds}秒</span>)
							          }
							        }
							      }}
	      						date={date}>
	    						</Countdown>
							</div>
						</div>
						<ul className={style.body}>
							<li>
								<Link to='/votes/1'>
									<div className={style.bg}><i>0003号</i></div>
									<p>王旭东 <span>1895票</span></p>
									<div className={style.btn}><span>投票</span></div>
								</Link>
							</li>
							<li>
								<Link to='/votes/1'>
									<div className={style.bg}><i>0003号</i></div>
									<p>王旭东 <span>1895票</span></p>
									<div className={style.btn}><span>投票</span></div>
								</Link>
							</li>
							<li>
								<Link to='/votes/1'>
									<div className={style.bg}><i>0003号</i></div>
									<p>王旭东 <span>1895票</span></p>
									<div className={style.btn}><span>投票</span></div>
								</Link>
							</li>
							<li>
								<Link to='/votes/1'>
									<div className={style.bg}><i>0003号</i></div>
									<p>王旭东 <span>1895票</span></p>
									<div className={style.btn}><span>投票</span></div>
								</Link>
							</li>
							<li>
								<Link to='/votes/1'>
									<div className={style.bg}><i>0003号</i></div>
									<p>王旭东 <span>1895票</span></p>
									<div className={style.btn}><span>投票</span></div>
								</Link>
							</li>
						</ul>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
