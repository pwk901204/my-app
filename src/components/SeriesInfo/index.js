
import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class SeriesInfo extends Component {
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
							<span className={style.listTitle}>总价</span>
							<span className={style.listContent}>{stream.price}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>涉及科室</span>
							<span className={style.listContent}>{stream.departments.join(",")}</span>
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