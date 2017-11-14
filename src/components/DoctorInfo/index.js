
import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import jiantou from "svg/jiantou.svg";

export default class DoctorInfo extends Component {
	render() {
		return (
			<div className={style.doctorInfo}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div >
						<WhiteSpace size="xs" />
						<div className={style.doctorInfoTitle}>
							<img src={this.props.headimgurl} alt="img" />
							<div>
								<h5>{this.props.doctor_name}<span>({this.props.title})</span></h5>
								<p><span>{this.props.hospital_name}</span><span>{this.props.department_name}</span></p>
							</div>
							<Icon type={jiantou} className={style.jiantouIcon}/>
						</div>
						<WhiteSpace size="xs" />
						<div className={style.doctorInfoItem}>
							<h6 className="clearfix">
								<span></span>
								简介
							</h6>
							<div>{this.props.introduction ? this.props.introduction: "暂无信息～"}</div>
						</div>
						<WhiteSpace size="xs" />
						<div className={style.doctorInfoItem}>
							<h6 className="clearfix">
								<span></span>
								擅长
							</h6>
							<div>{this.props.good_at ? this.props.introduction: "暂无信息～"}</div>
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}