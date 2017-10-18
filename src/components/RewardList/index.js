import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class RewardList extends Component {
	render() {
		return (
			<div className={style.rewardlist}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}>
							<span></span>
							<p>共2人打赏</p>
							<p>共10000元</p>
						</h5>
						<WhiteSpace size="xs" />
						<div className={style.item}>
							<i>1</i>
							<p>dasdassd大神</p>
							<span>9.0元</span>
						</div>
						<div className={style.item}>
							<i>1</i>
							<p>dasdassd大神</p>
							<span>9.0元</span>
						</div>
						<div className={style.item}>
							<i>1</i>
							<p>dasdassd大神</p>
							<span>9.0元</span>
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
