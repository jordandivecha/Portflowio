import React from "react";
import "./Form.css";
import Filestack from '../Filestack/Filestack';
import {Row, Input} from 'react-materialize';

const Form = props => (
<div>
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
    <Row>
    <button class="btn btn-primary" data-toggle="button" autocomplete="off" type="submit">Update</button>
    </Row>
</div>
);

export default Form;
