import React, { Component } from 'react';
import style from './index.css';
import Parallax from 'parallax-js';

export default class Pwk extends Component {
	componentDidMount(){
		new Parallax(this.refs.scene,{
			clipRelativeInput:false
		});
	}
	render() {
		return (
			<div ref="scene" data-hover-only="true" data-relative-input="true" className={style.pwk}>
				<div data-depth="1.00"><img src="images/layer1.png"></div>
				<div data-depth="0.80"><img src="images/layer2.png"></div>
				<div data-depth="0.60"><img src="images/layer3.png"></div>
				<div data-depth="0.40"><img src="images/layer4.png"></div>
				<div data-depth="0.20"><img src="images/layer5.png"></div>
				<div data-depth="0.00"><img src="images/layer6.png"></div>

				
			</div>
		);
	}
}
