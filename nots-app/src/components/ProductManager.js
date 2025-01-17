import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../Api/api'; // استبدل المسار بمسار API الخاص بك

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateProduct(formData.id, { name: formData.name, price: formData.price, description: formData.description });
        alert('Product updated successfully!');
      } else {
        await createProduct({ name: formData.name, price: formData.price, description: formData.description });
        alert('Product added successfully!');
      }
      setFormData({ id: null, name: '', price: '', description: '' });
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({ id: product.id, name: product.name, price: product.price, description: product.description });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <h2>Product Manager</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Form for Adding/Editing Products */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setFormData({ id: null, name: '', price: '', description: '' });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Products List */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
