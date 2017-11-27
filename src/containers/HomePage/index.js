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
import {connect} from "react-redux";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {userInfo} from "reduxs/userInfo";
import EnterBtn from 'components/EnterBtn'
import enter from 'images/enter1.png';

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

		window.HOCFetch({ needToken:false })(global.url.carousels)
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
		let userInfo = this.props.userInfo;
		return (
			<div className={style.homePageWrap}>
				<EnterBtn src={enter} title='华润双鹤杯' linkTo='/DoubleCrane' color='#F4A11A'/>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div className={style.homePage}>
						{userInfo.type === "Doctor" && <h4 className={style.title}>{userInfo.name}({userInfo.title})</h4>}
						{userInfo.type === "Student" && <h4 className={style.title}>{userInfo.name}(学生)</h4>}
						{userInfo.type === "Visitor" && <h4 className={style.title}>{userInfo.name}(访客)</h4>}
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
								<h6>视频学院</h6>
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
							<Link to="/TestList" >
								系列试题
							</Link>
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
	(dispatch)=>{
		return {
			userInfoAction:(data)=>{
				dispatch(userInfo(data))
			}
		}
	}
)(HomePage);
