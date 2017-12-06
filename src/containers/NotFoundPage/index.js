import React, { Component } from 'react';
import style from './index.css';
import {connect} from "react-redux";
import { Button, Icon} from 'antd-mobile';

import img404 from "images/img404.png";
class NotFoundPage extends Component {
	render() {
		return (
			<div className={style.page404Wrap}>
				<div className={style.page404}>
					<img src={img404} className={style.img404}/>
					<div className={style.btnWrap}>
						<Button type="ghost" size="small" inline className={style.btn} onClick={()=>{global.customizeHistory.push("/")}}>返回主页</Button>
						<Button type="ghost" size="small" inline className={style.btn} onClick={()=>{window.location.reload()}} >刷新一下</Button>
					</div>
				</div>
			</div>
		);
	}
}


export default connect (
	(state)=>{
		return {
		}
	},
	()=>{
		return {
		}
	}
)(NotFoundPage);
