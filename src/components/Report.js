// CSS
import './Report.css';

// React
import React, { useState, useEffect }  from 'react';

// Firebase
import { db } from "../firebase";
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";

// Needed Components
import Card from "../components/Card";

function Report(props){
    let { reportID, postID, reason, report_description } = props;

    const [userData, setUserData] = useState(null);

    // Fetch user data from ID
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Find correct post
                const q = query(collection(db, "posts"), where("id", "==", postID));
                const querySnapshot = await getDocs(q);

                // Collect fields
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {
                        //console.log(`Document with ID ${postID} found in collection "posts"`);
                        setUserData(doc.data());
                    });
                } else {
                    console.log(`Document with ID ${postID} not found in collection "posts"`);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [postID]);


    // If the report is denied, simply clear report from report database
    const handleKeep = async () => {
        // Remove report in reports database
        const q = query(collection(db, "reports"), where("reportID", "==", reportID ));
        const querySnapshot = await getDocs(q);

        // Collect fields
        if (!querySnapshot.empty) {
            //console.log(`Report with report ID ${reportID} found in collection "reports"`);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                //console.log(`Report with report ID ${reportID} has been removed in collection "reports"`);
            });
        } else {
            console.log(`Report with ID ${reportID} not found in collection "reports"`);
        }
    };

    // If the report is to be removed, clear database of post AND of report ticket
    const handleRemove = async () => {
        /* REMOVE REPORT TICKET FROM DATABASE */
        const q = query(collection(db, "reports"), where("reportID", "==", reportID ));
        const querySnapshot = await getDocs(q);

        // Collect fields
        if (!querySnapshot.empty) {
            //console.log(`Report with report ID ${reportID} found in collection "reports"`);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                //console.log(`Report with report ID ${reportID} has been removed in collection "reports"`);
            });
        } else {
            console.log(`Report with ID ${reportID} not found in collection "reports"`);
        }

        /* REMOVE POST FROM DATABASE */
        const q2 = query(collection(db, "posts"), where("id", "==", postID));
        const querySnapshot2 = await getDocs(q2);

        // Collect fields
        if (!querySnapshot2.empty) {
            //console.log(`Post with ID ${postID} found in collection "posts"`);
            querySnapshot2.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                //console.log(`Post with ID ${postID} has been removed in collection "posts"`);
            });
        } else {
            console.log(`Post with ID ${postID} not found in collection "posts"`);
        }
    }

    return (
        <Card className='long-card'>
            <div className='report'>
                {userData && (
                    <>
                        <p>Post Creator: { userData.username } </p>
                        <p>Post ID: { postID } </p>
                        <p>Post Title: {userData.postTitle} </p>
                        <p>Post Description: {userData.description} </p>
                    </>
                )}
                <p>report id: { reportID } </p>
                <p>Removal Reason: {reason} </p>
                <p>Removal Description: {report_description} </p>
                <div className="buttons">
                    <button className='remove' onClick={handleRemove}>Remove Post</button>
                    <button className='keep' onClick={handleKeep}>Keep Post</button>
                </div>
            </div>
        </Card>
    );
}

export default Report;