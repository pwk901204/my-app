import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
import clock from "svg/clock.svg";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import xiaoren from "svg/xiaoren.svg";
moment.lang('zh-cn');

export default class MeetRecordPlan extends Component {
	static propTypes = {
		recordings_count:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]).isRequired,
		videos:PropTypes.array.isRequired,
	};
	render() {
		return (
			<div className={style.meetRecordPlan}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>会议共有{this.props.recordings_count}节</h5>
						{
							this.props.videos.map((item,index)=>{
								return <Link to={`/RecordDetail/${item.id}`}  key={item.id} className={style.item}>
									<div className={style.itemTop}>
										<span>
											<Icon type={clock} className={style.clock} />
											<i className={style.fontBlue}>录播时长</i> {item.duration}
										</span>
										<span className={Number(item.price) ? style.fontRed : style.fontBlue} >
											{Number(item.price)?"¥"+item.price:"免费"}
										</span>
									</div>
									<div className={style.itemBody}>
										<div className={style.left}>
											<img src={item.avatar_data.big} alt="img" />
										</div>
										<div className={style.right}>
											<p>{item.topic}</p>
											<p>
												<span><Icon type={xiaoren} className={style.xiaoren} />{item.name}</span>
												<span>{item.title}</span>
												<span>{item.hospital}</span>
											</p>
										</div>
									</div>
									<WhiteSpace size="xs" />
								</Link>
							})
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

