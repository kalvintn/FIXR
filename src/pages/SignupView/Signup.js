// CSS
import './Signup.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function Signup(){
    return(
        <div>
            <Header>
                <Link to="/login">Log In</Link>
                <Link to="/guest">View as Guest</Link>
            </Header>
            <Main>
                <p>Welcome to the signup page!</p>
            </Main>
            <Footer />
        </div>   
    );
}

export default Signup;