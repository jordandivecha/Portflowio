import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

var redirect_uri = 'http://localhost:3000/implicit/callback';
export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      clientId: '0oadot4zoxzmT4EZh0h7',
      redirectUri: redirect_uri,
      idps: [
        {type: 'GOOGLE', id: '0oadowjhgzcK6qDAv0h7'},
        {type: 'FACEBOOK', id: '0oadowb5b3luZXZw30h7'},
        {type: 'LINKEDIN', id: '0oadow4ig0UmFH0LT0h7'}
],

authParams: {
  display: 'page',
  responseType: 'token'
}

    });
    this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return (<div />);
  }
};
