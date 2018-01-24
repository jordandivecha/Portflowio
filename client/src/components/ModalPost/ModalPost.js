import React from "react";
import "./ModalPost.css";

import {Button, Modal, Row, Input} from "react-materialize";

import Yash from "../yashtags";
import API from "../../utils/API.js";
import ReactFilestack, {client} from 'filestack-react';

class ModalPost extends React.Component {
constructor(props){
super (props);
this.state ={
    title: "",
    creator: "",
    description: "",
    website: "",
    project: "",
    tags: [],
    postImage: ""
};
}

// componentDidMount (){
//   var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
//
//   var email= tokenstuff.idToken.claims.email;
//   API.userFindByEmail(email)
//   .then(res => this.setState({creator: res._id}))
//   .catch(err => console.log(err));
//
// };

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

handleFormSubmit = event => {

      API.postCreate({
        title: this.state.title,
        creator: this.state.creator,
        description: this.state.description,
        tags: this.state.tags,
        website: this.state.website,
        project: this.state.project,
        postImage: this.state.postImage
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));

  // if (this.state.tags && this.state.creator && this.state.title && this.state.description) {

}
  makeImage =(result) => {
    this.setState({postImage: result.filesUploaded[0].url})
  };

  render(){
    return(

    <Modal id = "Popout"
    	header= 'Tell your followers about your project.'
    	trigger={<Button>Post</Button>}
      actions={
        <Button  name="btn" id="submitBtn" className="btn btn-default" onClick={this.handleFormSubmit} data-confirm="Are you sure you want to submit?" >Submit</Button>
      }>
      <Row>
  		<Input name = "title" placeholder="Title" s={6} label="Title" onChange={this.handleInputChange}/>
      <Input name="website" placeholder="Website" s={6} label="Website" onChange={this.handleInputChange} />
      <Input name="project"placeholder="Project" s={6} label="Project"onChange={this.handleInputChange} />
      <Input name="description"placeholder="Description" s={6} label="Description" onChange={this.handleInputChange}/>
      </Row>
      <Row>
		<Input onChange={this.handleInputChange} name='tags' type='radio' value='development' label='#Development' />
		<Input onChange={this.handleInputChange} name='tags' type='radio' value='design' label='#Design' />
      <Input onChange={this.handleInputChange} name='tags' type='radio' value='UX' label='#UX' />
      <Input onChange={this.handleInputChange} name='tags' type='radio' value='photography' label='#Photography' />
    </Row>

    <img id="imageUpload" src = {this.state.postImage}/>

    <ReactFilestack
      apikey="AdP2fF1FvRdGW4RWCKw8sz"
      buttonText="Upload Image"
      buttonClass="classname"
      options=""
      onSuccess={this.makeImage}
    />
    </Modal>


);
}
}
export default ModalPost;
