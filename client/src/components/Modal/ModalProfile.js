import React from "react";
import "./ModalPost.css";

import {Button, Modal, Row, Input} from "react-materialize";
import Filestack from "../Filestack";
import Yash from "../yashtags";

class ModalPost extends React.Component {
constructor(props){
super (props);
}
  render(){
    return(
  <div>
    <Modal id = "Popout"
    	header= 'Tell your followers about your project.'
    	trigger={<Button>Edit Profile</Button>}>
      <Form/>
    </Modal>

</div>
);
}
}
export default ModalPost;
