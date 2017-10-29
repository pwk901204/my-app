
import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,WhiteSpace} from 'antd-mobile';

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import TestItem from "components/Test/TestItem";


class TestList extends Component {
	state={
		loading:false
	}
	componentDidMount(){
		console.log(this.refs.tabBarWrap.style);
		this.refs.tabBarWrap.style.width=`${6*1.7}rem`;
	}
	render() {
		return (
			<div className={style.testList}>
				<div className={style.tabBarWrap}>
					<ReactIScroll
						iScroll={iScroll}
						options={{
							scrollX: true,
							scrollY: false
						}}
					>
						<div className={style.tabBar} ref="tabBarWrap">
							<div className={style.active}>全部</div>
							<div>朱天刚</div>
							<div>朱天刚</div>
							<div>朱天刚</div>
							<div>朱天刚</div>
							<div>朱天刚</div>
						</div>
					</ReactIScroll>
				</div>
				<WhiteSpace size='sm' />
				<div className={style.listWrap}>
					<ReactIScroll
						iScroll={iScroll}
					>
						<div className={style.list}>
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
							<TestItem />
						</div>
					</ReactIScroll>
				</div>
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}
export default TestList;





