import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank, Tabs, Badge ,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
//import { district, provinceLite as province } from 'antd-mobile-demo-data';

const TabPane = Tabs.TabPane;
const seasons =[
	[
		{
		  label: '2013',
		  value: '2013',
		},
		{
		  label: '2014',
		  value: '2014',
		},
		],
		[
		{
		  label: '春',
		  value: '春',
		},
		{
		  label: '夏',
		  value: '夏',
		},
	],
];


class AddStudentInfoForm extends Component {
	state={
		sValue: ['2013', '春'],
	}
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
					<Picker
						data={seasons}
						title="地区"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">地区</List.Item>
					</Picker>
					<Picker
						data={seasons}
						title="医院"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">医院</List.Item>
					</Picker>
					<Picker
						data={seasons}
						title="科室"
						cascade={false}
						value={this.state.sValue}
						onChange={v => this.setState({ sValue: v })}
					>
						<List.Item arrow="horizontal">科室</List.Item>
					</Picker>
				</List>
				<Button className={style.btn} type="primary" disabled >立即体验</Button>
			</div>
		);
	}
}
const AddStudentInfoFormWrap = createForm()(AddStudentInfoForm);


class AddStudentInfo extends Component {
	render() {
		return (
			<div className={style.addStudentInfo}>
				<p className={style.title}>为了提供给您更好的服务，请您填写真实信息</p>
				<WingBlank >
					<AddStudentInfoFormWrap />
				</WingBlank>
			</div>
		);
	}
}
export default AddStudentInfo;






