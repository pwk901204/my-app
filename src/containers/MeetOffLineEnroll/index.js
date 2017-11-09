import React, { Component } from 'react';
import style from './index.css';
import {List, Button, InputItem, Toast, WingBlank ,Picker, ActivityIndicator, WhiteSpace} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from "react-redux";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {browserHistory} from "react-router";

class MeetOffLineEnroll extends Component {
	state={
		loading:false,
		sex:[{value:"0",label:"男"},{value:"1",label:"女"}],
		require_ticket:[{value:0,label:"不需要"},{value:1,label:"需要"}],
		select_require_ticket:null,
		options:null
	}
	componentDidMount(){
		this.getDetail();
	}
	getDetail = () =>{
		return fetch(global.url.attendees_new +'?meeting_id=' + this.props.routeParams.id +"&token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				options:data.meeting
			})
		})
	}
	postDetail= () =>{
		return fetch(global.url.attendees_new +'?meeting_id=' + this.props.routeParams.id +"&token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
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

				let data = new FormData();
				data.append("token", _this.props.userInfo.token);
				data.append("meeting_id", this.props.routeParams.id);
				data.append("name", values.name);
				data.append("mobile", values.mobile);
				data.append("email", values.email);
				data.append("require_ticket", values.require_ticket);
				data.append("company", values.company);
				data.append("address", values.address);
				data.append("sex", values.sex);
				data.append("doctor_title", values.doctor_title);
				data.append("zipcode", values.zipcode);

				values.remark && data.append("remark", values.remark);
				values.ticket_number && data.append("ticket_number", values.ticket_number);
				values.ticket_header && data.append("ticket_header", values.ticket_header);

				var meeting_option_ids_arr = [];
				for(var  name in values){
					if(name.indexOf("meeting_option_ids") >= 0 && values[name] !== 0){
						meeting_option_ids_arr.push(values[name])
					}
				}

				if(meeting_option_ids_arr.length > 0){
					data.append("meeting_option_ids", meeting_option_ids_arr.join(','));
				}


				fetch(global.url.attendees,{
					method:"POST",
					headers:{
					},
					body:data
				})
				.then((response)=>response.json())
				.then((data)=>{
					console.log(data);
					_this.setState({
						loading:false
					})
				})
			}
		})
	}
	onRequireTicket=(e)=>{

		this.props.form.setFieldsValue({
            require_ticket: e
        });

		this.setState({
			select_require_ticket:e
		})
	}
	render() {
		const { getFieldProps } = this.props.form;
		const { options, select_require_ticket} =this.state;
		return (
			<div className={style.meetOffLineEnrollWrap}>
				<ReactIScroll
					iScroll={iScroll}
				>
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
									 {...getFieldProps('mobile',{
									 	rules: [
									 		{ required: true, message: '请输入手机号' },
											{ len:13 ,  message: '手机号位数错误'}
									 	]
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
									 {...getFieldProps('doctor_title',{
									 	rules: [{ required: true, message: '请输入职称！' }]
									 })}
									type="text"
									placeholder="填写职称"
									labelNumber={2}
									clear={true}
									className={style.text}
								>
									职称
								</InputItem>
								<InputItem
									 {...getFieldProps('company',{
									 	rules: [{ required: true, message: '请输入单位名称！' }]
									 })}
									type="text"
									placeholder="填写单位"
									labelNumber={4}
									clear={true}
									className={style.text}
								>
									单位名称
								</InputItem>
								<InputItem
									 {...getFieldProps('address',{
									 	rules: [{ required: true, message: '请输入单位地址！' }]
									 })}
									type="text"
									placeholder="填写单位地址"
									labelNumber={4}
									clear={true}
									className={style.text}
								>
									单位地址
								</InputItem>
								<InputItem
									 {...getFieldProps('zipcode',{
									 	rules: [{ required: true, message: '请输入邮编！' }]
									 })}
									type="text"
									placeholder="填写邮编"
									labelNumber={2}
									clear={true}
									className={style.text}
								>
									邮编
								</InputItem>
								{
									options && options.meeting_options.map((item, index)=>{
										return <Picker
											key={item.id}
											data={item.child_options}
											title={item.title}
											cols={1}
											{...getFieldProps('meeting_option_ids' + index, {
												rules: [{ required: true, message: '请选择'+ item.title }],
											})}
										>
											<List.Item arrow="horizontal" className={style.listItem} >{item.title}</List.Item>
										</Picker>
									})
								}
								<Picker
									data={this.state.require_ticket}
									title="发票"
									cols={1}
									{...getFieldProps('require_ticket' ,{
										rules: [{ required: true, message: '请选择是否需要发票！' }],
									})}
									value={this.state.select_require_ticket}
									onChange={this.onRequireTicket}
								>
									<List.Item arrow="horizontal" className={style.listItem} >发票</List.Item>
								</Picker>
								{
									select_require_ticket && select_require_ticket[0] === 1 &&
									<InputItem
										{...getFieldProps('ticket_header',{
											rules: [{ required: true, message: '请输入抬头！' }]
										})}
										type="text"
										placeholder="填写抬头"
										labelNumber={2}
										clear={true}
										className={style.text}
									>
										抬头
									</InputItem>
								}
								{
									select_require_ticket && select_require_ticket[0] === 1 &&
									<InputItem
										{...getFieldProps('ticket_number',{
										 	rules: [{ required: true, message: '请输入税号！' }]
										})}
										type="text"
										placeholder="填写税号"
										labelNumber={2}
										clear={true}
										className={style.text}
									>
										税号
									</InputItem>
								}
								<InputItem
									 {...getFieldProps('remark',{
									 })}
									type="text"
									placeholder="（100字以内）填写备注"
									labelNumber={2}
									clear={true}
									className={style.text}
								>
									备注
								</InputItem>

							</List>
						</WingBlank>
						<div className={style.phone}>如有疑问，请致电客服：<a href="tel:4008072700">400-807-2700</a></div>
						<WingBlank ><Button type="primary" onClick={this.fnSubmit} >提交</Button></WingBlank>
						<WhiteSpace size='md' />
						<ActivityIndicator toast animating={this.state.loading} />
					</div>
				</ReactIScroll>
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

