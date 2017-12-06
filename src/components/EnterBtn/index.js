import React from 'react';
import style from './index.css';
import {Link} from "react-router";

export default function(props){
	return(
		<Link to={props.linkTo} className={style.enter}>
			<img src={props.src} alt=""/>
	    <p style={{color:props.color}}>{props.title}</p>
	  </Link>
	)
}