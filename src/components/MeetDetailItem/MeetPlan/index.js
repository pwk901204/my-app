import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
moment.lang('zh-cn');

export default class MeetPlan extends Component {
	render() {
		return (
			<div className={style.meetPlan}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						{
							this.props.schedules.map((item,index)=>{
								return <div className={style.item} key={index}>
									<WhiteSpace size="xs" />
									<h5 className={style.title}><span></span>{item.date}</h5>
									<WhiteSpace size="xs" />
									{
										item.details.map((item,index)=>{
											return <div key={item.id}>
												<div className={style.itemTop}>
													<span>
														{moment(item.start_time).format('HH:mm')}-{moment(item.end_time).format('HH:mm')}
													</span>
													<span>
														{item.author}
													</span>
												</div>
												<div className={style.itemBody}>
													<p>{item.title}</p>
												</div>
												<WhiteSpace size="xs" />
											</div>
										})
									}
								</div>
							})
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

