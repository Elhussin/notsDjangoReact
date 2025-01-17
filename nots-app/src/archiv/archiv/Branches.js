import React, { useEffect, useState } from 'react';
import { getBranches, createBranch, deleteBranch } from './api';

const Branches = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBranches();
            setBranches(response.data);
        };
        fetchData();
    }, []);

    const handleCreate = async () => {
        const newBranch = { name: 'New Branch', location: 'Unknown', phone: '123456789' };
        await createBranch(newBranch);
        setBranches([...branches, newBranch]);
    };

    const handleDelete = async (id) => {
        await deleteBranch(id);
        setBranches(branches.filter(branch => branch.id !== id));
    };

    return (
        <div>
            <button onClick={handleCreate}>Create Branch</button>
            {branches.map(branch => (
                <div key={branch.id}>
                    <h3>{branch.name}</h3>
                    <button onClick={() => handleDelete(branch.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Branches;
