import "./ProfileView.css";
import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PortflowioCard from "../../components/Cards";
import Header from "../../components/Header";
import GlobalNav from "../../components/GlobalNav";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar";
import API from "../../utils/API.js";
import {withAuth} from '@okta/okta-react';

export default withAuth( class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      usercurrent:{},
      authenticated: true,
      userposts: [],
      profile: true,
      following: false
    };


  }


  componentWillMount() {
    API.profileFindByEmail(this.props.match.params.email)
    .then(res=> this.setState({user:res.data})).catch(err => console.log(err));
    var tokenstuff = (JSON.parse((localStorage.getItem("okta-token-storage")), null, 2));
    var email = tokenstuff.idToken.claims.email;
    API.userFindByEmail(email).then(res => {
      this.setState({usercurrent: res.data});
    }).catch(err => console.log(err));


  }

componentDidMount(){

}
  componentDidUpdate(prevProps, prevState){
    var currentstate= this.state;
    if((this.state.user && this.state.usercurrent.following) && prevState !== currentstate){
      API.getPostsById(this.state.user._id).then(res => this.setState({
      userposts: res.data
    })).catch(err => console.log(err));
  }

    if (this.state.usercurrent.following && (prevState.usercurrent.following !== currentstate.usercurrent.following)){
    this.state.usercurrent.following.includes(this.state.user._id)?
     this.setState({following: true}) : this.setState({following: false});

}
  }




follow(userid){
  if (this.state.following == false){
    this.setState({following: true})
    API.follow(userid, {currentuser: this.state.usercurrent._id}).then(res=> console.log(res.data));
  }
  else{
    this.setState({following: false})
    API.unfollow(userid, {currentuser: this.state.usercurrent._id}).then(res=> console.log(res.data));
  }
}


  authButton() {
    if (this.state.authenticated) {
      return (<button type="button" className="btn btn-info right auth" onClick={this.props.auth.logout}>Logout</button>);
    } else {
      return (<button type="button" className="btn btn-info right auth" onClick={this.props.auth.login}>Login</button>);

    }
  }

  loadProfileCards() {
    if (this.state.userposts[0] !== null){
      var userposty2 = this.state.userposts.slice(0).reverse().map(posty => (
        <PortflowioCard key={posty.postImage} postImage={posty.postImage} website={posty.website} creator={posty.creator} project={posty.project} description={posty.description} title={posty.title} tags={posty.tags} email={posty.email} id={posty._id} currentuser={this.state.usercurrent._id} likeCount={posty.likeCount} likes={this.state.usercurrent.likes}/>));
      return userposty2;
    }
}

  render() {
    if (this.state.user !== null){
    return (<div className="profileholder">
      <Header id="headerHome"/>
      <GlobalNav button={this.authButton} authenticated={this.state.authenticated} creator={this.state.usercurrent._id} email={this.state.usercurrent.email}></GlobalNav>

      {this.authButton()}
      <SideNavBar firstName={this.state.user.firstName} lastName={this.state.user.lastName} email={this.state.user.email} image={this.state.user.userImage} bio={this.state.user.bio} linkedin={this.state.user.linkedin} website={this.state.user.website} github={this.state.user.github} username={this.state.user.username} authenticated={this.state.authenticated} id={this.state.user._id} other={true} follow={this.follow.bind(this)} following={this.state.following}/>

      <div className="profilecards">

        {this.loadProfileCards()}

      </div>

    </div>);

  }
}
});
