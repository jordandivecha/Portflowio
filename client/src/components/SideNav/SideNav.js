// Static Sidenav

import React from "react";


class SideNav extends React.Component{
	constructor(props){
		super(props);
		this.state ={};
	}

// togglesidebar  (){
// 	$('.button-collapse').sideNav({
// 	menuWidth: 300, // Default is 300
// 	edge: 'left', // Choose the horizontal origin
// 	closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
// 	draggable: true, // Choose whether you can drag to open on touch screens,
// });
// }
	componentDidMount(){
		// this.togglesidebar();
	}
	render (props) {
		return(
<div>
	<ul id = "slide-out" className = "side-nav fixed right-aligned black">
	    <li><div className="user-view">
	      <div className="background">
	        <img src="https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Artsy-Images-PIC-WPE005644.jpg" width='300px'/>
	      </div>
	      <img className="circle" src={this.props.image ? this.props.image : 'https://s-media-cache-ak0.pinimg.com/originals/eb/da/ca/ebdacab8cf17e0071c78e0f1f5754a13.jpg'}/>
	      <span className="black-text name">{this.props.firstName} {this.props.lastName}</span>
	      <a href="#!email"><span className="black-text email">{this.props.email}</span></a>
	    </div></li>
	    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
	    <li><a href="#!">Second Link</a></li>
	    <li><div className="divider"></div></li>
	    <li><a className="subheader">Subheader</a></li>
	    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
	  </ul>
	  <a href="#" data-activates="slide-out right-align" className="button-collapse"><i className="material-icons"></i></a>
		</div>
	)

}
};

	export default SideNav;
