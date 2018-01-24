import "./Parallax.css";

import React from "react";

import {Parallax} from "react-materialize";

// import Header from "../Header/Header.js"
import Portflowio from "../Cards/CardElement.js"

const ScrollImage = () => (
  <div class = "scroll">

      <Parallax imageSrc="https://i.imgur.com/Hi4YqyS.jpg" />    

      <Portflowio />
      
      
  </div>
);

export default ScrollImage;