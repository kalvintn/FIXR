// CSS
import './AdminPanel.css';

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
import Report from "../../components/Report";

function AdminPanel({ role, my_username }){

    // Hooks for reports and user data (linked by post id)
    const [reports, setReports] = useState([]);

    // Fetch report
    useEffect(() => {
        // Fetch report from the database
        const fetchReports = async () => {
            try {
                const reportsSnapshot = await getDocs(collection(db, 'reports'));
                const reportsData = reportsSnapshot.docs.map(doc => doc.data());
                setReports(reportsData);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);



    return(
        <div>
            <Header>
                <p> Hello [{ my_username }] </p>
                <p> Account Privileges : [{ role }] </p>
                <Link to="/user">Return to Posts</Link>
            </Header>
            <Main>
                <div className="admin-panel-wrapper">
                    <h2>Monitor Reports Here</h2>
                    {reports.map((report, index) => (
                        <Report key={index} {...report} />
                    ))}
                </div>
            </Main>
            <Footer />
        </div>   
    );
}

export default AdminPanel;