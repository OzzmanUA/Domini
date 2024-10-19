import React from 'react';
import './top_main_auth_style.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Импорт изображений
import topIcon from './images/top_icon.png';
import controlLeft from './images/Control_left.png';
import controlRight from './images/Controle_right.png';
import obslugTech from './images/obslug_tech.png';
import remontMebl from './images/remont_mebl.png';
import genClean from './images/gen_clean.png';
import masterNaGod from './images/master_na_god.png';
import bannerBg from './images/top_bg.png';
import { getPrivateInformation } from '../../utils/ApiFunctions';


const TopMainAuth = () => {
  const [nickname, setNickname] = useState(''); // Store user's name
  const [avatarUrl, setAvatarUrl] = useState(''); // Store user's avatar URL
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch private information when component mounts
  useEffect(() => {
    const fetchPrivateInfo = async () => {
      try {
        const data = await getPrivateInformation(token); // Fetch private info
        setNickname(`${data.firstName} ${data.lastName}`); // Set nickname
        setAvatarUrl(data.avatar_url || ''); // Set avatar URL
      } catch (error) {
        console.error('Error fetching private information:', error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    fetchPrivateInfo(); // Call the fetch function
  }, [token]);

  const scrollToLeft = () => {
    const scrollContainer = document.querySelector('.services-scroll');
    scrollContainer.scrollBy({
      left: -375,
      behavior: 'smooth',
    });
  };

  const scrollToRight = () => {
    const scrollContainer = document.querySelector('.services-scroll');
    scrollContainer.scrollBy({
      left: 375,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message
  }

  return (
    <div>
      {/* Banner */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerBg})` }} // Use imported image
      >
        <h1>Ласкаво просимо до Domini, {nickname}</h1>
        {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="user-avatar" />}
        <div className="recommendation">
          <div className="recommendation-text">
            <p className="recom_p">РЕКОМЕНДАЦІЇ ДЛЯ ВАС</p>
            <div className="recommendation-details">
              <img src={topIcon} alt="icon" />
              <div className="rec_text">
                <p className="searche_spec">Знаходьте спеціалістів</p>
                <p className="make_zamov">
                  Створюйте замовлення та отримуйте індивідуальні пропозиції.
                </p>
              </div>
            </div>
          </div>
          <Link to="/orderP"><button className="order-button">Створити замовлення</button></Link>
        </div>
      </div>

      {/* Services */}
      <div className="services-container">
        <h2>Популярні сервіси</h2>
        <div className="services-wrapper">
          <img
            src={controlLeft}
            className="scroll-left"
            alt="Left"
            onClick={scrollToLeft}
          />
          <div className="services-scroll">
            <div className="service-item">
              <img src={obslugTech} alt="Сервис 1" />
              <p>Обслуговування техніки</p>
            </div>
            <div className="service-item">
              <img src={remontMebl} alt="Сервис 2" />
              <p>Ремонт меблів</p>
            </div>
            <div className="service-item">
              <img src={genClean} alt="Сервис 3" />
              <p>Генеральне прибирання</p>
            </div>
            <div className="service-item">
              <img src={masterNaGod} alt="Сервис 4" />
              <p>Майстер на годину</p>
            </div>
            {/* Additional items */}
            <div className="service-item">
              <img src={obslugTech} alt="Сервис 1" />
              <p>Обслуговування техніки</p>
            </div>
            <div className="service-item">
              <img src={remontMebl} alt="Сервис 2" />
              <p>Ремонт меблів</p>
            </div>
            <div className="service-item">
              <img src={genClean} alt="Сервис 3" />
              <p>Генеральне прибирання</p>
            </div>
            <div className="service-item">
              <img src={masterNaGod} alt="Сервис 4" />
              <p>Майстер на годину</p>
            </div>
          </div>
          <img
            src={controlRight}
            className="scroll-right"
            alt="Right"
            onClick={scrollToRight}
          />
        </div>
      </div>
    </div>
  );
};

export default TopMainAuth;