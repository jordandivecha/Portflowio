// actual card  (const = card content)
// primarily styling
// can use a b-strap or materialize preset card
// src for image/other content will come from props

import React from "react";
import "./CardElement.css";
import {Card, CardTitle} from "react-materialize";

const PortflowioCard = props => (
	<Card className='small'
		header={<CardTitle image={props.postImage}>{props.title}</CardTitle>}
		actions={[<a href={props.link1}>Website</a>
		<a href={props.link2}>Project</a>]}>
		Created by {props.creator} {props.profileLink}
		Description: {props.description}
	</Card>
	);

export default PortflowioCard;
