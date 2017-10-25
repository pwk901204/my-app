import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";

import xialajiantou from "svg/xialajiantou.svg";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import {MeetStreamItem} from "components/MeetItem";
import _ from "lodash";

class MeetStreamList extends Component {
	state = {
		loading:false,
		visible:false,
		pickerDate:[
			{value:"",label:"全部状态"},
			{value:"starting",label:"进行中"},
			{value:"unstarted",label:"即将开始"},
			{value:"finished",label:"已结束"}
		],
		meetings:[],
		page:1,
		selectState:{
			label:"全部状态",
			value:""
		}
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		let p1 = this.getDetail();
		Promise.all([p1]).then(()=>{
			this.setState({
				loading:false,
			})
		})
	}
	onPickerChange = (v)=>{
		console.log(v)
		let selectState = {
			label:_.find(this.state.pickerDate,{value:v[0]}).label,
			value:v
		};
		this.setState({
			selectState: selectState,
			page:1,
			meetings:[]
		},()=>{
			this.getDetail();
		});
	}
	getDetail = () =>{
		return fetch(url.meetings + "?flag=live&page=" + this.state.page + "&per_page=8&status="+ this.state.selectState.value +"&department_id=&sort=&price_sort=asc")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				meetings:this.state.meetings.concat(data.meetings)
			})
		})
	}
	scrollEnd = (iScrollInstance) =>{
		if(iScrollInstance.maxScrollY === iScrollInstance.y){
			console.log("到达最底部")
			this.setState({
				page:this.state.page+1
			},()=>{
				this.getDetail()
			})
		}
	}
	render() {
		let {meetings} = this.state;
		return (
			<div className={style.MeetStreamList}>
				<div className={style.title} onClick={() => this.setState({ visible: true })}>
					<span>{this.state.selectState.label}</span><Icon type={xialajiantou} className={style.titleIcon}/>
				</div>
				<Picker
					visible={this.state.visible}
					data={this.state.pickerDate}
					cols={1}
					onChange={this.onPickerChange}
					onOk={(c) => {
							this.setState({ visible: false })
						}
					}
					onDismiss={() => this.setState({ visible: false })}
				>
				</Picker>

				<ReactIScroll
					iScroll={iScroll}
					onScrollEnd={this.scrollEnd}
				>
					<ul className={style.List}>
						{
							meetings.length > 0 && meetings.map((item,index)=>{
								return <li key={item.id}><MeetStreamItem {...item}/></li>
							})
						}
					</ul>
					<div className={style.recording}>

					</div>
				</ReactIScroll>
				<ActivityIndicator toast animating={this.state.loading} />
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
)(MeetStreamList);


