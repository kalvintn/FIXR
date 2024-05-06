// CSS
import './Post.css';

// React
import React from 'react';
import thumbs_up from '../media/thumbs_up.svg';
import thumbs_down from '../media/thumbs_down.svg';

// Needed Components


function Post(props){
    let { username, photoURL, location, postTitle, description, likes, dislikes } = props;

    return (
        <div className='post'>
            <div className='image-wrapper'>
                <img src={photoURL} alt="user upload"/>
            </div>
            <div className="post-header">
                <h4>{postTitle}</h4>
                <p>By: {username}</p>
            </div>
            <div className='post-body'>
                <p className='location'>Location: {location}</p>
                <p>{description}</p>
            </div>
            <div className="post-footer">
                <button id="thumbs_up"><img src={thumbs_up} alt="thumbs_up" /> <p>{likes}</p></button>
                <button id="thumbs_down"><img src={thumbs_down} alt="thumbs_down" /> <p>{dislikes}</p></button>
            </div>
        </div>
    );
}

export default Post;