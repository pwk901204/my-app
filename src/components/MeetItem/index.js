import React, { Component } from 'react';
import {Link} from "react-router"
import style from './index.css';
import renshu from "svg/renshu.svg";
import didian from "svg/didian.svg";
import jinbi from "svg/jinbi.svg";
import {Icon} from 'antd-mobile';
import moment from 'moment';
moment.lang('zh-cn');
export class MeetOffLineItem extends Component {
	render() {
		return (
			<Link to={"/MeetOffLineDetail/" + this.props.id } className={style.MeetItem}>
				<div className={style.title}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<p>
						<span>{moment(this.props.start_time).format('YYYY-MM-DD')}</span>
						{this.props.meeting_status == "not_begin" && <span>未开始</span>}
						{this.props.meeting_status == "live" && <span className={style.ing}>进行中</span>}
						{this.props.meeting_status == "ended" && <span className={style.over}>已结束</span>}
					</p>
				</div>
				<h5>{this.props.topic}</h5>
				<div className={style.content}>
					<span>
						<Icon type={renshu} className={style.icon}  />{this.props.meeting_attendees_count}
					</span>
					<span>
						<Icon type={didian} className={style.icon}  />{this.props.city}
					</span>
				</div>
			</Link>
		);
	}
}

export class MeetStreamItem extends Component {
	render() {
		return (
			<Link to={"/MeetStreamDetail/"+this.props.id+"/"+this.props.stream_id} className={style.MeetItem}>
				<div className={style.title}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<p>
						<span>{moment(this.props.start_time).format('YYYY-MM-DD')}</span>
						{this.props.meeting_status == "not_begin" && <span>未开始</span>}
						{this.props.meeting_status == "live" && <span className={style.ing}>进行中</span>}
						{this.props.meeting_status == "ended" && <span className={style.over}>已结束</span>}
					</p>
				</div>
				<h5>{this.props.topic}</h5>
				<div className={style.content}>
					<span>
						<Icon type={renshu} className={style.icon}/>{this.props.meeting_attendees_count}
					</span>
					<span className={Number(this.props.price) ? style.fontRed : style.fontBlue}>
						<Icon type={jinbi} className={style.icon}/>{ Number(this.props.price) ? "¥"+this.props.price : "免费"}
					</span>
				</div>
			</Link>
		);
	}
}

export class MeetRecordItem extends Component {
	render() {
		return (
			<Link to={"/MeetRecordDetail/"+this.props.id} className={style.MeetItem}>
				<div className={style.title}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<p><span style={{width:"100%",textAlign:"center"}}>共18节</span></p>
				</div>
				<h5>{this.props.topic}</h5>
				<div className={style.content}>
					<span>
						<Icon type={renshu} className={style.icon}  />{this.props.meeting_attendees_count}
					</span>
					<span className={Number(this.props.price) ? style.fontRed : style.fontBlue}>
						<Icon type={jinbi} className={style.icon}  />{ Number(this.props.price) ? "¥"+this.props.price : "免费"}
					</span>
				</div>
			</Link>
		);
	}
}

//我的直播会议
export class MyMeetStreamItem extends Component {
	render() {
		return (
			<Link to={"/MeetStreamDetail/"+this.props.id+"/"+this.props.stream_id} className={style.MeetItem}>
				<div className={style.title}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<p>
						<span>{moment(this.props.start_time).format('YYYY-MM-DD')}</span>
						{this.props.meeting_status == "not_begin" && <span>未开始</span>}
						{this.props.meeting_status == "live" && <span className={style.ing}>进行中</span>}
						{this.props.meeting_status == "ended" && <span className={style.over}>已结束</span>}
					</p>
				</div>
				<h5>{this.props.topic}</h5>
				<div className={style.content}>
					<span className="fontRed" style={{width:"100%"}}>订单编号：{this.props.order_no}</span>
				</div>
			</Link>
		);
	}
}

//我的线下会议
export class MyMeetOffLineItem extends Component {
	render() {
		return (
			<Link to={"/MeetOffLineDetail/" + this.props.id } className={style.MeetItem}>
				<div className={style.title}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<p>
						<span>{moment(this.props.start_time).format('YYYY-MM-DD')}</span>
						<span><Icon type={didian} className={style.icon}  />{this.props.city}</span>
					</p>
				</div>
				<h5>{this.props.topic}</h5>
				<div className={style.content}>
					<span className="fontRed" style={{width:"100%"}}>订单编号：{this.props.order_no}</span>
				</div>
			</Link>
		);
	}
}





