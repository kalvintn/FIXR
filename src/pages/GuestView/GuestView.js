// CSS
import './GuestView.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function GuestView(){
    return(
        <div>
            <Header>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </Header>
            <Main>
                <p>Welcome to the guest page!</p>
            </Main>
            <Footer />
        </div>    
    );
}

export default GuestView;