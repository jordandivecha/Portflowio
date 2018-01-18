import React from "react";
import "./Filestack.css";
import ReactFilestack, {client} from 'filestack-react';

const Filestack = props =>
<div>
  <ReactFilestack
    apikey="AdP2fF1FvRdGW4RWCKw8sz"
    buttonText="Click me"
    buttonClass="classname"
    options=""
    onSuccess={this.yourCallbackFunction}
  />

</div>

export default Filestack;
