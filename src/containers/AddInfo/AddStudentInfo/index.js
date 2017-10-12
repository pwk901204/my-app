import React, { Component } from 'react';
import style from './index.css';
import {List, Icon, Button, WhiteSpace, Carousel ,InputItem, Toast, WingBlank, Tabs, Badge ,Picker, ActivityIndicator} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from "react-redux";
import url from "api_url/index.js";
import {hashHistory} from "react-router";

import {userInfo} from "actions/userInfo.js";

const TabPane = Tabs.TabPane;

class AddStudentInfoForm extends Component {
	state={
		regions:[],
		students:[
			{
			  label: '请先选择区域',
			  value: '0',
			}
		],
		titles:[
			{
			  label: '学生',
			  value: '学生',
			},
			{
			  label: '教师',
			  value: '教师',
			},
			{
			  label: '其他',
			  value: '其他',
			}
		],
		loading:false
	}

	componentDidMount() {
		this.setState({
			loading:true
		})
		let p1 = this.getRegions();
		let p2 = this.getDepartments();
		Promise.all([p1,p2]).then(()=>{
			this.setState({
				loading:false
			})
		})
	}

	getRegions = () =>{
		fetch(url.regions)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				regions:data.regions
			})
		})
	}

	getDepartments = () =>{
		fetch(url.departments)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				departments:data.departments
			})
		})
	}
	areaOk = (value)=>{
		this.setState({
			loading:true
		})
		fetch(url.schools + "?region=" + value[1])
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			this.setState({
				schools:data.schools
			})
		})
	}

	fnSubmit = ()=>{
		console.log(this.props.form)
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
				data.user.school = values.school[0];
				data.user.region = values.region[1];
				data.user.title = values.title[0];
				fetch(url.sign_up,{
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
					hashHistory.push("/");
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
					<Picker
						data={this.state.regions}
						title="地区"
						cascade={true}
						cols={2}
						{...getFieldProps('region', {
							rules: [{ required: true, message: '请选择地区' }],
						})}
						onOk = {this.areaOk}
					>
						<List.Item arrow="horizontal" className={style.listItem} >地区</List.Item>
					</Picker>

					<Picker
						data={this.state.schools}
						title="学校"
						cols={1}
						{...getFieldProps('school', {
							rules: [{ required: true, message: '请选择学校' }],
						})}
					>
						<List.Item arrow="horizontal" className={style.listItem} >学校</List.Item>
					</Picker>

					<Picker
						data={this.state.titles}
						title="身份"
						cols={1}
						{...getFieldProps('title', {
							rules: [{ required: true, message: '请选择身份' }],
						})}
					>
						<List.Item arrow="horizontal" className={style.listItem} >身份</List.Item>
					</Picker>
				</List>
				<Button className={style.btn} type="primary" onClick={this.fnSubmit} >立即体验</Button>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}
const AddStudentInfoFormWrap = connect (
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
)(createForm()(AddStudentInfoForm));

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
