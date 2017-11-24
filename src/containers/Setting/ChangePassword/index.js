import React, { Component } from 'react';
import style from './index.css';
import {List, Button, InputItem, Toast, ActivityIndicator} from 'antd-mobile';
import { browserHistory } from 'react-router';
import {connect} from "react-redux";
import { createForm } from 'rc-form';

import {userInfo} from "reduxs/userInfo";

class ChangePassword extends Component {
	state = {
		loading:false,
	}
	componentWillUnmount() {
		this.getUser();
	}
	getUser= ()=>{
		return window.HOCFetch({ needToken:true })(global.url.current_user + "?token=" + this.props.userInfo.token )
		.then((response)=>response.json())
		.then((data)=>{
			this.props.userInfoAction(data.user);
			browserHistory.push('/HomePage/3');
		})
	}
	fnSubmit = ()=>{
		let _this = this;
		this.props.form.validateFields((err, values)=>{
			_this.setState({
				loading:true
			})
			console.log(values)
			let data = {};
			data.token = this.props.userInfo.token;
			data.old_password = values.old_password;
			data.password = values.password;
			data.type = "password";

			window.HOCFetch({ needToken:true })(global.url.userinfos_change_user_info,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then((response)=>response.json())
			.then((data)=>{
				_this.setState({
					loading:false
				})
				if(data.message==="ok"){
					Toast.info("修改成功",1.5);
					this.getUser();
					browserHistory.push('/HomePage/3');
				}else{
					Toast.info(data.message,1.5);
				}
			})
		})
	}

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className={style.changePassword}>
				<List className={style.list}>
					<InputItem
						 {...getFieldProps('old_password',{
						 	rules: [{ required: true, message: '请输入新密码！' }]
						 })}
						type="password"
						placeholder="请输入原密码"
						labelNumber={3}
						clear={true}
						className={style.text}
					>
						原密码
					</InputItem>

					<InputItem
						 {...getFieldProps('password',{
						 	rules: [{ required: true, message: '请输入新密码！' }]
						 })}
						type="password"
						placeholder="请输入新密码"
						labelNumber={3}
						clear={true}
						className={style.text}
					>
						新密码
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" onClick={this.fnSubmit} >提交</Button>
				<ActivityIndicator toast animating={this.state.loading} />
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
			userInfoAction:(data)=>{
				dispatch(userInfo(data))
			}
		}
	}
)(createForm()(ChangePassword));
