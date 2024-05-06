// CSS
import './CreatePost.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function CreatePost({ role }){
    return(
        <div>
            <Header>
                <p> Account Privileges : { role } </p>
                <Link to="/user">Return to Posts</Link>
            </Header>
            <Main>
                <p>Welcome to the create post view</p>
            </Main>
            <Footer />
        </div>    
    );
}

export default CreatePost;