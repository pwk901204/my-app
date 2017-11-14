import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";


import xialajiantou from "svg/xialajiantou.svg";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import {MeetOffLineItem} from "components/MeetItem";
import _ from "lodash";

class MeetOffLineList extends Component {
	state = {
		loading:false,
		visible:false,
		cities:null,

		meetings:[],
		page:1,
		selectCity:{
			label:"全部",
			value:""
		}
	}
	componentDidMount(){
		this.setState({
			loading:true
		})
		let p1 = this.getCities();
		let p2 = this.getDetail();
		Promise.all([p1,p2]).then(()=>{
			this.setState({
				loading:false,
			})
		})
	}
	getCities = () =>{
		return fetch(global.url.cities)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			var all = [
				{
					label:"全部",
					value:""
				}
			]
			this.setState({
				cities:all.concat(data.cities)
			})
		})
	}
	onPickerChange = (v)=>{
		let selectCity = {
			label:_.find(this.state.cities,{value:v[0]}).label,
			value:v
		};
		console.log(selectCity)
		this.setState({
			selectCity: selectCity,
			page:1,
			meetings:[]
		},()=>{
			this.getDetail();
		});
	}
	getDetail = () =>{
		return fetch(global.url.meetings + "?flag=offline&page=" + this.state.page + "&per_page=8&city="+this.state.selectCity.value)
		.then((response)=>response.json())
		.then((data)=>{
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
			<div className={style.meetOffLineList}>
				<div className={style.title} onClick={() => this.setState({ visible: true })}>
					<span>{this.state.selectCity.label}</span><Icon type={xialajiantou} className={style.titleIcon}/>
				</div>
				<Picker
					visible={this.state.visible}
					data={this.state.cities}
					cols={1}
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
					options={{...global.iscrollOptions}}
					onScrollEnd={this.scrollEnd}
				>
					<ul className={style.List}>
						{
							meetings.length>0 && meetings.map((item,index)=>{
								return <li key={item.id}><MeetOffLineItem {...item}/></li>
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
)(MeetOffLineList);


