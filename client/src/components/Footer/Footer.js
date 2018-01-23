// footer component

import React from "react";
import "./Footer.css";

const Footer = () => (
	<div>
    <footer>
        <div className="container">
            <div className="row">
                <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
            </div>
            <p className="copyright">Portflowio © 2018</p>
        </div>
    </footer>
</div>

);

export default Footer;
