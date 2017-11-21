import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,WhiteSpace,Toast,Icon,Modal} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import TestItem from "components/Test/TestItem";

import {connect} from "react-redux";
import MyRadio from "components/MyRadio";
import moment from 'moment';
import {browserHistory} from "react-router";
import {PhotoSwipe} from 'react-photoswipe';
//import 'react-photoswipe/lib/photoswipe.css';
moment.lang('zh-cn');

class TestQuestionDetail extends Component {
	state={
		loading:false,
		subjects:null,
		topic:null,
		indexSubjects:0,
		clock:"00:00:00",
		isOpen:false,
		modal:false,
		photoSwipeItems: [
		{
			src: '',
			w: 900,
			h: 1200,
			title: ''
		}]
	}
	componentDidMount(){
		this.getDetail();
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	toDub = (num)=>{
		return num < 10 ? "0" + num : num;
	}
	getDetail=()=>{
		this.setState({
			loading:true
		})
		return fetch(global.url.topics + "/" + this.props.params.id + "/edit_answer?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			if(data.msg.status === "success"){
				console.log(data);
				this.setState({
					topic:data.topic,
					subjects:data.subjects,
				});
				document.title = data.topic.title;
				clearInterval(this.timer);
				let seconds_remain = data.topic.seconds_remain;
				this.timer = setInterval(()=>{
					if(seconds_remain<=0){
						clearInterval(this.timer);
						this.setState({
							clock:"00:00:00"
						})
					}else{
						seconds_remain--;
						var h = Math.floor(seconds_remain / 3600);
			            var m = Math.floor((seconds_remain / 60 % 60));
			            var s = Math.floor((seconds_remain % 60));
						this.setState({
							clock:this.toDub(h) + ":" + this.toDub(m) + ":" + this.toDub(s)
						})
					}
				},1000)
			}else{
				Toast.info(data.msg.message);
			}
		})
	}
	sendAnswer=()=>{
		this.setState({
			loading:true
		})
		let data =[];
		for(let i=0;i<this.state.subjects.length;i++){
			data.push({
				subject_id:this.state.subjects[i].subject_id,
				answer:this.state.subjects[i].answer?this.state.subjects[i].answer:""
			})
		}
		return fetch(global.url.topics + "/" + this.props.params.id + "/answers_save",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				token:this.props.userInfo.token,
				subjects:data
			})
		})
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			if(data.msg.status === "success"){
				this.showModal("modal")();
			}else{
				Toast.info(data.msg.message);
			}
		})
	}
	handleImg=(e)=>{
		this.setState({
			isOpen: true,
			photoSwipeItems:[{
				src: e.target.src,
				w: 500,
				h: 600,
			}]
		})
	}
	showModal = key => (e) => {
		this.setState({
			[key]: true,
		});
	}
	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	}
	render() {
		let {subjects,topic,indexSubjects,clock,isOpen,photoSwipeItems} = this.state;
		return (
			<div className={style.testQuestionDetailWrap}>
				{
					topic &&
					<div className={style.head}>
						<span className={indexSubjects > 0 ? style.active : "" } onClick={()=>{
							if(indexSubjects>0){
								this.setState({
									indexSubjects:this.state.indexSubjects-1
								})
							}
						}}>上一题</span>
						{
							topic.topic_status === "starting" && <div>距离结束<i>{clock}</i></div>
						}
						{
							topic.topic_status === "ended" && <div>{topic.end_time}</div>
						}
						<span className={indexSubjects < subjects.length-1 ? style.active : "" } onClick={()=>{
							if(indexSubjects < subjects.length-1){
								this.setState({
									indexSubjects:this.state.indexSubjects+1
								})
							}
						}}>下一题</span>
					</div>
				}
				{
					subjects && subjects.map((item,index)=>{
						if(topic.subject_type=="single_selection"){
							return <div className={`${style.contentWrap} ${indexSubjects  === index ? style.active : "" }`} key={index}>
								<ReactIScroll
									iScroll={iScroll}
									options={{...global.iscrollOptions}}
								>
									<div className={style.content}>
										<WhiteSpace size="sm" />
										<h4>本期共有{subjects.length}道题</h4>
										<h5><i>第{item.index}题</i>-选择题</h5>
										<div className={style.questionContent}>
											{item.content}
											{item.avatar_data && <img src={item.avatar_data.original} onClick={this.handleImg} alt="img"/>}
										</div>
										<h5>我的答案</h5>
										<div className={style.myAnswer}>
											<div className={style.single_selection}>
												{
													item.options.map((item1,index)=>{
														return <label
															className="clearfix"
															key={index}
															onClick={()=>{
																if(topic.topic_status === "starting"){
																	let arr = subjects;
																	arr[indexSubjects].answer = item1.answer_select;
																	this.setState({
																		subjects:arr
																	})
																}
															}}
														>
															<MyRadio checked={ subjects[indexSubjects].answer == item1.answer_select} style={{float: "left",margin:"2px 20px 0 0"}}/>
															<p>{item1.answer_select}：{item1.content}</p>
														</label>
													})
												}
											</div>
										</div>
										{
											topic.topic_status === "ended" && <h5>正确答案</h5>
										}
										{
											topic.topic_status === "ended" && <div className={style.score}>
												<p><i className="fontBlue">{item.right_answer}</i></p>
											</div>
										}
										{
											topic.topic_status === "ended" && <h5>答案解析</h5>
										}
										{
											topic.topic_status === "ended" && <div className={style.score}>
												<p>{item.answer_remark}</p>
											</div>
										}
										<WhiteSpace size="sm" />
									</div>
								</ReactIScroll>
							</div>
						}else if(topic.subject_type === "text"){
							return <div className={`${style.contentWrap} ${indexSubjects  === index ? style.active : "" }`} key={index}>
								<ReactIScroll
									iScroll={iScroll}
									options={{...global.iscrollOptions}}
								>
									<div className={style.content}>
										<WhiteSpace size="sm" />
										<h4>本期共有{subjects.length}道题</h4>
										<h5><i>第{item.index}题</i>-问答题</h5>
										<div className={style.questionContent}>
											{item.content}
											{
												item.avatar_data && <img src={item.avatar_data.original} onClick={this.handleImg} alt="img"/>
											}
										</div>
										<h5>我的答案</h5>
										<div className={style.myAnswer}>
											{
												topic.topic_status ===  "starting" &&
												<textarea rows="5" onChange={(e)=>{
													if(topic.topic_status === "starting"){
														let arr = subjects;
														arr[indexSubjects].answer = e.target.value;
														this.setState({
															subjects:arr
														})
													}
												}} value={item.answer} ></textarea>
											}
											{
												topic.topic_status ===  "ended" && item.answer  &&
												<textarea rows="5" value={item.answer} readOnly ></textarea>
											}
											{
												topic.topic_status === "ended" && !item.answer &&
												<p className="fontOrange">未作答</p>
											}
										</div>
										{
											topic.topic_status === "ended" && <h5>专家评分</h5>
										}
										{
											topic.topic_status === "ended" && <div className={style.score}>
												{
													!item.score && <p><i className="fontOrange">等待评分...</i></p>
												}
												{
													item.score && <p>最终评分：<i className="fontOrange">{item.score}</i></p>
												}
											</div>
										}
										<WhiteSpace size="sm" />
									</div>
								</ReactIScroll>
							</div>
						}
					})
				}
				<PhotoSwipe isOpen={isOpen} items={photoSwipeItems} onClose={() => { this.setState({isOpen: false})} }/>
				{
					topic && topic.topic_status === "starting" &&
					<div className={style.foot}>
						<div className={style.button} onClick={this.sendAnswer}>提交</div>
					</div>
				}
				<Modal
					title="您的答案已成功提交！"
					transparent
					maskClosable={false}
					visible={this.state.modal}
					onClose={this.onClose('modal')}
					footer={[
						{ text: '回到首页', onPress: () => { this.onClose('modal')(); browserHistory.push("/HomePage"); } },
						{ text: '继续答题', onPress: () => { this.onClose('modal')(); } }
					]}
				>
					答题时间结束前可重新编辑提交
				</Modal>
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
	()=>{
		return {
		}
	}
)(TestQuestionDetail);

