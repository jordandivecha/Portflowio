import React from "react";
import "./ModalPost.css";

import {Button, Modal, Row, Input} from "react-materialize";
import Filestack from "../Filestack";
import Yash from "../yashtags";
import API from "../../utils/API.js";

class ModalPost extends React.Component {
constructor(props){
super (props);
this.state ={
    title: "",
    creator: "",
    description: "",
    website: "",
    project: "",
    tags: []
};
}

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

handleFormSubmit = event => {
  event.preventDefault();

  if (this.state.tags && this.state.creator && this.state.title && this.state.description) {
    API.postCreate({
      title: this.state.title,
      creator: this.state.creator,
      description: this.state.description,
      tags: this.state.tags,
      website: this.state.website,
      project: this.state.project

    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};
  render(){
    return(
  <div>
    <Modal id = "Popout"
    	header= 'Tell your followers about your project.'
    	trigger={<Button>Post</Button>}>
      <Row>
  		<Input name = "Title" placeholder="Title" s={6} label="Title" />
      <Input placeholder="Website" s={6} label="Link1" />
      <Input placeholder="Project" s={6} label="Link2" />
      <Input placeholder="Description" s={6} label="Description" />
      </Row>
      <Row>
		<Input name='tagpost' type='checkbox' value='development' label='#Development' />
		<Input name='tagpost' type='checkbox' value='design' label='#Design' />
      <Input name='tagpost' type='checkbox' value='UX' label='#UX' />
      <Input name='tagpost' type='checkbox' value='photography' label='#Photography' />
    </Row>

      <Filestack /><Button name="btn" id="submitBtn" className="btn btn-default" data-confirm="Are you sure you want to submit?" >Submit</Button>
    </Modal>

</div>
);
}
}
export default ModalPost;
