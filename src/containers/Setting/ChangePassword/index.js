import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, InputItem, Toast, WingBlank, SegmentedControl, ActivityIndicator} from 'antd-mobile';
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import { createForm } from 'rc-form';
import mima from "svg/mima.svg";
import shouji from "svg/shouji.svg";

import yanzhengma from "svg/yanzhengma.svg";
import url from "api_url/index.js";
import {registerInfo} from "reduxs/registerInfo";

class ChangePassword extends Component {
	state = {
		sendCodeing:false,
		second:30,
		loading:false,
		timer:null,
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	}
	handleClick = ()=>{
		console.log(11)
	}
	handleExtraClick = ()=>{
		console.log(22)
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className={style.changePassword}>
				<List className={style.list}>
					<InputItem
						 {...getFieldProps('oldPassword',{
						 	rules: [{ required: true, message: '请输入姓名！' }]
						 })}
						type="text"
						placeholder="填写姓名"
						labelNumber={3}
						clear={true}
						className={style.text}
					>
						原密码
					</InputItem>
					<InputItem
						 {...getFieldProps('newPassword',{
						 	rules: [{ required: true, message: '请输入姓名！' }]
						 })}
						type="text"
						placeholder="填写姓名"
						labelNumber={3}
						clear={true}
						className={style.text}
					>
						新密码
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" onClick={this.handleClick} >提交</Button>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}

export default connect (
	(state)=>{
		return {
		}
	},
	(dispatch)=>{
		return {
		}
	}
)(createForm()(ChangePassword));
