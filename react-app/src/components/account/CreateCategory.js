// src/components/CreateCategory.js
import React, { useState } from 'react';
import { createCategory } from '../../Api/account';

const CreateCategory = ({ onCategoryCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCategory = await createCategory(formData);
            onCategoryCreated(newCategory);
            alert("Category created successfully.");
        } catch (error) {
            alert("Failed to create category.");
        }
    };

    return (
        <div>
            <h2>Create New Category</h2>
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

export default CreateCategory;