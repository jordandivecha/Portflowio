import React from "react";
import "./Modal.css";

import {Button, Modal, Row, Input} from "react-materialize";
import Filestack from "../Filestack";
import Yash from "../yashtags";

class ModalElement extends React.Component {
constructor(props){
super (props);
}
  render(){
    return(
  <div>
    <Modal
    	header= 'Tell your followers about your project.'
    	trigger={<Button>Post</Button>}>
      <Row>
  		<Input placeholder="Title" s={6} label="Title" />
      <Input placeholder="Link" s={6} label="Link" />
      <Input placeholder="Description" s={6} label="Description" />
      </Row>
      <Yash/>
      <Filestack /><Button type="submit" name="btn" value="Submit" id="submitBtn" className="btn btn-default" data-confirm="Are you sure you want to submit?" >Submit</Button>
    </Modal>

</div>
);
}
}
export default ModalElement;
