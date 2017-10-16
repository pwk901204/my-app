import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import StreamItem from "components/StreamItem/index.js";
import xialajiantou from "svg/xialajiantou.svg";
import LiveVideo from "components/LiveVideo"

class StreamDetail extends Component {
	state = {
		loading:false
	}
	render() {
		return (
			<div className={style.streamList}>
				<LiveVideo cover_url="http://www.iteye.com/images/logo.gif?1448702469" pull_url_http="http://www.iteye.com/images/logo.gif?1448702469" />
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}

export default connect (
	(state)=>{
		return {
			userInfo:state.userInfo
		}
	},
	()=>{
		return {
		}
	}
)(StreamDetail);


