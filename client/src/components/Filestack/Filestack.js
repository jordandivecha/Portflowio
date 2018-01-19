import React from "react";
import "./Filestack.css";
import ReactFilestack, {client} from 'filestack-react';

class Filestack extends React.Component {

state = {
  image: ""
}

makeImage =(result) => {
  this.setState({image: result.filesUploaded[0].url})
}
  render(){
    return(
<div>
  <ReactFilestack
    apikey="AdP2fF1FvRdGW4RWCKw8sz"
    buttonText="Click me"
    buttonClass="classname"
    options=""
    onSuccess={this.makeImage}
  />
  <img src = {this.state.image}/>
</div>

);
}
}
export default Filestack;
