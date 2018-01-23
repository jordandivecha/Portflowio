// Static Sidenav

import "./SideNav.css";

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
			<SideNav className= "fixed side-nav"
				trigger={<Button>SIDE NAV DEMO</Button>}
				options={{
					 closeOnClick: true,
					 draggable: true,

				  }}
				>
				<SideNavItem userView
					user={
						{
						background:  'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Artsy-Images-PIC-WPE005644.jpg',
						image: this.props.image ? this.props.image : 'https://s-media-cache-ak0.pinimg.com/originals/eb/da/ca/ebdacab8cf17e0071c78e0f1f5754a13.jpg',
						name: this.props.firstName + " " + this.props.lastName,
						email: this.props.email
					}}
					/>

				<SideNavItem href='#!icon'>First Link</SideNavItem>
				<SideNavItem href='mailto:{this.props.email}'>Second Link</SideNavItem>
				<SideNavItem divider />
				<SideNavItem subheader>Subheader</SideNavItem>
				<SideNavItem waves href='#!third'>Third Link</SideNavItem>
			</SideNav>

);
}
}
	export default SideNavBar;
