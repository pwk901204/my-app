import React, { Component } from 'react';
import style from './index.css';
import {connect} from "react-redux";
import {Button , Radio, WingBlank, WhiteSpace,} from 'antd-mobile';

import {browserHistory} from "react-router";

class PayPage extends Component {
	state={
		locationState:this.props.location.state
	}
	onOk = ()=>{
		let locationState = this.state.locationState;
		if(locationState.pay_url){
			window.location.href=locationState.pay_url
		}
	}
	// onBridgeReady = ()=>{
	//    	window.WeixinJSBridge.invoke(
	//        'getBrandWCPayRequest', {
	//            "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
	//            "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
	//            "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
	//            "package":"prepay_id=u802345jgfjsdfgsdg888",
	//            "signType":"MD5",         //微信签名方式：
	//            "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
	//        },
	//        (res)=>{
	//            if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	//        }
	//    )
	// }
	wxPay = ()=>{
		if (typeof WeixinJSBridge == "undefined"){
		   if( document.addEventListener ){
		       document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
		   }else if (document.attachEvent){
		       document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
		       document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
		   }
		}else{
		   this.onBridgeReady();
		}
	}
	render() {
		let locationState = this.state.locationState;
		console.log(locationState)
		return (
			<div>
				{
					locationState &&
					<div>
						<h6 className={style.title}>
							<span>订单详情</span>
							<span>{locationState.topic}</span>
						</h6>
						<div className={style.content}>
							<p>{locationState.amount}元</p>
							<span>所需费用</span>
						</div>
						<WhiteSpace size='md' />
						<WingBlank size="md">
							<Button
								type="primary"
								activeStyle={{backgroundColor:"#ff5566"}}
								style={{backgroundColor:"#ff6666",border:"none"}}
								onClick={this.onOk}
							>确认支付
							</Button></WingBlank>
						<WhiteSpace size='md' />
					</div>
				}
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
)(PayPage);
