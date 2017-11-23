import React, { Component } from 'react';
import style from './index.css';
import { ActivityIndicator, Tabs, Button, Popup} from 'antd-mobile';
import {connect} from "react-redux";

import StreamInfo from "components/StreamInfo";
import DoctorInfo from "components/DoctorInfo";
import LiveVideo from "components/LiveVideo";
import Comment from "components/Comment";
import Enlist from "components/Enlist";
import RewardList from "components/RewardList";
import ChatRoom from "components/ChatRoom";
import {Pay} from "components/Pay";
import {ordersAction} from "reduxs/orders.js";

const TabPane = Tabs.TabPane;

class StreamDetail extends Component {
	state = {
		loading:false,
		stream:null,
	}
	componentDidMount(){
		this.getDetail();
		clearInterval(this.timer);
		this.timer=setInterval(()=>{
			this.getFresh();
		},30000)
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	getDetail = ()=>{
		this.setState({
			loading:true
		})
		fetch(global.url.streams + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				stream:data.stream
			})
			if( Number(data.stream.price) === 0 && data.stream.stream_type ==="live" && !data.stream.purchase){
				this.props.ordersAction({
					type:"live",
					id:data.stream.id,
					callBack:this.getDetail
				})
			}
			if(this.state.stream.stream_type === "ended"){
				clearInterval(this.timer);
			}
		})
	}
	getFresh = ()=>{
		fetch(global.url.streams_check_status + "?token=" + this.props.userInfo.token + "&id=" + this.props.routeParams.id)
		.then((response)=>response.json())
		.then((data)=>{
			if(this.state.stream.stream_type !== data.status){
				this.getDetail();
			}
		})
	}
	onClick = () => {
		let stream =this.state.stream;
		if(Number(stream.price)>0){
			//付费报名
			Popup.show(<Pay
				id={stream.id}
				type="live"
				topic={stream.topic}
				amount={stream.price}
				ordersAction={this.props.ordersAction}
				href={window.location.href}
			/>, { animationType: 'slide-up', onTouchStart: e => e.preventDefault() });
		}else{
			//免费报名
			this.props.ordersAction({
				type:"live",
				id:stream.id,
				callBack:this.getDetail
			})
		}
	};
	render() {
		let {stream} = this.state;
		return (
			<div className={style.streamDetailWrap}>
				{
					stream &&
					<div className={style.streamDetail}>
						{
							!stream.purchase && stream.stream_type !== "ended" &&
							<div className={style.streamVideo}>
								<img src={stream.cover_data.size_700} alt="img" />
								<div className={style.btnWrap}>
									<Button
										className={style.payBtn}
										size="small"
										type="primary"
										inline
										onClick={this.onClick}
									>{Number(stream.price) ? `付费观看/¥${stream.price}` : "免费报名"}</Button>
								</div>
							</div>
						}
						{
							stream.stream_type === "ended" &&
							<div className={style.streamVideo}>
								<img src={stream.cover_data.size_700} alt="img" />
								<div className={style.btnWrap}>
									<Button
										className={style.payBtn}
										disabled
										style={{color:"#666"}}
										size="small"
										type="primary"
										inline
									>直播结束</Button>
								</div>
							</div>
						}
						{	stream.purchase && stream.stream_type === "live" &&
							<div className={style.streamVideo}>
								<LiveVideo cover_url={stream.cover_data.size_700} play_url={stream.play_urls} autoplay={true}/>
							</div>
						}
						{	stream.purchase && stream.stream_type === "ad" &&
							<div className={style.streamVideo}>
								<LiveVideo cover_url={stream.cover_data.size_700} play_url={stream.ad_url} autoplay={true}/>
							</div>
						}
						{	stream.purchase && stream.stream_type === "not_begin" &&
							<div className={style.streamVideo}>
								<img src={stream.cover_data.size_700} alt="img" />
							</div>
						}
						{
							stream.stream_type === "ended" &&
							<Tabs swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
								<TabPane tab="直播简介" key="1" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
									<DoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={`评论(${stream.comments_count})`} key="3" className={style.tabItemWrap}>
									<Comment id={stream.id} target_type="stream"/>
								</TabPane>
							</Tabs>
						}
						{
							(stream.stream_type === "not_begin" || stream.stream_type === "ad" )&&
							<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
								<TabPane tab="直播简介" key="1" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
									<DoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={`评论(${stream.comments_count})`} key="3" className={style.tabItemWrap}>
									<Comment id={stream.id} target_type="stream"/>
								</TabPane>
								<TabPane tab={"报名列表"} key="4" className={style.tabItemWrap}>
									<Enlist {...stream}/>
								</TabPane>
							</Tabs>
						}
						{
							stream.stream_type === "live" &&
							<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}
								onChange={(index) => {
									if(index == 4){
										this.setState({
											Date:new Date()
										})
									}
								}}
							>
								<TabPane tab={"聊天室"} key="1" className={style.tabItemWrap}>
									<ChatRoom
										id={stream.id}
										users_count={stream.stream_users_count}
										bounty_count={stream.stream_bounty_count}
										payment_count={stream.stream_payment_count}
									/>
								</TabPane>
								<TabPane tab="直播简介" key="2" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="3" className={style.tabItemWrap}>
									<DoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={"打赏排行榜"} key="4" className={style.tabItemWrap}>
									<RewardList
										key={this.state.Date}
										id={stream.id}
									/>
								</TabPane>
								<TabPane tab={"报名列表"} key="5" className={style.tabItemWrap}>
									<Enlist  {...stream}/>
								</TabPane>
							</Tabs>
						}
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
)(StreamDetail);










