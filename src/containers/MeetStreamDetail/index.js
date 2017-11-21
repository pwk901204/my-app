import React, { Component } from 'react';
import style from './index.css';
import {Button, Tabs, Popup} from 'antd-mobile';

import {connect} from "react-redux";
import ChatRoom from "components/ChatRoom";
import RewardList from "components/RewardList";
import DoctorList from "components/DoctorList";
import MeetStreamPlan from "components/MeetDetailItem/MeetStreamPlan";
import MeetStreamInfo from "components/MeetDetailItem/MeetStreamInfo";
import LiveVideo from "components/LiveVideo";
import {Pay} from "components/Pay";
import {ordersAction} from "reduxs/orders.js";
import moment from 'moment';
import _ from "lodash";
moment.lang('zh-cn');
const TabPane = Tabs.TabPane;

class MeetStreamDetail extends Component {
	state={
		loading:false,
		meeting:null,
		stream:null,
		schedules:null
	}
	componentDidMount(){
		this.getMeetDetail();
		clearInterval(this.timer);
		this.timer=setInterval(()=>{
			this.getFresh();
		},10000)
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	getMeetDetail = ()=>{
		this.setState({
			loading:true
		})
		fetch(global.url.meetings + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			let schedules=[];
			for(let i= 0;i<data.meeting.schedules.length;i++){
				schedules = schedules.concat(data.meeting.schedules[i].details)
			}
			this.setState({
				loading:false,
				meeting:data.meeting,
				schedules,
			},this.getStreamDetail)
		})
	}
	getStreamDetail = ()=>{
		//streams
		fetch(global.url.streams + "/"+ this.props.routeParams.stream_id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				stream:data.stream
			})
			if( Number(data.stream.price) === 0 && data.stream.stream_type ==="live" && !data.stream.purchase){
				this.props.ordersAction({
					type:"meeting",
					id:this.props.routeParams.id,
					callBack:this.getDetail
				})
			}
			if(this.state.stream.stream_type === "ended"){
				clearInterval(this.timer);
			}
		})

	}
	getFresh = ()=>{
		let _this = this;
		fetch(global.url.meetings + "/" + this.props.routeParams.id + "/check_live")
		.then((response)=>response.json())
		.then((data)=>{
			if(data.data.stream_status === 'ended'){
				clearInterval(_this.timer)
			}
			if(_this.state.stream.stream_type !== data.data.stream_status){
				_this.getMeetDetail();
			}
			if( data.data.schedules.live_schedule_id && _.result(_.find(_this.state.schedules,{status:"live"}), 'id') !== data.data.schedules.live_schedule_id){
				_this.getMeetDetail();
			}
		})
	}
	onClick = () => {
		let {stream,meeting} =this.state;
		let _this = this;
		if(Number(stream.price)>0){
			//付费报名
			Popup.show(<Pay
				id={meeting.id}
				type="meeting"
				topic={stream.topic}
				amount={stream.price}
				ordersAction={this.props.ordersAction}
			/>, { animationType: 'slide-up', onTouchStart: e => e.preventDefault() });
		}else{
			//免费报名
			_this.props.ordersAction({
				type:"meeting",
				id:meeting.id,
				callBack:()=>{
					_this.getMeetDetail();
				}
			})
		}
	};
	render() {
		let {meeting,stream} = this.state;
		return (
			<div className={style.meetStreamDetailWrap}>
				{
					meeting&& stream &&
					<div className={style.meetStreamDetail}>
						<div className={style.meetstreamVideo}>
							{(!stream.purchase || (stream.purchase && stream.stream_type !== "live" && stream.stream_type !== "ad") ) && <img src={stream.cover_data.size_700} alt="img" />}
							{
								stream.purchase && stream.stream_type === "live" &&
								<LiveVideo cover_url={stream.cover_data.size_700} play_url={stream.play_urls} autoplay={true}/>
							}
							{
								stream.purchase && stream.stream_type === "ad" &&
								<LiveVideo cover_url={stream.cover_data.size_700} play_url={stream.play_urls} autoplay={true}/>
							}
							{
								stream.stream_type === "not_begin" && stream.purchase === true &&
								<div className={style.btnWrap}>
									<div className={style.yuyueText}>
										<p>您已经成功预约会议</p>
										<p>会议开始时间:  {moment(stream.start_time).format('MM-DD HH:mm')}</p>
									</div>
								</div>
							}
							{
								stream.stream_type === "ended" &&
								<div className={style.btnWrap}>
									<div className={style.yuyueText}>
										<p>会议已经结束</p>
										<p>请等待录播</p>
									</div>
								</div>
							}
							{
								(stream.purchase === false && stream.stream_type !== "ended") &&
								<div className={style.btnWrap}>
									<Button
										className={style.payBtn}
										size="small"
										type="primary"
										inline
										onClick={this.onClick}
									>{Number(stream.price) ? `付费观看/¥${stream.price}` : "免费报名"}</Button>
								</div>
							}
						</div>

						<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}
							onChange={(index) => {
								if(index == 2){
									this.setState({
										Date:new Date()
									})
								}
							}}
						>
							<TabPane tab="聊天室" key="1" className={style.tabItemWrap}>
								<ChatRoom
									id={this.props.routeParams.stream_id}
									users_count={stream.stream_users_count}
									bounty_count={stream.stream_bounty_count}
									payment_count={stream.stream_payment_count}
								/>
							</TabPane>
							<TabPane tab="打赏排行榜" key="2" className={style.tabItemWrap}>
								<RewardList
									key={this.state.Date}
									id={this.props.routeParams.stream_id}
									bounty_count={stream.stream_bounty_count}
									payment_count={stream.stream_payment_count}
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
	(dispatch)=>{
		return {
			ordersAction:(data)=>{
   				dispatch(ordersAction(data))
   			}
		}
	}
)(MeetStreamDetail);
