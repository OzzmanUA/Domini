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


import React, { useState, useEffect } from 'react';
import { getPrivateInformation } from '../utils/ApiFunctions'; // Assuming ApiFunctions contains this method
import { useAuth } from '../auth/AuthProvider'; // Assuming AuthProvider provides access to user authentication data

const ProfilePage = () => {
  const { user } = useAuth(); // Assuming user contains a token
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const token = localStorage.getItem('token');

  console.log(token);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (user && token) {
          const profileData = await getPrivateInformation(token); // Fetch profile data using token
          setProfile(profileData); // Set profile data to state
        } else {
          setError('User not logged in or token is missing');
        }
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProfileData(); // Trigger the data fetching
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if occurs
  }

  if (!profile) {
    return <div>No profile data available</div>; // Display if no profile data is fetched
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="http://localhost:8080/path-to-image" alt={`${profile.firstName} ${profile.lastName}`} />
        <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
        <p>{profile.about || 'No description available'}</p>
      </div>
      <div className="profile-details">
        <h2>Skills</h2>
        <ul>
          {profile.skills && profile.skills.length > 0
            ? profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
            : 'No skills listed'}
        </ul>

        <h2>Experience</h2>
        <p>{profile.experienceYears || 'No experience information provided'} years</p>

        <h2>Education</h2>
        <p>{profile.education || 'No education details available'}</p>

        <h2>Languages</h2>
        <p>{profile.language || 'No language information available'}</p>
        
        <h2>Categories</h2>
        <ul>
          {profile.categories && profile.categories.length > 0
            ? profile.categories.map((category, index) => <li key={index}>{category}</li>)
            : 'No categories listed'}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;