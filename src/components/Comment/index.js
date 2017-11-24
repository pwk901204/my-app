import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, List, Button,Toast, Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {connect} from "react-redux";
import dianzan from "svg/dianzan.svg";
import xinxi from "svg/xinxi.svg";
import moment from 'moment';
import Blank from "components/Blank";
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
		window.HOCFetch({ needToken:false })(global.url.commentsDetail + "?target_type="+ this.props.target_type +"&target_id="+ this.props.id +"&page="+this.state.page+"&per_page=10")
		.then((response)=>response.json())
		.then((data)=>{
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
			window.HOCFetch({ needToken:true })(global.url.comments ,{
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
		console.log(id,index);
		let comments = this.state.comments;
		let data = {}
		data.token= this.props.userInfo.token;
		data.action_type= "like";
		data.target_type=  "comment";
		data.id = id;

		if(comments[index].like){
			//取消赞
			window.HOCFetch({ needToken:true })(global.url.actionStoresCancel,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then((response)=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.status === "success"){
					comments[index].likes_count = comments[index].likes_count - 1;
					comments[index].like = false;
					this.setState({
						comments: comments
					})
				}
			})

		}else{
			//点赞
			window.HOCFetch({ needToken:true })(global.url.actionStores,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})
			.then((response)=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.status === "success"){
					comments[index].likes_count = comments[index].likes_count + 1;
					comments[index].like = true;
					this.setState({
						comments: comments
					})
				}
			})
		}

	}
	render() {
		return (
			<div className={style.comment}>
				<div className={style.commentListWrap}>
					<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
						onScrollEnd={this.scrollEnd}
					>
						<div className={style.commentList}>
							<WhiteSpace size="xs" />
							{
								this.state.comments.length>0 ?
									this.state.comments.map((item,index)=>{
										return (
											<div key={item.id}>
												<div className={style.commentItem} >
													<img src={item.user_headimgurl} alt="img" />
													<div>
														<h6 className="clearfix"><span>{item.user_name}</span><i>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</i></h6>
														<p>{item.body}</p>
														<div>
															<span onClick={this.onStar.bind(this,item.id,index)}>
																<Icon type={dianzan} className={`${style.dianzan} ${item.like && style.active}`} />
																{ item.like ? "已赞": "点赞" }
																({item.likes_count})
															</span>
															<span onClick={this.onReply.bind(this,item.user_name)} >
																<Icon type={xinxi}  className={style.xinxi} />
																回复
															</span>
														</div>
													</div>
												</div>
												<WhiteSpace size="xs" />
											</div>
										)
									})
								:
								<div className={style.blank}>
									<Blank text="暂无评论" />
								</div>
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

