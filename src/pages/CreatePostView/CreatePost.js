// CSS
import './CreatePost.css';

// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Card from '../../components/Card';

function CreatePost({ role, my_username }){
    const navigate = useNavigate();

    // Function to write data to Firestore
    const writeDataToFirestore = async (userPost) => {
        try {
            await addDoc(collection(db, "posts"), userPost);
            console.log("Data written to Firestore successfully!");
        } catch (error) {
            console.error("Error writing data to Firestore: ", error);
        }
    };

    // Manage create-post form data
    const [formData, setFormData] = useState({
        id: uuidv4(),
        username: "",
        photoURL: "",
        location: "",
        postTitle: "",
        description: "",
        likes: 0,
        dislikes: 0,
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
    const handleSubmit =  (e) => {
        e.preventDefault();

        // Grab submitted values
        let formData = new FormData(e.target);
        let photoURL = formData.get("photoURL");
        let location = formData.get("location");
        let title = formData.get("postTitle");
        let description = formData.get("description");


        /* Perform validity checks on content */
        let isValid = true;
        let errorMessage = "Could not create post for the following reasons:\n";

        // Check: title character limit - 60 characters
        if(title != null && title.length > 60){
            isValid = false;
            errorMessage += "\t Title character limit reached.\n";
        }

        // Check: location character limit - 50 characters
        if(location != null && location.length > 50){
            isValid = false;
            errorMessage += "\t Location character limit reached.\n";
        }

        // Check: description character limit - 350 characters
        if(description != null && description.length > 350){
            isValid = false;
            errorMessage += "\t Description character limit reached.\n";
        }


        /* DECISIONS AFTER FORM ENTRY */
        if(isValid){
            // Check for blank fields, fix
            const defaultPhotoURL = "https://images.unsplash.com/photo-1556834927-24062721858c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            const defaultDescription = "...";

            // Bundle data; write account information to database
            const userPost = {
                id: uuidv4(),
                username: { my_username }.my_username || '?',
                photoURL: photoURL || defaultPhotoURL,
                location: location,
                postTitle: title,
                description: description || defaultDescription,
                likes: 0,
                dislikes: 0,
            };
            writeDataToFirestore(userPost);

            alert("Thank you for creating your post!");

            // Return to users page after successful account creation
            navigate('/user');
        } else {
            // Prompt user
            alert(errorMessage);
        }
    };

    return(
        <div>
            <Header>
                <p> Hello [{ my_username }] </p>
                <p> Account Privileges : [{ role }] </p>
                <Link to="/user">Return to Posts</Link>
            </Header>
            <Main>
                <h2>Create a New Post!</h2>
                <Card className='long-card'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="photoURL">Photo URL</label>
                            <input type="text" id="photoURL" name="photoURL" value={formData.photoURL} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="location">Post Location <span>required</span></label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="postTitle">Post Title <span>required</span></label>
                            <input type="text" id="postTitle" name="postTitle" value={formData.postTitle} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="description">Post Description</label>
                            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} />
                        </div>
                        <button type="submit">Publish</button>
                    </form>
                </Card>
            </Main>
            <Footer />
        </div>    
    );
}

export default CreatePost;