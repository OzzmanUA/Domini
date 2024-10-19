import React, { useState } from 'react';
import { uploadAvatar } from '../utils/ApiFunctions';

const AvatarUploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    try {
        
      const responseMessage = await uploadAvatar(file, token); // Call the function to upload the avatar
      console.log(responseMessage)
      setMessage(responseMessage); // Set the success message
    } catch (error) {
      setMessage('Failed to upload avatar. Please try again.'); // Handle the error
    }
  };

  return (
    <div>
      <h1>Upload or Change Avatar</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Avatar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AvatarUploadPage;