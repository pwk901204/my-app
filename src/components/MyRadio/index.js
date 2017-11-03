import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import duihao from "svg/duihao.svg";

export default class MyRadio extends Component {
	render() {
		return (
			<div className={style.MyRadio} style={this.props.style}>
				{
					this.props.checked && <Icon type={duihao} className={style.icon} />
				}
			</div>
		);
	}
}

