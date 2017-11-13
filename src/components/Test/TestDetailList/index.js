import React, { Component } from 'react';
import style from './index.css';
import {Link} from "react-router";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import { Toast } from 'antd-mobile';

class TestDetailList extends Component {
	render() {
		let {data} = this.props;
		return (
			<div className={style.testDetailListWrap}>
				<ReactIScroll
					iScroll={iScroll}
					options={{click: true}}
				>
					<div className={style.testDetailList}>
						<h5 className={style.title}>已更新至第{data.length}期</h5>
						<div>
							{
								data.map((item,index)=>{
									if(item.topic_status === "starting"){
										return <Link  to={"/TestQuestionDetail/" + item.id} className="clearfix" key={item.id}>
											<h6>第{item.topic_index}期</h6>
											<p className="fontBlue">答题进行中...</p>
											<span><i className="fontOrange">{item.member_count}人</i>已参与</span>
										</Link>
									}else if(item.topic_status === "not_start"){
										return <a
											href="javascript:;"
											className="clearfix"
											key={item.id}
											onClick={()=>{
												Toast.info("试题暂未开始...",1);
											}}
										>
											<h6>第{item.topic_index}期</h6>
											<p>{item.start_at}</p>
											<span><i className="fontOrange">未开始</i></span>
										</a>
									}else if(item.topic_status === "ended"){
										return <Link to={"/TestQuestionDetail/" + item.id} className="clearfix" key={item.id}>
											<h6>第{item.topic_index}期</h6>
											<p>{item.start_at}</p>
											<span><i className="fontOrange">{item.member_count}人</i>已参与</span>
										</Link>
									}
								})
							}
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
export default TestDetailList;

