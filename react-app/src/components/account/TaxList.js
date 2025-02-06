// src/components/TaxList.js
import React, { useEffect, useState } from 'react';
import { getTaxes, deleteTax } from '../../Api/account';

const TaxList = () => {
    const [taxes, setTaxes] = useState([]);

    useEffect(() => {
        fetchTaxes();
    }, []);

    const fetchTaxes = async () => {
        try {
            const data = await getTaxes();
            setTaxes(data);
        } catch (error) {
            alert("Failed to load taxes.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tax?")) {
            try {
                await deleteTax(id);
                setTaxes(taxes.filter(tax => tax.id !== id));
                alert("Tax deleted successfully.");
            } catch (error) {
                alert("Failed to delete tax.");
            }
        }
    };

    return (
        <div>
            <h2>Taxes</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rate (%)</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taxes.map(tax => (
                        <tr key={tax.id}>
                            <td>{tax.name}</td>
                            <td>{tax.rate}</td>
                            <td>{tax.description || "No description"}</td>
                            <td>
                                <button onClick={() => handleDelete(tax.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaxList;