import React, { useState, useEffect } from 'react';
import { getPrivateInformation } from '../utils/ApiFunctions';
import ProfileCard from './profileCard';
import { useAuth } from '../auth/AuthProvider';

const ProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const profileData = await getPrivateInformation(userId); // Fetch profile data
        setProfile({
          image: "http://localhost:8080/path-to-image", // Change to the actual image path
          name: `${profileData.firstName} ${profileData.lastName}`,
          category: profileData.skills.join(', '), // Assuming category could be derived from skills
          location: "Sample Location", // Add location if it's available in the DTO
          price: "500 грн/год", // Hardcoded for now, update based on actual data
          feedback: "4.5/5", // Placeholder, can be added dynamically
          projects: "20", // Hardcoded, update with actual project count
          services: profileData.skills, // Assuming skills are services
          description: profileData.about, // Assuming 'about' field is the description
        });
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return profile ? <ProfileCard profile={profile} /> : <div>No profile data available</div>;
};

export default ProfilePage;