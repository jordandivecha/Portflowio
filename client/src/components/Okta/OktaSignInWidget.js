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
        idpDisplay: 'PRIMARY',
      i18n: {
  // Overriding English properties
        'en': {
          'primaryauth.title': 'Sign in to Portflow.io',
            'primaryauth.username.placeholder': 'Portflow.io Username'
          }},
      authParams: {
            display: 'page',
            responseType: ['id_token', 'token'],
            scope: [
                    'openid',
                      'email',
                      'profile'
                    ]
                  },

      registration: {
            click: function() {
              window.location.href = window.location.origin +'/signup';
            },
        parseSchema: function(schema, onSuccess, onFailure) {
           // handle parseSchema callback
           onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
          
           onSuccess(postData);
        },
        postSubmit: function (response, onSuccess, onFailure) {
            // handle postsubmit callback
           onSuccess(response);
        }
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
         registration: true // REQUIRED
      }

           }
         );

    this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return (<div />);
  }
};
