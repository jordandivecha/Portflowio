// actual card  (const = card content)
// primarily styling
// can use a b-strap or materialize preset card
// src for image/other content will come from props

import React from "react";
import "./CardElement.css";
import {Card, CardTitle} from "react-materialize";


const PortflowioCard = props => (

	<Card className='card-image CardElement'
		header={<CardTitle image={props.postImage}></CardTitle>}
		actions={[<span>{props.title} Created by {props.creator}<br/> <a href={props.website}>Website</a>
		<a href={props.project}>Project</a></span>]}>

		<p>Description:</p>
		<p>{props.description}</p>
	</Card>
	);
//description above is not showing up

export default PortflowioCard;
