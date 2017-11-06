import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";
import {Link} from "react-router";
export class RecordItem extends Component {
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

export class RecordReleaseItem extends Component {
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
						<span style={{width:"100%"}}>{this.props.department_name}</span>
					</div>
					<div>
						<p className={this.props.price > 0 ? style.fontRed : style.fontBlue }>
							<Icon type={feiyong} className={style.icon}  />
							{this.props.price > 0 ? `¥${this.props.price}` : "免费"}
						</p>
						<p style={{width:"50%"}}>
							购买人数：
							{this.props.watch_number}
						</p>
					</div>
				</div>
			</Link>
		);
	}
}

export class RecordPurchaseItem extends Component {
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
						<span style={{width:"50%"}}>{this.props.department_name}</span>
						<span style={{width:"50%"}}>{this.props.doctor_name}</span>
					</div>
					<div>
						<p style={{width:"100%"}}>
							订单号：
							<span className="fontRed">{this.props.order_no}</span>
						</p>
					</div>
				</div>
			</Link>
		);
	}
}










