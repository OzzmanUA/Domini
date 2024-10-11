import React, { useState, useEffect } from 'react';
import { createTask, getAllCategories } from '../utils/ApiFunctions';

const CreateTask = () => {
    const [taskData, setTaskData] = useState({
      description: '',
      details: '',
      price: '',
      completionDate: '',
      isConfirmed: false, // Confirmed defaults to false
      status: 'ACTIVE', // Default task status
      categoryId: '',
      clientId: '', // Client will be from the logged-in user
      workerId: '', // Worker will be assigned later
      location: { // Location data is a nested object
        country: '',
        city: '',
        district: '',
        street: '',
        house: ''
      },
    });
  
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token'); // Get token from localStorage
  
    // Fetch categories when the component mounts
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categoryList = await getAllCategories();
          setCategories(categoryList); // Set fetched categories
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
    // Handle input change for task data
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      // If the input name belongs to location fields, update the nested location object
      if (name.startsWith('location.')) {
        const locationField = name.split('.')[1]; // Extract location field (e.g., country, city, etc.)
        setTaskData((prevData) => ({
          ...prevData,
          location: {
            ...prevData.location,
            [locationField]: value,
          },
        }));
      } else {
        setTaskData({
          ...taskData,
          [name]: value,
        });
      }
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        // Send request to create a task
        const response = await createTask(taskData, token);
        alert('Task created successfully: ' + response);
        // Reset form fields
        setTaskData({
          description: '',
          details: '',
          price: '',
          completionDate: '',
          isConfirmed: false,
          status: 'ACTIVE',
          categoryId: '',
          clientId: '',
          workerId: '',
          location: {
            country: '',
            city: '',
            district: '',
            street: '',
            house: ''
          },
        });
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div>
        <h1>Create a New Task</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Details:
            <textarea
              name="details"
              value={taskData.details}
              onChange={handleInputChange}
              required
            ></textarea>
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={taskData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Completion Date:
            <input
              type="date"
              name="completionDate"
              value={taskData.completionDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Category:
            <select
              name="categoryId"
              value={taskData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
  
          {/* Location Fields */}
          <h3>Location Information</h3>
          <label>
            Country:
            <input
              type="text"
              name="location.country"
              value={taskData.location.country}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="location.city"
              value={taskData.location.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            District:
            <input
              type="text"
              name="location.district"
              value={taskData.location.district}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Street:
            <input
              type="text"
              name="location.street"
              value={taskData.location.street}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            House:
            <input
              type="text"
              name="location.house"
              value={taskData.location.house}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
  
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    );
  };
  
  export default CreateTask;