import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import Countdown from 'react-countdown-now';
import moment from 'moment';
import iScroll from "iscroll/build/iscroll-probe.js";
import votes_rank from 'images/votes_rank.png'
import rank1 from 'svg/rank1.svg'
import rank2 from 'svg/rank2.svg'
import rank3 from 'svg/rank3.svg'

export default class VotesRank extends Component {
	render() {
		let date = moment().set({'year': 2017, 'month': 10, 'date': 29, 'hour': 16, 'minute': 57, 'second': 0, 'millisecond': 0});
		date = date.toDate();
		return (
			<div className={style.votes_rank}>
				<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
					>
					<div>
					<div className={style.time} >
						<Countdown
							renderer={({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
								if(completed){
									return (<span>投票已截止</span>)
								} else {
									if (days > 0) {
										return (<span>投票倒计时：{days}天{hours}小时{minutes}分钟</span>)
									} else {
										return (<span>投票倒计时：{hours}小时{minutes}分钟{seconds}秒</span>)
									}
								}
							}}
							date={date}>
						</Countdown>
					</div>
					<div className={style.rank_list} >
						<div className={style.rank_title} >
							<img src={votes_rank} alt=""/>
							<p>实时排名</p>
						</div>
						<ul>
							<li className={style.head} >
								<div>排名</div>
								<div className={style.border + ' ' + style.middle} >参赛选手</div>
								<div>票数</div>
							</li>
							<li>
								<div className={style.first} ><Icon type={rank1}/></div>
								<div className={style.middle} ><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg" alt=""/><span>张冰</span></div>
								<div><i>251</i><span>票</span></div>
							</li>
							<li>
								<div className={style.first} ><Icon type={rank2}/></div>
								<div className={style.middle} ><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg" alt=""/><span>张冰</span></div>
								<div><i>251</i>票</div>
							</li>
							<li>
								<div className={style.first} ><Icon type={rank3}/></div>
								<div className={style.middle} ><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg" alt=""/><span>张冰</span></div>
								<div><i>251</i>票</div>
							</li>
							<li>
								<div className={style.first} >3</div>
								<div className={style.middle} ><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg" alt=""/><span>张冰</span></div>
								<div><i>251</i>票</div>
							</li>
						</ul>
					</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
