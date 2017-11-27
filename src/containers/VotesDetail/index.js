import React, { Component } from 'react';
import style from './index.css';

export default class VotesDetail extends Component {
	render() {
		return (
			<div className={style.vote_detail}>
				<div className={style.time}>投票倒计时：6天23小时26分</div>
				<div className={style.box}>
					<div className={style.head}>
						<div className={style.img}></div>
						<div className={style.headBox}>
							<p>刘晓梅<small>（主治医生）</small><span>0001号</span></p>
							<span className={style.des}>湖南湘雅医院 心内科</span>
						</div>
					</div>
					<div className={style.body}>
						<p>排名 12</p>
						<i>2361</i>
						<span>已获得票数</span>	
					</div>
				</div>
				<div className={style.bottom}>
					<span className={style.share}>拉票</span>
					<span className={style.throw}>投票</span>
				</div>
				<div className={style._modal}>
					<h4>请点击右上角邀请好友投票哦~</h4>
					<div className={style._modal_img}>
						<p>或长按下方二维码保存，发送给好友，邀请好友扫码，给你投票吧！</p>
						<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351925244,655071204&fm=27&gp=0.jpg" alt="" />
					</div>
				</div>
			</div>
		);
	}
}
