import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs, Badge, Button} from 'antd-mobile';
import {connect} from "react-redux";
import MeetStreamInfo from "components/MeetDetailItem/MeetStreamInfo";
import DoctorList from "components/DoctorList";
import MeetRecordPlan from "components/MeetDetailItem/MeetRecordPlan";

const TabPane = Tabs.TabPane;

class MeetRecordDetail extends Component {
	state={
		loading:false,
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
		let {meeting} = this.state;
		return (
			<div className={style.meetRecordDetailWrap}>
				{
					meeting &&
					<div className={style.meetRecordDetail}>
						<div className={style.meetPoster}>
							<img src={meeting.cover_data.size_700} alt="img" />
						</div>

						<Tabs swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
							<TabPane tab="会议录像" key="1" className={style.tabItemWrap}>
								<MeetRecordPlan
									recordings_count={meeting.recordings_count}
									videos={meeting.videos}
								/>
							</TabPane>
							<TabPane tab="会议简介" key="2" className={style.tabItemWrap}>
								<MeetStreamInfo {...meeting}/>
							</TabPane>
							<TabPane tab="专家列表" key="3" className={style.tabItemWrap}>
								<DoctorList experts={meeting.experts}/>
							</TabPane>
						</Tabs>
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
	()=>{
		return {
		}
	}
)(MeetRecordDetail);










