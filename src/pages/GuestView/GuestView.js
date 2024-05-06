// CSS
import './GuestView.css';

// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Firebase
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Needed Components
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import PostWrapper from "../../components/PostWrapper";
import Post from "../../components/Post";

function GuestView(){
    // Loop through all posts in database -> display
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the database
        const fetchPosts = async () => {
            try {
                const postsSnapshot = await getDocs(collection(db, 'posts'));
                const postsData = postsSnapshot.docs.map(doc => doc.data());
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return(
        <div>
            <Header>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </Header>
            <Main>
                <PostWrapper>
                    {posts.map((post, index) => (
                        <Post key={index} {...post} />
                    ))}
                </PostWrapper>
            </Main>
            <Footer />
        </div>    
    );
}

export default GuestView;