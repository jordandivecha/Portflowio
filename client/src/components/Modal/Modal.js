import React from "react";
import "./Modal.css";

const Modal = () => (
  <div>

	<Button floating large className='blue' waves='light' icon='add' onClick={() => {
		$('#post').modal('open')
	}}>Post</Button>

	<Modal
		id='post'
		header= 'Tell your followers about your project.'>

    <Row>
		<Input placeholder="Title" s={6} label="Title" />
    <Input placeholder="Description" s={6} label="Description" />
    <Input placeholder="Link" s={6} label="Link" />
    </Row>

    <Filestack />

    <input type="submit" name="btn" value="Submit" id="submitBtn" class="btn btn-default" data-confirm="Are you sure you want to submit?"/>

    <Button type="submit" name="btn" value="Submit" id="submitBtn" class="btn btn-default" data-confirm="Are you sure you want to submit?" />

	</Modal>

</div>;
);

export default Modal;
