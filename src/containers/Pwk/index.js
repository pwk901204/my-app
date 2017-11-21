import React, { Component } from 'react';
import style from './index.css';
import {Link} from "react-router";
import { Button } from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
class Pwk extends Component {
	componentDidMount(){
		global.wx.ready(function() {

		})
	}
	
	render() {
		return (
			<ReactIScroll
				iScroll={iScroll}
				options={{...global.iscrollOptions}}
			>
				<div>
					<Button type="primary" size="small" className={style.btn} >发送</Button>
				</div>
			</ReactIScroll>
		);
	}
}
export default Pwk;
