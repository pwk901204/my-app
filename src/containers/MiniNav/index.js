import React, { Component } from 'react';
import style from './index.css';
import { Modal, Icon} from 'antd-mobile';
import caidan from "svg/caidan.svg";
const operation = Modal.operation;
export default class MiniNav extends Component {
	render() {
		return (
				<div className={style.wrap}>
					<div
						className={style.miniNav}
						onClick={() => operation([
							{ text: '首页', onPress: () => global.customizeHistory.push("/HomePage") },
							{ text: '个人中心', onPress: () => global.customizeHistory.push("/HomePage/3") },
							{ text: '联系客服', onPress: () => console.log('置顶聊天被点击了') },
						])}
					>
						<Icon type={caidan} className={style.caidan}/>
					</div>
					{this.props.children}
				</div>
		);
	}
}

