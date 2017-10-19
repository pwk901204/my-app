import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, ActivityIndicator} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import url from "api_url/index.js";

export default class RewardList extends Component {
	state = {
		bounty_ranking:null
	}
	componentDidMount(){
		fetch(url.bounty_ranking + "?id=" + this.props.id)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				bounty_ranking:data.bounty_ranking
			})
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
							<p>共{this.props.stream_bounty_count}人打赏</p>
							<p>共{this.props.stream_payment_count}元</p>
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
