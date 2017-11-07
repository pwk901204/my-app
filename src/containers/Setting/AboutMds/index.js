import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,List} from 'antd-mobile';
import {hashHistory} from "react-router";
import {connect} from "react-redux";
import { createForm } from 'rc-form';

import logo from 'images/mds_logo.png';

const Item = List.Item;
const Brief = Item.Brief;
class AboutMds extends Component {
	state = {
		sendCodeing:false,
		second:30,
		loading:false,
		timer:null,
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	}
	handleClick = ()=>{
		console.log(11)
	}
	handleExtraClick = ()=>{
		console.log(22)
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className={style.AboutMds}>
				<div className={style.logo}>
					<img src={logo} alt="img" />
				</div>
				<List>
			        <Item arrow="horizontal" onClick={() => {}}>服务协议</Item>
       			</List>
       			<List>
       				<Item arrow="horizontal" onClick={() => {}}>免责声明</Item>
       			</List>
       			<List>
       				<Item extra={'400-807-2700'}  className={style.listItem} onLongPress={this.handleLongPress}>联系客服</Item>
       			</List>
			</div>
		);
	}
}

export default connect (
	(state)=>{
		return {
		}
	},
	(dispatch)=>{
		return {
		}
	}
)(createForm()(AboutMds));
