
import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
moment.lang('zh-cn');

export default class StreamInfo extends Component {
	render() {
		let stream = this.props;
		return (
			<div className={style.streamInfo}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<List>
						<WhiteSpace size="xs" />
						<List.Item >
							<span className={style.listTitle}>主题</span>
							<span className={style.listContent}>{stream.topic}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>开讲</span>
							<span className={style.listContent}>{moment(stream.start_time).format('YYYY-MM-DD HH:mm')}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>时长</span>
							<span className={style.listContent}>{stream.duration}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>费用</span>
							<span className={`${style.listContent} fontBlue`}>{Number(stream.price)?stream.price:"免费"}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>涉及科室</span>
							<span className={style.listContent}>{stream.departments.join(",")}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>关键词</span>
							<div className={style.listKeyWordsContent}>
								{
									stream.tags.map((item,index)=>{
										return <Tag key={index} selected className={style.listKeyWordsItem}>{item}</Tag>
									})
								}
							</div>
						</List.Item>
						<List.Item >
							<span className={style.listIntroduction}>{stream.introduction}</span>
						</List.Item>
					</List>
				</ReactIScroll>
			</div>
		);
	}
}