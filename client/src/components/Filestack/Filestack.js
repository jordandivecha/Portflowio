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
  <img id="imageUpload" src = {this.state.image}/>

  <ReactFilestack
    apikey="AdP2fF1FvRdGW4RWCKw8sz"
    buttonText="Upload Image"
    buttonClass="classname"
    options=""
    onSuccess={this.makeImage}
  />

</div>

);
}
}
export default Filestack;
