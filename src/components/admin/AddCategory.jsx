import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api, getAllParentCategories } from '../utils/ApiFunctions';

const AddCategory = () => {
  // State to hold form inputs
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState(''); // New state for parent category
  const [parentCategories, setParentCategories] = useState([]); // State to store available parent categories
  const [message, setMessage] = useState('');

  // Fetch all parent categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const categoriesList = await getAllParentCategories(); // Fetch parent categories from API
        setParentCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching parent categories:', error);
      }
    };

    fetchParentCategories();
  }, []);

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
    formData.append('name', categoryName); // Assuming your backend expects 'category.name'
    formData.append('file', imageFile); // Append the image file

    // Append parent category ID if selected
    if (parentCategoryId) {
      formData.append('parentCategoryId', parentCategoryId);
    }

    try {
      // Send the POST request to the backend
      const token = localStorage.getItem('token');
      const response = await api.post('/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8',
          Authorization: `Bearer ${token}`, // Add token here
        },
      });
      setMessage(response.data); // Success message from the backend
    } catch (error) {
      setMessage('Error adding category: ' + (error.response?.data || error.message));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected file in state
  };

  // Handle parent category change
  const handleParentCategoryChange = (e) => {
    setParentCategoryId(e.target.value);
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

        <div>
          <label htmlFor="parentCategory">Parent Category (Optional):</label>
          <select id="parentCategory" value={parentCategoryId} onChange={handleParentCategoryChange}>
            <option value="">No Parent Category</option>
            {parentCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Category</button>
      </form>

      {message && <p>{message}</p>} {/* Display success or error message */}
    </div>
  );
};

export default AddCategory;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { api } from '../utils/ApiFunctions';

// const AddCategory = () => {
//   // State to hold form inputs
//   const [categoryName, setCategoryName] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [message, setMessage] = useState('');

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!categoryName || !imageFile) {
//       setMessage('Please provide all required fields');
//       return;
//     }

//     // Create form data object to hold the inputs
//     const formData = new FormData();
//     formData.append('name', categoryName); // Assuming your backend expects 'category.name'
//     formData.append('file', imageFile); // Append the image file

//     try {
//       // Send the POST request to the backend
//       const token = localStorage.getItem("token")
//       const response = await api.post('/admin/categories', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`, // Add token here
//         },
//       });
//       setMessage(response.data); // Success message from the backend
//     } catch (error) {
//       setMessage('Error adding category: ' + error.response?.data || error.message);
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]); // Set the selected file in state
//   };

//   return (
//     <div>
//       <h1>Add New Category</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="categoryName">Category Name:</label>
//           <input
//             type="text"
//             id="categoryName"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="imageFile">Upload Image:</label>
//           <input
//             type="file"
//             id="imageFile"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <button type="submit">Add Category</button>
//       </form>

//       {message && <p>{message}</p>} {/* Display success or error message */}
//     </div>
//   );
// };

// export default AddCategory;


// const AddCategory = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const [parentCategory, setParentCategory] = useState(null);
//   const [file, setFile] = useState(null);

//   // Handle the file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData object to send category data and the file
//     const formData = new FormData();
//     const categoryData = {
//       name: categoryName,
//       parentCategory: parentCategory ? { id: parentCategory } : null,
//     };

//     // Append category data as a string (since @ModelAttribute in backend expects it)
//     formData.append('category', new Blob([JSON.stringify(categoryData)], { type: 'application/json' }));
//     formData.append('file', file);

//     try {
//       const token = localStorage.getItem("token")
//       // Send a POST request to the backend
//       const response = await api.post('/admin/categories', formData, {

//         headers: {
          
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`, // Add token here
//         },
//       });

//       // Handle success response
//       console.log('Category added successfully:', response.data);
//       alert('Category added successfully');
//     } catch (error) {
//       // Handle errors
//       console.error('Error adding category:', error.response ? error.response.data : error.message);
//       alert('Error adding category');
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Category</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Category Name:</label>
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Parent Category ID (optional):</label>
//           <input
//             type="number"
//             value={parentCategory || ''}
//             onChange={(e) => setParentCategory(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Upload Image:</label>
//           <input type="file" accept="image/*" onChange={handleFileChange} required />
//         </div>

//         <button type="submit">Add Category</button>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;