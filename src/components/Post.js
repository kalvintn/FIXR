// CSS
import './Post.css';

// React
import React, { useState } from 'react';
import thumbs_up from '../media/thumbs_up.svg';
import thumbs_down from '../media/thumbs_down.svg';
import report_flag from '../media/report_flag.svg';

// Needed Components
import Modal from "../components/Modal";


function Post(props){
    let { id, username, photoURL, location, postTitle, description, likes, dislikes } = props;

    // Show a report modal on clicking report button click
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
/*
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
*/

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
                <p>{description}</p>
            </div>
            <button className="report-flag" onClick={handleOpenModal}><img src={report_flag} alt="report" /><span>Report Post</span></button>
            <Modal postID={id} isOpen={modalOpen} onClose={handleCloseModal} />
            <div className="post-footer">
                <button id="thumbs_up"><img src={thumbs_up} alt="thumbs_up" /> <p>{ likes }</p></button>
                <button id="thumbs_down"><img src={thumbs_down} alt="thumbs_down" /> <p>{ dislikes }</p></button>
            </div>
        </div>
    );
}

export default Post;