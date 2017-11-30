import React, { Component } from 'react';
import style from './index.css';
import {Link} from 'react-router';
import {WhiteSpace, Carousel, ActivityIndicator} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {MeetRecordItem} from "components/MeetItem/index.js"

export default class SuZuFei extends Component {
	state = {
		loading:true,
		data:null,
		carousels:null
	}
	componentDidMount(){
		let p1 = this.getDetail();
		let p2 = this.getCarousels();
		Promise.all([p1,p2]).then(()=>{
			this.setState({
				loading:false,
			})
		})
	}
	getCarousels = ()=>{
		return window.HOCFetch({ needToken:false })(global.url.carousels + "?type=shanger")
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
		return window.HOCFetch({ needToken:false })(global.url.coursesMeetings + "?flag=shanger")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			if(data.msg.status === "success"){
				this.setState({
					data:data.meetings,
				})
			}
		})
	}
	render() {
		let {carousels,data,loading} = this.state;
		return (
			<ReactIScroll
				iScroll={iScroll}
				options={{...global.iscrollOptions}}
			>
				<div className={style.suzufei}>
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
					<WhiteSpace/>
					<Link to="/MeetRecordList" className={style.title}>
						<i></i>
						<p>相关视频</p>
					</Link>
					<ul className={style.List}>
						{
							data && data.map((item,index)=>{
								return <li key={item.id}><MeetRecordItem {...item}/></li>
							})
						}
					</ul>
					<ActivityIndicator toast  animating={loading}/>
				</div>
			</ReactIScroll>
		);
	}
}