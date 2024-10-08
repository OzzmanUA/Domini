import React from 'react';
import { Link } from 'react-router-dom';
import user_demo from '../header/images/user_demo.png';
import Profile from '../../pages/Profile';

const UserProfileLink = () => {
  return (
    <Link to="/profile" className="demo_user">
      <img src={user_demo} alt="User Demo" />
    </Link>
  );
};

export default UserProfileLink;