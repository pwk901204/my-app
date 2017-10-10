import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank, Tabs, Badge ,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
const TabPane = Tabs.TabPane;

class AddVisitorInfoForm extends Component {

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<List className={style.list}>
					<InputItem
						type="text"
						placeholder="填写姓名"
						labelNumber={4}
						clear={true}
						className={style.text}
					>
						姓名
					</InputItem>
				</List>
				<Button className={style.btn} type="primary" disabled >立即体验</Button>
			</div>
		);
	}
}
const AddVisitorInfoFormWrap = createForm()(AddVisitorInfoForm);


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

