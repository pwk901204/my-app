import React, { Component } from 'react';
import style from './index.css';
import {SearchBar} from 'antd-mobile'
import {Link} from 'react-router';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import EnterBtn from 'components/EnterBtn'
import enter from 'images/enter3.png';

export default class Votes extends Component {
	render() {
		return (
			<div className={style.votes + ' votes'}>
				<EnterBtn src={enter} title='排行榜' linkTo='/VotesRank' color='#df8600'/>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
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
								<span>6天23小时26分</span>
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
