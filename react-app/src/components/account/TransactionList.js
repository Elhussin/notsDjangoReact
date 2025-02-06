// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../api/transactionApi';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            alert("Failed to load transactions.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await deleteTransaction(id);
                setTransactions(transactions.filter(transaction => transaction.id !== id));
                alert("Transaction deleted successfully.");
            } catch (error) {
                alert("Failed to delete transaction.");
            }
        }
    };

    return (
        <div>
            <h2>Transactions</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.account?.name || "N/A"}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.description || "No description"}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;