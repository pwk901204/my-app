import React, { Component } from 'react';
import {Link} from "react-router";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe.js";
class Pwk extends Component {
	render() {
		return (
			<ReactIScroll
				iScroll={iScroll}
				options={{...global.iscrollOptions}}
			>
				<div>
					<input type="radio"  />
					<input type="checkbox" style={{display:"block",width:"200px",height:"200px"}} />
				</div>
			</ReactIScroll>
		);
	}
}
export default Pwk;
