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

class BindPhone extends Component {
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
			<div className={style.bindPhone}>
				<List className={style.list}>
					<InputItem
						{...getFieldProps('mobile',{
							rules: [
								{ required: true, message: '请输入手机号' },
								{ len:13 ,  message: '手机号位数错误'}
							]
						})}
						placeholder="请输入您的手机号"
						type="phone"
						labelNumber={2}
						clear={true}
					>
						<Icon type={shouji} className={style.formIcon}/>
					</InputItem>
					<InputItem
						{...getFieldProps('code',{
							rules: [
								{ required: true, message: '请输入验证码'}
							]
						})}
						type="number"
						placeholder="验证码"
						labelNumber={2}
						clear={true}
						extra={<span className={style.yanzhengmaExtra}>{ this.state.sendCodeing ? this.state.second + "s后重新获取" :"获取验证码"}</span>}
						onExtraClick={this.handleExtraClick}
					>
						<Icon type={yanzhengma} className={style.formIcon}/>
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
			registerInfo:state.registerInfo
		}
	},
	(dispatch)=>{
		return {
		}
	}
)(createForm()(BindPhone));
