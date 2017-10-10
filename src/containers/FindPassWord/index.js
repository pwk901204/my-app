import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank,} from 'antd-mobile';
import { createForm } from 'rc-form';
import mima from "svg/mima.svg";
import shouji from "svg/shouji.svg";
import logo from "svg/logo.svg";
import yanzhengma from "svg/yanzhengma.svg";

class FindPassWordForm extends Component {
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
			<div>
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
						type="text"
						placeholder="验证码"
						labelNumber={2}
						clear={true}
						extra={<span className={style.yanzhengmaExtra}>获取验证码</span>}
					>
						<Icon type={yanzhengma} className={style.formIcon}/>
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
				<Button className={style.btn} type="primary" disabled >完成</Button>
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

