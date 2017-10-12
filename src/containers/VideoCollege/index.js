import React, { Component } from 'react';
//import logo from '../../../logo.svg';
import style from './index.css';
import {Icon, WhiteSpace} from 'antd-mobile';

import renshu from "svg/renshu.svg";
import yisheng from "svg/yisheng.svg";
import feiyong from "svg/feiyong.svg";

class VideoCollege extends Component {
  render() {
    return (
		<div>
			<video
				className={style.video}
				autoPlay
				loop
				src="http://vodlrv4exh9.vod.126.net/vodlrv4exh9/521e3ace-5fcd-424d-998e-7f77a90fd6eb.mp4"
			>
				您的浏览器不支持 video 标签。
			</video>
			<WhiteSpace size="md" />

			<div className={style.stream}>
				<a href="javascript:;" className={style.title}>
					<i></i>
					<p>热门直播</p>
					<span>更多</span>
				</a>
				<div className={style.item}>
					<div className={style.left}>
						<img src=""  />
						<span className={style.red}>直播中</span>
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
							<p className="clearfix"><Icon type={feiyong} className={style.icon}  /><span className={style.fontRed}>¥12</span></p>
						</div>
					</div>
				</div>
				<div className={style.item}>
					<div className={style.left}>
						<img src=""  />
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
			<WhiteSpace size="md" />

			<div className={style.record}>
				<a href="javascript:;" className={style.title}>
					<i></i>
					<p>精彩录像</p>
					<span>更多</span>
				</a>
				<div className={style.item}>
					<div className={style.left}>
						<img src=""  />
						<span>录像回放</span>
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
			<WhiteSpace size="md" />

			<div className={style.series}>
				<a href="javascript:;" className={style.title}>
					<i></i>
					<p>经典系列</p>
					<span>更多</span>
				</a>
				<div className={style.item}>
					<div className={style.left}>
						<img src=""  />
						<span className={style.blue}>共18讲</span>
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

		</div>
    );
  }
}

export default VideoCollege;
