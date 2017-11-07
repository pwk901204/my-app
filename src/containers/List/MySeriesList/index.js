import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator, Tabs,} from 'antd-mobile';
import {connect} from "react-redux";

import {hashHistory} from "react-router";
import {SeriesReleaseItem,SeriesPurchaseItem} from "components/SeriesItem";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const TabPane = Tabs.TabPane;

class MySeriesList extends Component {
	state = {
		loading:false,
		courses:[],
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
		fetch(global.url.doctors_courses + "?token=" + this.props.userInfo.token + "&type="+ this.state.type +"&page="+ this.state.page + "&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				courses:this.state.courses.concat(data.courses),
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
		let {courses} = this.state;
		return (
			<div className={style.mySeriesList}>
				<Tabs swipeable={false} defaultActiveKey="created" onTabClick={(key)=>{
						this.setState({
							type:key,
							page:1,
							courses:[]
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
									courses.length>0 && courses.map((item,index)=>{
										return <SeriesReleaseItem key={item.id} {...item} />
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
									courses.length>0 && courses.map((item,index)=>{
										return <SeriesPurchaseItem key={item.id} {...item} />
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
)(MySeriesList);










