import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

export default class Enlist extends Component {
	render() {
		return (
			<div className={style.enlist}>
				<ReactIScroll
					iScroll={iScroll}
					options={{click: true}}
				>
					<div>
						<WhiteSpace size="xs" />
						<h5 className={style.title}><span></span>{this.props.stream_users_count}人已报名</h5>
						{
							this.props.attendee_users.map((item,index)=>{
								return (
									<div className={style.item} key={index}>
										<img src={item.middle} alt="img" />
										<span>{item.name}</span>
										{item.user_type == "doctor" && <i>医</i> }
										{item.user_type == "student" && <i>学</i> }
										{item.user_type == "visitor" && <i>访</i> }
									</div>
								)
							})
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}

