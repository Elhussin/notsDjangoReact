// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from  '../../Api/account';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            alert("Failed to load categories.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id));
                alert("Category deleted successfully.");
            } catch (error) {
                alert("Failed to delete category.");
            }
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description || "No description"}</td>
                            <td>
                                <button onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;