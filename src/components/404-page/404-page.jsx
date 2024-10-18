import React, {} from 'react';
import './404-page-style.css';
import error_logo from './images/404_bg.png';


const Page404 = () => {
    return (
        <div className="error-block">
            <img src={error_logo}/>
            <h2>Вибачте, цю сторінку не знайдено</h2>
            <button>Повернутися на головну сторінку</button>
        </div>
    );
};

export default Page404;
