import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs,} from 'antd-mobile';
import {connect} from "react-redux";

import {browserHistory} from "react-router";
import {StreamReleaseItem,StreamItem,StreamPurchaseItem} from "components/StreamItem";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const TabPane = Tabs.TabPane;

class MyStreamList extends Component {
	state = {
		loading:false,
		streams:[],
		type:"created",
		page:1
	}
	componentDidMount(){
		this.getList();
	}
	getList = ()=>{
		this.setState({
			loading:true
		})
		window.HOCFetch({ needToken:true })(global.url.doctors_streams + "?token=" + this.props.userInfo.token + "&type="+ this.state.type +"&page="+ this.state.page + "&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				streams:this.state.streams.concat(data.streams),
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
		let {streams} = this.state;
		return (
			<div className={style.myStreamList}>
				<Tabs swipeable={false} defaultActiveKey="created" onTabClick={(key)=>{
						this.setState({
							type:key,
							page:1,
							streams:[]
						},()=>{
							this.getList();
						})
					}}>
					<TabPane tab="已发起" key="created" className={style.tabItemWrap}  >
						<ReactIScroll
							iScroll={iScroll}
							options={{...global.iscrollOptions}}
							onScrollEnd={this.scrollEnd}
						>
							<div>
								{
									streams.length>0 && streams.map((item,index)=>{
										return <StreamReleaseItem key={item.id} {...item} />
									})
								}
							</div>
						</ReactIScroll>
					</TabPane>
					<TabPane tab="已购买" key="bought" className={style.tabItemWrap} >
						<ReactIScroll
							iScroll={iScroll}
							options={{...global.iscrollOptions}}
							onScrollEnd={this.scrollEnd}
						>
							<div>
							{
								streams.length>0 && streams.map((item,index)=>{
									return <StreamPurchaseItem key={item.id} {...item} />
								})
							}
						</div>
						</ReactIScroll>
					</TabPane>
					<TabPane tab="已预约" key="reservation" className={style.tabItemWrap} >
						<ReactIScroll
							iScroll={iScroll}
							options={{...global.iscrollOptions}}
							onScrollEnd={this.scrollEnd}
						>
							<div>
							{
								streams.length>0 && streams.map((item,index)=>{
									return <StreamItem key={item.id} {...item} />
								})
							}
						</div>
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
)(MyStreamList);










