// will require components
import "./Profile.css";
import React from  "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import axios from "axios";
import SideNavBar from "../../components/SideNavBar";
import Modal from "../../components/Modal";
class Profile extends React.Component{
  constructor(props){

super(props);
    this.state ={
      firstName: "",
      lastName:"",
      email:""
    }

console.log(props)

}

componentDidMount(){
var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
let AuthStr = 'Bearer ' + tokenstuff.accessToken.accessToken;
axios.get ('https://dev-395184.oktapreview.com/oauth2/v1/userinfo',
{headers: {"Authorization": AuthStr}}, {timeout: 1000}

 )
.then ((response) =>{
  console.log (response.data);
  var userauthobj = {
    _id: response.data.email,
    firstName: response.data.given_name,
    lastName: response.data.family_name,
    email: response.data.email

  };
  this.setState({
    firstName: userauthobj.firstName,
    lastName: userauthobj.lastName,
    email: userauthobj.email
  });

});

}

  render(){
    return(
      <div>
        <SideNavBar
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
        />
      <Modal/>
    </div>
      )

  }
}
export default Profile;
