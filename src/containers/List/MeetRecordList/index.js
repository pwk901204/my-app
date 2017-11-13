import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";


import {MeetRecordItem} from "components/MeetItem";

import xialajiantou from "svg/xialajiantou.svg";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import _ from "lodash";

class MeetRecordList extends Component {
	state = {
		loading:false,
		visible:false,
		departments:null,

		meetings:[],
		page:1,
		selectDepartment:{
			label:"全部科室",
			value:""
		}
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		let p1 = this.getDepartments();
		let p2 = this.getDetail();
		Promise.all([p1,p2]).then(()=>{
			this.setState({
				loading:false
			})
		})
	}
	getDepartments = () =>{
		return fetch(global.url.departments)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			var all = [
				{
					label:"全部科室",
					value:"",
					children:[
						{
							label:"全部科室",
							value:"",
						}
					]
				}
			]
			this.setState({
				departments:all.concat(data.departments)
			})
		})
	}
	onPickerChange = (v)=>{
		let selectDepartment = {};
		if(_.find(this.state.departments,{value:v[1]})){
			selectDepartment.label = _.find(this.state.departments,{value:v[1]}).label;
			selectDepartment.value = _.find(this.state.departments,{value:v[1]}).value;
		}else{
			let children = _.find(this.state.departments,{value:v[0]}).children;
			selectDepartment.label = _.find(children,{value:v[1]}).label;
			selectDepartment.value = _.find(children,{value:v[1]}).value;
		}
		console.log(selectDepartment)
		this.setState({
			selectDepartment: selectDepartment,
			page:1,
			meetings:[]
		},()=>{
			this.getDetail();
		});
	}
	getDetail = () =>{
		return fetch(global.url.meetings + "?flag=video&page="+this.state.page+"&per_page=8&department_id="+this.state.selectDepartment.value+"&sort=&price_sort=asc")
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
			<div className={style.meetRecordList}>
				<div className={style.title} onClick={() => this.setState({ visible: true })}>
					<span>{this.state.selectDepartment.label}</span><Icon type={xialajiantou} className={style.titleIcon}/>
				</div>
				<Picker
					visible={this.state.visible}
					data={this.state.departments}
					cascade={true}
					cols={2}
					onChange={this.onPickerChange}
					onOk={(c) => {
							console.log(c)
							this.setState({ visible: false })
						}
					}
					onDismiss={() => this.setState({ visible: false })}
				>
				</Picker>

				<ReactIScroll
					iScroll={iScroll}
					options={{click: true}}
					onScrollEnd={this.scrollEnd}
				>
					<ul className={style.List}>
						{
							meetings.length>0 && meetings.map((item,index)=>{
								return <li key={item.id}><MeetRecordItem {...item}/></li>
							})
						}
					</ul>
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
)(MeetRecordList);


