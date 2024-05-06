// CSS
import './Post.css';

// React
import React, { useState } from 'react';
import thumbs_up from '../media/thumbs_up.svg';
import thumbs_down from '../media/thumbs_down.svg';
import report_flag from '../media/report_flag.svg';

// Firebase
import { db } from "../firebase";


function Post(props){
    let { postID, username, photoURL, location, postTitle, description, likes, dislikes } = props;

    // Like/dislike hooks
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);

    // Update like count
    const handleLike = (postID) => {
        // Update like count in the database
        db.collection('posts').doc(postID).update({
            likes: likeCount + 1
        }).then(() => {
            // Update state with the new like count
            setLikeCount(prevCount => prevCount + 1);
            // If user has disliked the post previously, remove the dislike
            if (dislikeCount > 0) {
                db.collection('posts').doc(postID).update({
                    dislikes: dislikeCount - 1
                }).then(() => {
                    // Update state with the new dislike count
                    setDislikeCount(prevCount => prevCount - 1);
                }).catch(error => {
                    console.error('Error removing dislike:', error);
                });
            }
        }).catch(error => {
            console.error('Error updating like count:', error);
        });
    };
    
    // Update dislike count
    const handleDislike = (postID) => {
        // Update dislike count in the database
        db.collection('posts').doc(postID).update({
            dislikes: dislikeCount + 1
        }).then(() => {
            // Update state with the new dislike count
            setDislikeCount(prevCount => prevCount + 1);
            // If user has liked the post previously, remove the like
            if (likeCount > 0) {
                db.collection('posts').doc(postID).update({
                    likes: likeCount - 1
                }).then(() => {
                    // Update state with the new like count
                    setLikeCount(prevCount => prevCount - 1);
                }).catch(error => {
                    console.error('Error removing like:', error);
                });
            }
        }).catch(error => {
            console.error('Error updating dislike count:', error);
        });
    };

    return (
        <div className='post'>
            <div className='image-wrapper'>
                <img src={photoURL} alt="user upload"/>
            </div>
            <div className="post-header">
                <h4>{postTitle}</h4>
                <p>by: {username}</p>
            </div>
            <div className='post-body'>
                <p className='location'>Location: {location}</p>
                <button className="reportFlag" ><img src={report_flag} alt="report" /></button>
                <p>{description}</p>
            </div>
            <div className="post-footer">
                <button id="thumbs_up" onClick={() => handleLike(postID)}><img src={thumbs_up} alt="thumbs_up" /> <p>{likeCount}</p></button>
                <button id="thumbs_down" onClick={() => handleDislike(postID)}><img src={thumbs_down} alt="thumbs_down" /> <p>{dislikeCount}</p></button>
            </div>
        </div>
    );
}

export default Post;