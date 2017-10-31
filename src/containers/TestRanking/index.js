import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import number1 from "svg/number1.svg";
import number2 from "svg/number2.svg";
import number3 from "svg/number3.svg";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";


class TestRanking extends Component {
	state = {
		loading:false
	}
	render() {
		return (
			<div className={style.testRankingWrap}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div className={style.testRanking}>
						<h6 className={style.title}>我的排名</h6>

						<div className={style.item}>
							<div className={style.number}>
								<span>1</span>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>

						<h6 className={style.title}>排名TOP10</h6>
						<div className={style.item}>
							<div className={style.number}>
								<Icon type={number1} className={style.numberIcon}/>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<Icon type={number2} className={style.numberIcon}/>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<Icon type={number3} className={style.numberIcon}/>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<span>1</span>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<span>1</span>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<span>1</span>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
						<div className={style.item}>
							<div className={style.number}>
								<span>1</span>
							</div>
							<div className={style.icon}>
								<img src="http://image.beekka.com/blog/2015/bg2015033101.png"/>
							</div>
							<div className={style.name}>李晓军</div>
							<div className={`${style.score} fontOrange`}>251<span>积分</span></div>

						</div>
					</div>
				</ReactIScroll>
				<ActivityIndicator toast  animating={this.state.loading}/>
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
)(TestRanking);


