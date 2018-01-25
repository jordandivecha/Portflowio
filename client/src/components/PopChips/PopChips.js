import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ModalPost from "../ModalPost";
import ModalProfile from "../ModalProfile";
import "./PopChips.css";
import {Button, Icon} from "react-materialize";

class PopChips extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {

    };
  }




filterCards(){
  const cards = this.state.cards.filter
}
  render(){


    return(
      <ul className= "center popchips">
        <div>
  		<Button waves='light'>button</Button>
  		<Button waves='light'>button<Icon left>cloud</Icon></Button>
  		<Button waves='light'>button<Icon right>cloud</Icon></Button>
  </div>
          </ul>
);
}
};


export default PopChips;
