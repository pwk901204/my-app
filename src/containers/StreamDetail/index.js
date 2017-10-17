import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, List, Tag,  Tabs, Badge} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import LiveVideo from "components/LiveVideo";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}

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
				{stream &&
					<div className={style.streamDetail}>
						{stream.stream_type === "ended" &&
							<div className={style.streamEnded}>
								<img src={stream.cover_data.size_700} alt="img" />
								<p>{stream.topic}</p>
							</div>
						}
						{stream.stream_type === "live" && <LiveVideo cover_url="http://www.iteye.com/images/logo.gif?1448702469" pull_url_http="http://www.iteye.com/images/logo.gif?1448702469" />}
						<Tabs defaultActiveKey="1" className={style.tabWrap} onChange={callback} onTabClick={handleTabClick}>
							<TabPane tab="直播简介" key="1" className={style.tabItemWrap}>
								<ReactIScroll
									iScroll={iScroll}
									options={{
										mouseWheel: true,
										scrollbars: false
									}}
								>
									<StreamInfo {...stream}/>
								</ReactIScroll>
							</TabPane>
							<TabPane tab="医生详情" key="2" className={style.tabItemWrap}>
								<ReactIScroll
									iScroll={iScroll}
									options={{
										mouseWheel: true,
										scrollbars: false
									}}
								>
									<StreamDoctorInfo/>
								</ReactIScroll>
							</TabPane>
							<TabPane tab={<Badge text={'3'}>评论</Badge>} key="3" className={style.tabItemWrap}>
								<ReactIScroll
									iScroll={iScroll}
									options={{
										mouseWheel: true,
										scrollbars: false
									}}
								>
									<StreamInfo {...stream}/>
								</ReactIScroll>
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
)(StreamDetail);

class StreamInfo extends Component {
	render() {
		let stream = this.props;
		return (
			<List>
				<List.Item >
					<span className={style.listTitle}>主题</span>
					<span className={style.listContent}>{stream.topic}</span>
				</List.Item>
				<List.Item >
					<span className={style.listTitle}>开讲</span>
					<span className={style.listContent}>{stream.start_time}</span>
				</List.Item>
				<List.Item >
					<span className={style.listTitle}>时长</span>
					<span className={style.listContent}>{stream.duration}</span>
				</List.Item>
				<List.Item >
					<span className={style.listTitle}>费用</span>
					<span className={style.listContent}>{stream.price}</span>
				</List.Item>
				<List.Item >
					<span className={style.listTitle}>涉及科室</span>
					<span className={style.listContent}>{stream.departments.join(",")}</span>
				</List.Item>
				<List.Item >
					<span className={style.listTitle}>关键词</span>
					<div className={style.listKeyWordsContent}>
						{
							stream.tags.map((item,index)=>{
								return <Tag key={index} selected className={style.listKeyWordsItem}>{item}</Tag>
							})
						}
					</div>
				</List.Item>
				<List.Item >
					<span className={style.listIntroduction}>{stream.introduction}</span>
				</List.Item>
			</List>
		);
	}
}


class StreamDoctorInfo extends Component {
	render() {
		let stream = this.props;
		return (
			<div>
				<div className="clearfix">
					<img src="" alt="img" />
					<div>
						<h5>朱天刚<span>(主任医师)</span></h5>
						<p><span>医院</span><span>科室</span></p>
					</div>
				</div>
			</div>
		);
	}
}

