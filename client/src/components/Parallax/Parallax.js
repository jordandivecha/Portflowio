import "./Parallax.css";

import React from "react";

import {Parallax} from "react-materialize";

const ScrollImage = () => (
  <div class = "scroll">
      <Parallax imageSrc="https://i.imgur.com/SN5lqdd.jpg"/>
      <Parallax imageSrc="https://i.imgur.com/Hi4YqyS.jpg"/>
  </div>
);

export default ScrollImage;