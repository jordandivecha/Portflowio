// Static Sidenav

import "./SideNavBar.css";

import React from "react";
import {SideNav, Button, SideNavItem} from "react-materialize";
import ModalProfile from "../ModalProfile";
import LinkBuilder from "../LinkBuilder";
import Follow from "../Follow";
class SideNavBar extends React.Component {

	constructor(props){
		super(props);
		this.state ={
			authenticated: this.props.authenticated
		};
		console.log(props);
	}
	render (){
		return(
			<SideNav id="slide-out"
				className= "fixed side-nav black"
				trigger = {<Button className="profileButton">Open Profile</Button>}
				options={{
					 closeOnClick: true,
					 draggable: true,

				  }}
				>
				<div className="user-info center">
					<img className= "center profileimage" src={this.props.image}/>
				 	<p id="name">{this.props.firstName} {this.props.lastName}</p>
					<p id="username">{this.props.username}</p>
					</div>
					<div className= "center">
				{this.props.other == true ?
					<Follow follow={this.props.follow.bind(this)} id= {this.props.id} following={this.props.following}/>
					:<ModalProfile className= "profilebtn"
					firstName= {this.props.firstName}
          lastName={this.props.lastName}
          email={this.props.email}
          image={this.props.userImage}
          bio= {this.props.bio}
          linkedin= {this.props.linkedin}
          website={this.props.website}
          github={this.props.github}
          username= {this.props.username}
          authenticated = {this.props.authenticated}
					id={this.props.id}/>}
				</div>
					<hr className="style13"/>
					<div className = "center-align links">
					<div><LinkBuilder
							id = 'linkedin'
							i = 'fa fa-linkedin-square'
							title = "LinkedIn"
							href = {this.props.linkedin}/></div>
						<div><LinkBuilder
									id = 'github'
									i = 'fa fa-github-alt'
									title = "Github"
									href = {this.props.github}/></div>
						<div><LinkBuilder
							id = 'portfolio'
							i = 'fa fa-link'
							title = "Portfolio"
							href = {this.props.website}/></div>

						<div>
							<a id = 'email' target="_blank" href = {'mailto:'+this.props.email}><i className='fa fa-envelope'></i>E-mail</a>
						</div>
				</div>

					<hr className="style13"/>
				<div id="about"><h5 className="center-align">About</h5><p className="center bio">{this.props.bio}</p></div>
				</SideNav>

);
}
}
	export default SideNavBar;
