import React, { Component } from 'react';
import style from './index.css';
import { ActivityIndicator, Tabs} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import {hashHistory} from "react-router";
import StreamInfo from "components/StreamInfo";
import DoctorInfo from "components/DoctorInfo";
import {ordersAction} from "reduxs/orders.js";
import TestDetailList from "components/Test/TestDetailList";
import TestDetailInfo from "components/Test/TestDetailInfo";


const TabPane = Tabs.TabPane;

class TestDetail extends Component {
	state = {
		loading:false,
		stream:null,
		selectedTab:"streamInfo"
	}
	render() {
		return (
			<div className={style.testDetaillWrap}>
				<div className={style.testDetaill}>
					<div className={style.testTitle}>
						<img src="http://image.beekka.com/blog/2015/bg2015033101.png" alt="img" />
					</div>
					<Tabs pageSize={3} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
						<TabPane tab="试题列表" key="1" className={style.tabItemWrap}>
							<TestDetailList/>
						</TabPane>
						<TabPane tab="内容简介" key="2" className={style.tabItemWrap}>
							<TestDetailInfo />
						</TabPane>
						<TabPane tab="医生详情" key="3" className={style.tabItemWrap}>
							<DoctorInfo/>
						</TabPane>
					</Tabs>
					<ActivityIndicator toast  animating={this.state.loading}/>
				</div>
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










