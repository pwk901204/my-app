
import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class TestDetailInfo extends Component {
	render() {
		let stream = this.props;
		return (
			<div className={style.testDetailInfo}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<List>
						<WhiteSpace size="xs" />
						<List.Item >
							<span className={style.listTitle}>试题名称</span>
							<span className={style.listContent}>国际心血管病的撒点</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>出题专家</span>
							<span className={style.listContent}>出题专家</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>试题简介</span>
							<div className={style.listKeyWordsContent}>
								试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介试题简介
							</div>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>相关科室</span>
							<div className={style.listKeyWordsContent}>
								 <Tag selected className={style.listKeyWordsItem}>全科医疗科</Tag>
							</div>
						</List.Item>
					</List>
				</ReactIScroll>
			</div>
		);
	}
}