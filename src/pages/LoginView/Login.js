// CSS
import './Login.css';

// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card";



function Login({ role }){
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

    // Function to check firebase for existing account
    const checkUserExists = async (username, password) => {
        try {
            const allUsers = collection(db, "users");
            const querySnapshot = await getDocs(allUsers);
            
            // Iterate through all users to find a match
            for (const doc of querySnapshot.docs) {
                const userData = doc.data();
                if (userData.username === username && userData.password === password) {
                    return true; // Match found
                }
            }
            return false; // Match NOT found
        } catch (error) {
          console.error("Error checking user existence: ", error);
          throw error;
        }
    };

    // Handle submit on hitting submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Grab submitted values
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");


        /* CHECK ACCOUNT EXISTS FOR LOGIN */
        const exists = await checkUserExists(username, password);
        
        // ACTION AFTER CREDENTIALS INPUT
        if(exists){
            // Pass role 'regular' or 'admin' up to the parent App.js
            // Set user role based on username
            const new_role = username === "admin" ? "admin" : "regular";
            role(new_role);

            // Go to users page if account exists
            navigate('/user');
        } else {
            // Reset form fields for failed submissions
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
                <h2>Welcome back! <span>Login</span></h2>
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