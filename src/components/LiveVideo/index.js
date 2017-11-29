import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import style from './index.css';
import PropTypes from 'prop-types';
import fresh from 'images/fresh.png';

export default class LiveVideo extends Component {

	static defaultProps = {
		autoplay: false
	};
	static propTypes = {
		autoplay : PropTypes.bool,
		cover_url : PropTypes.string,
		play_url : PropTypes.oneOfType([PropTypes.string,PropTypes.object]).isRequired,
	};
	constructor(props){
		super(props);
		this.myPlayer = null;
	}
	componentDidMount() {
		console.log(this.props)
		let option = {
			autoplay:this.props.autoplay,
			inactivityTimeout:3000,
			"preload": "auto",
			controls:true,
			"loop": true, //是否循环播放
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
			var play_url = _this.props.play_url;
			var dataOption = null;
			if( typeof play_url ===  "string" ){
				console.log(play_url,'111111')
				dataOption = [
					{type: "video/mp4", src: play_url}
				]
			}else if(typeof play_url ===  "object" ){
				dataOption = [];
				if(play_url.mp4){
					dataOption.push({type: "video/mp4", src: play_url.mp4})
				}
				if(play_url.hls){
					dataOption.push({type: "application/x-mpegURL", src: play_url.hls})
				}
				if(play_url.flv){
					dataOption.push({type: "video/x-flv", src: play_url.flv})
				}
			}
			this.myPlayer.setDataSource(dataOption);


			//添加组件到 this.myPlayer.corePlayer根节点
			this.myPlayer.corePlayer.addChild(errorComponent, {})
			this.myPlayer.onError(function(err){
				let text = "刷新";
				console.log(err);
				switch(err.errCode){
					case 1:
						 text = '您终止了媒体的播放';
    				break;
    				case 2:
						 text = '网络错误导致媒体下载失败';
    				break;
    				case 3:
						 text = '您的浏览器不支持播放器的加载';
    				break;
    				case 4:
						 text = '无法加载媒体，因为服务器或网络失败，或者因为格式不支持';
    				break;
    				case 5:
						 text = '媒体已加密';
    				break;
    				case 6:
						 text = '请勿使用推流地址拉流';
    				break;
    				case 7:
						 text = '拉流超时,请刷新重试';
    				break;
				}
				errorElement.innerHTML = `<p>${text}</p><img src=${fresh} />`;
				errorElement.onclick = function(){
					_this.myPlayer.refresh()
				}
			});
			this.myPlayer.on("ended",()=>{
				console.log("ended");
			})

		});


		//自定义 错误组件
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