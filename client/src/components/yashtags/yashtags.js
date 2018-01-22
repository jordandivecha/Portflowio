// YAAAASHTAAAGS

import React from "react";
import "./yashtags.css";
import {chip, tag, Col, Row} from 'react-materialize'

const Yash = () => (
	<div className="yashtag-container">
		<div className="chips"></div>
  		<div className="chips chips-initial"></div>
  		<div className="chips chips-placeholder"></div>
  		<div className="chips chips-autocomplete"></div>
		<Chip className="chip">
    		<Tag> Yashtag </Tag>
    		<i className="close material-icons">close</i>
  		</Chip>

	</div>
)

export default Yash;