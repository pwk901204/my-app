import React, { Component } from 'react';
import style from './index.css';
import {Button ,List, Radio, WingBlank, WhiteSpace, Icon} from 'antd-mobile';
import wx from "svg/wx.svg";
import zfb from "svg/zfb.svg";
const RadioItem = Radio.RadioItem;
export default class Reward extends Component {
	state = {
    	value: 0
    }
	onChange = (value) => {
		console.log(value)
		this.setState({
			value,
		});
	}
	 onBridgeReady = ()=>{
	   	window.WeixinJSBridge.invoke(
	       'getBrandWCPayRequest', {
	           "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
	           "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
	           "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
	           "package":"prepay_id=u802345jgfjsdfgsdg888",
	           "signType":"MD5",         //微信签名方式：
	           "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
	       },
	       (res)=>{
	           if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	       }
	   )
	}
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
	zfbPay = ()=>{

	}

	render() {
		const { value} = this.state;
		return (
			<div>
				<h6 className={style.title}>
					<span>打赏主播</span>
				</h6>
				<div>
					
				</div>

				<List renderHeader={() => '支付方式'}>
					<RadioItem checked={value === 0 } onChange={() => this.onChange(0)}>
						<Icon type={wx} className={style.icon}  />微信
					</RadioItem>
					<RadioItem checked={value === 1 } onChange={() => this.onChange(1)}>
						<Icon type={zfb} className={style.icon}  />支付宝
					</RadioItem>
				</List>
				<WhiteSpace size='md' />
				<WingBlank size="md">
					<Button
						type="primary"
						activeStyle={{backgroundColor:"#ff5566"}}
						style={{backgroundColor:"#ff6666",border:"none"}}
					>确认支付
					</Button></WingBlank>
				<WhiteSpace size='md' />
			</div>
		);
	}
}


// order   创建订单
//  payaway  : wx  zfb

// sourse  打赏  购买直播  课程之类的

// target_type





