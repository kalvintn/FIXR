// CSS
import './GuestView.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import PostWrapper from "../../components/PostWrapper";

function GuestView(){
    return(
        <div>
            <Header>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </Header>
            <Main>
                <PostWrapper>
                    <p>Welcome to the guest page!</p>
                </PostWrapper>
            </Main>
            <Footer />
        </div>    
    );
}

export default GuestView;