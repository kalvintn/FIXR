// CSS
import './UserView.css';

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

function UserView({ role, my_username }){
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
                <p> Hello [{ my_username }] </p>
                <p> Account Privileges : [{ role }] </p>
                {role === 'admin' ? <Link to="/admin-panel">Admin Panel</Link> : null}
                <Link to="/login">Logout</Link>
                <Link to="/create-post">+ Add New Post</Link>
            </Header>
            <Main>
                <PostWrapper>
                    {posts.map((post, index) => (
                        <Post key={index} role={role} {...post} />
                    ))}
                </PostWrapper>
            </Main>
            <Footer />
        </div>   
    );
}

export default UserView;