import React, { useEffect, useState } from 'react';

import { getPrivateInformation, updatePrivateInformation, getAllCategories, addPhoto, removePhoto } from '../utils/ApiFunctions';

// const UserProfile = () => {
//   const [privateInfo, setPrivateInfo] = useState(null); // Store private info
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     lastName: '',
//     about: '',
//     language: '',
//     skills: '',
//     education: '',
//     experienceYears: 0,
//   }); // Form state
//   const [file, setFile] = useState(null); // File input state

//   const token = localStorage.getItem('token'); // Get the JWT token from localStorage

//   // Fetch the user's private information when the component mounts
//   useEffect(() => {
//     const fetchPrivateInfo = async () => {
//       try {
//         const data = await getPrivateInformation(token); // Fetch the information using the provided token
//         setPrivateInfo(data); // Set the fetched information in state
//         setFormValues({
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           about: data.about || '',
//           language: data.language || '',
//           skills: data.skills || '',
//           education: data.education || '',
//           experienceYears: data.experienceYears || 0,
//         });
//       } catch (error) {
//         console.error('Error fetching private information:', error);
//       } finally {
//         setIsLoading(false); // Mark loading as complete
//       }
//     };

//     fetchPrivateInfo(); // Call the fetch function
//   }, [token]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission to update private information
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updatePrivateInformation(formValues, token); // Update the user's private information
//       alert('Private information updated successfully!');
//     } catch (error) {
//       console.error('Error updating private information:', error);
//       alert('Failed to update private information.');
//     }
//   };

//   // Handle photo file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle photo upload
//   const handlePhotoUpload = async () => {
//     if (file) {
//       try {
//         const response = await addPhoto(file, token); // Upload the selected photo
//         alert(response); // Show success message
//       } catch (error) {
//         console.error('Error uploading photo:', error);
//         alert('Failed to upload photo.');
//       }
//     }
//   };

//   // Handle photo removal
//   const handlePhotoRemove = async (photoId) => {
//     try {
//       const response = await removePhoto(photoId, token); // Remove the photo by ID
//       alert(response); // Show success message
//     } catch (error) {
//       console.error('Error removing photo:', error);
//       alert('Failed to remove photo.');
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading message while fetching data
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={formValues.firstName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={formValues.lastName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           About:
//           <textarea
//             name="about"
//             value={formValues.about}
//             onChange={handleInputChange}
//           ></textarea>
//         </label>
//         <br />
//         <label>
//           Language:
//           <input
//             type="text"
//             name="language"
//             value={formValues.language}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Skills:
//           <input
//             type="text"
//             name="skills"
//             value={formValues.skills}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Education:
//           <input
//             type="text"
//             name="education"
//             value={formValues.education}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Experience Years:
//           <input
//             type="number"
//             name="experienceYears"
//             value={formValues.experienceYears}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Update Information</button>
//       </form>

//       <h2>Upload a new photo</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handlePhotoUpload}>Upload Photo</button>

//       <h2>Current Photos</h2>
//       {privateInfo?.photos?.map((photo) => (
//         <div key={photo.id}>
//           <img src={photo.url} alt="Portfolio" />
//           <button onClick={() => handlePhotoRemove(photo.id)}>Remove Photo</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserProfile;

const UserProfile = () => {
  const [privateInfo, setPrivateInfo] = useState(null); // Store private info
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]); // Store all available categories
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    about: '',
    language: '',
    skills: '',
    education: '',
    experienceYears: 0,
    categories: [], // Array for selected category IDs
    country: '', // New field for country
    city: '',    // New field for city
    categoryPrices: [] // Array for category prices
  }); // Form state
  const [selectedCategoryForPrice, setSelectedCategoryForPrice] = useState(''); // Track selected category for price assignment
  const [servicePrice, setServicePrice] = useState(''); // Track service price for the selected category
  const [file, setFile] = useState(null); // File input state

  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  // Fetch the user's private information and available categories when the component mounts
  useEffect(() => {
    const fetchPrivateInfo = async () => {
      try {
        const data = await getPrivateInformation(token); // Fetch the information using the provided token
        setPrivateInfo(data); // Set the fetched information in state
        setFormValues({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          about: data.about || '',
          language: data.language || '',
          skills: data.skills || '',
          education: data.education || '',
          experienceYears: data.experienceYears || 0,
          categories: data.categoryIds || [], // Initialize categories with existing category IDs
          country: data.location?.country || '', // Set country from existing location
          city: data.location?.city || '',       // Set city from existing location
          categoryPrices: data.workerCategoryPrices?.map(priceObj => ({
            categoryId: priceObj.category.id,
            servicePrice: priceObj.servicePrice
          })) || [] // Initialize workerCategoryPrices from data
        });
      } catch (error) {
        console.error('Error fetching private information:', error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList); // Set available categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPrivateInfo(); // Call the fetch function
    fetchCategories(); // Fetch available categories
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Handle category selection from dropdown
  const handleCategorySelect = (e) => {
    const selectedCategoryId = parseInt(e.target.value);

    // Check if the category is already in the selected categories
    if (!formValues.categories.includes(selectedCategoryId)) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        categories: [...prevFormValues.categories, selectedCategoryId], // Add selected category ID to the list
      }));
    }
  };
  const handlePriceCategorySelect = (e) => {
    setSelectedCategoryForPrice(parseInt(e.target.value)); // Store selected category ID for price assignment
  };

  // Handle service price change
  const handleServicePriceChange = (e) => {
    setServicePrice(e.target.value); // Store price for selected category
  };

  // Handle category price updates
  const handleAddCategoryPrice = () => {
    if (selectedCategoryForPrice && servicePrice) {
      // Prevent adding the same category more than once
      if (!formValues.categoryPrices.some(priceObj => priceObj.categoryId === selectedCategoryForPrice)) {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          categoryPrices: [...prevFormValues.categoryPrices, {
            categoryId: selectedCategoryForPrice,
            servicePrice: parseFloat(servicePrice)
          }],
        }));

        // Reset the selected category and price
        setSelectedCategoryForPrice('');
        setServicePrice('');
      }
    }
  };

  // Handle form submission to update private information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formValues,
        categoryIds: formValues.categories,  // Send category IDs
      };
      await updatePrivateInformation(updatedData, token); // Update the user's private information
      alert('Private information updated successfully!');
    } catch (error) {
      console.error('Error updating private information:', error);
      alert('Failed to update private information.');
    }
  };

  // Handle photo file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle photo upload
  const handlePhotoUpload = async () => {
    if (file) {
      try {
        const response = await addPhoto(file, token); // Upload the selected photo
        alert(response); // Show success message
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo.');
      }
    }
  };

  // Handle photo removal
  const handlePhotoRemove = async (photoId) => {
    try {
      const response = await removePhoto(photoId, token); // Remove the photo by ID
      alert(response); // Show success message
    } catch (error) {
      console.error('Error removing photo:', error);
      alert('Failed to remove photo.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          About:
          <textarea
            name="about"
            value={formValues.about}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <br />
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={formValues.language}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formValues.skills}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Education:
          <input
            type="text"
            name="education"
            value={formValues.education}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Experience Years:
          <input
            type="number"
            name="experienceYears"
            value={formValues.experienceYears}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        {/* New fields for country and city */}
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        <label>
          Select Category:
          <select onChange={handleCategorySelect}>
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <p>Selected Categories:</p>
        <ul>
          {formValues.categories.map((categoryId) => (
            <li key={categoryId}>
              {categories.find((cat) => cat.id === categoryId)?.name}
            </li>
          ))}
        </ul>

        {/* Category price input fields */}
        <h2>Set Category Prices</h2>
        <label>
          Select Category for Price:
          <select value={selectedCategoryForPrice} onChange={handlePriceCategorySelect}>
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Set Price:
          <input
            type="number"
            value={servicePrice}
            onChange={handleServicePriceChange}
            placeholder="Enter price"
          />
        </label>
        <button type="button" onClick={handleAddCategoryPrice}>
          Add Price
        </button>


        <button type="submit">Update Information</button>
      </form>

      <h2>Upload a new photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePhotoUpload}>Upload Photo</button>

      <h2>Current Photos</h2>
      {privateInfo?.photos?.map((photo) => (
        <div key={photo.id}>
          <img src={photo.url} alt="Portfolio" />
          <button onClick={() => handlePhotoRemove(photo.id)}>Remove Photo</button>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;