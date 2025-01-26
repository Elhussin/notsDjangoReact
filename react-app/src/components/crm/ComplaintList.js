import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/complaints/')
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the complaints!", error);
            });
    }, []);

    return (
        <div>
            <h1>Complaints</h1>
            <ul>
                {complaints.map(complaint => (
                    <li key={complaint.id}>
                        {complaint.customer.user.username} - {complaint.description} ({complaint.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComplaintList;