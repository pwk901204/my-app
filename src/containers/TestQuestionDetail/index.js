import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,WhiteSpace} from 'antd-mobile';

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import TestItem from "components/Test/TestItem";


class TestQuestionDetail extends Component {
	state={
		loading:false
	}
	componentDidMount(){
	}
	render() {
		return (
			<div className={style.testQuestionDetailWrap}>
				<div className={style.head}>
					<span className={style.active}>上一题</span>
					<div>距离结束<i>49:02:27</i></div>
					<span>下一题</span>
				</div>
				<div className={style.contentWrap}>
					<ReactIScroll
						iScroll={iScroll}
					>
						<div className={style.content}>
							<WhiteSpace size="sm" />
							<h4>本期共有3道题</h4>
							<h5><i>第1题</i>-问答题</h5>
							<div className={style.questionContent}>
								
							</div>
							<h5>我的答案</h5>
							<div className={style.myAnswer}>
								<textarea></textarea>
							</div>

							<WhiteSpace size="sm" />
						</div>
					</ReactIScroll>
				</div>
				<div className={style.foot}>
					<div className={style.button}>提交</div>
				</div>
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}
export default TestQuestionDetail;

