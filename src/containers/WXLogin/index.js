import React, { Component } from 'react';
import {connect} from "react-redux";

class WXLogin extends Component {
	componentDidMount(){
		if(!this.props.userInfo.auth){
  			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2567a448e97bfc85&redirect_uri="+ encodeURIComponent(window.location.origin + "/mobile") +"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
  		}else{
  			global.customizeHistory.push("/")
  		}
	}
	render() {
		return (
			<div></div>
		);
	}
}
export default connect (
	(state)=>{
		return {
			userInfo:state.userInfo
		}
	},
	(dispatch)=>{
		return {
		}
	}
)(WXLogin);
