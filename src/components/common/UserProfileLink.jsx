
import { Link } from 'react-router-dom';
import user_demo from '../header/images/user_demo.png';
import Profile from '../../pages/Profile';

import React, { useEffect, useState } from 'react';
import { getPrivateInformation } from '../utils/ApiFunctions';


const UserProfileLink = () => {
  const [avatarUrl, setAvatarUrl] = useState(null); // State to hold the avatar URL
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  useEffect(() => {
    const fetchPrivateInfo = async () => {
      try {
        const data = await getPrivateInformation(token); // Fetch the user's private information
        if (data && data.avatar_url) {
          setAvatarUrl(data.avatar_url); // Set the avatar URL in state
        }
      } catch (error) {
        console.error('Error fetching private information:', error);
      }
    };

    fetchPrivateInfo(); // Call the fetch function
  }, [token]);

  return (
    <Link to="/private-information" className="demo_user">
      {/* Show the user profile picture or a placeholder */}
      <img src={avatarUrl || user_demo} alt="user_demo" className="user-avatar" />
    </Link>
  );
};

export default UserProfileLink;
// const UserProfileLink = () => {
//   return (
//     <Link to="/private-information" className="demo_user">
//       <img src={user_demo} alt="User Demo" />
//     </Link>
//   );
// };

// export default UserProfileLink;