import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, InputItem, Toast, ActivityIndicator} from 'antd-mobile';
import {connect} from "react-redux";
import { createForm } from 'rc-form';
import shouji from "svg/shouji.svg";

import yanzhengma from "svg/yanzhengma.svg";

import {userInfo} from "reduxs/userInfo";

class BindPhone extends Component {
	state = {
		sendCodeing:false,
		second:30,
		loading:false,
		timer:null,
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
		this.getUser();
	}
	getUser= ()=>{
		return window.HOCFetch({ needToken:true })(global.url.current_user + "?token=" + this.props.userInfo.token )
		.then((response)=>response.json())
		.then((data)=>{
			this.props.userInfoAction(data.user);
		})
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
				data.token = this.props.userInfo.token;
				data.mobile =  values.mobile.replace(/\s+/g, '');
				data.code = values.sendCodeing;
				data.type = "mobile";

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
						global.customizeHistory.push('/HomePage/3');
					}else{
						Toast.info(data.message,1.5);
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
					window.HOCFetch({ needToken:true })(global.url.sendCode + "?mobile=" + values.mobile.replace(/\s+/g, '') + "&type=change_new_mobile")
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
						{...getFieldProps('sendCodeing',{
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
)(createForm()(BindPhone));
