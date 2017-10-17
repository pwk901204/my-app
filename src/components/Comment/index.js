import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List, Button} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class Comment extends Component {
	render() {
		return (
			<div className={style.comment}>
				<div className={style.commentList}>
					<ReactIScroll
						iScroll={iScroll}
					>
						<div>
							<WhiteSpace size="xs" />
							<div className={style.commentItem}>
								<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
								<div>
									<h6 className="clearfix"><span>朱天刚</span><i>18天前</i></h6>
									<p>朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚</p>
									<div>
										<span>
											点赞(1)
										</span>
										<span>
											回复
										</span>
									</div>
								</div>
							</div>
							<WhiteSpace size="xs" />
							<div className={style.commentItem}>
								<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg" alt="img" />
								<div>
									<h6 className="clearfix"><span>朱天刚</span><i>18天前</i></h6>
									<p>朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚朱天刚</p>
									<div>
										<span>
											点赞(1)
										</span>
										<span>
											回复
										</span>
									</div>
								</div>
							</div>
							<WhiteSpace size="xs" />
						</div>
					</ReactIScroll>
				</div>

				<div className={style.commentInput}>
					<input placeholder="123123" />
					<Button type="primary" size="small" className={style.btn}>small</Button>
				</div>
			</div>
		);
	}
}

