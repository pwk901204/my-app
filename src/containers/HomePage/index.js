import React, { Component } from 'react';
//import logo from '../../../logo.svg';
import style from './index.css';
import {Icon, Button, WhiteSpace, Carousel} from 'antd-mobile';

import shipingxueyuan from 'svg/shipingxueyuan.svg';
import yixuehuiyi from 'svg/yixuehuiyi.svg';

import wodezhengsuo from 'svg/wodezhengsuo.svg';
import zhuanjiatuandui from 'svg/zhuanjiatuandui.svg';
import yishengxiezuo from 'svg/yishengxiezuo.svg';
import guojiyixuelianmeng from 'svg/guojiyixuelianmeng.svg';
import ketiyanjiu from 'svg/ketiyanjiu.svg';
import sss from "images/tuwenkecheng.png";

class HomePage extends Component {
  render() {
    return (
		<div className={style.homePage}>
			<h4 className={style.title}>刘建君医生</h4>
			<Carousel
				className={style.myCarousel}
				autoplay={false}
				infinite
				selectedIndex={0}
				swipeSpeed={35}
				beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
				afterChange={index => console.log('slide to', index)}
			>
				<a href="http://www.baidu.com" >
					<img src={sss} />
				</a>
				<a href="http://www.baidu.com" >
					<img src={sss} />
				</a>
				<a href="http://www.baidu.com">
					<img src={sss} />
				</a>
			</Carousel>
			<div className={style.topModule}>
				<a >
					<Icon type={shipingxueyuan}  className={style.shipingxueyuan} />
					<h6>视屏学院</h6>
					<p>可收看精彩直播、课程</p>
				</a>
				<a>
					<Icon type={yixuehuiyi}  className={style.yixuehuiyi} />
					<h6>医学会议</h6>
					<p>提供会议直播、报名服务</p>
				</a>
			</div>
			<WhiteSpace size="md" />
			<div className={style.midModule}>
				<a href="http://www.baidu.com" >
					图文课程
				</a>
				<a href="http://www.baidu.com" >
					系列试题
				</a>
				<a href="http://www.baidu.com" >
					交流园地
				</a>
			</div>
			<WhiteSpace size="md" />
			<div className={style.fuwuTitle}>
				<span></span>
				<h6>更多服务</h6>
			</div>
			<div className={style.botModule}>
				<a href="http://www.baidu.com" >
					<Icon type={wodezhengsuo}  className={style.botModuleIcon}/>
					<p>我的诊所</p>
				</a>
				<a href="http://www.baidu.com" >
					<Icon type={zhuanjiatuandui}  className={style.botModuleIcon} />
					<p>专家团队</p>
				</a>
				<a href="http://www.baidu.com" >
					<Icon type={yishengxiezuo}  className={style.botModuleIcon} />
					<p>医生协作</p>
				</a>
				<a href="http://www.baidu.com" >
					<Icon type={guojiyixuelianmeng} className={style.botModuleIcon} />
					<p>国际医学联盟</p>
				</a>
				<a href="http://www.baidu.com" >
					<Icon type={ketiyanjiu}  className={style.botModuleIcon}/>
					<p>课题研究</p>
				</a>
				<a>
				</a>
			</div>
			<WhiteSpace size="md" />
		</div>
    );
  }
}

export default HomePage;
