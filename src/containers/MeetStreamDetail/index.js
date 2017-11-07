import React, { Component } from 'react';
import style from './index.css';
import {Button, Tabs} from 'antd-mobile';

import {connect} from "react-redux";
import ChatRoom from "components/ChatRoom";
import RewardList from "components/RewardList";
import DoctorList from "components/DoctorList";
import MeetStreamPlan from "components/MeetDetailItem/MeetStreamPlan";
import MeetStreamInfo from "components/MeetDetailItem/MeetStreamInfo";


import moment from 'moment';
moment.lang('zh-cn');
const TabPane = Tabs.TabPane;

class MeetStreamDetail extends Component {
	state={
		meeting:null
	}
	componentDidMount(){
		this.getMeetDetail();
	}
	getMeetDetail = ()=>{
		fetch(global.url.meetings + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				meeting:data.meeting
			})
		})
	}
	render() {
		console.log(this.props.routeParams)
		let {meeting} = this.state;
		return (
			<div className={style.meetStreamDetailWrap}>
				{
					meeting &&
					<div className={style.meetStreamDetail}>
						<div className={style.meetstreamVideo}>
							<img src="https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=24e2f44e43ed2e73e3e9802cb703a16d/6a63f6246b600c3395dcc502134c510fd8f9a156.jpg" alt="img" />
							<div className={style.btnWrap}>
								<Button
									className={style.payBtn}
									size="small"
									type="primary"
									inline
									onClick={this.onClick}
								>付费观看</Button>
							</div>
						</div>
						<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
							<TabPane tab="聊天室" key="1" className={style.tabItemWrap}>
								<ChatRoom
									id={this.props.routeParams.stream_id}
									users_count={1}
									bounty_count={1}
									payment_count={1}
								/>
							</TabPane>
							<TabPane tab="打赏排行榜" key="2" className={style.tabItemWrap}>
								<RewardList
									id={this.props.routeParams.stream_id}
									bounty_count={1}
									payment_count={2}
								/>
							</TabPane>
							<TabPane tab="会议日程" key="3" className={style.tabItemWrap}>
								<MeetStreamPlan
									schedules_count={meeting.schedules_count}
									schedules={meeting.schedules}
								/>
							</TabPane>

							<TabPane tab="会议简介" key="4" className={style.tabItemWrap}>
								<MeetStreamInfo {...meeting}/>
							</TabPane>
							<TabPane tab="专家列表" key="5" className={style.tabItemWrap}>
								<DoctorList
									experts={meeting.experts}
								/>
							</TabPane>
						</Tabs>

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
	()=>{
		return {
		}
	}
)(MeetStreamDetail);
