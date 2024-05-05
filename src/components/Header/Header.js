// CSS
import './Header.css';

// React
import React from 'react';

// Needed Components
import logo from '../../media/site_logo.png';

function Header(props){
    return(
        <header>
            <img src={logo} alt="FIXR logo" />
            <div className="button-wrapper">
                { props.children }
            </div>          
        </header>
    );
}

export default Header;