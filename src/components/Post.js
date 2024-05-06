// CSS
import './Post.css';

// React
import React from 'react';

function Post(props){
    let { username, photoURL, location, postTitle, description, likes, dislikes } = props;

    return (
        <div className='post'>
            <h2>{postTitle}</h2>
            <img src={photoURL} width="10px" alt="user upload"/>
            <p>By: {username}</p>
            <p>Location: {location}</p>
            <p>{description}</p>
            <p>Likes: {likes}</p>
            <p>Dislikes: {dislikes}</p>
        </div>
    );
}

export default Post;