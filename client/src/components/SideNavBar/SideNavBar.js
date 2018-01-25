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
				trigger = {<Button className="profileButton">Profile Info</Button>}
				options={{
					 closeOnClick: true,
					 draggable: true,

				  }}
				>
				<SideNavItem id="css" className="blue-text" id="user-info" userView
					user={
						{
						background:  'https://vignette2.wikia.nocookie.net/powerlisting/images/1/1c/Antahkarana-Spiral-of-Spiritual-Illumination-Energy-energyenhancement-org.jpg/revision/latest?cb=20141206023003',
						image: this.props.image ? this.props.image : 'https://s-media-cache-ak0.pinimg.com/originals/eb/da/ca/ebdacab8cf17e0071c78e0f1f5754a13.jpg',
						name: this.props.firstName + " " + this.props.lastName,
						email: this.props.email
					}}
					/>

				<SideNavItem id="first-link" href="https://www.linkedin.com/in/adriandivecha"><i class="fa fa-linkedin-square" aria-hidden="true"></i>LinkedIn</SideNavItem>
				<SideNavItem id="second-link" href="https://github.com/ajdivecha"><i class="fa fa-github-alt" aria-hidden="true"></i>Github</SideNavItem>
				<SideNavItem id="third-link" href='https://www.adriandivecha.com'><i class="fa fa-link" aria-hidden="true"></i>Portfolio</SideNavItem>
				<SideNavItem id="about"><h6>About</h6><p>this is a description</p></SideNavItem>
				</SideNav>

);
}
}
	export default SideNavBar;
