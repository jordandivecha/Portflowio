// Static Sidenav

import "./SideNavBar.css";

import React from "react";
import {SideNav, Button, SideNavItem} from "react-materialize";
import ModalProfile from "../ModalProfile";
class SideNavBar extends React.Component {

	constructor(props){
		super(props);
		this.state ={};
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
				<SideNavItem id="user-info" userView
					user={
						{
						background:  '',
						image: this.props.image,
						name: this.props.firstName + " " + this.props.lastName,
						email: this.props.email
					}}
					/>
				<ModalProfile/>
				<SideNavItem  id="linkedin" href="{this.props.linkedin}"><i class="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</SideNavItem>
				<SideNavItem id="second-link" href="{this.props.github}"><i class="fa fa-github-alt" aria-hidden="true"></i>Github</SideNavItem>
				<SideNavItem id="third-link" href='{this.props.website}'><i class="fa fa-link" aria-hidden="true"></i>Portfolio</SideNavItem>
				<SideNavItem id="about"><h6>About</h6><p>{this.props.bio}</p></SideNavItem>
				</SideNav>

);
}
}
	export default SideNavBar;
