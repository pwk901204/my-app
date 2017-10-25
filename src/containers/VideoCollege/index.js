import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, ActivityIndicator} from 'antd-mobile';
import { connect } from "react-redux";
import {Link} from 'react-router';
import url from "api_url/index.js";
import StreamItem from "components/StreamItem/index.js";
import RecordItem from "components/RecordItem/index.js";
import SeriesItem from "components/SeriesItem/index.js";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
class VideoCollege extends Component {
	state = {
		loading:false,
		data:null
	}
	componentDidMount(){
		this.getDetail();
	}
	getDetail = ()=>{
		this.setState({
			loading:true
		})
		fetch(url.courses_streams + "?token=" + this.props.userInfo.token + "&stream_limit=2&recording_limit=2&course_limit=2")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
			})
			if(data.msg.status === "success"){
				this.setState({
					...data,
				})
			}
		})
	}
	render() {
		let {advertisement, courses, recordings, streams} = this.state;
		return (
			<div className={style.videoCollege}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						{
							advertisement &&
							<video
								className={style.video}
								autoPlay
								loop
								src={advertisement.url}
							>您的浏览器不支持 video 标签
							</video>
						}
						<WhiteSpace size="md" />

						<div className={style.stream}>
							<Link to="/StreamList" className={style.title}>
								<i></i>
								<p>热门直播</p>
								<span>更多</span>
							</Link>
							{
								streams && streams.map((item,index)=>(<StreamItem {...item} key={item.id} />))
							}
						</div>
						<WhiteSpace size="md" />

						<div className={style.record}>
							<Link to="/RecordList" className={style.title}>
								<i></i>
								<p>精彩录像</p>
								<span>更多</span>
							</Link>
							{
								recordings && recordings.map((item,index)=>(<RecordItem {...item} key={item.id} />))
							}
						</div>
						<WhiteSpace size="md" />

						<div className={style.series}>
							<Link to="/SeriesList" className={style.title}>
								<i></i>
								<p>经典系列</p>
								<span>更多</span>
							</Link>
							{
								courses && courses.map((item,index)=>(<SeriesItem {...item} key={item.id} />))
							}
						</div>
						<ActivityIndicator toast  animating={this.state.loading}/>
					</div>
				</ReactIScroll>
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
)(VideoCollege);
