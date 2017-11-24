import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";

import {StreamItem} from "components/StreamItem/index.js";
import xialajiantou from "svg/xialajiantou.svg";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import _ from "lodash";

class StreamList extends Component {
	state = {
		loading:false,
		visible:false,
		departments:null,

		streams:[],
		page:1,
		selectDepartment:{
			label:"全部科室",
			value:""
		}
	}
	componentDidMount(){
		this.getDepartments();
		this.getDetail();
	}
	getDepartments = () =>{
		this.setState({
			loading:true
		})
		window.HOCFetch({ needToken:false })(global.url.departments)
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
				loading:false,
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
			streams:[]
		},()=>{
			this.getDetail();
		});
	}
	getDetail = () =>{
		this.setState({
			loading:true
		})
		window.HOCFetch({ needToken:false })(global.url.streams + "?department_id="+this.state.selectDepartment.value+"&page="+this.state.page+"&per_page=20")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				loading:false,
				streams:this.state.streams.concat(data.streams)
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
		let {streams} = this.state;
		return (
			<div className={style.streamList}>
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
					options={{...global.iscrollOptions}}
					onScrollEnd={this.scrollEnd}
				>
					<div className={style.stream}>
						{
							streams.length>0 && streams.map((item,index) =>(<StreamItem {...item} key={item.id} />))
						}
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
)(StreamList);


