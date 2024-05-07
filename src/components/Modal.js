// CSS
import "./Modal.css";

// React
import React , { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


function Modal({ reportID, postID, isOpen, onClose }) {
    const [selectedReason, setSelectedReason] = useState('');
    const [reportDescription, setReportDescription] = useState('');

    // Function to write data to Firestore
    const writeDataToFirestore = async (userReport) => {
        try {
            await addDoc(collection(db, "reports"), userReport);
            console.log("Data written to Firestore successfully!");
        } catch (error) {
            console.error("Error writing data to Firestore: ", error);
        }
    };

    // Handle submit for user report
    const handleSubmit = async () => {
        // Build report object
        const reportData = {
            reportID: uuidv4(),
            postID: postID,
            reason: selectedReason || "No reason listed",
            description: reportDescription
        };
        writeDataToFirestore(reportData);   // Submit to 'reports' collection in server

        // Clear form fields
        setSelectedReason('');
        setReportDescription('');

        // Alert user, close modal
        alert("Report made. Thank you!");
        onClose();
    };



    return (
        <div className={`w3-modal ${isOpen ? 'w3-show' : ''}`} onClick={onClose}>
        <div className="w3-modal-content w3-animate-top w3-card-4" onClick={(e) => e.stopPropagation()}>
            <header className="w3-container w3-teal">
            <span onClick={onClose} className="w3-button w3-display-topright">&times;</span>
            <h2>Report this Post</h2>
            </header>
            <div className="w3-container">
                <form className="modal-form">
                    <div className="w3-section">
                        <select id="dropdown" className="w3-select" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
                            <option value="No reason listen" >No reason listed</option>
                            <option value="spam">Spam</option>
                            <option value="inappropriate">Inappropriate content</option>
                            <option value="false">False information</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="w3-section">
                        <textarea className="w3-input" rows="5" placeholder="Write more details here..." value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}></textarea>
                    </div>
                </form>
            </div>

            <footer className="w3-container w3-teal">
                <button type="submit" className="w3-button w3-blue" onClick={handleSubmit}>Submit</button>
                <button type="button" className="w3-button w3-red" onClick={onClose}>Cancel</button>
            </footer>
        </div>
        </div>
    );
}

export default Modal;
