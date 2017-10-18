import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, Button, Popup, List} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class SeriesList extends Component {

	onClick = () => {
		console.log(1)
		Popup.show(
			<div>
				<List renderHeader={this.renderHeader}
				className="popup-list"
				>
					{['股票名称', '股票代码', '买入价格', '买入数量', '更多', '更多'].map((i, index) => (
					  <List.Item key={index}>{i}</List.Item>
					))}
				</List>
					<ul style={{ padding: '0.18rem 0.3rem', listStyle: 'none' }}>
					<li style={{ marginTop: '0.18rem' }}>
					  <Button type="primary" onClick={() =>  Popup.hide()}>买入</Button>
					</li>
				</ul>
			</div>,
			{ animationType: 'slide-up', onTouchStart: e => e.preventDefault(), maskClosable: false }
		);
	};
	render() {
		return (
			<div className={style.seriesList}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<Button className={style.btn} size="small" type="primary" inline onClick={this.onClick}>付费观看</Button>
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

