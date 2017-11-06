import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs,} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import { MyMeetStreamItem , MyMeetOffLineItem } from "components/MeetItem";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const TabPane = Tabs.TabPane;

class MyMeetList extends Component {
	state = {
		loading:false,
		meetings:[],
		type:"live",
		page:1
	}
	componentDidMount(){
		this.getList();
	}
	getList = ()=>{
		this.setState({
			loading:true
		})
		fetch(url.doctors_meetings + "?token=" + this.props.userInfo.token + "&type="+ this.state.type +"&page="+ this.state.page + "&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				meetings:this.state.meetings.concat(data.meetings),
				total_pages:data.meta.total_pages
			})
		})
	}
	scrollEnd = (iScrollInstance) =>{
		if(
			Math.abs(iScrollInstance.scrollerHeight)>iScrollInstance.wrapperHeight &&
			iScrollInstance.maxScrollY === iScrollInstance.y &&
			this.state.page < this.state.total_pages
		){
			console.log("到达最底部")
			this.setState({
				page:this.state.page+1
			},()=>{
				this.getList()
			})
		}
	}
	render() {
		let {meetings} = this.state;
		return (
			<div className={style.myMeetList}>
				<Tabs swipeable={false} defaultActiveKey="created" onTabClick={(key)=>{
						this.setState({
							type:key,
							page:1,
							meetings:[]
						},()=>{
							this.getList();
						})
					}}>
					<TabPane tab="直播会议" key="live" className={style.tabItemWrap}  >
						<ReactIScroll
							iScroll={iScroll}
							onScrollEnd={this.scrollEnd}
						>
							<ul className={style.List}>
								{
									meetings.length>0 && meetings.map((item,index)=>{
										return <li key={item.id}><MyMeetStreamItem key={item.id} {...item} /></li>
									})
								}
							</ul>
						</ReactIScroll>
					</TabPane>
					<TabPane tab="线下会议" key="offline" className={style.tabItemWrap} >
						<ReactIScroll
							iScroll={iScroll}
							onScrollEnd={this.scrollEnd}
						>
							<ul className={style.List}>
								{
									meetings.length>0 && meetings.map((item,index)=>{
										return <li key={item.id}><MyMeetOffLineItem key={item.id} {...item} /></li>
									})
								}
							</ul>
						</ReactIScroll>
					</TabPane>
				</Tabs>
				<ActivityIndicator toast animating={this.state.loading} />
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
		}
	}
)(MyMeetList);










