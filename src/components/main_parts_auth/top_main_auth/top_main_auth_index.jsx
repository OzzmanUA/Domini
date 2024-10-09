import React from 'react';
import './top_main_auth_style.css';
import { Link } from 'react-router-dom';
// Импорт изображений
import topIcon from './images/top_icon.png';
import controlLeft from './images/Control_left.png';
import controlRight from './images/Controle_right.png';
import obslugTech from './images/obslug_tech.png';
import remontMebl from './images/remont_mebl.png';
import genClean from './images/gen_clean.png';
import masterNaGod from './images/master_na_god.png';
import bannerBg from './images/top_bg.png';

const TopMainAuth = ({ nickname = 'Nikita' }) => {
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

  return (
    <div>
      {/* Баннер */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerBg})` }} // Используем импортированное изображение
      >
        <h1>Ласкаво просимо до Domini, {nickname}</h1>
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

      {/* Сервисы */}
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
            {/* Дополнительные элементы */}
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
