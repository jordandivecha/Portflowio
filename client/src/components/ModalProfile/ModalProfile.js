import React from "react";
import "./ModalProfile.css";

import {Button, Modal, Row, Input} from "react-materialize";
import API from "../../utils/API.js";
import Yash from "../yashtags";
import ReactFilestack, {client} from 'filestack-react';



class ModalProfile extends React.Component {
constructor(props){
super (props);
this.state = {
  firstName: '',
  lastName: '',
  email: '',
  github: '',
  linkedin: '',
  website: '',
  bio: '',
  userImage: '',
  userId:'',
  username: ''

};
};

componentDidMount(){
if (JSON.parse(localStorage.getItem("okta-token-storage")).idToken){
  var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));

  var email= tokenstuff.idToken.claims.email;

  API.userFindByEmail(email)
  .then(res => {
    this.setState(
      {userId: res.data._id});
  })
  .catch(err => console.log(err));
};
};

handleInputChangeDate(){

};
handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

handleFormSubmit = event => {

  console.log(this.state.userId);
  var userupdateobj=
  {firstName: this.state.firstName,
  lastName: this.state.lastName,
  email: this.state.email,
  github: this.state.github,
  linkedin: this.state.linkedin,
  website: this.state.website,
  bio: this.state.bio,
  userImage: this.state.userImage,
  username: this.state.username};

      API.userUpdate(
        this.state.userId, userupdateobj)
        .then(res => res.json(res))
        .catch(err => console.log(err));


}
  makeImage =(result) => {
    this.setState({userImage: result.filesUploaded[0].url})
  };

  render(){
    return(
  <div>
    <Modal id = "Popout1"
    	header= 'Update Your Profile'
    	trigger={<Button>Edit Profile</Button>}
      actions = {<Button  name="btn" id="submitBtn" className="btn btn-default" onClick={this.handleFormSubmit} data-confirm="Are you sure you want to submit?" >Update</Button>}>
      <Row>
        <Input s={6} name="firstName"label="First Name" onChange={this.handleInputChange}/>
        <Input s={6} name="lastName" label="Last Name" onChange={this.handleInputChange} />
        </Row>
        <Row>
        <Input s={6} name="username" label="Username" validate onChange={this.handleInputChange}/>
        <Input name="email" type="email" label="Email" s={6} onChange={this.handleInputChange}/>
        </Row>
        <Row>
        <Input name="github" s={12} label="Github URL" onChange={this.handleInputChange}/>
        </Row>
        <Row>
        <Input s={12} name="linkedin" label="Linkedin URL" onChange={this.handleInputChange} />
        </Row>
        <Row>
        <Input s={12} name="website" label="Website URL" onChange={this.handleInputChange}/>
        </Row>
        <Row>
        <Input name="bio" s={12} label="Bio" onChange={this.handleInputChange}/>
        </Row>
        <Row>
        <img id="imageUpload" src ={this.state.userImage}/>
        </Row>
        <Row>
        <ReactFilestack
          apikey="AdP2fF1FvRdGW4RWCKw8sz"
          buttonText="Upload Image"
          buttonClass="classname"
          options=""
          onSuccess={this.makeImage}
        />
      </Row>

    </Modal>

</div>
);
}
}
export default ModalProfile;
