import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";

export default class RecordItem extends Component {
	render() {
		return (
			<div className={style.item} key={this.props.id}>
				<div className={style.left}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<span >{this.props.stream_type}</span>
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
			</div>
		);
	}
}











