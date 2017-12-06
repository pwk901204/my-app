import React, { Component } from 'react';
import style from './index.css';
import {List, Button, InputItem, Toast, WingBlank ,Picker, ActivityIndicator} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from "react-redux";

import {userInfo} from "reduxs/userInfo.js";


class AddDoctorInfoForm extends Component {
	state={
		regions:[],
		hospitals:[
			{
			  label: '请先选择区域',
			  value: '0',
			}
		],
		departments:[],
		titles:[
			{
			  label: '主任医师',
			  value: '主任医师',
			},
			{
			  label: '副主任医师',
			  value: '副主任医师',
			},
			{
			  label: '主治医师',
			  value: '主治医师',
			},
			{
			  label: '住院医师',
			  value: '住院医师',
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
		return window.HOCFetch({ needToken:false })(global.url.regions)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				regions:data.regions
			})
		})
	}

	getDepartments = () =>{
		return window.HOCFetch({ needToken:false })(global.url.departments)
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
		window.HOCFetch({ needToken:false })(global.url.hospitals + "?region=" + value[1])
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			this.setState({
				hospitals:data.hospitals
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
				data.user.hospital = values.hospital[0];
				data.user.region = values.region[1];
				data.user.department = values.department[1];
				data.user.title = values.title[0];
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
					global.customizeHistory.push("/WXLogin");
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
						data={this.state.hospitals}
						title="医院"
						cols={1}
						{...getFieldProps('hospital', {
							rules: [{ required: true, message: '请选择医院' }],
						})}
					>
						<List.Item arrow="horizontal" className={style.listItem} >医院</List.Item>
					</Picker>

					<Picker
						data={this.state.departments}
						title="科室"
						cascade={true}
						cols={2}
						{...getFieldProps('department', {
							rules: [{ required: true, message: '请选择科室' }],
						})}
					>
						<List.Item arrow="horizontal" className={style.listItem} >科室</List.Item>
					</Picker>

					<Picker
						data={this.state.titles}
						title="职称"
						cols={1}
						{...getFieldProps('title', {
							rules: [{ required: true, message: '请选择职称' }],
						})}
					>
						<List.Item arrow="horizontal" className={style.listItem} >职称</List.Item>
					</Picker>
				</List>
				<Button className={style.btn} type="primary" onClick={this.fnSubmit} >立即体验</Button>
				<ActivityIndicator toast animating={this.state.loading} />
			</div>
		);
	}
}
const AddDoctorInfoFormWrap = connect (
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
)(createForm()(AddDoctorInfoForm));

class AddDoctorInfo extends Component {
	render() {
		return (
			<div className={style.addDoctorInfo}>
				<p className={style.title}>为了提供给您更好的服务，请您填写真实信息</p>
				<WingBlank >
					<AddDoctorInfoFormWrap />
				</WingBlank>
			</div>
		);
	}
}
export default AddDoctorInfo;
