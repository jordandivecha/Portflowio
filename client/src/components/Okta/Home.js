

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

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
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    if (this.state.authenticated){
      <button onClick={this.props.auth.logout}>Logout</button>
        let tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
    console.log(tokenstuff);
       const AuthStr = 'Bearer ' + tokenstuff.accessToken.accessToken;
        axios.get ('https://dev-395184.oktapreview.com/oauth2/v1/userinfo',
        {headers: {"Authorization": AuthStr}}, {timeout: 1000}

         )
        .then (function (response) {
          console.log (response.data);
        });
    }

    return this.state.authenticated ?
      <button onClick={this.props.auth.logout}>Logout</button>:
      <button onClick={this.props.auth.login}>Login</button>;
  }
});
