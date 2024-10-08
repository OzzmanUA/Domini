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
export const getPrivateInformation = async (userId, token) => {
	try {
	  if (!userId) {
		throw new Error('User ID is not available');
	  }
  
	  const response = await api.get(`/private-information/${userId}`, {
		headers: {
		  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
		  'Custom-Header': 'customHeaderValue', // Example of adding another custom header
		},
	  });
  
	  // Check if the response is valid and has data
	  if (response && response.data) {
		return response.data;
	  } else {
		throw new Error('No data found');
	  }
	} catch (error) {
	  console.error("Error fetching private information:", error.message || error);
	  throw error; // Rethrow error to handle it in the calling function
	}
  };