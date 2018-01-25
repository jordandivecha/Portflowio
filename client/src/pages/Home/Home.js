import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';
import GlobalNav from "../../components/GlobalNav";
import API from "../../utils/API.js";
import Home from "../../pages/Home";
import Header from "../../components/Header";
import PopChips from "../../components/PopChips";
import PortflowioCard from "../../components/Cards";


export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      posts: []};
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

  getUserInfo () {
    if (this.state.authenticated){

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
          email: response.data.email,
          userImage: "",
          password: "",
          username: "",
          github: "",
          linkedin: "",
          website: "",
          bio: "",
          followers: [],
          following: [],
          likes: [],
          posts: []
        };

        API.userCreate(userauthobj)
        .then(function (status, res){
          console.log(status, res);

        });


      })
      .catch(err => console.log(err));


  }
}

componentDidMount(){
  API.getAllPosts()
  .then(res => this.setState({posts: res.data}))
  .catch(err=>console.log(err));


}


// loadAllCards(){
//
//   const cards = this.state.posts.map(element =>
//    (<PortflowioCard
//
//      />));
//      return cards;
//
//
// };
findAuthorbyId(id){
  API.userFindById(id)
  .then(res => res.data._id)
  .catch(err => console.log(err));
}

  authButton() {
    if (this.state.authenticated){
    return(
      <button type="button" className="btn btn-info right auth" onClick={this.props.auth.logout}>Logout</button>);
    }
    else{
      return(<button type="button" className="btn btn-info right auth" onClick={this.props.auth.login}>Login</button>);

    }
  }

  render() {
    return(

    <div className="center">
      <Header id="headerHome" />

      <GlobalNav
        button= {this.authButton}
        authenticated = {this.state.authenticated}>

      </GlobalNav>

      {this.authButton()}

    
      <PopChips/>

        <div className = "postHolder">

        {(this.state.posts).slice(0).reverse().map(post => (
          <PortflowioCard
            postImage = {post.postImage}
            website={post.website}
            creator={post.creator}
            project={post.project}
            description = {post.description}
            title= {post.title}
            findauthor={this.findAuthorbyId}

          />
        ))}
    </div>
  </div>




    );
  }
});
