// CSS
import './Login.css';

// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card";

function Login(){
    const navigate = useNavigate();

    // Manage login form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    
    // Update form data as user enters
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    
    // Handle submit on hitting submit
    const handleSubmit = (e) => {
        e.preventDefault();

        /* CHECK ACCOUNT EXISTS FOR LOGIN */
        let exists = false;

        // Check if account exists
        // ...
            
        if(exists){

            // Go to users page if account exists
            navigate('/user');
        } else {
            // Reset form fields after attempted submission
            setFormData({
                email: "",
                username: "",
                password: ""
            });

            // Prompt user
            alert("Account does not exist. Please try again.");
        }
    };

    return(
        <div>
            <Header>
                <Link to="/signup">Sign Up</Link>
                <Link to="/guest">View as Guest</Link>
            </Header>
            <Main>
                <h2>Welcome back! Login:</h2>
                <Card className="short-card">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Card>
            </Main>
            <Footer />
        </div>   
    );
}

export default Login;