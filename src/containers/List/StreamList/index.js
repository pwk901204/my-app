import React, { Component } from 'react';
import style from './index.css';
import {Icon, ActivityIndicator, Picker} from 'antd-mobile';
import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";
import {connect} from "react-redux";
import url from "api_url/index.js";

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
					<div className={style.item}>
						<div className={style.left}>
							<img src="" alt="img" />
							<span className={style.blue}>直播中</span>
						</div>
						<div className={style.right}>
							<h5>一步道都撒的撒都撒的撒十大大赛大 当时的撒的撒的啊的</h5>
							<div>
								<span>中南大学的撒的大大</span>
								<span>骨科都撒的撒打算</span>
							</div>
							<div>
								<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>王光</span></p>
								<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>2023</span></p>
								<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={style.fontBlue}>免费</span></p>
							</div>
						</div>
					</div>
					<div className={style.item}>
						<div className={style.left}>
							<img src="" alt="img" />
							<span className={style.blue}>直播中</span>
						</div>
						<div className={style.right}>
							<h5>一步道都撒的撒都撒的撒十大大赛大 当时的撒的撒的啊的</h5>
							<div>
								<span>中南大学的撒的大大</span>
								<span>骨科都撒的撒打算</span>
							</div>
							<div>
								<p className="clearfix"><Icon type={yisheng} className={style.icon} /><span>王光</span></p>
								<p className="clearfix"><Icon type={renshu} className={style.icon}  /><span>2023</span></p>
								<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={style.fontBlue}>免费</span></p>
							</div>
						</div>
					</div>
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


