// import React, { useState, useEffect } from 'react';
// import { getPrivateInformation } from '../utils/ApiFunctions';
// import ProfileCard from './profileCard';
// import { useAuth } from '../auth/AuthProvider';

// const ProfilePage = () => {
//   const { user } = useAuth(); // Assuming you're getting the token from the AuthProvider context
//   const [profile, setProfile] = useState(null); // State to hold profile data
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const [error, setError] = useState(null); // State to handle errors

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (user && user.token) {
//           const profileData = await getPrivateInformation(user.token); // Fetch profile data with token
//           setProfile({
//             image: "http://localhost:8080/path-to-image", // Replace with actual image path if available
//             name: `${profileData.firstName} ${profileData.lastName}`, // Combining first and last name
//             category: profileData.skills?.join(', ') || 'No skills provided', // Deriving category from skills
//             location: profileData.location || 'Location not available', // Placeholder for location if available
//             price: "500 грн/год", // Hardcoded price for now, replace if available in DTO
//             feedback: "4.5/5", // Placeholder feedback, update with actual data if available
//             projects: "20", // Placeholder, replace with actual project count
//             services: profileData.skills || [], // Assuming skills are considered services
//             description: profileData.about || 'No description provided', // Description or about field
//           });
//         }
//       } catch (error) {
//         setError('Failed to load profile'); // Set error message if fetching fails
//       } finally {
//         setLoading(false); // End loading state
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading message while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if something goes wrong
//   }

//   return profile ? <ProfileCard profile={profile} /> : <div>No profile data available</div>;
// };

// export default ProfilePage;


// import React, { useState, useEffect } from 'react';
// import { getPrivateInformation } from '../utils/ApiFunctions';
// import ProfileCard from './profileCard';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null); // State to hold profile data
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const [error, setError] = useState(null); // State to handle errors

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Access token from localStorage
//         if (token) {
//           const profileData = await getPrivateInformation(token); // Fetch profile data using token
//           setProfile({
//             image: "http://localhost:8080/path-to-image", // Change to the actual image path
//             name: `${profileData.firstName} ${profileData.lastName}`,
//             category: profileData.skills.join(', '), // Assuming category could be derived from skills
//             location: "Sample Location", // Add location if it's available in the DTO
//             price: "500 грн/год", // Hardcoded for now, update based on actual data
//             feedback: "4.5/5", // Placeholder, can be added dynamically
//             projects: "20", // Hardcoded, update with actual project count
//             services: profileData.skills, // Assuming skills are services
//             description: profileData.about, // Assuming 'about' field is the description
//           });
//         } else {
//           setError('User not logged in or token is missing');
//         }
//       } catch (error) {
//         setError('Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // No dependencies, only run once on mount

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading message while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if something goes wrong
//   }

//   return profile ? <ProfileCard profile={profile} /> : <div>No profile data available</div>;
// };

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import { getPrivateInformation } from '../utils/ApiFunctions';
import ProfileCard from './profileCard';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Access token from localStorage
        if (token) {
          const profileData = await getPrivateInformation(token); // Fetch profile data using token
          setProfile({
            image: "http://localhost:8080/path-to-image", // Update with actual image path
            name: `${profileData.firstName} ${profileData.lastName}`,
            category: profileData.skills, // skills is now a string
            location: "Sample Location", // Add location if it's available
            price: "500 грн/год", // Hardcoded for now, update based on actual data
            feedback: "4.5/5", // Placeholder, can be updated dynamically
            projects: "20", // Hardcoded, update with actual project count
            services: profileData.skills.split(', '), // Assuming skills are separated by commas
            description: profileData.about,
          });
        } else {
          setError('User not logged in or token is missing');
        }
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // No dependencies, only run once on mount

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return profile ? <ProfileCard profile={profile} /> : <div>No profile data available</div>;
};

export default ProfilePage;