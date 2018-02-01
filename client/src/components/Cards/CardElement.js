// actual card  (const = card content)
// primarily styling
// can use a b-strap or materialize preset card
// src for image/other content will come from props

import React from "react";
import "./CardElement.css";
import {Card, CardTitle} from "react-materialize";
import LinkBuilder from "../LinkBuilder";
import LikeButton from "../LikeButton";
import Yashtag from "../yashtags";
const PortflowioCard = props => (


			<div class="card sticky-action ">
				<div class="card-image">
					<img alt={props.title}className= "actualcardimage"src={props.postImage}/>
				</div>
				<div class="card-content">
					<p className="descrippar">{props.description}</p>
				</div>
				<div className="yashtagholder center">
					{props.tags.map((el, i)=> (
						<Yashtag
							key= {i}
							tag= {el}
							id= {el} />
					))}
				</div>
				<div class="card-action">
				<LinkBuilder
						id = 'website'
						title = "Website"
						href = {props.website}/>
				<LinkBuilder
							id = 'project'
							title = "Project"
							href = {props.project}/>
				<a id='profile' href={"/user/"+props.email}>Profile</a>
					<LikeButton className = "likebutton" id={props.id} currentuser= {props.currentuser}/>
				</div>

			</div>



	);
//description above is not showing up

export default PortflowioCard;
