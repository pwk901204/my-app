import React, { Component } from 'react';
import style from './index.css';
import {Link} from 'react-router';
import {Icon, WhiteSpace, Carousel, ActivityIndicator} from 'antd-mobile';

import {connect} from "react-redux";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {MeetOffLineItem,MeetStreamItem,MeetRecordItem} from "components/MeetItem/index.js"

class Meet extends Component {
	state = {
		loading:false,
		data:null,
		carousels:null
	}
	componentDidMount(){
		let p1 = this.getDetail();
		let p2 = this.getCarousels();
		this.setState({
			loading:true
		})
		Promise.all([p1,p2]).then(()=>{
			this.setState({
				loading:false,
			})
		})
	}
	getCarousels = ()=>{
		return window.HOCFetch({ needToken:false })(global.url.carousels + "?type=meeting")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			if(data.msg.status === "success"){
				this.setState({
					carousels:data.recommendation,
				})
			}
		})
	}
	getDetail=()=>{
		return window.HOCFetch({ needToken:false })(global.url.coursesMeetings + "?offline_limit=2&stream_limit=2&recording_limit=2")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			if(data.msg.status === "success"){
				this.setState({
					data:data,
				})
			}
		})
	}
	render() {
		let {carousels,data} = this.state;
		return (
			<ReactIScroll
				iScroll={iScroll}
				options={{...global.iscrollOptions}}
			>
				<div className={style.meet}>
					{
						carousels &&
						<Carousel
							className={style.myCarousel}
							autoplay={false}
							infinite
							selectedIndex={0}
							swipeSpeed={35}
							beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
							afterChange={index => console.log('slide to', index)}
						>
							{
								carousels.map((item,index)=>{
									return <a href={item.button} key={index}>
										<img
											src={item.image_srcs.mobile_image}
											alt="img"
										/>
									</a>
								})
							}
						</Carousel>
					}

					<WhiteSpace size="md" />

					<Link to="/MeetOffLineList" className={style.title}>
						<i></i>
						<p>线下会议</p>
						<span>更多</span>
					</Link>

					<ul className={style.List}>
						{
							data && data.offline_meetings.map((item,index)=>{
								return <li key={item.id}><MeetOffLineItem {...item}/></li>
							})
						}
					</ul>

					<WhiteSpace size="md" />

					<Link to="/MeetStreamList" className={style.title}>
						<i></i>
						<p>直播会议</p>
						<span>更多</span>
					</Link>
					<ul className={style.List}>
						{
							data && data.stream_meetings.map((item,index)=>{
								return <li key={item.id}><MeetStreamItem {...item}/></li>
							})
						}
					</ul>
					<WhiteSpace size="md" />

					<Link to="/MeetRecordList" className={style.title}>
						<i></i>
						<p>录播会议</p>
						<span>更多</span>
					</Link>
					<ul className={style.List}>
						{
							data && data.recording_meetings.map((item,index)=>{
								return <li key={item.id}><MeetRecordItem {...item}/></li>
							})
						}
					</ul>

					<ActivityIndicator toast  animating={this.state.loading}/>

				</div>
			</ReactIScroll>
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
)(Meet);
