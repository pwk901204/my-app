import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag,Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
import clock from "svg/clock.svg";
import PropTypes from 'prop-types';
moment.lang('zh-cn');

export default class MeetStreamPlan extends Component {
	static propTypes = {
		schedules_count:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		schedules:PropTypes.array.isRequired,
	};
	render() {
		console.log(this.props.schedules)
		return (
			<div className={style.meetStreamPlan}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>会议共有{this.props.schedules_count}节</h5>
						{
							this.props.schedules.map((item,index)=>{
								return item.details.map((item,index)=>{
									return <div>
										<div className={style.itemTop}>
											<span>
												<Icon type={clock} className={style.clock} />
												{moment(item.start_time).format('YYYY-MM-DD HH:mm')}
											</span>
											{
												item.status == "not_begin" &&
												<span className={style.fontBlue}>
													即将开始
												</span>
											}
											{
												item.status == "live" &&
												<span className={style.fontRed}>
													直播中
												</span>
											}
											{
												item.status == "ended" &&
												<span >
													已结束
												</span>
											}
										</div>
										<div className={style.itemBody}>
											<div className={style.left}>
												<img src={item.avatar_data.small} alt="img" />
											</div>
											<div className={style.right}>
												<p>{item.title}</p>
												<p>{item.author}</p>
											</div>
										</div>
										<WhiteSpace size="xs" />
									</div>
								})
							})
						}

					</div>
				</ReactIScroll>
			</div>
		);
	}
}

