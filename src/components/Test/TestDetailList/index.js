import React, { Component } from 'react';
import style from './index.css';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

class TestDetailList extends Component {
	render() {
		return (
			<div className={style.testDetailListWrap}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div className={style.testDetailList}>
						<h5 className={style.title}>已更新至第12期</h5>
						<ul>
							<li className="clearfix">
								<h6>第12期</h6>
								<p className="fontBlue">答题进行中...</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
							<li className="clearfix">
								<h6>第12期</h6>
								<p>2017－09-01 20:00</p>
								<span><i className="fontOrange">129人</i>已参与</span>
							</li>
						</ul>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
export default TestDetailList;

