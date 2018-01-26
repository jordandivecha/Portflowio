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
  firstName: this.props.firstName,
  lastName: this.props.lastName,
  email: this.props.email,
  github: this.props.github,
  linkedin: this.props.linkedin,
  website: this.props.website,
  bio: this.props.bio,
  userImage: this.props.userImage,
  userId: this.props.id,
  username: this.props.username

};
console.log(props);
};

componentDidMount(){
if (this.props.authenticated){

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
  {
  firstName: this.state.firstName,
  lastName: this.state.lastName,
  github: this.state.github,
  linkedin: this.state.linkedin,
  website: this.state.website,
  bio: this.state.bio,
  userImage: this.state.userImage,
  username: this.state.username
};

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
    	trigger={<Button className="editProfile #4fc3f7 light-blue lighten-2">Edit Profile</Button>}
      actions = {<Button  name="btn" id="submitBtn" className="btn btn-default" onClick={this.handleFormSubmit} modal="close" data-confirm="Are you sure you want to submit?" >Update</Button>}>
      <Row>
        <Input s={6} name="firstName" label="First Name" onChange={this.handleInputChange} value={this.state.firstName} placeholder={this.props.firstName}/>
        <Input s={6} name="lastName" label="Last Name" onChange={this.handleInputChange} value={this.state.lastName} placeholder={this.props.lastName}/>
        </Row>
        <Row>
        <Input s={12} className="active"name="username" label="Username" validate onChange={this.handleInputChange} value={this.state.username}
          placeholder={this.props.username}/>
      </Row>
        <Row>
        <Input name="github" s={12} label="Github URL" onChange={this.handleInputChange} value={this.state.github}placeholder={this.props.github}/>
        </Row>
        <Row>
        <Input s={12} name="linkedin" label="Linkedin URL" onChange={this.handleInputChange} value={this.state.linkedin}placeholder={this.props.linkedin} />
        </Row>
        <Row>
        <Input s={12} name="website" label="Website URL" onChange={this.handleInputChange} value={this.state.website}placeholder={this.props.website}/>
        </Row>
        <Row>
        <Input name="bio" s={12} label="Bio" value={this.state.bio} onChange={this.handleInputChange} placeholder={this.props.bio} />
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
