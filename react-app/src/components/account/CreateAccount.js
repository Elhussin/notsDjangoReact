// src/components/CreateAccount.js
import React, { useState, memo } from 'react';
import {  createAccount} from '../../Api/account';

const CreateAccount = memo(function CreateAccount({ onAccountCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        currency: 'USD',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAccount = await createAccount(formData);
            onAccountCreated(newAccount);
            alert("Account created successfully.");
        } catch (error) {
            alert("Failed to create account.");
        }
    };

    return (
        <div>
            <h2>Create New Account</h2>
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
                    <label>Currency:</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="SAR">Saudi Riyal</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
});

export default CreateAccount;