// src/components/CreateTransaction.js
import React, { useState } from 'react';
import { createTransaction } from '../../Api/account';

const CreateTransaction = ({ onTransactionCreated }) => {
    const [formData, setFormData] = useState({
        account: '',
        amount: '',
        transaction_type: 'income',
        description: '',
        date: new Date().toISOString().split('T')[0], // تاريخ اليوم افتراضيًا
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTransaction = await createTransaction(formData);
            onTransactionCreated(newTransaction);
            alert("Transaction created successfully.");
        } catch (error) {
            alert("Failed to create transaction.");
        }
    };

    return (
        <div>
            <h2>Create New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Account ID:</label>
                    <input
                        type="number"
                        name="account"
                        value={formData.account}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select
                        name="transaction_type"
                        value={formData.transaction_type}
                        onChange={handleChange}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateTransaction;