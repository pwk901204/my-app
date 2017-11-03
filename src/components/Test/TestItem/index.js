import React, { Component } from 'react';
import style from './index.css';
import {Link} from "react-router";
class TestItem extends Component {
	render() {
		return (
			<Link to={"TestDetail/" + this.props.id} className={style.testItem}>
				<div className={style.left}>
					<img src={this.props.cover_data.size_300} alt="img"/>
					<span>更新至第{this.props.exams_count}期</span>
				</div>
				<div className={style.right}>
					<h5>{this.props.topic}</h5>
					<p><i>出题人：</i>{this.props.doctor_name}</p>
					<span>{this.props.department_name}</span>
				</div>
			</Link>
		);
	}
}
export default TestItem;

