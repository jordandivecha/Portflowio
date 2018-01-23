import React from "react";
import "./ModalProfile.css";

import {Button, Modal, Row, Input} from "react-materialize";
import Filestack from "../Filestack";
import Yash from "../yashtags";
import Form from "../Form";

class ModalProfile extends React.Component {
constructor(props){
super (props);
}
  render(){
    return(
  <div>
    <Modal id = "Popout1"
    	header= 'Update Your Profile'
    	trigger={<Button>Edit Profile</Button>}>
      <Form/>
    </Modal>

</div>
);
}
}
export default ModalProfile;
