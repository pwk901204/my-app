import React, { Component } from 'react';
import style from './index.css';
import {List, Button, InputItem, Toast, WingBlank ,Picker, ActivityIndicator} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from "react-redux";
import url from "api_url/index.js";
import {hashHistory} from "react-router";

class MeetOffLineEnroll extends Component {
	state={
		loading:false,
		sex:[{value:"男",label:"男"},{value:"女",label:"女"}]
	}

	componentDidMount() {
	}

	fnSubmit = ()=>{
		console.log(this.props.form)
		let _this = this;
		this.props.form.validateFields((err, values)=>{
			console.log(err)
			if(err){
				for(var name in err){
					Toast.info(err[name].errors[0].message);
					break;
				}
			}else{
				// console.log(values)
				// _this.setState({
				// 	loading:true
				// })
				// let data = {user:{}}
				// data.user.type = this.props.registerInfo.identity;
				// data.user.password = this.props.registerInfo.password;
				// data.user.mobile = this.props.registerInfo.mobile;
				// data.user.name = values.name;
				// data.user.hospital = values.hospital[0];
				// data.user.region = values.region[1];
				// data.user.department = values.department[1];
				// data.user.title = values.title[0];
				// fetch(url.sign_up,{
				// 	method:"POST",
				// 	headers:{
				// 		"Content-Type":"application/json"
				// 	},
				// 	body:JSON.stringify(data)
				// })
				// .then((response)=>response.json())
				// .then((data)=>{
				// 	_this.setState({
				// 		loading:false
				// 	})
				// 	this.props.userInfoAction(data.user);
				// 	hashHistory.push("/HomePage");
				// })
			}
		})
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className={style.meetOffLineEnroll}>
				<WingBlank >
					<div className={style.title}>
						<span>联系人信息</span>
						<i>会议说明</i>
					</div>
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
						<InputItem
							 {...getFieldProps('phone',{
							 	rules: [{ required: true, message: '请输入姓名！' }]
							 })}
							type="phone"
							placeholder="填写手机"
							labelNumber={2}
							clear={true}
							className={style.text}
						>
							手机
						</InputItem>
						<Picker
							data={this.state.sex}
							title="性别"
							cols={1}
							{...getFieldProps('sex', {
								rules: [{ required: true, message: '请选择性别' }],
							})}
						>
							<List.Item arrow="horizontal" className={style.listItem} >性别</List.Item>
						</Picker>

						<InputItem
							 {...getFieldProps('email',{
							 	rules: [{ required: true, message: '请输入邮件！' }]
							 })}
							type="text"
							placeholder="填写邮件"
							labelNumber={2}
							clear={true}
							className={style.text}
						>
							邮件
						</InputItem>
						<InputItem
							 {...getFieldProps('title',{
							 	rules: [{ required: true, message: '请输入职称！' }]
							 })}
							type="text"
							placeholder="填写职称"
							labelNumber={2}
							clear={true}
							className={style.text}
						>
							姓名
						</InputItem>
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
				</WingBlank>
				<div className={style.phone}>如有疑问，请致电客服：<a href="tel:4008072700">400-807-2700</a></div>
				<WingBlank ><Button type="primary" onClick={this.fnSubmit} >提交</Button></WingBlank>
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
		}
	}
)(createForm()(MeetOffLineEnroll));

