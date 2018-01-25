// will require components
import "./Profile.css";
import React from  "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PortflowioCard from "../../components/Cards";
import Header from "../../components/Header";
import GlobalNav from "../../components/GlobalNav";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar";
import API from "../../utils/API.js";

class Profile extends React.Component{
  constructor(props){

super(props);
    this.state ={
      user:{}
    }

console.log(props)

}

authButton() {
  if ((JSON.parse(localStorage.getItem("okta-token-storage"))).idToken){
  return(
    <button type="button" className="btn btn-info right auth" onClick={this.props.auth.logout}>Logout</button>);
  }
  else{
    return(<button type="button" className="btn btn-info right auth" onClick={this.props.auth.login}>Login</button>);

  }
}
componentDidMount (){
if (JSON.parse(localStorage.getItem("okta-token-storage")).idToken){
  var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));

  var email= tokenstuff.idToken.claims.email;
  console.log("got the token");
  API.userFindByEmail(email)
  .then(res => {
    console.log(res);
    this.setState({user: res.data});
  })
  .catch(err => console.log(err));
};
};



  render(){
    return(
      <div className="profileholder">

        <SideNavBar
          firstName={this.state.user.firstName}
          lastName={this.state.user.lastName}
          email={this.state.user.email}
          image={this.state.user.userImage}
          bio= {this.state.user.bio}
          linkedin= {this.state.user.linkedin}
          website={this.state.user.website}
          github={this.state.user.github}
          username= {this.state.user.username}

        />
    </div>
  );

  }
}
export default Profile;
