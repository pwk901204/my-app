import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs,} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import {hashHistory} from "react-router";
import {RecordReleaseItem,RecordPurchaseItem} from "components/RecordItem";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const TabPane = Tabs.TabPane;

class MyRecordList extends Component {
	state = {
		loading:false,
		recordings:[],
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
		fetch(url.doctors_recordings + "?token=" + this.props.userInfo.token + "&type="+ this.state.type +"&page="+ this.state.page + "&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				recordings:this.state.recordings.concat(data.recordings),
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
		let {recordings} = this.state;
		return (
			<div className={style.myStreamList}>
				<Tabs swipeable={false} defaultActiveKey="created" onTabClick={(key)=>{
						this.setState({
							type:key,
							page:1,
							recordings:[]
						},()=>{
							this.getList();
						})
					}}>
					<TabPane tab="已发起" key="created" className={style.tabItemWrap}  >
						<ReactIScroll
							iScroll={iScroll}
							onScrollEnd={this.scrollEnd}
						>
							<div>
								{
									recordings.length>0 && recordings.map((item,index)=>{
										return <RecordReleaseItem key={item.id} {...item} />
									})
								}
							</div>
						</ReactIScroll>
					</TabPane>
					<TabPane tab="已购买" key="bought" className={style.tabItemWrap} >
						<ReactIScroll
							iScroll={iScroll}
							onScrollEnd={this.scrollEnd}
						>
							<div>
								{
									recordings.length>0 && recordings.map((item,index)=>{
										return <RecordPurchaseItem key={item.id} {...item} />
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
)(MyRecordList);










