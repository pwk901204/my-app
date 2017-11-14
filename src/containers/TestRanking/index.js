import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Toast} from 'antd-mobile';
import {connect} from "react-redux";

import number1 from "svg/number1.svg";
import number2 from "svg/number2.svg";
import number3 from "svg/number3.svg";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

class TestRanking extends Component {
	state = {
		loading:false
	}
	componentDidMount(){
		this.getDetail();
	}

	getDetail=()=>{
		this.setState({
			loading:true
		})
		return fetch(global.url.topics + "/" + this.props.params.id + "/my_rank" + "?token=" + this.props.userInfo.token)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				loading:false
			})
			console.log(data);
			if(data.msg.status === "success"){
				this.setState({
					my_score:data.my_score,
					scores:data.scores
				})
			}else{
				Toast.info(data.msg.message);
			}
		})
	}
	render() {
		let {scores,my_score} = this.state;
		return (
			<div className={style.testRankingWrap}>
				{
					scores &&<ReactIScroll
						iScroll={iScroll}
						options={{...global.iscrollOptions}}
					>
					 <div className={style.testRanking}>
							<h6 className={style.title}>我的排名</h6>

							<div className={style.item}>
								<div className={style.number}>
									<span>{my_score.ranking}</span>
								</div>
								<div className={style.icon}>
									<img src={my_score.headimgurl}/>
								</div>
								<div className={style.name}>{this.props.userInfo.name}</div>
								<div className={`${style.score} fontOrange`}>{my_score.total_score}<span>积分</span></div>

							</div>

							<h6 className={style.title}>排名TOP10</h6>
							{
								scores.map((item,index)=>{
									return <div className={style.item} key={index}>
										<div className={style.number}>
											{item.ranking == 1 && <Icon type={number1} className={style.numberIcon}/>}
											{item.ranking == 2 && <Icon type={number2} className={style.numberIcon}/>}
											{item.ranking == 3 && <Icon type={number3} className={style.numberIcon}/>}
											{item.ranking > 3 && <span>{item.ranking}</span>}
										</div>
										<div className={style.icon}>
											<img src={item.headimgurl}/>
										</div>
										<div className={style.name}>{item.user_name}</div>
										<div className={`${style.score} fontOrange`}>{item.total_score}<span>积分</span></div>

									</div>
								})
							}
						</div>
					</ReactIScroll>
				}
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


