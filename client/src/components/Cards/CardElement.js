// actual card  (const = card content)
// primarily styling
// can use a b-strap or materialize preset card
// src for image/other content will come from props

import React from "react";
import "./CardElement.css";
import {Card, CardTitle} from "react-materialize";


const PortflowioCard = props => (



	<Card className='card-image CardElement center-align'
		header={<CardTitle image={props.postImage}></CardTitle>}
		actions={[<span classsName= "center"><a className="blue-text" href={props.website}>Website</a>
	<a className="blue-text" href={props.project}>Project</a></span>]}>
		<h1 className = "center">{props.title}</h1>
		<h3 className= "center">{props.description}</h3>
	</Card>





	);
//description above is not showing up

export default PortflowioCard;
