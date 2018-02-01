// YAAAASHTAAAGS

import React from "react";
import "./yashtags.css";
import {Chip, Tag, Col, Row} from 'react-materialize'

const Yash =(props) => (


				<Chip id="{props.id}">
					#{props.tag}
				</Chip>
	);


export default Yash;
