// src/components/AccountList.js
import React, { useEffect, useState, memo } from 'react';
import {  getAccounts, deleteAccount  } from '../../Api/account';

const AccountList = memo(function AccountList() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const data = await getAccounts();
            setAccounts(data);
        } catch (error) {
            alert("Failed to load accounts.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            try {
                await deleteAccount(id);
                setAccounts(accounts.filter(account => account.id !== id));
                alert("Account deleted successfully.");
            } catch (error) {
                alert("Failed to delete account.");
            }
        }
    };

    return (
        <div>
            <h2>Accounts</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Currency</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{account.currency}</td>
                            <td>{account.balance}</td>
                            <td>
                                <button onClick={() => handleDelete(account.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default AccountList;