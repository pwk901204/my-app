import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List, Button} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class ChatRoom extends Component {
	render() {
		return (
			<div className={style.chatRoom}>
				<div className={style.chatRoomContent}>
					<span className={style.chatIcon1}>共3人报名</span>
					<span className={style.chatIcon2}>10人共打赏了100元</span>
					<ReactIScroll
						iScroll={iScroll}
					>
						<div>
							<WhiteSpace size="xs" />
							<div className={style.message}>
								<div className={style.icon}>
									<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
									<p>文字文字文字文字</p>
								</div>
								<div className={style.content}>
									<span></span>
									文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
								</div>
							</div>
							<div className={style.message}>
								<div className={style.icon}>
									<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
									<p>文字文字文字文字</p>
								</div>
								<div className={style.content}>
									<span></span>
									文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
								</div>
							</div>
							<div className={style.message}>
								<div className={style.icon}>
									<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
									<p>文字文字文字文字</p>
								</div>
								<div className={style.content}>
									<span></span>
									文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
								</div>
							</div>
						</div>
					</ReactIScroll>
				</div>

				<div className={style.chatRoomInput}>
					<input placeholder="123123" />
					<Button type="primary" size="small" className={style.btn}>发送</Button>
				</div>
			</div>
		);
	}
}

