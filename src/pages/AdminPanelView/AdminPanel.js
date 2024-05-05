// CSS
import './AdminPanel.css';

// React
import React from "react";
import { Link } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";

function AdminPanel(){
    return(
        <div>
            <Header>
                <Link to="/user">Return to Posts</Link>
            </Header>
            <Main>
                <p>Welcome to the admin panel page!</p>
            </Main>
            <Footer />
        </div>   
    );
}

export default AdminPanel;