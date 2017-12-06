import React, { Component } from 'react';
import style from './index.css';
import {Button ,List, Radio, WingBlank, WhiteSpace, Icon,Popup, Toast} from 'antd-mobile';
import wx from "svg/wx.svg";
import zfb from "svg/zfb.svg";
import PropTypes from 'prop-types';
const RadioItem = Radio.RadioItem;

export class Pay extends Component {
	static propTypes = {
		id:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		type:PropTypes.oneOfType([
			PropTypes.string,
		]).isRequired,  //报名人数
		topic:PropTypes.oneOfType([
			PropTypes.string
		]).isRequired,  //打赏人数
		amount:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,  //打赏金额
		ordersAction:PropTypes.oneOfType([
			PropTypes.func
		]).isRequired,
		href:PropTypes.oneOfType([
			PropTypes.string
		]).isRequired
	};
	state = {
    	pay_way: "wechat_pay"
    }
	onChange = (value) => {
		this.setState({
			pay_way:value,
		});
	}
	onOk = ()=>{
		console.log(this.props)
		this.props.ordersAction({
			type:this.props.type,
			id:this.props.id,
			amount:this.props.amount,
			pay_way:this.state.pay_way,
			callBack:(data)=>{
				global.customizeHistory.push({
			        pathname: '/PayPage',
			        state: {
						topic:this.props.topic,
						amount:this.props.amount,
						href:this.props.href,
						...data
			        },
			    })
			}
		})
		Popup.hide();
	}
	render() {
		const { pay_way} = this.state;
		return (
			<div>
				<h6 className={style.title}>
					<span>订单详情</span>
					<span>{this.props.topic}</span>
				</h6>
				<div className={style.content}>
					<p>{this.props.amount}元</p>
					<span>所需费用</span>
				</div>
				<List renderHeader={() => '支付方式'}>
					<RadioItem checked={pay_way === "wechat_pay" } onChange={() => this.onChange("wechat_pay")}>
						<Icon type={wx} className={style.icon}  />微信
					</RadioItem>
					{
						// <RadioItem checked={pay_way === "alipay_wap" } onChange={() => this.onChange("alipay_wap")}>
						// 	<Icon type={zfb} className={style.icon}  />支付宝
						// </RadioItem>
					}
				</List>
				<WhiteSpace size='md' />
				<WingBlank size="md">
					<Button
						type="primary"
						activeStyle={{backgroundColor:"#ff5566"}}
						style={{backgroundColor:"#ff6666",border:"none"}}
						onClick={this.onOk}
					>确认
					</Button></WingBlank>
				<WhiteSpace size='md' />
			</div>
		);
	}
}


export class Reward extends Component {
	static propTypes = {
		id:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		type:PropTypes.oneOfType([
			PropTypes.string,
		]).isRequired,  //报名人数
		topic:PropTypes.oneOfType([
			PropTypes.string
		]).isRequired,  //打赏人数
		ordersAction:PropTypes.oneOfType([
			PropTypes.func
		]).isRequired,
		href:PropTypes.oneOfType([
			PropTypes.string
		]).isRequired
	};
	state = {
    	pay_way: "wechat_pay",
    	selectIndex:0,
    	amount:1
    }
	onChange = (value) => {
		console.log(value)
		this.setState({
			pay_way:value,
		});
	}
	onOk = ()=>{
		this.props.ordersAction({
			type:this.props.type,
			id:this.props.id,
			amount:this.state.amount,
			pay_way:this.state.pay_way,
			callBack:(data)=>{
				console.log(1231)
				if(/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(this.state.amount) && this.state.amount > 0 ){
					global.customizeHistory.push({
				        pathname: '/PayPage',
				        state: {
							topic:this.props.topic,
							amount:this.state.amount,
							href:this.props.href,
							...data
				        },
				    })
				    Popup.hide();
				}else{
					Toast.info('请输入正确的金额', 0.7);
				}
			}
		})
	}
	render() {
		const { pay_way, selectIndex } = this.state;
		return (
			<div>
				<h6 className={style.title}>
					<span>打赏主播</span>
				</h6>
				<div className={style.RewardAmount}>
					<div className={style.item}>
						<span className={selectIndex === 0 ? style.active : ""} onClick={(e)=>{this.setState({selectIndex:0,amount:e.target.innerHTML})}}>1</span>
					</div>
					<div className={style.item}>
						<span className={selectIndex === 1 ? style.active : ""} onClick={(e)=>{this.setState({selectIndex:1,amount:e.target.innerHTML})}}>5</span>
					</div>
					<div className={style.item}>
						<span className={selectIndex === 2 ? style.active : ""} onClick={(e)=>{this.setState({selectIndex:2,amount:e.target.innerHTML})}}>10</span>
					</div>
					<div className={style.item}>
						<span className={selectIndex === 3 ? style.active : ""} onClick={(e)=>{this.setState({selectIndex:3,amount:e.target.innerHTML})}}>20</span>
					</div>
					<div className={style.item}>
						<span className={selectIndex === 4 ? style.active : ""} onClick={(e)=>{this.setState({selectIndex:4,amount:e.target.innerHTML})}}>50</span>
					</div>
					<div className={style.item}>
						<input
							className={selectIndex === 5 ? style.active : ""}
							onClick={(e)=>{
								e.target.value=""
								this.setState({selectIndex:5,amount:0});
								e.target.focus();
							}}
							onInput = {(e)=>{
								this.setState({amount:e.target.value});
							}}
							type="text"
							placeholder="其他"
						/>
					</div>
				</div>
				<List renderHeader={() => '支付方式'}>
					<RadioItem checked={pay_way === "wechat_pay" } onChange={() => this.onChange("wechat_pay")}>
						<Icon type={wx} className={style.icon}  />微信
					</RadioItem>
					<RadioItem checked={pay_way === "alipay_wap" } onChange={() => this.onChange("alipay_wap")}>
						<Icon type={zfb} className={style.icon}  />支付宝
					</RadioItem>
				</List>
				<WhiteSpace size='md' />
				<WingBlank size="md">
					<Button
						type="primary"
						activeStyle={{backgroundColor:"#ff5566"}}
						style={{backgroundColor:"#ff6666",border:"none"}}
						onClick={this.onOk}
					>确认
					</Button></WingBlank>
				<WhiteSpace size='md' />
			</div>
		);
	}
}

