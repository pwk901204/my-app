import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
moment.lang('zh-cn');

export default class MeetStreamInfo extends Component {
	render() {
		return (
			<div className={style.meetInfo}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<List>
						<WhiteSpace size="xs" />
						<List.Item >
							<span className={style.listTitle}>主题:</span>
							<span className={style.listContent}>{this.props.title}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>时间:</span>
							<span className={style.listContent}>{moment(this.props.start_time).format('YYYY-MM-DD HH:mm')}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>主办方:</span>
							<span className={style.listContent}>{this.props.sponsor}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>费用:</span>
							<span className={`${style.listContent} ${style.fontBlue}`}>{Number(this.props.price)?this.props.price:"免费"}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>对象:</span>
							<span className={style.listContent}>{this.props.target}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>主讲:</span>
							<span className={style.listContent}>{this.props.authors}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>会议简介:</span>
							<span className={style.listContent}>{this.props.body}</span>
						</List.Item>
					</List>
				</ReactIScroll>
			</div>
		);
	}
}