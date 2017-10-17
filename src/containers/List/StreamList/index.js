import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import StreamItem from "components/StreamItem/index.js";
import xialajiantou from "svg/xialajiantou.svg";

import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

class StreamList extends Component {
	static defaultProps = {
		options: {
			mouseWheel: true,
			scrollbars: false
		}
	}
	state = {
		loading:false,
		visible:false,
		pickerValue:["0","0"],
		departments:null,
		streams:null
	}
	componentDidMount(){
		let _this = this;
		this.getDepartments();
		this.getDetail("");
	}
	getDepartments = () =>{
		this.setState({
			loading:true
		})
		fetch(url.departments)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false,
				departments:data.departments
			})
		})
	}
	onScrollStart = () => {
	    console.log("iScroll starts scrolling")
	}
	onPickerChange = (v)=>{
		this.setState({ pickerValue: v });
		this.getDetail(v[1]);
	}
	getDetail = (department_id,page) =>{
		let _this = this;
		this.setState({
			loading:true
		})
		fetch(url.streams + "?department_id="+department_id+"&page="+1+"&per_page=20")
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				loading:false,
				streams:data.streams
			})
		})
	}
	render() {
		let {streams} = this.state;
		return (
			<div className={style.streamList}>
				<div className={style.title} onClick={() => this.setState({ visible: true })}>
					<span>{this.state.pickerValue[0]}</span><Icon type={xialajiantou} className={style.titleIcon}/>
				</div>
				<Picker
					visible={this.state.visible}
					data={this.state.departments}
					cascade={true}
					cols={2}
					onChange={this.onPickerChange}
					onOk={() => this.setState({ visible: false })}
					onDismiss={() => this.setState({ visible: false })}
				>
				</Picker>
				<ReactIScroll
					iScroll={iScroll}
					options={this.props.options}
					onScrollStart={this.onScrollStart}
				>
					<div className={style.stream}>
						{
							streams && streams.map((item,index) =>(<StreamItem {...item} key={item.id} />))
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


