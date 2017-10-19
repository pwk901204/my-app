import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, List, Tag,  Tabs, Badge, WhiteSpace, Button} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";

import StreamInfo from "components/StreamInfo";
import StreamDoctorInfo from "components/StreamDoctorInfo";
import LiveVideo from "components/LiveVideo";
import Comment from "components/Comment";
import Enlist from "components/Enlist";
import RewardList from "components/RewardList";
import ChatRoom from "components/ChatRoom";
import MiniNav from "components/MiniNav";
import SeriesList from "components/SeriesList";
const TabPane = Tabs.TabPane;

class StreamDetail extends Component {
	state = {
		loading:false,
		stream:null,
		selectedTab:"streamInfo"
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		fetch(url.streams + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				stream:data.stream
			})
		})
	}
	render() {
		let {stream} = this.state;
		return (
			<div className={style.streamDetailWrap}>
				{
					stream &&
					<div className={style.streamDetail}>
						{ !stream.purchase &&
							<div className={style.streamEnded}>
								<img src={stream.cover_data.size_700} alt="img" />
								<div className={style.btnWrap}>
									<Button className={style.btn} size="small" type="primary" inline >付费观看</Button>
								</div>
							</div>
						}
						{	stream.purchase && stream.stream_type === "live" &&
							<div className={style.streamLive}>
								<LiveVideo cover_url="http://www.iteye.com/images/logo.gif?1448702469" pull_url_http="http://www.iteye.com/images/logo.gif?1448702469" />
							</div>
						}
						{	stream.purchase && stream.stream_type === "not_begin" &&
							<div className={style.streamLive}>
								<LiveVideo cover_url="http://www.iteye.com/images/logo.gif?1448702469" pull_url_http="http://www.iteye.com/images/logo.gif?1448702469" />
							</div>
						}
						{
							stream.stream_type === "ended" &&
							<Tabs swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
								<TabPane tab="直播简介" key="1" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
									<StreamDoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={<Badge text={stream.comments_count}>评论</Badge>} key="3" className={style.tabItemWrap}>
									<Comment id={stream.id} target_type="stream"/>
								</TabPane>
							</Tabs>
						}
						{
							stream.stream_type === "not_begin" &&
							<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
								<TabPane tab="直播简介" key="1" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
									<StreamDoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={<Badge text={stream.comments_count}>评论</Badge>} key="3" className={style.tabItemWrap}>
									<Comment id={stream.id} target_type="stream"/>
								</TabPane>
								<TabPane tab={"报名人数"} key="4" className={style.tabItemWrap}>
									<Enlist {...stream}/>
								</TabPane>
							</Tabs>
						}
						{
							stream.stream_type === "live" &&
							<Tabs pageSize={4} swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
								<TabPane tab={"聊天室"} key="1" className={style.tabItemWrap}>
									<ChatRoom {...stream}/>
								</TabPane>
								<TabPane tab="直播简介" key="2" className={style.tabItemWrap}>
									<StreamInfo {...stream}/>
								</TabPane>
								<TabPane tab="医生详情" key="3" className={style.tabItemWrap}>
									<StreamDoctorInfo {...stream.doctor}/>
								</TabPane>
								<TabPane tab={"打赏排行榜"} key="4" className={style.tabItemWrap}>
									<RewardList {...stream}/>
								</TabPane>
								<TabPane tab={"报名人数"} key="5" className={style.tabItemWrap}>
									<Enlist  {...stream}/>
								</TabPane>
							</Tabs>
						}
						<ActivityIndicator toast  animating={this.state.loading}/>
						<MiniNav/>
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
)(StreamDetail);










