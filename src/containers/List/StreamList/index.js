import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import url from "api_url/index.js";
import StreamItem from "components/StreamItem/index.js";
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

class StreamList extends Component {
	state = {
		loading:false,
	}
	fnClickAdd = ()=>{

	}


	render() {
		return (
			<div className={style.streamList}>
				<Picker
					data={seasons}
					title="科室"
					cascade={true}
					cols={2}
				>
				</Picker>
				<div className={style.stream}>
					<StreamItem />
					<StreamItem />
				</div>
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}

export default connect (
	(state)=>{
		return {
			userInfo:state.userInfo
		}
	},
	()=>{
		return {
		}
	}
)(StreamList);


