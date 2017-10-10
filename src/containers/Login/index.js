import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank,} from 'antd-mobile';
import { createForm } from 'rc-form';
import mima from "svg/mima.svg";
import shouji from "svg/shouji.svg";
import logo from "svg/logo.svg";

class LoginForm extends Component {
	state = {
		hasError: false,
		value: '',
	}
	onErrorClick = () => {
		if (this.state.hasError) {
			Toast.info('请输入正确的手机号');
		}
	}
	onChange = (value) => {
		if (value.replace(/\s/g, '').length < 11) {
			this.setState({
				hasError: true,
			});
		} else {
			this.setState({
				hasError: false,
			});
		}
		this.setState({
			value,
		});
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<List>
				<InputItem
					{...getFieldProps('inputtitle2')}
					placeholder="请输入您的手机号"
					type="phone"
					error={this.state.hasError}
					onErrorClick={this.onErrorClick}
					onChange={this.onChange}
					value={this.state.value}
					labelNumber={2}
					clear={true}
				>
					<Icon type={shouji} className={style.formIcon}/>
				</InputItem>
				<InputItem
					type="password"
					placeholder="登录密码"
					labelNumber={2}
					clear={true}
				>
					<Icon type={mima} className={style.formIcon}/>
				</InputItem>
			</List>
		);
	}
}

const LoginFormWrap = createForm()(LoginForm);

class Login extends Component {
	render() {
		return (
			<div className={style.login}>
				<Icon type={logo} className={style.logo}  />
				<WingBlank size="md"><LoginFormWrap/></WingBlank>
				<WingBlank size="md">
					<Button className={style.btn} type="primary" disabled >登录</Button>
				</WingBlank>
				<WingBlank size="md">
					<div className={style.link}>
						<a href="javascript:;">注册新账号</a>
						<a href="javascript:;">忘记密码</a>
					</div>
				</WingBlank>
			</div>
		);
	}
}
export default Login;

