import React from 'react';
import style from './index.css';

export default function(props){
	return(
		<a href={props.linkTo} className={style.enter}>
			<img src={props.src} alt=""/>
	    <p style={{color:props.color}}>{props.title}</p>
	  </a>
	)
}