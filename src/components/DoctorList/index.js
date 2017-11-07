import React, { Component } from 'react';
import style from './index.css';
import { WhiteSpace, ActivityIndicator} from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";

import PropTypes from 'prop-types'
export default class DoctorList extends Component {
	static propTypes = {
		experts:PropTypes.array.isRequired, //医生列表
	};
	render() {
		return (
			<div className={style.doctorList}>
				<ReactIScroll
					iScroll={iScroll}
				>
					<div>
						<WhiteSpace size="xs" />
						{
							this.props.experts && this.props.experts.map((item,index)=>{
								return <div className={style.item} key={item.id}>
									<div>
										<img src={item.avatar_data.small} alt="img" />
									</div>
									<div>
										<h5>{item.name}</h5>
										<p>{item.hospital}</p>
									</div>
								</div>
							})
						}
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
