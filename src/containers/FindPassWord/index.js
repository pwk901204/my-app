import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button,InputItem, Toast, WingBlank, ActivityIndicator} from 'antd-mobile';
import {browserHistory} from "react-router";
import { createForm } from 'rc-form';
import mima from "svg/mima.svg";
import shouji from "svg/shouji.svg";
import yanzhengma from "svg/yanzhengma.svg";



class FindPassWordForm extends Component {
	state = {
		sendCodeing:false,
		second:30,
		identity:"Doctor",
		loading:false,
		timer:null
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
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
				let data = {};
				data.mobile = values.mobile.replace(/\s+/g, '');
				data.code = values.code;
				data.password = values.password;
				window.HOCFetch({ needToken:false })(global.url.update_password,{
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
						if(data.msg.status === 'success'){
							Toast.info(data.msg.message);
							browserHistory.push("/Login");
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
					window.HOCFetch({ needToken:false })(global.url.sendCode + "?mobile=" + values.mobile.replace(/\s+/g, '') + "&type=change_password")
					.then((response)=>response.json())
					.then((data)=>{
						console.log(data)
						_this.setState({
							loading:false
						})
						let second = 30;
						Toast.info(data.msg.message);
						if(data.msg.status === "success"){
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
				<List>
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
						placeholder="输入6-16位的新密码密码"
						labelNumber={2}
						clear={true}
					>
						<Icon type={mima} className={style.formIcon}/>
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" onClick={this.handleClick} >完成</Button>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}

const FindPassWordFormWrap = createForm()(FindPassWordForm);

class FindPassWord extends Component {
	render() {
		return (
			<div className={style.findPassWord}>
				<WingBlank size="md"><FindPassWordFormWrap/></WingBlank>
			</div>
		);
	}
}
export default FindPassWord;

