import React, { Component } from 'react';
import style from './index.css';

class TestItem extends Component {
	render() {
		return (
			<div className={style.testItem}>
				<div className={style.left}>
					<img src="http://image.beekka.com/blog/2015/bg2015033101.png" alt="img"/>
					<span>更新至第12期</span>
				</div>
				<div className={style.right}>
					<h5>国际心血管病学会每周试题</h5>
					<p><i>出题人：</i>严干新教授</p>
					<span>北京大学人民医院</span>
				</div>
			</div>
		);
	}
}
export default TestItem;

