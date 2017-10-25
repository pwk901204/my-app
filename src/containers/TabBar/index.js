
import React, { Component } from 'react';
import style from './index.css';
import {TabBar, Icon} from 'antd-mobile';

import wode from "svg/wode.svg";
import wodeOn from "svg/wodeOn.svg";
import zhuye from "svg/zhuye.svg";
import zhuyeOn from "svg/zhuyeOn.svg";
import huanzhe from "svg/huanzhe.svg";
import huanzheOn from "svg/huanzheOn.svg";
import yimai from "svg/yimai.svg";
import yimaiOn from "svg/yimaiOn.svg";

import HomePage from "containers/HomePage/index";
import Mine from "containers/Mine/index";
import ComingSoon from "components/ComingSoon";
class TabBarWrap extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.routeParams.index)
		let selectedTab = this.props.routeParams.index ? this.props.routeParams.index :'0';
		this.state = {
			selectedTab: selectedTab
		};
	}
	render() {
		return (
			<TabBar
				unselectedTintColor="#6E6E6E"
				tintColor="#33a9fc"
				barTintColor="white"
			>
				<TabBar.Item
					title="首页"
					key="首页"
					icon={<Icon type={zhuye} size="md" />}
					selectedIcon={<Icon type={zhuyeOn} size="md" />}
					selected={this.state.selectedTab === '0'}
					onPress={() => {
						this.setState({
							selectedTab: '0',
						});
					}}
				>
					<HomePage />
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon type={huanzhe} size="md" />}
					selectedIcon={<Icon type={huanzheOn} size="md" />}
					title="患者"
					key="患者"
					selected={this.state.selectedTab === '1'}
					onPress={() => {
						this.setState({
							selectedTab: '1',
						});
					}}
				>
					<div style={{height:"100vh",position:"relative"}}>
						<ComingSoon/>
					</div>
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon type={yimai} size="md" />}
					selectedIcon={<Icon type={yimaiOn} size="md" />}
					title="医脉"
					key="医脉"
					selected={this.state.selectedTab === '2'}
					onPress={() => {
						this.setState({
							selectedTab: '2',
						});
					}}
				>
					<div style={{height:"100vh",position:"relative"}}>
						<ComingSoon/>
					</div>
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon type={wode} size="md" />}
					selectedIcon={<Icon type={wodeOn} size="md" />}
					title="我的"
					key="我的"
					selected={this.state.selectedTab === '3'}
					onPress={() => {
						this.setState({
							selectedTab: '3',
						});
					}}
				>
					<Mine/>
				</TabBar.Item>
			</TabBar>
		);
	}
}
export default TabBarWrap;





