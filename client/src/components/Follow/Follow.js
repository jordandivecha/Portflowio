import React from "react";
import "./Follow.css";

const Follow = (props) =>(
  <button onClick= {props.follow.bind(this, props.id)}className= "btn btn-info followbtn ">{props.following ? 'Unfollow': 'Follow' }</button>
);
export default Follow;
