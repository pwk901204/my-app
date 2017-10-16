
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

class TabBarWrap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'HomePage'
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
					selected={this.state.selectedTab === 'HomePage'}
					onPress={() => {
						this.setState({
							selectedTab: 'HomePage',
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
					selected={this.state.selectedTab === 'redTab'}
					onPress={() => {
						this.setState({
							selectedTab: 'redTab',
						});
					}}
				>
					123
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon type={yimai} size="md" />}
					selectedIcon={<Icon type={yimaiOn} size="md" />}
					title="医脉"
					key="医脉"
					selected={this.state.selectedTab === 'greenTab'}
					onPress={() => {
						this.setState({
							selectedTab: 'greenTab',
						});
					}}
				>
					123
				</TabBar.Item>
				<TabBar.Item
					icon={<Icon type={wode} size="md" />}
					selectedIcon={<Icon type={wodeOn} size="md" />}
					title="我的"
					key="我的"
					selected={this.state.selectedTab === 'Mine'}
					onPress={() => {
						this.setState({
							selectedTab: 'Mine',
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





