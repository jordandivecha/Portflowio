import React from "react";
import "./Form.css";
import Filestack from '../Filestack/Filestack';


const Form = props => (
  <div className="form">
    <form>
    <div class="form-inline">
      <div class="col-md-4 mb-3">
        <label for="firstName">First name</label>
        <input type="text" class="form-control" id="firstName" placeholder="First Name" required />
      </div>

      <div class="col-md-4 mb-3">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="firstName" placeholder="Last Name" required />
      </div>

      <div class="col-md-4 mb-3">
        <label for="birthday">Birthday (mm/dd/yyyy)</label>
        <input type="text" class="form-control" id="birthday" placeholder="Birthday" required />
      </div>
    </div>

    <div class="form-inline">
      <div class="col-md-6 mb-3">
        <label for="validationUsername">Username</label>
        <div class="input-group">
        <div class="input-group-prepend"></div>
        <input type="text" class="form-control" id="validationUsername" placeholder="Username" required />
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <label for="inputEmail1">Email address</label>
        <input type="email" class="form-control" id="inputEmail1" placeholder="Enter email" required />
      </div>
    </div>

    <div class="form-inline">
      <div class="col-md-4 mb-3">
        <label for="github">Github URL</label>
        <input type="text" class="form-control" id="github" placeholder="Github" />
      </div>

      <div class="col-md-4 mb-3">
        <label for="linkedin">Linkedin</label>
        <input type="text" class="form-control" id="linkedin" placeholder="Linkedin" />
      </div>

      <div class="col-md-4 mb-3">
        <label for="website">Website</label>
        <input type="text" class="form-control" id="website" placeholder="Website" />
      </div>
    </div>

    <Filestack />

    <button class="btn btn-primary" data-toggle="button" autocomplete="off" type="submit">Submit form</button>

  </form>


  </div>
);

export default Form;
