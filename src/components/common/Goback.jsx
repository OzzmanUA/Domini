

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import backArrow from '../images/strelka_back.png'; // Ensure this path is correct

    const BackLink = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook
  
    // Function to handle going back
    const handleBackClick = () => {
      navigate(-1); // This will navigate to the previous page in history
    };
    return (
        <div className="back-link" onClick={handleBackClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={backArrow} alt="Back" />
          <span>Назад</span>
        </div>
      );
    };

export default BackLink;