import React, { Component } from 'react';
import style from './index.css';
import {List, Button, InputItem, Toast, WingBlank, ActivityIndicator} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from "react-redux";

import {userInfo} from "reduxs/userInfo.js";
import {browserHistory} from "react-router";

class AddVisitorInfoForm extends Component {
	state={
		loading:false
	}
	fnSubmit = ()=>{
		let _this = this;
		this.props.form.validateFields((err, values)=>{
			if(err){
				for(var name in err){
					Toast.info(err[name].errors[0].message);
					break;
				}
			}else{
				console.log(values)
				_this.setState({
					loading:true
				})
				let data = {user:{}}
				data.user.type = this.props.registerInfo.identity;
				data.user.password = this.props.registerInfo.password;
				data.user.mobile = this.props.registerInfo.mobile;
				data.user.name = values.name;
				window.HOCFetch({ needToken:false })(global.url.sign_up,{
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
					this.props.userInfoAction(data.user);
					browserHistory.push("/WXLogin");
				})
			}
		})
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<List className={style.list}>
					<InputItem
						 {...getFieldProps('name',{
						 	rules: [{ required: true, message: '请输入姓名！' }]
						 })}
						type="text"
						placeholder="填写姓名"
						labelNumber={2}
						clear={true}
						className={style.text}
					>
						姓名
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" onClick={this.fnSubmit} >立即体验</Button>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}
const AddVisitorInfoFormWrap = connect (
	(state)=>{
		return {
			registerInfo:state.registerInfo
		}
	},
	(dispatch)=>{
		return {
			userInfoAction:(data)=>{
				dispatch(userInfo(data))
			}
		}
	}
)(createForm()(AddVisitorInfoForm));

class AddVisitorInfo extends Component {
	render() {
		return (
			<div className={style.addVisitorInfo}>
				<p className={style.title}>为了提供给您更好的服务，请您填写真实信息</p>
				<WingBlank >
					<AddVisitorInfoFormWrap />
				</WingBlank>
			</div>
		);
	}
}
export default AddVisitorInfo;
