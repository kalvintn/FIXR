// CSS
import './Footer.css';

// React
import React from 'react';

// Needed Components
import logo from '../../media/site_logo.png';

function Footer(){
    return(
        <footer>
            <img src={logo} alt="FIXR logo"/>
            <p>&#169; 2024 Kalvin Nguyen</p>
        </footer>
    );
}

export default Footer;