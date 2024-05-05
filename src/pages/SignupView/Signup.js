/* eslint-disable */

// CSS
import './Signup.css';

// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card";

function Signup(){
    const navigate = useNavigate();

    // Manage signup form data
    const [formData, setFormData] = useState({
        email: "",
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

        // Grab submitted values
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");

        /* ENSURE FORM DATA PASSES CHECKS */
        let isValid = true;
        let errorMessage = "Account could not be created for the following reasons:\n";

        // Check - email is a UGA email
        if(!(email.endsWith("@uga.edu"))){
            isValid = false;
            errorMessage += "\t Email must end with @uga.edu.\n";
        }

        // Check - username is standard English
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\~\-]+$/;
        if(!(regex.test(username))){
            isValid = false;
            errorMessage += "\t Username must use standard English characters.\n";
        }

        // Check - password meets requirements
        const regex_capital = /[A-Z]/;
        const regex_special = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~\-]/;
        let length_req = password.length >= 8 && password.length <= 25;
        let english_req = regex.test(password);
        let capital_req = regex_capital.test(password);
        let special_req = regex_special.test(password);

        if(!(length_req && english_req && capital_req && special_req)){
            isValid = false;
            errorMessage += "\t Password conditions must be met.\n";
        }

        // Persist in database only IF PASSES ACCOUNT CREATION CHECKS
        if(isValid){
            // Handle form submission, e.g., send data to server
            console.log(formData);

            // Navigate to users page (after successful account creation)
            navigate('/user');
        } else {
            alert(errorMessage);
        }
    };

    return(
        <div>
            <Header>
                <Link to="/login">Log In</Link>
                <Link to="/guest">View as Guest</Link>
            </Header>
            <Main>
                <h2>Welcome! Sign Up:</h2>
                <Card className="short-card">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            <ul><li>Must be a UGA email</li></ul>
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                            <ul><li>Must use standard English characters</li></ul>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            <ul>
                                <li>Must use standard English characters</li>
                                <li>Must be between 8-25 characters long</li>
                                <li>Must contain at least: one capital letter, one number, and one special character</li>
                            </ul>

                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Card>
            </Main>
            <Footer />
        </div>   
    );
}

export default Signup;