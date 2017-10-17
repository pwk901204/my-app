import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";
import {Link} from "react-router";

export default class StreamItem extends Component {
	render() {
		return (
			<Link to={`/StreamDetail/${this.props.id}`} className={style.item} key={this.props.id}>
				<div className={style.left}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					{this.props.stream_type === "已结束" && <span >{this.props.stream_type}</span>}
					{this.props.stream_type === "直播中" && <span className={style.red}>{this.props.stream_type}</span>}
					{this.props.stream_type === "未开始" && <span className={style.blue}>{this.props.stream_type}</span>}
				</div>
				<div className={style.right}>
					<h5>{this.props.topic}</h5>
					<div>
						<span>{this.props.hospital_name}</span>
						<span>{this.props.department_name}</span>
					</div>
					<div>
						<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>{this.props.doctor_name}</span></p>
						<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>{this.props.watch_number}</span></p>
						<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={this.props.price > 0 ? style.fontRed : style.fontBlue }>{this.props.price > 0 ? `¥${this.props.price}` : "免费"}</span></p>
					</div>
				</div>
			</Link>
		);
	}
}


