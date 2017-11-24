import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs, Button,Popup} from 'antd-mobile';
import {connect} from "react-redux";

import RecordInfo from "components/RecordInfo";
import DoctorInfo from "components/DoctorInfo";
import LiveVideo from "components/LiveVideo";
import Comment from "components/Comment";
import {Pay} from "components/Pay";
import {ordersAction} from "reduxs/orders.js";
import wxShare from 'common/wxShare';

const TabPane = Tabs.TabPane;

class RecordDetail extends Component {
	state = {
		loading:false,
		recording:null,
		selectedTab:"streamInfo"
	}
	componentDidMount(){
		let p1 = this.getDetail();
		Promise.all([p1]).then(()=>{
			wxShare({
				title:this.state.recording.topic,
				desc:this.state.recording.introduction,
				imgUrl:this.state.recording.cover_data.thumb
			});
		})
	}
	getDetail= ()=>{
		this.setState({
			loading:true
		})
		return window.HOCFetch({ needToken:false })(global.url.recordings + "/"+ this.props.routeParams.id + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				recording:data.recording
			})
			if( Number(data.recording.price) === 0 && !data.stream.purchase){
				this.props.ordersAction({
					type:"video",
					id:data.recording.id,
					callBack:this.getDetail
				})
			}
		})
	}
	onClick = () => {
		let recording =this.state.recording;
		if(Number(recording.price)>0){
			//付费报名
			Popup.show(<Pay
				id={recording.id}
				type="video"
				topic={recording.topic}
				amount={recording.price}
				ordersAction={this.props.ordersAction}
				href={window.location.href}
			/>, { animationType: 'slide-up', onTouchStart: e => e.preventDefault() });
		}else{
			//免费报名
			this.props.ordersAction({
				type:"video",
				id:recording.id,
				callBack:this.getDetail
			})
		}
	};
	render() {
		let {recording} = this.state;
		return (
			<div className={style.recordingDetailWrap}>
				{
					recording &&
					<div className={style.recordingDetail}>
						{ !recording.purchase &&
							<div className={style.recordingVideo}>
								<img src={recording.cover_data.size_700} alt="img" />
								<div className={style.btnWrap}>
									<Button
										className={style.payBtn}
										size="small"
										type="primary"
										inline
										onClick={this.onClick}
									>{Number(recording.price) ? `付费观看/¥${recording.price}` : "免费报名"}</Button>
								</div>
							</div>
						}
						{	recording.purchase &&
							<div className={style.recordingVideo}>
								<LiveVideo cover_url={recording.cover_data.size_700} play_url={recording.play_urls} autoplay={true}/>
							</div>
						}
						<Tabs swipeable={false} defaultActiveKey="1" className={style.tabWrap}>
							<TabPane tab="录播简介" key="1" className={style.tabItemWrap}>
								<RecordInfo {...recording}/>
							</TabPane>
							<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
								{
									recording.recording_type === "Meeting" ?
									<DoctorInfo {...recording.speaker}/>
									:
									<DoctorInfo {...recording.doctor}/>
								}
							</TabPane>
							<TabPane tab={`评论(${recording.comments_count})`} key="3" className={style.tabItemWrap}>
								<Comment id={recording.id} target_type="recording"/>
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
	(dispatch)=>{
		return {
			ordersAction:(data)=>{
   				dispatch(ordersAction(data))
   			}
		}
	}
)(RecordDetail);










