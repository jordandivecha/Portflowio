import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

import API from "../../utils/API.js";
import Home from "../../pages/Home";



export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
      ;
this.getUserInfo();
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  getUserInfo () {if (this.state.authenticated){

      var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
     let AuthStr = 'Bearer ' + tokenstuff.accessToken.accessToken;
      axios.get ('https://dev-395184.oktapreview.com/oauth2/v1/userinfo',
      {headers: {"Authorization": AuthStr}}, {timeout: 1000}

       )
      .then (function (response) {
        console.log (response.data);
        var userauthobj = {
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          email: response.data.email
        };

        API.userCreate(userauthobj)
        .then(function (status, res){
          console.log(status, res);

        });


      })
      .catch(err => console.log(err));


  }
}


  button() {
    if (this.state.authenticated){
    return(
      <button type="button" className="btn btn-info right" onClick={this.props.auth.logout}>Logout</button>);
    }
    else{
      return(<button type="button" className="btn btn-info right" onClick={this.props.auth.login}>Login</button>);

    }
  }

  render() {
    return(
    <div>

      
     

      {this.button()}

    </div>



    );
  }
});
