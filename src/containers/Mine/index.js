import React, { Component } from 'react';
import {connect} from "react-redux";
import style from './index.css';
import {Icon, WingBlank, Grid} from 'antd-mobile';
import minebg  from "images/minebg.png";
import wodezhibo  from "svg/wodezhibo.svg";
import wodelubo  from "svg/wodelubo.svg";
import wodekecheng  from "svg/wodekecheng.svg";
import wodewenzhang  from "svg/wodewenzhang.svg";

import wodefuwu  from "svg/wodefuwu.svg";
import shimingrenzheng  from "svg/shimingrenzheng.svg";
import huanzhepingjia  from "svg/huanzhepingjia.svg";
import xiaoxizhongxin  from "svg/xiaoxizhongxin.svg";
import kaitongzhibo  from "svg/kaitongzhibo.svg";

import xingyibaozhang  from "svg/xingyibaozhang.svg";
import xiugaiziliao  from "svg/xiugaiziliao.svg";
import wodeqianbao  from "svg/wodeqianbao.svg";
import shezhi  from "svg/shezhi.svg";
import bangzhuyufankui  from "svg/bangzhuyufankui.svg";


const data=[
	{
		icon:<Icon type={wodezhibo} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的直播</a>
	},
	{
		icon:<Icon type={wodelubo} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的录播</a>
	},
	{
		icon:<Icon type={wodekecheng} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的课程</a>
	},
	{
		icon:<Icon type={wodewenzhang} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的文章</a>
	},
]
const data1=[
	{
		icon:<Icon type={wodefuwu} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的服务</a>
	},
	{
		icon:<Icon type={shimingrenzheng} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>实名认证</a>
	},
	{
		icon:<Icon type={huanzhepingjia} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>患者评价</a>
	},
	{
		icon:<Icon type={xiaoxizhongxin} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>消息中心</a>
	},
	{
		icon:<Icon type={kaitongzhibo} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>开通直播</a>
	},


	{
		icon:<Icon type={xingyibaozhang} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>行医保障</a>
	},

	{
		icon:<Icon type={xiugaiziliao} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>修改资料</a>
	},
	{
		icon:<Icon type={wodeqianbao} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>我的钱包</a>
	},

	{
		icon:<Icon type={shezhi} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>设置</a>
	},
	{
		icon:<Icon type={bangzhuyufankui} />,
		text:<a style={{color:"#6f6f6f",fontWeight:'bold'}}>帮助与反馈</a>
	},

]

class Mine extends Component {
  render() {
    return (
		<div className={style.mine}>
			<div className={style.head}>
				<img src={minebg} alt="头像" />
				<h6>{this.props.userInfo.name}<span>({this.props.userInfo.title})</span></h6>
				<p>{this.props.userInfo.hospital}&nbsp;<span>{this.props.userInfo.department}</span></p>
			</div>
			<div className={style.nav}>
				<WingBlank size="lg" className={style.navBlank}>
					<Grid
						data={data}
						columnNum={4}
						hasLine={false}
					/>
				</WingBlank>
			</div>
			<div className={style.title}>服务与工具</div>
			<div className={style.content}>
				<Grid
					data={data1}
					columnNum={5}
					hasLine={false}
				/>
			</div>
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
)(Mine);
