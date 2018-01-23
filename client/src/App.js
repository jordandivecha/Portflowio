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
import FooterElement from './components/Footer/Footer.js';
import ModalPost from './components/Modal/ModalPost.js'





function onAuthRequired({history}) {
  history.push('/login');
}

const config = {
  issuer: 'https://dev-395184.oktapreview.com/oauth2/default',
  redirect_uri: 'http://localhost:3000/implicit/callback',
  client_id: "0oadot4zoxzmT4EZh0h7",
  scope: 'openid profile email'

};

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          <Header/>
       
          

        <Security  issuer= {config.issuer}
                   client_id= {config.client_id}
                   redirect_uri={config.redirect_uri}
                   onAuthRequired={onAuthRequired}
                    >
                    <div>
                      <ul className= "right">
                        <Link to="/"><button type="button" className= "btn btn-info">Home</button></Link>
                        <Link to ="/profile"><button type="button" className= "btn btn-danger">Profile</button></Link>
                        <ModalPost/>
                        

                      </ul>
                    </div>
            <Route path='/' component={Home}/>
             <Route path='/login' render={()=><Login baseUrl="https://dev-395184.oktapreview.com"/>} />
             <SecureRoute path='/protected' component={Protected}/>
             <SecureRoute path='/profile' component={Profile}/>
           <Route path='/implicit/callback' component={ImplicitCallback}/>
           </Security>

           <FooterElement/>
         </div>

       </Router>
    );
  }
}



export default App;
