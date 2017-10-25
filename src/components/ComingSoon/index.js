import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import hourglass from "svg/hourglass.svg";

export default class ComingSoon extends Component {
	render() {
		return (
			<div className={style.comingSoon}>
				<Icon type={hourglass} className={style.icon} />
				<p>敬请期待</p>
			</div>
		);
	}
}

