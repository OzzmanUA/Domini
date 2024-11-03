import React, {} from 'react';
import './404-page-style.css';
import error_logo from './images/404_bg.png';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate(`/`);  // Navigate to create-task-for-worker page with workerId
      };
    return (
        <div className="error-block">
            <img src={error_logo}/>
            <h2>Вибачте, цю сторінку не знайдено</h2>
            <button onClick={handleHomeClick}>Повернутися на головну сторінку</button>
        </div>
    );
};

export default Page404;
