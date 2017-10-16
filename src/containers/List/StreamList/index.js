import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import StreamItem from "components/StreamItem/index.js";
import xialajiantou from "svg/xialajiantou.svg";

class StreamList extends Component {
	state = {
		loading:false,
		visible:false,
		pickerValue:["全部科室","0"],
		regions:null
	}
	getRegions = () =>{
		fetch(url.regions)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data)
			this.setState({
				regions:data.regions
			})
		})
	}

	render() {
		return (
			<div className={style.streamList}>
				<div className={style.title} onClick={() => this.setState({ visible: true })}>
					<span>{this.state.pickerValue[0]}</span><Icon type={xialajiantou} className={style.titleIcon}/>
				</div>
				<Picker
					visible={this.state.visible}
					data={this.state.regions}
					cascade={true}
					cols={2}
					onChange={v => {
						console.log(v)
						this.setState({ pickerValue: v })
					}}
					onOk={() => this.setState({ visible: false })}
					onDismiss={() => this.setState({ visible: false })}
				>
				</Picker>
				<div className={style.stream}>
					{
						//<StreamItem />
						//<StreamItem />
					}
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
)(StreamList);


