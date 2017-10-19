import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List, Button, Toast} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {connect} from "react-redux";

class ChatRoom extends Component {
	state = {
		loading:false,
		chatList:[],
		inputValue:""
	}
	constructor(props) {
		super(props)
		if(window.location.host === "localhost:3000"){
			this.ws = new WebSocket('ws://192.168.0.104:3000/cable');
			//this.ws = new WebSocket('ws://rqiang.mynatapp.cc/cable');
		}else if(window.location.host === "localhost:4000"){
			this.ws = new WebSocket('ws://' + window.location.host + '/cable');
		}
		else{
			this.ws = new WebSocket('wss://' + window.location.host + '/cable');
		}
	}
	componentDidMount() {
		this.ws.onopen = ()=>{
			this.ws.send(JSON.stringify({
				"command": "subscribe",
				"identifier": JSON.stringify({
					"channel": "StreamRoomChannel",
					"stream_id": window.parseInt(this.props.id)
				})
			}));
		}

		this.ws.onmessage = (evt)=>{
			let obj_msg = JSON.parse(evt.data);
			console.log(obj_msg)
			if(obj_msg.message){
				if(obj_msg.message.data){
					let arr = this.state.chatList;
					arr.push(obj_msg.message.data);
					this.setState({
						chatList:arr,
						inputValue:"",
						loading:false,
					})
				}
			}
		};
	}
	componentWillUnmount(){
		this.ws.close();
	}
	sendMessage=()=>{
		let inputValue = this.state.inputValue;
		if(this.props.userInfo.token){
			if(inputValue !== ""){
				this.ws.send(JSON.stringify({
					"command": "message",
					"identifier": JSON.stringify({
						"channel": "StreamRoomChannel",
						"stream_id": window.parseInt(this.props.id)
					}),
					"data": JSON.stringify({
						"action": "speak",
						token:this.props.userInfo.token,
						content: inputValue
					})
				}))
			}else{
				 Toast.info('请输入内容', 0.5);
			}
		}else{
			//登陆去
			//this.props.accountloginModalAction(true);
		}
	}
	inputChange = (e) =>{
		this.setState({
			inputValue:e.target.value
		})
	}
	render() {
		return (
			<div className={style.chatRoom}>
				<div className={style.chatRoomContent}>
					<span className={style.chatIcon1}>共{this.props.stream_users_count}人报名</span>
					<span className={style.chatIcon2}>{this.props.stream_bounty_count}人共打赏了{this.props.stream_payment_count}元</span>
					<ReactIScroll
						iScroll={iScroll}
					>
						<div>
							<WhiteSpace size="xs" />
							{
								this.state.chatList.map((item,index)=>{
									return (
										<div className={style.message} key={index+""}>
											<div className={style.icon}>
												<img src={item.user_image_url} alt="img" />
												<p>{item.user_name}</p>
											</div>
											<div className={style.content}>
												<span></span>
												{item.content}
											</div>
										</div>
									)
								})
							}
						</div>
					</ReactIScroll>
				</div>
				<div className={style.chatRoomInput}>
					<input value={this.state.inputValue} onChange={this.inputChange} />
					<Button type="primary" size="small" className={style.btn} onClick={this.sendMessage}>发送</Button>
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
)(ChatRoom);

