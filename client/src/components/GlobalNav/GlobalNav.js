import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ModalPost from "../ModalPost";
import ModalProfile from "../ModalProfile";
import "./GlobalNav.css"

class GlobalNav extends React.Component{
  constructor(props){
    super(props);

    console.log(props);
    this.state = {

    };
  }

  render(){


    return(
      <ul className= "right globalNav">
        <Link to="/"><button type="button" className= "btn btn-info">Home</button></Link>
        <Link to ="/profile"><button type="button" className= "btn btn-info">Profile</button></Link>

          <ModalPost
            authenticated= {this.props.authenticated}
            creator={this.props.creator}
            email={this.props.email}
            />


          </ul>
);
}
};


export default GlobalNav;
