// YAAAASHTAAAGS

import React from "react";
import "./yashtags.css";
import {Chip, Tag, Col, Row} from 'react-materialize'

class Yash extends React.component {

	state = {
		yashtag: ""
	};

	handleInputChange = event => {
	const { name, value } = event.target;
    	this.setState({
     	 	yashtag: value
    	});
  	};

	render(){
		return(
	<form>
		<div className="form-group">
      		<input
        		className="yashtag-input"
        		type="text"
        		value={this.state.yashtag}
        		name="q"
        		onChange={this.handleInputChange}
        	/>
        	<Tag>{this.state.yashtag}</Tag>
    	</div>
	</form>
	)};
}

export default Yash;
