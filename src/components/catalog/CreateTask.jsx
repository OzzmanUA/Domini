import React, { useState, useEffect } from 'react';
import { createTask, getAllCategories } from '../utils/ApiFunctions';


const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    description: '',
    details: '',
    price: '',
    completionDate: '',
    categoryId: '',
    clientId: '', // Client will be from the logged-in user
    country: '',
    city: '',
    district: '',
    street: '',
    house: '',
  });

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token'); // Get token from localStorage
  const clientId = localStorage.getItem('userId'); // Assuming clientId is the logged-in user's ID

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
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const taskPayload = {
        ...taskData,
        clientId, // Include the clientId (logged-in user)
        price: parseFloat(taskData.price), // Ensure price is a number
      };

      console.log('Task Payload:', taskPayload);

      // Send request to create a task
      const response = await createTask(taskPayload, token);
      alert('Task created successfully: ' + response);

      // Reset form fields
      setTaskData({
        description: '',
        details: '',
        price: '',
        completionDate: '',
        categoryId: '',
        clientId: '',
        country: '',
        city: '',
        district: '',
        street: '',
        house: '',
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
            name="country"
            value={taskData.country}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={taskData.city}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          District:
          <input
            type="text"
            name="district"
            value={taskData.district}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={taskData.street}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          House:
          <input
            type="text"
            name="house"
            value={taskData.house}
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