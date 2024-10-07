import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/ApiFunctions';

const AddCategory = () => {
  // State to hold form inputs
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!categoryName || !imageFile) {
      setMessage('Please provide all required fields');
      return;
    }

    // Create form data object to hold the inputs
    const formData = new FormData();
    formData.append('category.name', categoryName); // Assuming your backend expects 'category.name'
    formData.append('file', imageFile); // Append the image file

    try {
      // Send the POST request to the backend
      const token = localStorage.getItem("token")
      const response = await api.post('/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Add token here
        },
      });
      setMessage(response.data); // Success message from the backend
    } catch (error) {
      setMessage('Error adding category: ' + error.response?.data || error.message);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected file in state
  };

  return (
    <div>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imageFile">Upload Image:</label>
          <input
            type="file"
            id="imageFile"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Add Category</button>
      </form>

      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default AddCategory;