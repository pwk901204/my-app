import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank, Tabs, Badge, SegmentedControl, ActivityIndicator} from 'antd-mobile';
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import { createForm } from 'rc-form';
import mima from "svg/mima.svg";
import shouji from "svg/shouji.svg";
import logo from "svg/logo.svg";
import yanzhengma from "svg/yanzhengma.svg";
import url from "api_url/index.js";
import {registerInfo} from "actions/registerInfo";

const TabPane = Tabs.TabPane;

class DoctorForm extends Component {
	state = {
		sendCodeing:false,
		second:30,
		identity:"Doctor",
		loading:false,
		timer:null,
		identity:"Doctor",
		identityIndex:0,
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	}
	handleChange = (e) =>{
		switch(e.nativeEvent.selectedSegmentIndex){
			case 0:
				this.setState({
					identity:"Doctor",
					identityIndex:0,
				})
			break;
			case 1:
				this.setState({
					identity:"Student",
					identityIndex:1,
				})
			break;
			case 2:
				this.setState({
					identity:"Visitor",
					identityIndex:2,
				})
			break;
		}
	}
	handleClick = ()=>{
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
				fetch(url.sendCodeValid + "?mobile=" + values.mobile.replace(/\s+/g, '') + "&code=" + values.code)
					.then((response)=>response.json())
					.then((data)=>{
						_this.setState({
							loading:false
						})
						if(data.msg.status == 'success'){
							_this.props.registerInfoAction({
								identity:this.state.identity,
								mobile:values.mobile.replace(/\s+/g, ''),
								password:values.password
							});
							hashHistory.push("/Add" + this.state.identity + "Info");
						}else{
							Toast.info(data.msg.message);
						}
					})
			}
		})
	}
	handleExtraClick = ()=>{
		this.props.form.validateFields((err, values)=>{
			let _this = this;
			if(err && err.mobile){
				Toast.info(err.mobile.errors[0].message);
			}else{
				if ( !_this.state.sendCodeing ){
					_this.setState({
						loading:true
					})
					fetch(url.sendCode + "?mobile=" + values.mobile.replace(/\s+/g, '') + "&type=sign_in")
					.then((response)=>response.json())
					.then((data)=>{
						console.log(data)
						_this.setState({
							loading:false
						})
						let second = 30;
						Toast.info(data.msg.message);
						if(data.msg.status == "success"){
							_this.setState({
								sendCodeing:true
							})
							clearInterval(_this.state.timer);
							_this.state.timer=setInterval(()=>{
								second--;
								if(second <= 1 ){
									clearInterval(_this.state.timer)
									_this.setState({
										sendCodeing:false,
										second:0
									})
								}
								_this.setState({
									second
								})
							},1000)
						}
					})
				}
			}
		})
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<SegmentedControl
					selectedIndex={this.state.identityIndex}
					values={["医生","学生","访客"]}
					onChange={this.handleChange}
				/>
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
					<InputItem
						{...getFieldProps('password',{
							rules: [
								{ required: true, message: '请输入密码' }
							]
						})}
						type="password"
						placeholder="输入6-16位密码"
						labelNumber={2}
						clear={true}
					>
						<Icon type={mima} className={style.formIcon}/>
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" onClick={this.handleClick} >下一步</Button>
				<h6 className={style.h6}>注册即代表您已阅读并同意</h6>
				<a  className={style.a} href="javascript:;">麦迪森注册协议</a>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}

const DoctorFormWrap = connect (
	(state)=>{
		return {
			registerInfo:state.registerInfo
		}
	},
	(dispatch)=>{
		return {
			registerInfoAction:(data)=>{
				dispatch(registerInfo(data))
			}
		}
	}
)(createForm()(DoctorForm));

class Register extends Component {
	render() {
		return (
			<div className={style.register}>
				<WingBlank style={{height:'100%'}}>
					<DoctorFormWrap />
				</WingBlank>
			</div>
		);
	}
}
export default Register;
