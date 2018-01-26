//

import React from "react";
import "./Feed.css"
const Feed = props =>(
<div className = "{props.class}">

    {props.cards()}

</div>)

export default Feed;
