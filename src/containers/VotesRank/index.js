import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import votes_rank from 'images/votes_rank.png'
import rank1 from 'svg/rank1.svg'
import rank2 from 'svg/rank2.svg'
import rank3 from 'svg/rank3.svg'

export default class VotesRank extends Component {
	render() {
		return (
			<div className={style.votes_rank}>
				<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
					>
					<div>
					<div className={style.time} >投票倒计时：6天23小时26分</div>
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
