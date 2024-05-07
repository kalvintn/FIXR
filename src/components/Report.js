// CSS
import './Report.css';

// React
import React, { useState, useEffect }  from 'react';

// Firebase
import { db } from "../firebase";


// Needed Components
import Card from "../components/Card";

function Report(props){
    let { postID, reason, description } = props;

    const [userData, setUserData] = useState(null);

    console.log(userData);

    // Fetch user data from ID
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = await db.doc(`posts/${postID}`).get(); // Assuming 'users' is the name of your collection
                if (userRef.exists()) {
                    setUserData(userRef.data());
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [postID]);

    return (
        <Card className='long-card'>
            <div className='report'>
                <div>
                    <p>Post ID: { postID } </p>
                    <p>Removal Reason: { reason } </p>
                    <p>Removal Description: { description } </p>
                </div>
            </div>
        </Card>
    );
}

export default Report;