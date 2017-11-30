
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
					options={{...global.iscrollOptions}}
				>
					<List>
						<WhiteSpace size="xs" />
						<List.Item >
							<span className={style.listTitle}>试题名称</span>
							<span className={style.listContent}>{this.props.topic}</span>
						</List.Item>
						<List.Item >
							<span className={style.listTitle}>出题专家</span>
							<span className={style.listContent}>{this.props.doctor.doctor_name}</span>
						</List.Item>
						
						<List.Item >
							<span className={style.listTitle}>相关科室</span>
							<div className={style.listKeyWordsContent}>
								{
									this.props.departments.map((item,index)=>{
										return <Tag selected key={index} className={style.listKeyWordsItem}>{item}</Tag>
									})
								}
							</div>
						</List.Item>

						<List.Item >
							<div className={style.listIntroduction}>{this.props.introduction}</div>
						</List.Item>
					</List>
				</ReactIScroll>
			</div>
		);
	}
}