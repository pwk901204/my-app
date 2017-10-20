import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, Button, Popup, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class SeriesDetailList extends Component {
	render() {
		return (
			<div className={style.seriesList}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>已更新至第2讲</h5>
						<WhiteSpace size="xs" />
						<div className={style.item}>
							<div className={style.itemTop}>
								<span>
									录播时长30分钟
								</span>
								<span className={style.buy}>
									¥0.1
								</span>
							</div>
							<div className={style.itemBody}>
								<p>标题标题标题标题标题标题标题标题标题标题标题</p>
								<Tag selected>已结束</Tag>
							</div>
						</div>
						<WhiteSpace size="xs" />
						<div className={style.item}>
							<div className={style.itemTop}>
								<span>
									录播时长30分钟
								</span>
								<span className={style.buy}>
									¥0.1
								</span>
							</div>
							<div className={style.itemBody}>
								<p>标题标题标题标题标题标题标题标题标题标题标题</p>
								<Tag selected>已结束</Tag>
							</div>
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

