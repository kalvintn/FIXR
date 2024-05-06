// CSS
import './Post.css';

// React
import React, { useState } from 'react';
import thumbs_up from '../media/thumbs_up.svg';
import thumbs_down from '../media/thumbs_down.svg';
import report_flag from '../media/report_flag.svg';

// Firebase
import { db } from "../firebase";
import { doc, updateDoc, FieldValue } from "firebase/firestore";

// Needed Components
import Modal from "../components/Modal";


function Post(props){
    let { id, username, photoURL, location, postTitle, description, likes, dislikes } = props;

    // Show a report modal on clicking report button click
    const [modalOpen, setModalOpen] = useState(false);

    // Hooks for like and dislike
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);

    // Update like count
    const handleLike = async (postID) => {
        // Update like count locally
        setLikeCount(prevCount => prevCount + 1);

        // Update post like count in database
        try {
            await updateDoc(doc(db, "posts", postID), {
                likes: FieldValue.increment(1)
            });
        } catch (error) {
            console.error("Error updating likes: ", error);
        }
    };
    
    // Update dislike count
    const handleDislike = async (postID) => {
        // Update dislike locally
        setDislikeCount(prevCount => prevCount + 1);

        // Update dislike count in the database
        try {
            let ref = db.collection('posts').doc(postID);
            await updateDoc(ref, {
                dislikes: db.FieldValue.increment(1)
            });
        } catch (error) {
            console.error("Error updating dislikes: ", error);
        }
    };

    // Modal controls - report
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
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
                <p>{description}</p>
            </div>
            <button className="report-flag" onClick={handleOpenModal}><img src={report_flag} alt="report" /><span>Report Post</span></button>
            <Modal postID={id} isOpen={modalOpen} onClose={handleCloseModal} />
            <div className="post-footer">
                <button id="thumbs_up" onClick={() => handleLike({id})}><img src={thumbs_up} alt="thumbs_up" /> <p>{ likeCount }</p></button>
                <button id="thumbs_down" onClick={() => handleDislike({id})}><img src={thumbs_down} alt="thumbs_down" /> <p>{ dislikeCount }</p></button>
            </div>
        </div>
    );
}

export default Post;