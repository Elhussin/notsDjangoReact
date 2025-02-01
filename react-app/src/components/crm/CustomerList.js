import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../Api/crmApi';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    // Fetch branches when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCustomer();
                console.log('Customers:', data);
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchData();
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