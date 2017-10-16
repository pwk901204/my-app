import React, { Component } from 'react';
import style from './index.css';
import {Icon, WhiteSpace, ActivityIndicator} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";
import {connect} from "react-redux";
import url from "api_url/index.js";

class VideoCollege extends Component {
	state = {
		loading:false,
		data:null
	}
	componentDidMount(){
		this.getDetail();
	}
	getDetail = ()=>{
		//http://rqiang.mynatapp.cc/api/doctor/courses/streams?stream_limit=2&recording_limit=2&course_limit=2
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
					<a href="javascript:;" className={style.title}>
						<i></i>
						<p>热门直播</p>
						<span>更多</span>
					</a>
					{
						streams && streams.map((item,index)=>{
							return (
								<div className={style.item} key={item.id}>
									<div className={style.left}>
										<img src={item.cover_data.size_300} alt="img"/>
										{item.stream_type === "已结束" && <span >{item.stream_type}</span>}
										{item.stream_type === "直播中" && <span className={style.red}>{item.stream_type}</span>}
										{item.stream_type === "未开始" && <span className={style.blue}>{item.stream_type}</span>}
									</div>
									<div className={style.right}>
										<h5>{item.topic}</h5>
										<div>
											<span>{item.hospital_name}</span>
											<span>{item.department_name}</span>
										</div>
										<div>
											<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>{item.doctor_name}</span></p>
											<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>{item.watch_number}</span></p>
											<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={item.price > 0 ? style.fontRed : style.fontBlue }>{item.price > 0 ? `¥${item.price}` : "免费"}</span></p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<WhiteSpace size="md" />

				<div className={style.record}>
					<a href="javascript:;" className={style.title}>
						<i></i>
						<p>精彩录像</p>
						<span>更多</span>
					</a>
					{
						recordings && recordings.map((item,index)=>{
							return (
								<div className={style.item} key={item.id}>
									<div className={style.left}>
										<img src={item.cover_data.size_300} alt="img"/>
										<span >{item.stream_type}</span>
									</div>
									<div className={style.right}>
										<h5>{item.topic}</h5>
										<div>
											<span>{item.hospital_name}</span>
											<span>{item.department_name}</span>
										</div>
										<div>
											<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>{item.doctor_name}</span></p>
											<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>{item.watch_number}</span></p>
											<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={item.price > 0 ? style.fontRed : style.fontBlue }>{item.price > 0 ? `¥${item.price}` : "免费"}</span></p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<WhiteSpace size="md" />

				<div className={style.series}>
					<a href="javascript:;" className={style.title}>
						<i></i>
						<p>经典系列</p>
						<span>更多</span>
					</a>
					{
						courses && courses.map((item,index)=>{
							return (
								<div className={style.item} key={item.id}>
									<div className={style.left}>
										<img src={item.cover_data.size_300} alt="img"/>
										<span className={style.blue}>共{item.lesson_index}讲</span>
									</div>
									<div className={style.right}>
										<h5>{item.topic}</h5>
										<div>
											<span>{item.hospital_name}</span>
											<span>{item.department_name}</span>
										</div>
										<div>
											<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>{item.doctor_name}</span></p>
											<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>{item.watch_number}</span></p>
											<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={item.price > 0 ? style.fontRed : style.fontBlue }>{item.price > 0 ? `¥${item.price}` : "免费"}</span></p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<ActivityIndicator toast  animating={this.state.loading}/>
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
