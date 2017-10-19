import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs, Badge, Button} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import StreamInfo from "components/StreamInfo";
import StreamDoctorInfo from "components/StreamDoctorInfo";
import LiveVideo from "components/LiveVideo";
import Comment from "components/Comment";
import MiniNav from "components/MiniNav";

const TabPane = Tabs.TabPane;

class RecordDetail extends Component {
	state = {
		loading:false,
		recording:null,
		selectedTab:"streamInfo"
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		fetch(url.recordings + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				recording:data.recording
			})
		})
	}
	render() {
		let {recording} = this.state;
		return (
			<div className={style.recordingDetailWrap}>
				{
					recording &&
					<div className={style.recordingDetail}>
						{ !recording.purchase &&
							<div className={style.recordingEnded}>
								<img src={recording.cover_data.size_700} alt="img" />
								<div className={style.btnWrap}>
									<Button className={style.btn} size="small" type="primary" inline >付费观看</Button>
								</div>
							</div>
						}
						{
							// recording.purchase && stream.stream_type === "live" &&
							// <div className={style.recordingLive}>
							// 	<LiveVideo cover_url="http://www.iteye.com/images/logo.gif?1448702469" pull_url_http="http://www.iteye.com/images/logo.gif?1448702469" />
							// </div>
						}
						<Tabs swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
							<TabPane tab="录播简介" key="1" className={style.tabItemWrap}>
								{
									//<StreamInfo {...recording}/>

								}
							</TabPane>
							<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
								<StreamDoctorInfo {...recording.doctor}/>
							</TabPane>
							<TabPane tab={<Badge text={recording.comments_count}>评论</Badge>} key="3" className={style.tabItemWrap}>
								<Comment id={recording.id} target_type="recording"/>
							</TabPane>
						</Tabs>
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
)(RecordDetail);










