import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import PropTypes from 'prop-types';

export default class RewardList extends Component {
	static propTypes = {
		id:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		bounty_count:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,  //打赏人数
		payment_count:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,  //打赏金额
	};
	state = {
		bounty_ranking:null
	}
	componentDidMount(){
		fetch(global.url.bounty_ranking + "?id=" + this.props.id)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				bounty_ranking:data.bounty_ranking
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render() {
		return (
			<div className={style.rewardlist}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}>
							<span></span>
							<p>共{this.props.bounty_count}人打赏</p>
							<p>共{this.props.payment_count}元</p>
						</h5>
						<WhiteSpace size="xs" />
						{
							this.state.bounty_ranking ?
								this.state.bounty_ranking.map((item,index)=>{
									return (
										<div className={style.item} key={index}>
											<i>{index+1}</i>
											<p>{item.name}</p>
											<span>{item.amount}元</span>
										</div>
									)
								})
							:
							<div className={style.item}>
								<p>暂无人打赏</p>
							</div>
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
