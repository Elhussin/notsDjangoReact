import React, { useEffect, useState } from 'react';
import { getComplaints } from '../../Api/crmApi';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getComplaints();
               
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Complaints</h1>
            <ul>
                {complaints.map(complaint => (
                    <li key={complaint.id}>
                        {complaint.customer} - {complaint.description} ({complaint.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComplaintList;