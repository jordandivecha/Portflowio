import React, { Component } from 'react';
import logo from './logo.svg';
import ReactFilestack, {client} from 'filestack-react';
import Filestack from './components/Filestack';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Okta/Login.js';
import Protected from './components/Okta/Protected.js';
import Form from './components/Form/Form.js';
import Header from './components/Header/Header.js';
import  ModalPost from './components/ModalPost/ModalPost.js';
import ModalProfile from './components/ModalProfile/ModalProfile.js';
import "./index.css"

function onAuthRequired({history}) {
  history.push('/login');
}

const config = {
  issuer: 'https://dev-395184.oktapreview.com/oauth2/default',
  redirect_uri: 'https://portflowio.herokuapp.com/implicit/callback',
  client_id: "0oadot4zoxzmT4EZh0h7",
  scope: 'openid profile email'

};

class App extends Component {




  render() {
    return (
      <Router>
        <div>
        <Security  issuer= {config.issuer}
                   client_id= {config.client_id}
                   redirect_uri={config.redirect_uri}
                   onAuthRequired={onAuthRequired}
                    >


            <Route path='/' exact={true}component={Home}/>
             <Route path='/login' render={()=><Login baseUrl="https://dev-395184.oktapreview.com"/>} />
             <SecureRoute path='/protected' component={Protected}/>
             <SecureRoute path='/profile' render= {()=><Profile/>}/>
           <Route path='/implicit/callback' component={ImplicitCallback}/>
           </Security>
         </div>
       </Router>


    );
  }
}



export default App;
