import React from 'react';
import './middle_main_auth_style.css';

import middleBg from './images/middle_bg.png';

const MiddleMainAuth = () => {
  return (
    <div 
      style={{ backgroundImage: `url(${middleBg})` }} 
      className="bg_middle_div"
    >
      <button className="learn-more-btn">Дізнатися більше</button>
    </div>
  );
}

export default MiddleMainAuth;
