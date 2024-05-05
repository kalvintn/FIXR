// CSS
import './Login.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function Login(){
    return(
        <div>
            <Header>
                <Link to="/signup">Sign Up</Link>
                <Link to="/guest">View as Guest</Link>
            </Header>
            <Main>
                <p>Welcome to the login page!</p>
            </Main>
            <Footer />
        </div>   
    );
}

export default Login;