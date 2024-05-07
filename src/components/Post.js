// CSS
import './Post.css';

// React
import React, { useState } from 'react';
import thumbs_up from '../media/thumbs_up.svg';
import thumbs_down from '../media/thumbs_down.svg';
import report_flag from '../media/report_flag.svg';

// Firebase
import { db } from "../firebase";
import { getDocs, updateDoc, deleteDoc, collection, query, where, increment } from "firebase/firestore";

// Needed Components
import Modal from "../components/Modal";

function Post(props){
    let { id, username, photoURL, location, postTitle, description, likes, dislikes, role } = props;

    // Show a report modal on clicking report button click
    const [modalOpen, setModalOpen] = useState(false);

    // Hooks for like and dislike
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);

    // Update like count
    const handleLike = async (postID) => {
        // Update like count locally
        setLikeCount(prevCount => prevCount + 1);

        // Update like count in Firebase
        try {
            // Find correct post
            const q = query(collection(db, "posts"), where("id", "==", postID));
            const querySnapshot = await getDocs(q);
    
            // Increment likes
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    //console.log(`Document with ID ${postID} found in collection "posts"`);
                    //console.log("Document data:", doc.data());
                    await updateDoc(doc.ref, {
                        likes: increment(1)
                    });
                    //console.log(`Likes for post with ID ${postID} incremented by 1`);
                });
            } else {
                console.log(`Document with ID ${postID} not found in collection "posts"`);
            }
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };
    
    // Update dislike count
    const handleDislike = async (postID) => {
        // Update dislike count locally
        setDislikeCount(prevCount => prevCount + 1);

        // Update dislike count in Firebase
        try {
            // Find correct post
            const q = query(collection(db, "posts"), where("id", "==", postID));
            const querySnapshot = await getDocs(q);
    
            // Increment dislikes
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    //console.log(`Document with ID ${postID} found in collection "posts"`);
                    //console.log("Document data:", doc.data());
                    await updateDoc(doc.ref, {
                        dislikes: increment(1)
                    });
                    //console.log(`Dislikes for post with ID ${postID} incremented by 1`);
                });
            } else {
                console.log(`Document with ID ${postID} not found in collection "posts"`);
            }
        } catch (error) {
            console.error('Error updating dislikes:', error);
        }
    };

    // Modal controls - report
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };


    // Admin delete - delete any post (exlusive to admins)
    const handleAdminDelete = async () => {
        // Confirmation dialog
        const result = window.confirm("Are you sure you wish to delete this post? There is no recovery method.");

        // If the admin confirms...
        if (result) {
            // Find post
            const q = query(collection(db, "posts"), where("id", "==", id ));
            const querySnapshot = await getDocs(q);

            // Remove entry
            if (!querySnapshot.empty) {
                //console.log(`Remove with ID ${id} found in collection "posts"`);
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                    //console.log(`Remove with ID ${id} has been removed in collection "posts"`);
                });
            } else {
                console.log(`Remove with ID ${id} not found in collection "reports"`);
            }
        }
    }


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
            {role === 'admin' ? <button className='delete-button' onClick={handleAdminDelete}>ADMIN DELETE</button>: null}
            <div className="post-footer">
                <button id="thumbs_up" onClick={() => handleLike(id)}><img src={thumbs_up} alt="thumbs_up" /> <p>{ likeCount }</p></button>
                <button id="thumbs_down" onClick={() => handleDislike(id)}><img src={thumbs_down} alt="thumbs_down" /> <p>{ dislikeCount }</p></button>
            </div>
        </div>
    );
}

export default Post;