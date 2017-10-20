import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import style from './index.css';

export default class LiveVideo extends Component {

	static defaultProps = {
		anchor: false
	};
	static propTypes = {
		anchor : React.PropTypes.bool,
		cover_url : React.PropTypes.string.isRequired,
		play_url : React.PropTypes.string.isRequired,
	};
	constructor(props){
		super(props);
		this.myPlayer = null;
	}
	componentDidMount() {
		console.log(this.props)
		let option = {
			autoplay:!this.props.anchor,
			inactivityTimeout:30000,
			"preload": "auto",
			controls:true,
			poster : this.props.cover_url, //视频播放前显示的图片
			controlBar:{
				'currentTimeDisplay':true,
				'timeDivider':true,
				'durationDisplay':true,
				'remainingTimeDisplay':true,
				playToggle: true,
				progressControl:true
			},
			errorDisplay:false,
			loadingSpinner:true,
			"x-webkit-airplay":"allow",
			"webkit-playsinline":true
		}
		var _this = this;
		this.myPlayer = window.neplayer("my-video", option, ()=> {
			console.log('播放器初始化完成');
			//设置数据源
			let play_url = _this.props.play_url;
			let dataOption = [
				{type: "video/mp4", src: play_url},
				{type: "video/x-flv", src: play_url}
			]
			this.myPlayer.setDataSource(dataOption)
			//添加组件到 this.myPlayer.corePlayer根节点

			this.myPlayer.corePlayer.addChild(errorComponent, {})
			this.myPlayer.onError(function(){
				console.log("出错了～～～", errorElement)
				let text = _this.props.anchor ? '直播推流失败，请检查推流设备' : '主播讲课有点累了，稍等一会就可以继续观看哦~点我刷新';
				errorElement.innerHTML = `<p>${text}</p>`; //<img class="shuaxinBtn" src=""></img>
				errorElement.onclick = function(){
					_this.myPlayer.refresh()
				}
			});
		});

		var errorElement = document.createElement("div");
		//添加class   my-error-display
		window.neplayer.addClass(errorElement, "my-error-display");
		//继承组件
		var Component = window.neplayer.getComponent("Component");
		var ErrorComponent = window.neplayer.extend(Component, {});
		//在实例化组件的时候传入组件元素
		var errorComponent = new ErrorComponent(null, {el:errorElement});
	}
	componentWillUnmount() {
		//当我挂载的时候
		this.myPlayer.reset();  //必须要先reset再release
		this.myPlayer.release()
	}
	render() {
		return (
			<div className={style.LiveVideo}>
				<video id="my-video" className="video-js vjs-fluid vjs-big-play-centered">
				</video>
			</div>
		)
	}
}