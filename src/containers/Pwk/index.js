import React, { Component } from 'react';
import style from './index.css';
import {Link} from "react-router";
import { Button } from 'antd-mobile';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
class Pwk extends Component {

	state={
		voiceList:null
	}

	startRecord = ()=>{
		global.wx.startRecord();
	}
	endRecord = ()=>{
		let _this = this;
		global.wx.stopRecord({

		    success: function (res) {

		        var localId = res.localId;
		        console.log(res)

		        _this.setState({
		        	voiceList:_this.state.voiceList.push(localId)
		        })
		    }

		});
	}

	playVoice = (id)=>{
		global.wx.playVoice({

		    localId: id // 需要播放的音频的本地ID，由stopRecord接口获得

		});
	}

	render() {
		return (
			<ReactIScroll
				iScroll={iScroll}
				options={{...global.iscrollOptions}}
			>
				<div>
					<Button type="primary" size="small" className={style.btn} onTouchStart={this.startRecord} onTouchEnd={this.endRecord} >发送</Button>

					<Button type="primary" size="small" className={style.btn} onTouchStart={this.startRecord} onTouchEnd={this.endRecord} >播放</Button>
					<ul>
						{
							this.state.voiceList && this.state.voiceList.map((item,index)=>{
								return <li key={item} onClick={this.playVoice.bind(this,item)}>item</li>
							})
						}
					</ul>
				</div>
			</ReactIScroll>
		);
	}
}
export default Pwk;
