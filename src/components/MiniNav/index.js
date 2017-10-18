import React, { Component } from 'react';
import style from './index.css';
import {hashHistory} from "react-router";
import { Modal, Icon} from 'antd-mobile';
const operation = Modal.operation;
export default class MiniNav extends Component {
	render() {
		return (
				<div
					className={style.miniNav}
					onClick={() => operation([
						{ text: '首页', onPress: () => hashHistory.push("/HomePage") },
						{ text: '个人中心', onPress: () => hashHistory.push("/HomePage/3") },
						{ text: '联系客服', onPress: () => console.log('置顶聊天被点击了') },
					])}
				>
					<Icon type={"check-circle"} />
				</div>
		);
	}
}

