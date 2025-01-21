import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from "../Api/api";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      setFilteredCategories(data); // Initialize filtered categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateCategory(formData.id, { name: formData.name });
        alert('Category updated successfully!');
      } else {
        await createCategory({ name: formData.name });
        alert('Category added successfully!');
      }
      setFormData({ id: null, name: '' });
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (category) => {
    setFormData({ id: category.id, name: category.name });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        alert('Category deleted successfully!');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <h2>Category Manager</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Form for Adding/Editing Categories */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Category</button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setFormData({ id: null, name: '' });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Categories List */}
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
