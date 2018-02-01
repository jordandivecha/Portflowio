import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';
import GlobalNav from "../../components/GlobalNav";
import API from "../../utils/API.js";
import Home from "../../pages/Home";
import "./Home.css";
import Header from "../../components/Header";
import PopChips from "../../components/PopChips";
import PortflowioCard from "../../components/Cards";
import Feed from "../../components/Feed";
export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      posts: [],
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        userImage: "",
        password: "",
        username: "",
        github: " ",
        linkedin: "",
        website: "",
        bio: "",
        followers: [],
        following: [],
        likes: []
      },
      userId:"",
      profile: false
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
      ;

    }
  this.getUserInfo();
  }

  componentDidUpdate() {
    this.checkAuthentication();

  }

  getUserInfo () {
    if (this.state.authenticated){

      var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
     var  email = tokenstuff.idToken.claims.email;
     var name = (tokenstuff.idToken.claims.name).split(" ");
     var username = (tokenstuff.idToken.claims.email).split("@");
     this.setState({user:
       {firstName: name[0],
       email: email,
       lastName: name[1],
       username: "@"+name[0]+"."+name[1],
       userImage: 'https://images.vexels.com/media/users/3/145370/isolated/preview/ba70e66bd60f958e1e948f9d5917bc9c-waterdrop-sharp-glimpse-illustration-by-vexels.png',
       github: "https://github.com",
       linkedin: "https://linkedin.com",
       bio: "Hi, I'm new here.",
       website: "portflowio.herokuapp.com"

     }
     });
        API.userFindByEmail(email)
        .then(res => this.setState({user: res.data}))
        .catch(err => console.log(err));

        var userauthobj = {
          firstName: this.state.user.firstName,
          lastName: this.state.user.lastName,
          email: email,
          userImage: this.state.user.userImage,
          password: this.state.user.password,
          username: this.state.user.username,
          github: this.state.user.github,
          linkedin: this.state.user.linkedin,
          website: this.state.user.website,
          bio: this.state.user.bio,
          followers: this.state.user.followers,
          following: this.state.user.following,
          likes: this.state.user.likes
        };

        localStorage.setItem("_id", this.state.user._id);
console.log(this.state.user._id);
    if(!this.state.user._id){
        API.userCreate(userauthobj)
        .then(function (status, res){
          console.log(status, res);

        })

        .catch(err => console.log(err));
}

}

}

componentDidUpdate(){

  API.getAllPosts()
  .then(res => this.setState({posts: res.data}))
  .catch(err=>console.log(err));


}

loadallcards(){

 var posts = this.state.posts.slice(0).reverse().map(post =>
  (<div className = "allcards"><PortflowioCard
    postImage = {post.postImage}
    website={post.website}
    creator={post.creator}
    project={post.project}
    description = {post.description}
    title= {post.title}
    tags={post.tags}
  /></div>)
);
return posts;
};

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



render(){


    return(

      <div className="center">
        <Header id="headerHome" />

        <GlobalNav
          button= {this.authButton}
          authenticated = {this.state.authenticated}
          creator = {this.state.user? this.state.user._id:null}

          >

        </GlobalNav>

        {this.authButton()}

        <div className = "HomeCards">

        {this.loadallcards()}

        </div>



        </div>
);
}
});
