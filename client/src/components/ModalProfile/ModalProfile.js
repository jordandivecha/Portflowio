import React from "react";
import "./ModalProfile.css";

import {Button, Modal, Row, Input} from "react-materialize";

import Yash from "../yashtags";
import ReactFilestack, {client} from 'filestack-react';


class ModalProfile extends React.Component {
constructor(props){
super (props);
this.state = {
  // firstName
  // lastName
  // birthday
  // email
  // github
  // linkedin
  // website
  // bio
  // userImage
};
}
  render(){
    return(
  <div>
    <Modal id = "Popout1"
    	header= 'Update Your Profile'
    	trigger={<Button>Edit Profile</Button>}
      actions = {<Button  name="btn" id="submitBtn" className="btn btn-default" onClick={this.handleFormSubmit} data-confirm="Are you sure you want to submit?" >Submit</Button>}>
      <Row>
        <Input s={5} label="First Name" />
        <Input s={5} label="Last Name" />
        <Input s={2} name='on' label="Birthday" type='date' onChange={function(e, value) {}} />
        </Row>
        <Row>
        <Input s={6} label="Username" validate />
        <Input type="email" label="Email" s={6} />
        </Row>
        <Row>
        <Input s={12} label="Github URL" />
        </Row>
        <Row>
        <Input s={12} label="Linkedin URL" />
        </Row>
        <Row>
        <Input s={12} label="Website URL" />
        </Row>
    </Modal>

</div>
);
}
}
export default ModalProfile;
