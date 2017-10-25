import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import moment from 'moment';
moment.lang('zh-cn');

export default class SeriesDetailList extends Component {
	render() {
		return (
			<div className={style.seriesList}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>已更新至第{this.props.videos.length}讲</h5>
						{
							this.props.videos.map((item,index)=>{

								if(item.video_type === "stream"){
									return (
										<div className={style.item} key={item.id}>
											<WhiteSpace size="xs" />
											<div className={style.itemTop}>
												<span>
													直播开始时间:{moment(item.start_time).format('YYYY-MM-DD HH:mm')}
												</span>
												<span className={style.buy}>
													¥{item.price}
												</span>
											</div>
											<div className={style.itemBody}>
												<p>{item.topic}</p>
												<Tag selected>{item.status}</Tag>
											</div>
										</div>
									)
								}else{
									return (
										<div className={style.item} key={item.id}>
											<WhiteSpace size="xs" />
											<div className={style.itemTop}>
												<span>
													录播时长{item.duration}
												</span>
												<span className={style.buy}>
													¥{item.price}
												</span>
											</div>
											<div className={style.itemBody}>
												<p>{item.topic}</p>
												<Tag selected>{item.status}</Tag>
											</div>
										</div>
									)
								}
							})
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

