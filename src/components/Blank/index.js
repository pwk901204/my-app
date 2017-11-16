import React, { Component } from 'react';
import style from './index.css';
import {Icon} from 'antd-mobile';
import blank from 'svg/blank.svg';

export default class Blank extends Component {
	render() {
		return (
			<div className={style.Blank}>
				<Icon type={blank} className={style.BlankIcon}/>
				<p>{this.props.text ? this.props.text : "暂无内容" }</p>
			</div>
		);
	}
}


