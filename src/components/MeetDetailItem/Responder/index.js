import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Flex, WingBlank, Button,Toast} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import {connect} from "react-redux";
import moment from 'moment';
moment.lang('zh-cn');

let optionsArr = ["A","B","C","D","E","F","G","H"];

class Responder extends Component {
	state = {
		loading:false,
		selectOption:"",

		id: "",
		title: "",
		options_count: 4,
		status: "",
		end_at: "",
		count_down: ""
	}
	constructor(props) {
		super(props)
		if(window.location.host === "localhost:3000"){
			//this.ws = new WebSocket('ws://192.168.0.111:3002/cable');
			//this.ws = new WebSocket('ws://rqiang.mynatapp.cc/cable');
			this.ws = new WebSocket('ws://192.168.0.101:3000/cable');
		}else if(window.location.host === "localhost:4000"){
			this.ws = new WebSocket('ws://' + window.location.host + '/cable');
		}
		else{
			this.ws = new WebSocket('wss://' + window.location.host + '/cable');
		}
	}
	componentDidMount() {
		this.getInit();
		this.ws.onopen = ()=>{
			this.ws.send(JSON.stringify({
				"command": "subscribe",
				"identifier": JSON.stringify({
					"channel": "MeetingChannel",
					"id": window.parseInt(this.props.id)
				})
			}));
		}

		this.ws.onmessage = (evt)=>{
			let obj_msg = JSON.parse(evt.data);
			console.log(obj_msg)
			if(obj_msg.type !== "ping" && obj_msg.message){
				let data = obj_msg.message
				this.setState({
					id: data.id, // # 试题id
					title: data.title, //# 题目
					options_count: data.options_count,    //# 选项数量
					status: data.status,//# 抢答状态 [unstart starting end over]
					end_at: data.end_at, //# 结束时间(秒)
					count_down: data.count_down, ///# 倒计时剩余秒数，
				})
				if(data.status == "starting" && data.count_down){
					this.countDown(data.count_down)
				}
			}
		};
	}
	componentWillUnmount(){
		this.ws.close();
	}
	getInit=()=>{
		fetch(global.url.posts + "?meeting_id="+this.props.id+"&token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				id: "",
				title: "",
				options_count: 4,
				status: "",
				end_at: "",
				count_down: "",
				...data
			})
			if(data.status =="starting" && data.count_down){
				this.countDown(data.count_down)
			}
		})
	}
	countDown=(num)=>{
		this.timer=null;
		clearInterval(this.timer);
		this.timer = setInterval(()=>{
			this.setState({
				count_down: num
			});
			num = num-1;
			if(num<=1){
				this.setState({
					count_down: num,
					status:"end"
				});
			}
		},1000)
	}
	sendMessage=()=>{
		//点击抢答按钮 进行抢答
		let data = {}
		data.token= this.props.userInfo.token;
		data.answer= this.state.selectOption;
		data.post_id=  this.state.id;
		if(data.answer){
			fetch(global.url.meetings+"/"+this.props.id+"/post_answer" ,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then((response)=>response.json())
			.then((data)=>{
				clearInterval(this.timer);
				this.setState({
					status: "answer"
				})
			})
		}else{
			Toast.info('请选择答案', 0.5);
		}
	}
	optionClick=(v)=>{
		if(this.state.status === "starting"){
			//当状态 为 starting 时 可以点击选项
			this.setState({
				selectOption:v.target.innerHTML
			})
		}
	}
	render() {
		return (
			<div className={style.responder}>
				<div className={style.responderWrap}>
					<ReactIScroll
						iScroll={iScroll}
						options={{click: true}}
					>
						<div>
							<WhiteSpace size="xs" />
							<h6 className={style.title}>抢答器</h6>
							{
								this.state.title && <p className={style.qtitle}>第{this.state.title}题</p>
							}
							<div className={style.optionsWrap}>
								{
									optionsArr.slice(0,this.state.options_count).map((item,index)=>{
										return <div className={style.optionItem} key={index}>
											<p className={`${style.btn} ${this.state.selectOption === item && style.active}`} onClick={this.optionClick}>{item}</p>
										</div>
									})
								}
							</div>
							<WhiteSpace size="md" />
						</div>
					</ReactIScroll>
				</div>
				<div className={style.foot}>
					<WingBlank>
						{this.state.status === "unstart" && <p>抢答未开始</p>}
						{this.state.status === "starting" && <p><span>抢答倒计时:</span>{this.state.count_down}秒</p>}
						{(this.state.status === "answer" ||this.state.status === "end")&& <p>第{this.state.title}题结束</p>}
						{
							this.state.status === "unstart" && <Button type="primary" size="small" disabled>等待抢答</Button>
						}
						{
							this.state.status === "starting" && <Button type="primary" size="small" onClick={this.sendMessage}>立即抢答</Button>
						}
						{
							this.state.status === "end" && <Button type="primary" size="small" disabled>已结束</Button>
						}
						{
							this.state.status === "answer" && <Button type="primary" size="small" disabled>已答题</Button>
						}
					</WingBlank>
				</div>
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
	()=>{
		return {
		}
	}
)(Responder);
