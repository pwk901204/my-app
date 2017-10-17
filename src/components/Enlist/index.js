import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class Enlist extends Component {
	render() {
		return (
			<div className={style.enlist}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>2人已报名</h5>
						<div className={style.item}>
							<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
							<span>dasdassd大神</span>
							<i>医</i>
						</div>
						<div className={style.item}>
							<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
							<span>dasdassd大神</span>
							<i>医</i>
						</div>
						<div className={style.item}>
							<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
							<span>dasdassd大神</span>
							<i>医</i>
						</div>
						<div className={style.item}>
							<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
							<span>dasdassd大神</span>
							<i>医</i>
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

