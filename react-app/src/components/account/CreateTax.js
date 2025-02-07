// src/components/CreateTax.js
import React, { useState } from 'react';
import {  createTax} from '../../Api/account';

const CreateTax = ({ onTaxCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        rate: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTax = await createTax(formData);
            onTaxCreated(newTax);
            alert("Tax created successfully.");
        } catch (error) {
            alert("Failed to create tax.");
        }
    };

    return (
        <div>
            <h2>Create New Tax</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rate (%):</label>
                    <input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateTax;