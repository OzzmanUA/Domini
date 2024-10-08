import { useAuth } from "./AuthProvider";

const usePrivateInformation = () => {
  const { userId } = useAuth(); // Access userId from AuthContext

  const getPrivateInformation = async (token) => {
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

  return getPrivateInformation;
};