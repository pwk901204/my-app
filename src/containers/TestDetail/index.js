import React, { Component } from 'react';
import style from './index.css';
import { ActivityIndicator, Tabs,Toast, Popup,Icon} from 'antd-mobile';
import {connect} from "react-redux";

import {browserHistory} from "react-router";
import guize from "svg/guize.svg";
import jiangbei from "svg/jiangbei.svg";
import DoctorInfo from "components/DoctorInfo";
import {ordersAction} from "reduxs/orders.js";
import TestDetailList from "components/Test/TestDetailList";
import TestDetailInfo from "components/Test/TestDetailInfo";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const TabPane = Tabs.TabPane;

class TestDetail extends Component {
	state = {
		loading:false,
		course:null
	}
	componentDidMount(){
		console.log(this.props)
		this.getDetail();
	}
	getDetail=()=>{
		this.setState({
			loading:true
		})
		return fetch(global.url.courses + "/" + this.props.params.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			if(data.msg.status === "success"){
				document.title=data.course.topic;
				this.setState({
					course:data.course
				})
			}else{
				Toast.info(data.msg.message);
			}
		})
	}
	handleRule=()=>{
		Popup.show(<div className={style.rule}>
			<h5 className={style.ruleTitle}>积分规则</h5>
			<div className={style.contentWrap}>
				<ReactIScroll
					iScroll={iScroll}
					options={{click: true}}
				>
					<div className={style.content}>
						<p>①每周为一个积分单位。</p>
						<p>②答题得10分、全对加10分、对一半得4分。</p>
						<p>③抢答前10名，每答对一题，再得3分。（由麦迪森系统自动生成答题结果） </p>
						<p>④在中美群内参与讨论和解析，可以得2-6分（由管理团队确定）。 </p>
						<p>⑤群内任何人皆可岀题，若被选上，一个题20分。 </p>
						<p>评奖规则： </p>
						<p>①每4个月评选一次，根据财务情况积分靠前的群友获奖。 </p>
						<p>②评奖时会单独评选一位活力参与奖（每期均参与的群友中评选或抽选）。 </p>
						<p>③积分累积可以兑换礼品（麦迪森点播视频、医学书籍、IPAD、医学会议参会名额等，具体细则待定）</p>
					</div>
				</ReactIScroll>
			</div>
		</div>, { animationType: 'slide-up', onTouchStart: e => e.preventDefault() });
	}
	render() {
		let {course} = this.state;
		return (
			<div className={style.testDetaillWrap}>
				{
					course &&
					<div className={style.testDetaill}>
						<div className={style.testTitle}>
							<img src={course.cover_data.size_700} alt="img" />
						</div>
						<Tabs pageSize={3} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
							<TabPane tab="试题列表" key="1" className={style.tabItemWrap}>
								<TestDetailList data={course.topics}/>
							</TabPane>
							<TabPane tab="内容简介" key="2" className={style.tabItemWrap}>
								<TestDetailInfo {...course}/>
							</TabPane>
							<TabPane tab="医生详情" key="3" className={style.tabItemWrap}>
								<DoctorInfo {...course.doctor}/>
							</TabPane>
						</Tabs>
						<div className={style.nav}>
							<div onClick={()=>{browserHistory.push("/TestRanking/" + this.props.params.id)}}>
								<Icon style={{width:"100%",height:"100%"}}  type={jiangbei} />
							</div>
							<div onClick={this.handleRule}>
								<Icon style={{width:"100%",height:"100%"}}  type={guize} />
							</div>
						</div>
						<ActivityIndicator toast  animating={this.state.loading}/>
					</div>
				}
			</div>
		);
	}
}

export default connect (
	(state)=>{
		return {
			userInfo:state.userInfo
		}
	},
	(dispatch)=>{
		return {
			ordersAction:(data)=>{
   				dispatch(ordersAction(data))
   			}
		}
	}
)(TestDetail);










