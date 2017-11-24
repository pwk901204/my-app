import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace , Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import number1 from "svg/number1.svg";
import number2 from "svg/number2.svg";
import number3 from "svg/number3.svg";
import PropTypes from 'prop-types';

export default class RewardList extends Component {
	static propTypes = {
		id:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired
	};
	state = {
		bounty_ranking:null
	}
	componentDidMount(){
		window.HOCFetch({ needToken:false })(global.url.bounty_ranking + "?id=" + this.props.id)
		.then((response)=>response.json())
		.then((data)=>{
			this.setState({
				bounty_ranking:data.bounty_ranking,
				bounty_count:data.bounty_count,
				payment_count:data.payment_count
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	render() {
		let { bounty_ranking, bounty_count, payment_count } = this.state;
		return (
			<div className={style.rewardlist}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}>
							<span></span>
							{ bounty_count && <p>共{bounty_count}人打赏</p> }
							{ payment_count && <p>共{payment_count}元</p>}
						</h5>
						<WhiteSpace size="xs" />
						{
							bounty_ranking ?
								bounty_ranking.map((item,index)=>{
									return (
										<div className={style.item} key={index}>
											{index+1 === 1 && <i><Icon type={number1} className={style.number} /></i>}
											{index+1 === 2 && <i><Icon type={number2} className={style.number} /></i>}
											{index+1 === 3 && <i><Icon type={number3} className={style.number} /></i>}
											{index+1 > 3 && <i>{index+1}</i>}
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
