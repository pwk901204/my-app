import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List, Button,Toast} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {connect} from "react-redux";


import moment from 'moment';
moment.lang('zh-cn');

class Comment extends Component {
	state = {
		loading:false,
		comments:[],
		body:"",
		page:1,
		total_pages:null
	}
	componentDidMount(){
		this.getList();
	}
	getList = ()=>{
		this.setState({
			loading:true
		})
		fetch(global.url.commentsDetail + "?token=" + this.props.userInfo.token + "&target_type="+ this.props.target_type +"&target_id="+ this.props.id +"&page="+this.state.page+"&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				comments:this.state.comments.concat(data.comments),
				total_pages:data.meta.total_pages
			})
		})
	}
	sendMsg = (txt)=>{
		let data = {}
		data.token= this.props.userInfo.token;
		data.subject_type= this.props.target_type;
		data.subject_id=  this.props.id;
		data.body =  this.state.body;
		if(data.body){
			fetch(global.url.comments ,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then((response)=>response.json())
			.then((data)=>{
				this.setState({
					body:"",
					page:1,
					comments:[]
				},()=>{
					this.getList();
				})
			})
		}else{
			 Toast.info('请输入内容', 1);
		}
	}
	inputChange = (e) =>{
		this.setState({
			body:e.target.value
		})
	}
	scrollEnd = (iScrollInstance) =>{
		if(Math.abs(iScrollInstance.scrollerHeight)>iScrollInstance.wrapperHeight &&
		iScrollInstance.maxScrollY === iScrollInstance.y &&
		this.state.page < this.state.total_pages
		){
			console.log("到达最底部")
			this.setState({
				page:this.state.page+1
			},()=>{
				this.getList()
			})
		}
	}
	onReply(name){
		this.setState({
			body:"回复 "+name+":"
		})
	}
	onStar=(id,index)=>{
		let data = {}
		data.token= this.props.userInfo.token;
		data.action_type= "star";
		data.target_type=  "comment";
		data.id = id;
		fetch(global.url.actionStores,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(data)
		})
		.then((response)=>response.json())
		.then((data)=>{
			let comments = this.state.comments;
			 comments[index].likes_count = comments[index].likes_count + 1;
			this.setState({
				comments: comments
			})
		})
	}
	render() {
		return (
			<div className={style.comment}>
				<div className={style.commentList}>
					<ReactIScroll
						iScroll={iScroll}
						onScrollEnd={this.scrollEnd}
					>
						<div>
							<WhiteSpace size="xs" />
							{
								this.state.comments.length>0 && this.state.comments.map((item,index)=>{
									return (
										<div key={item.id}>
											<div className={style.commentItem} >
												<img src={item.user_headimgurl} alt="img" />
												<div>
													<h6 className="clearfix"><span>{item.user_name}</span><i>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</i></h6>
													<p>{item.body}</p>
													<div>
														<span onClick={this.onStar.bind(this,item.id,index)}>
															点赞({item.likes_count})
														</span>
														<span onClick={this.onReply.bind(this,item.user_name)} >
															回复
														</span>
													</div>
												</div>
											</div>
											<WhiteSpace size="xs" />
										</div>
									)
								})
							}
						</div>
					</ReactIScroll>
				</div>
				<div className={style.commentInput}>
					<input placeholder="请输入评论～" value={this.state.body}  onChange={this.inputChange} />
					<Button type="primary" size="small" className={style.btn} onClick={this.sendMsg}>发送</Button>
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
)(Comment);

