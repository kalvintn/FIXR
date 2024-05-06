// CSS
import './UserView.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function UserView({ role, my_username }){
    return(
        <div>
            <Header>
                <p> Hello [{ my_username }] </p>
                <p> Account Privileges : [{ role }] </p>
                <Link to="/login">Logout</Link>
                <Link to="/create-post">+ Add New Post</Link>
            </Header>
            <Main>
                <p>welcome to user page!</p>
            </Main>
            <Footer />
        </div>   
    );
}

export default UserView;