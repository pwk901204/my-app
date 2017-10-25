import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";
import {Link} from "react-router";
export default class RecordItem extends Component {
	render() {
		return (
			<Link to={`/RecordDetail/${this.props.id}`} className={style.item} key={this.props.id}>
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
						<p>
							<Icon type={yisheng} className={style.icon} />
							{this.props.doctor_name}
						</p>
						<p>
							<Icon type={renshu} className={style.icon}  />
							{this.props.watch_number}
						</p>
						<p className={this.props.price > 0 ? style.fontRed : style.fontBlue }>
							<Icon type={feiyong} className={style.icon}  />
							{this.props.price > 0 ? `¥${this.props.price}` : "免费"}
						</p>
					</div>
				</div>
			</Link>
		);
	}
}











