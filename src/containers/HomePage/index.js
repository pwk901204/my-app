import React, { Component } from 'react';
import style from './index.css';
import {Link} from 'react-router';
import {Icon, WhiteSpace, Carousel, ActivityIndicator} from 'antd-mobile';

import shipingxueyuan from 'svg/shipingxueyuan.svg';
import yixuehuiyi from 'svg/yixuehuiyi.svg';

import wodezhengsuo from 'svg/wodezhengsuo.svg';
import zhuanjiatuandui from 'svg/zhuanjiatuandui.svg';
import yishengxiezuo from 'svg/yishengxiezuo.svg';
import guojiyixuelianmeng from 'svg/guojiyixuelianmeng.svg';
import ketiyanjiu from 'svg/ketiyanjiu.svg';
import url from "api_url/index.js";
import {connect} from "react-redux";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

class HomePage extends Component {
	state = {
		loading:false,
		getCarouselsData:[]
	}
	componentDidMount(){
		this.getCarousels();
	}
	getCarousels = () =>{
		this.setState({
			loading:true
		})
		fetch(url.carousels + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			console.log(data);
			this.setState({
				loading:false,
				getCarouselsData:data.recommendation
			})
		})
	}
	render() {
		return (
			<div className={style.homePageWrap}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div className={style.homePage}>
						<h4 className={style.title}>{this.props.userInfo.name}医生</h4>
						{
							this.state.getCarouselsData && 
							<Carousel
								className={style.myCarousel}
								autoplay={false}
								infinite
								selectedIndex={0}
								swipeSpeed={35}
								beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
								afterChange={index => console.log('slide to', index)}
							>
								{
									this.state.getCarouselsData.map((item,index)=>{
										return (
											<a href={item.button} key={index} >
												<img src={item.image_srcs.mobile_image} alt="img" />
											</a>
										)
									})
								}
							</Carousel>
						}
						<div className={style.topModule}>
							<Link to="/VideoCollege">
								<Icon type={shipingxueyuan}  className={style.shipingxueyuan} />
								<h6>视屏学院</h6>
								<p>可收看精彩直播、课程</p>
							</Link>
							<Link to="/Meet">
								<Icon type={yixuehuiyi}  className={style.yixuehuiyi} />
								<h6>医学会议</h6>
								<p>提供会议直播、报名服务</p>
							</Link>
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
						<ActivityIndicator toast  animating={this.state.loading}/>
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
)(HomePage);
