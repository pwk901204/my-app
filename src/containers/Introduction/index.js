import React, { Component } from 'react';
import style from './index.css';
import {ActivityIndicator,List} from 'antd-mobile';
const Item = List.Item;

class Introduction extends Component {
	state={
		loading:false,
		info:"",
		good:""
	}
	render() {
		return (
			<div className={style.introduction}>
				<h6 to="/SeriesList" className={style.title}>
					<i></i>
					<p>简介</p>
				</h6>
				<div className={style.content}>
					<textarea rows="5" onChange={(e)=>{
						this.setState({
							info:e.target.value
						})
					}} value={this.state.info} placeholder="请输入您的个人简介"></textarea>
				</div>
				<h6 to="/SeriesList" className={style.title}>
					<i></i>
					<p>擅长</p>
				</h6>
				<div className={style.content}>
					<textarea rows="5" onChange={(e)=>{
						this.setState({
							good:e.target.value
						})
					}} value={this.state.good} placeholder="请输入您的擅长的领域" ></textarea>
				</div>
				<ActivityIndicator toast  animating={this.state.loading}/>
			</div>
		);
	}
}
export default Introduction;

