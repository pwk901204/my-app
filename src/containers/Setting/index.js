import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,List} from 'antd-mobile';
import {hashHistory} from "react-router";
const Item = List.Item;

class Setting extends Component {
	state={
		loading:false
	}
	render() {
		return (
			<div className={style.introduction}>
				<List>
       				<Item arrow="horizontal" onClick={() => {
       					hashHistory.push("/Accounts")
       				}}>帐号与安全</Item>
       			</List>
       			<List>
       				<Item arrow="horizontal" onClick={() => {
       					hashHistory.push("/AboutMds")
       				}}>关于麦迪森</Item>
       			</List>
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}
export default Setting;

