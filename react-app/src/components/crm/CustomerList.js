import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/customers/')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the customers!", error);
            });
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.user.username} - {customer.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;