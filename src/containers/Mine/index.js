import React, { Component } from 'react';
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import style from './index.css';
import {Icon, WingBlank, Grid} from 'antd-mobile';
import minebg  from "images/minebg.png";
import wodezhibo  from "svg/wodezhibo.svg";
import wodelubo  from "svg/wodelubo.svg";
import wodekecheng  from "svg/wodekecheng.svg";
import wodewenzhang  from "svg/wodewenzhang.svg";
import wodehuiyi  from "svg/wodehuiyi.svg";

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
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

const data=[
	{
		icon:<Icon type={wodezhibo} />,
		text:<p data-link="/MyStreamList" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的直播</p>
	},
	{
		icon:<Icon type={wodelubo} />,
		text:<p data-link="/MyRecordList" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的录播</p>
	},
	{
		icon:<Icon type={wodekecheng} />,
		text:<p data-link="/MySeriesList" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的课程</p>
	},
	{
		icon:<Icon type={wodehuiyi} />,
		text:<p data-link="/MyMeetList" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的会议</p>
	},
	
]
const data1=[
	{
		icon:<Icon type={wodefuwu} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的服务</p>
	},
	{
		icon:<Icon type={shimingrenzheng} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>实名认证</p>
	},
	{
		icon:<Icon type={huanzhepingjia} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>患者评价</p>
	},
	{
		icon:<Icon type={xiaoxizhongxin} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>消息中心</p>
	},
	{
		icon:<Icon type={kaitongzhibo} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>开通直播</p>
	},


	{
		icon:<Icon type={xingyibaozhang} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>行医保障</p>
	},

	{
		icon:<Icon type={xiugaiziliao} />,
		text:<p data-link="/ModifyInfo" style={{color:"#6f6f6f",fontWeight:'bold'}}>修改资料</p>
	},
	{
		icon:<Icon type={wodeqianbao} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的钱包</p>
	},

	{
		icon:<Icon type={shezhi} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>设置</p>
	},
	{
		icon:<Icon type={bangzhuyufankui} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>帮助与反馈</p>
	},
	{
		icon:<Icon type={wodewenzhang} />,
		text:<p data-link="/ComingSoonPage" style={{color:"#6f6f6f",fontWeight:'bold'}}>我的文章</p>
	},

]

class Mine extends Component {
  render() {
    return (
    	<div className={style.mineWrap}>
    		<ReactIScroll
				iScroll={iScroll}
			>
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
								onClick={(el)=>{
									if(el.text.props["data-link"])hashHistory.push(el.text.props["data-link"]);
								}}
							/>
						</WingBlank>
					</div>
					<div className={style.title}>服务与工具</div>
					<div className={style.content}>
						<Grid
							data={data1}
							columnNum={5}
							hasLine={false}
							onClick={(el)=>{
								if(el.text.props["data-link"])hashHistory.push(el.text.props["data-link"]);
							}}
						/>
					</div>
				</div>
			</ReactIScroll>
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
