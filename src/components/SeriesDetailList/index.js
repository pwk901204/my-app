import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, Tag, Icon} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
import {Link} from "react-router";
import moment from 'moment';
import stream from 'svg/stream.svg';
import record from 'svg/record.svg';
moment.lang('zh-cn');

export default class SeriesDetailList extends Component {
	render() {
		return (
			<div className={style.seriesList}>
				<ReactIScroll
					iScroll={iScroll}
					options={{...global.iscrollOptions}}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>已更新至第{this.props.videos.length}讲</h5>
						{
							this.props.videos.map((item,index)=>{

								if(item.video_type === "stream"){
									return (
										<Link to={`/StreamDetail/${item.id}`} className={style.item} key={item.id}>
											<WhiteSpace size="xs" />
											<div className={style.itemTop}>
												<span>
													<Icon type={stream} className={style.icon}/>直播开始时间:{moment(item.start_time).format('YYYY-MM-DD HH:mm')}
												</span>
												<span className={style.buy}>
													¥{item.price}
												</span>
											</div>
											<div className={style.itemBody}>
												<p>{item.topic}</p>
												<Tag selected className={style.tag}>{item.status}</Tag>
											</div>
										</Link>
									)
								}else{
									return (
										<Link to={`/RecordDetail/${item.id}`} className={style.item} key={item.id}>
											<WhiteSpace size="xs" />
											<div className={style.itemTop}>
												<span>
													<Icon type={record} className={style.icon}/>录播时长:{item.duration}分钟
												</span>
												<span className={Number(item.price) ? style.buy : style.free} >
													{Number(item.price)?"¥"+item.price:"免费"}
												</span>
											</div>
											<div className={style.itemBody}>
												<p>{item.topic}</p>
												<Tag selected>{item.status}</Tag>
											</div>
										</Link>
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

