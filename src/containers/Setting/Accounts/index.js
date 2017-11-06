import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,List} from 'antd-mobile';
import {hashHistory} from "react-router";
const Item = List.Item;
const Brief = Item.Brief;

class Accounts extends Component {
	state={
		loading:false
	}
	render() {
		return (
			<div className={style.introduction}>
				<List>
			        <Item extra="158****0067" arrow="horizontal" onClick={() => {
			        	hashHistory.push("/BindPhone")
			        }}>绑定手机号</Item>
       			</List>
       			<List>
       				<Item arrow="horizontal" onClick={() => {
       					hashHistory.push("/ChangePassword")
       				}}>修改密码</Item>
       			</List>
			</div>
		);
	}
}
export default Accounts;

