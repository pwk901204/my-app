import React, { Component } from 'react';
import style from './index.css';
import {List} from 'antd-mobile';
import {hashHistory} from "react-router";
import {connect} from "react-redux";
const Item = List.Item;

class Accounts extends Component {
	state={
		loading:false
	}
	render() {
		return (
			<div className={style.introduction}>
				<List>
			        <Item extra={this.props.userInfo.mobile} arrow="horizontal" onClick={() => {
			        	hashHistory.push("/BindPhone")
			        }}>绑定手机号</Item>
       			</List>
       			<List>
       				<Item arrow="horizontal" onClick={() => {
       					hashHistory.push("/ChangePassword")
       				}}>修改密码</Item>
       			</List>
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
	(dispatch)=>{
		return {
		}
	}
)(Accounts);