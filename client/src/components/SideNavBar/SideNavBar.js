// Static Sidenav

import "./SideNavBar.css";

import React from "react";
import {SideNav, Button, SideNavItem} from "react-materialize";

class SideNavBar extends React.Component {

	constructor(props){
		super(props);
		this.state ={};
		console.log(props);
	}
	render (){
		return(
			<SideNav id="slide-out"
				className= "fixed side-nav"
				trigger = {<Button>Profile Info</Button>}
				options={{
					 closeOnClick: true,
					 draggable: true,

				  }}
				>
				<SideNavItem className="blue-text" id="user-info" userView
					user={
						{
						background:  'https://videvo.net/videvo_files/images/preview_Abstract_Blue_Light_StreaksVidevo.jpg',
						image: this.props.image ? this.props.image : 'https://s-media-cache-ak0.pinimg.com/originals/eb/da/ca/ebdacab8cf17e0071c78e0f1f5754a13.jpg',
						name: this.props.firstName + " " + this.props.lastName,
						email: this.props.email
					}}
					/>

				<SideNavItem id="first-link" href='#!icon'><i class="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</SideNavItem>
				<SideNavItem href='mailto:{this.props.email}'><i class="fa fa-github-alt" aria-hidden="true"></i>Github</SideNavItem>
				<SideNavItem divider />
				<SideNavItem subheader>Subheader</SideNavItem>
				<SideNavItem waves href='#!third'><i class="fa fa-link" aria-hidden="true"></i>Website</SideNavItem>
			</SideNav>

);
}
}
	export default SideNavBar;
