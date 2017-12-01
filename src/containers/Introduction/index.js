import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,Button,Toast} from 'antd-mobile';
import {connect} from "react-redux";
import {userInfo} from "reduxs/userInfo";

class Introduction extends Component {
	state={
		loading:false,
		introduction:"",
		good_at:""
	}
	componentDidMount(){
		this.setState({
			introduction:this.props.userInfo.introduction,
			good_at:this.props.userInfo.good_at
		})
		this.getUser();
	}
	getUser= ()=>{
		return window.HOCFetch({ needToken:true })(global.url.current_user + "?token=" + this.props.userInfo.token )
		.then((response)=>response.json())
		.then((data)=>{
			this.props.userInfoAction(data.user);
		})
	}
	fnSubmit = ()=>{
		this.setState({
			loading:true
		})
		let data = {};
		data.token = this.props.userInfo.token;
		data.good_at = this.state.good_at;
		data.introduction = this.state.introduction;

		window.HOCFetch({ needToken:true })(global.url.userinfos_update_user_info,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(data)
		})
		.then((response)=>response.json())
		.then((data)=>{
			if(data.message === "ok"){
				this.getUser();
				Toast.info("修改成功",1.5);
				global.customizeHistory.push('/HomePage/3');
			}else{
				Toast.info(data.message,1.5);
			}
			this.setState({
				loading:false
			})
		})
	}
	render() {
		return (
			<div className={style.introduction}>
				<h6 to="/SeriesList" className={style.title}>
					<i></i>
					<p>简介</p>
				</h6>
				<div className={style.content}>
					<textarea rows="5" onChange={(e)=>{
						this.setState({
							introduction:e.target.value
						})
					}} value={this.state.introduction} placeholder="请输入您的个人简介"></textarea>
				</div>
				<h6 to="/SeriesList" className={style.title}>
					<i></i>
					<p>擅长</p>
				</h6>
				<div className={style.content}>
					<textarea rows="5" onChange={(e)=>{
						this.setState({
							good_at:e.target.value
						})
					}} value={this.state.good_at} placeholder="请输入您的擅长的领域" ></textarea>
				</div>
				<Button className={style.btn} type="primary" onClick={this.fnSubmit} >立即体验</Button>
				<ActivityIndicator toast  animating={this.state.loading}/>
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
)(Introduction);

