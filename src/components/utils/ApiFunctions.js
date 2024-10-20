import axios from "axios"
import {jwtDecode} from "jwt-decode"

export const api = axios.create({
	baseURL: "http://localhost:8080"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* This function registers a new user */
export async function registerUser(registration) {
	try {
		console.log(registration)
		const response = await api.post("/auth/signup", registration)
		
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/signin", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
// export async function getUserProfile(userId, token) {
// 	try {
// 		const response = await api.get(`users/profile/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		throw error
// 	}
// }

// /* This isthe function to delete a user */
// export async function deleteUser(userId) {
// 	try {
// 		const response = await api.delete(`/users/delete/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		return error.message
// 	}
// }

// /* This is the function to get a single user */
// export async function getUser(userId, token) {
// 	try {
// 		const response = await api.get(`/users/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		throw error
// 	}
// }

// export async function updateCat(catId, catData) {
// 	const formData = new FormData()
// 	formData.append("name", catData.catName)
// 	// formData.append("roomPrice", catData.roomPrice)
// 	formData.append("photo_id", catData.photo_id)
// 	const response = await api.put(`/rooms/update/${roomId}`, formData,{
// 		headers: getHeader()
// 	})
// 	return response
// }

// export async function deleteCat(roomId) {
// 	try {
// 		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
// 			headers: getHeader()
// 		})
// 		return result.data
// 	} catch (error) {
// 		throw new Error(`Error deleting room ${error.message}`)
// 	}
// }

//------------------------------------------------------------------


// export async function getAllCats() {
// 	try {
// 		const result = await api.get("/category/categories")
// 		return result.data		
// 	} catch (error) {
// 		console.error('Error fetching categories:', error);
// 		throw new Error("Error fetching categories")
// 	}
// }

//------------------------------------------------------------------

export async function getAllCategories() {
	try {
	  const response = await api.get("/category/all-categories");
	  const categories = response.data;
	  console.log(categories)
	  return categories;
 		// Assuming the response is an array of categories
	} catch (error) {
	  console.error('Error fetching categories:', error);
	}
  };

export async function getAllParentCategories() {
	try {
	  const response = await api.get("/category/categories");
	  const categories = response.data;
	  console.log(categories)
	  return categories;
 		// Assuming the response is an array of categories
	} catch (error) {
	  console.error('Error fetching categories:', error);
	}
  };


//   export const getPrivateInformation = async (userId, token) => {
// 	try {
// 	  // Add custom headers, including authorization token if needed

// 	  const response = await api.get(`/private-information/${userId}`, {
// 		headers: {
// 		  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
// 		  'Custom-Header': 'customHeaderValue', // Example of adding another custom header
// 		},
// 	  });
  
// 	  // Check if the response is valid and has data
// 	  if (response && response.data) {
// 		return response.data;
// 	  } else {
// 		throw new Error('No data found');
// 	  }
// 	} catch (error) {
// 	  // Better error handling with message
// 	  console.error("Error fetching private information:", error.message || error);
// 	  throw error; // Rethrow error to handle it in the calling function
// 	}
//   };

// export const getPrivateInformation = async (token) => {
// 	try {
// 	  // Decode JWT token to get the userId
// 	  const decodedToken = jwtDecode(token);
// 	  const userId = decodedToken.userId; // Assuming `userId` is in the token payload
  
// 	  if (!userId) {
// 		throw new Error('User ID not found in token');
// 	  }
  
// 	  // Make the API call
// 	  const response = await api.get(`/private-information/${userId}`, {
// 		headers: {
// 		  Authorization: `Bearer ${token}`,
// 		},
// 	  });
  
// 	  return response.data;
// 	} catch (error) {
// 	  console.error("Error fetching private information:", error.message || error);
// 	  throw error;
// 	}
//   };
// export const getPrivateInformationByUsername = async (username, token) => {
// 	try {
// 	  // Make a GET request to the backend API
// 	  const response = await api.get(`/private-information/by-username`, {
// 		params: { username }, // Pass username as a query parameter
// 		headers: {
// 		  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
// 		},
// 	  });
  
// 	  // Check if the response has data
// 	  if (response && response.data) {
// 		return response.data; // Return the private information DTO
// 	  } else {
// 		throw new Error('No data found');
// 	  }
// 	} catch (error) {
// 	  console.error('Error fetching private information by username:', error.message || error);
// 	  throw error; // Rethrow the error to handle it in the calling function
// 	}
//   };

export const getPrivateInformation = async (token) => {
	try {
	  // Sending GET request to the server, including the token in the Authorization header
	  const response = await api.get(`/private-information`, {
		headers: {
		  Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
		},
	  });
  
	  // Check if the response has valid data
	  if (response && response.data) {
		console.log (response.data);
		return response.data; // Return the private information DTO from the response
		
	  } else {
		throw new Error('No data found');
	  }
	} catch (error) {
	  console.error('Error fetching private information:', error.message || error);
	  throw error; // Rethrow error to handle it in the calling function
	}
  };


export const updatePrivateInformation = async (privateInfoDTO, token) => {
	try {
	  const response = await api.put(`/private-information`, privateInfoDTO, {
		headers: {
		  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		},
	  });
  
	  if (response.status === 204) {
		return true; // Success, no content returned
	  } else {
		throw new Error('Failed to update private information');
	  }
	} catch (error) {
	  console.error('Error updating private information:', error.message || error);
	  throw error;
	}
  };
  
  // Function to add a photo to the user's portfolio
export const addPhoto = async (file, token) => {
	try {
	  const formData = new FormData();
	  formData.append('file', file);
  
	  const response = await api.post(`/private-information/portfolio`, formData, {
		headers: {
		  Authorization: `Bearer ${token}`,
		  'Content-Type': 'multipart/form-data',
		},
	  });
  
	  return response.data; // Response message
	} catch (error) {
	  console.error('Error uploading photo:', error.message || error);
	  throw error;
	}
  };
  
  // Function to remove a photo from the user's portfolio
export const removePhoto = async (photoId, token) => {
	try {
	  const response = await api.delete(`/private-information/portfolio/${photoId}`, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });
  
	  return response.data; // Response message
	} catch (error) {
	  console.error('Error removing photo:', error.message || error);
	  throw error;
	}
  };

  export const uploadAvatar = async (file, token) => {
	const formData = new FormData();
	formData.append('file', file); // Attach the selected file
  
	try {
	  const response = await api.post('/avatar', formData, {
		headers: {
		  'Content-Type': 'multipart/form-data',
		  Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
		},
	  });
	  if (response.status === 204) {
		return 'Avatar updated successfully'; // Success response
	  }
	} catch (error) {
	  console.error('Error uploading avatar:', error.message || error);
	  throw error;
	}
  };




  export const createTask = async (taskData, token) => {
	try {
	  const response = await api.post(`/task/create`, taskData, {
		headers: {
		  Authorization: `Bearer ${token}`, // Add the token in the header
		},
	  });
	  return response.data;  // Success response
	} catch (error) {
	  if (error.response) {
		throw new Error(error.response.data);  // Throw backend error
	  } else {
		throw new Error('Failed to create task. Please try again.');
	  }
	}
  };

  export const createTaskForWorker = async (taskCreateDTO, workerId) => {
	try {
	  // Make the POST request to the backend API
	  const response = await api.post(
		`/task/create-for-worker`, 
		taskCreateDTO, 
		{ params: { workerId } }  // Pass the workerId as a query parameter
	  );
	  
	  // Return the response or success message
	  return response.data;
	} catch (error) {
	  // Handle errors and return the error message
	  console.error('Error creating task for worker:', error.response || error);
	  return error.response ? error.response.data : 'An error occurred';
	}
  };

  export const acceptTask = async (taskId, workerId, token) => {
	try {
	  const response = await api.post(`/task/${taskId}/accept`, null, {
		params: { workerId }, // Add workerId as a query parameter
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });
	  return response.data;  // Success response
	} catch (error) {
	  if (error.response) {
		throw new Error(error.response.data);  // Throw backend error
	  } else {
		throw new Error('Failed to accept task. Please try again.');
	  }
	}
  };

  
export const updateTask = async (taskId, updatedTaskData, token) => {
	try {
	  const response = await api.put(`/task/${taskId}`, updatedTaskData, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });
	  return response.data;  // Success response
	} catch (error) {
	  if (error.response) {
		throw new Error(error.response.data);  // Throw backend error
	  } else {
		throw new Error('Failed to update task. Please try again.');
	  }
	}
  };

  export const deleteTask = async (taskId, token) => {
	try {
	  const response = await api.delete(`/task/${taskId}`, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });
	  return response.data;  // Success response
	} catch (error) {
	  if (error.response) {
		throw new Error(error.response.data);  // Throw backend error
	  } else {
		throw new Error('Failed to delete task. Please try again.');
	  }
	}
  };
//   export const getWorkersByCategory = async (categoryId, filters = {}) => {
// 	try {
// 	  const { minPrice, maxPrice, skillLevel, country, city } = filters;
// 	  const response = await api.get(`/category/${categoryId}/workers/filter`, {
// 		params: { minPrice, maxPrice, skillLevel, country, city },
// 	  });
// 	  return response.data; // Assuming the API returns a list of WorkerInfoDTO
// 	} catch (error) {
// 	  console.error("Error fetching workers:", error);
// 	  return [];
// 	}
//   };
// 	export const getWorkersByCategory = async (categoryId) => {
// 	try {	  
// 	  const response = await api.get(`/category/${categoryId}/workers`);
// 	  return response.data; // Assuming the API returns a list of WorkerInfoDTO
// 	} catch (error) {
// 	  console.error("Error fetching workers:", error);
// 	  return [];
// 	}
//   };
export const getWorkersByCategory = async (categoryId, filters = {}) => {
    try {
        let query = `/category/${categoryId}/workers`;
        const queryParams = [];

        // Construct the query parameters based on the provided filters
        if (filters.minPrice) {
            queryParams.push(`minPrice=${filters.minPrice}`);
        }
        if (filters.maxPrice) {
            queryParams.push(`maxPrice=${filters.maxPrice}`);
        }
        if (filters.skillLevel) {
            queryParams.push(`skillLevel=${filters.skillLevel}`);
        }
        if (filters.city) {
            queryParams.push(`city=${filters.city}`);
        }

        // If there are any query parameters, append them to the query
        if (queryParams.length > 0) {
            query += `/filter?${queryParams.join('&')}`;
        }
		console.log(filters)

        const response = await api.get(query);
        return response.data; // Assuming the API returns a list of WorkerInfoDTO
    } catch (error) {
        console.error("Error fetching workers:", error);
        return [];
    }
};

export const getTasksByCategory = async (categoryId, filters = {}) => {
	try {
	  // Construct query parameters based on provided filters
	  const params = {};
	  if (filters.minPrice) params.minPrice = filters.minPrice;
	  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
	  if (filters.country) params.country = filters.country;
	  if (filters.city) params.city = filters.city;
  
	  // Make the API request to fetch tasks in the given category
	  const response = await api.get(`/category/${categoryId}/tasks`, { params });
  
	  // Return the list of tasks
	  return response.data;
	} catch (error) {
	  console.error('Error fetching tasks:', error);
	  throw error;
	}
  };

  export const fetchWorkerDetailedInfo = async (userId) => {
	try {
	  const response = await api.get(`/category/workers/${userId}`);
	  return response.data;
	} catch (error) {
	  console.error("Error fetching worker data:", error);
	  throw error;
	}
  };


  export const sendMessage = async (recipientId, content, token) => {
	try {
	  const response = await api.post(
		'/messages/send',
		new FormData(), // You can append files to this form data if needed
		{
		  headers: {
			'Authorization': `Bearer ${token}`,
		  },
		  params: {
			recipientId,
			content,
		  },
		}
	  );
	  return response.data; // Message object returned
	} catch (error) {
	  console.error('Error sending message:', error);
	  throw error;
	}
  };
  
  // Fetch the conversation between the current user and another user
  export const getConversation = async (otherUserId, token) => {
	try {
	  const response = await api.get(
		`/messages/conversation`,
		{
		  headers: {
			'Authorization': `Bearer ${token}`,
		  },
		  params: { otherUserId },
		}
	  );
	  return response.data; // List of messages in the conversation
	} catch (error) {
	  console.error('Error fetching conversation:', error);
	  throw error;
	}
  };
  
  // Fetch the list of conversations for the current user
  export const getConversations = async (token) => {
	try {
	  const response = await api.get('/messages/conversations', {
		headers: {
		  'Authorization': `Bearer ${token}`,
		},
	  });
	  return response.data; // List of conversations
	} catch (error) {
	  console.error('Error fetching conversations:', error);
	  throw error;
	}
  };