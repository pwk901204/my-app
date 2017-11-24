import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,WhiteSpace,Toast} from 'antd-mobile';
import {connect} from "react-redux";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import TestItem from "components/Test/TestItem";


class TestList extends Component {
	state={
		loading:false,
		selectUser:"",
		doctors:null,
		exams:null,
		page:1,
		total_pages:10
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		let p1 = this.getDetail();
		Promise.all([p1]).then(()=>{
			this.setState({
				loading:false
			})
		})
		this.getDetail();
	}
	getDetail=()=>{
		this.setState({
			loading:true
		})
		return window.HOCFetch({ needToken:false })(global.url.courses_exams + "?page=" + this.state.page + "&per_page=30&user_id=" + this.state.selectUser)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			if(data.msg.status === "success"){

				let doctors = data.doctors;
				doctors.unshift({value:"",label:"全部"});

				this.refs.tabBarWrap.style.width=`${doctors.length*1.7}rem`;
				this.setState({
					doctors:doctors,
					exams:data.exams,
					meta:data.meta,
					total_pages:data.meta.total_pages
				})
			}else{
				Toast.info(data.msg.message);
			}
		})
	}
	scrollEnd = (iScrollInstance) =>{
		if(Math.abs(iScrollInstance.scrollerHeight)>iScrollInstance.wrapperHeight &&
		iScrollInstance.maxScrollY === iScrollInstance.y &&
		this.state.page < this.state.total_pages
		){
			console.log("最底部了");
			this.setState({
				page:this.state.page+1
			},()=>{
				this.getDetail()
			})
		}
	}
	handleTabBar = (item)=>{
		this.setState({
			selectUser:item.value
		},()=>{
			this.getDetail();
		})
	}
	render() {
		let {doctors,exams,selectUser} = this.state;
		return (
			<div className={style.testList}>
				<div className={style.tabBarWrap}>
					<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
						options={{
							scrollX: true,
							scrollY: false
						}}
						onScrollEnd={this.scrollEnd}
					>
						<div className={style.tabBar} ref="tabBarWrap">
							{
								doctors && doctors.map((item,index)=>{
									return <div
										key={index}
										className={selectUser === item.value ? style.active : ""}
										onClick={()=>{this.handleTabBar(item)}}
									>{item.label}</div>
								})
							}
						</div>
					</ReactIScroll>
				</div>
				<WhiteSpace size='sm' />
				<div className={style.listWrap}>
					<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
					>
						<div className={style.list}>
							{
								exams && exams.map((item,index)=>{
									return <TestItem key={item.id} {...item}/>
								})
							}
						</div>
					</ReactIScroll>
				</div>
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
)(TestList);





