import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pop_services_style.css';

import prybKwarImg from './images/pryb_kwar.png';
import ustanTechImg from './images/ustan_tech.png';
import perewezTechImg from './images/perewez_tech.png';
import kompDomogaImg from './images/komp_dopomoga.png';
import remontKwartImg from './images/remont_kwart.png';
import controlLeftImg from './images/Controle_left.png';
import controlRightImg from './images/Controle_right.png';

import { initScroll } from '../js_scripts/pop_services'; // Импорт функции прокрутки

const PopServices = () => {
    useEffect(() => {
      initScroll();
    }, []);
  
    return (
      <div className='pop_services_all'>
        <h2 className="pop_services">Популярні сервіси</h2>
        <div className="container_pop" style={{ position: 'relative' }}>
          <div className="scroll-container">            
            <div className="item green">
            <h3>Прибирання квартир</h3>
              <img src={prybKwarImg} alt="Cleaning" />
            </div>
            <div className="item blue">
              <h3>Установка побутової техніки</h3>
              <img src={ustanTechImg} alt="Installation" />
            </div>
            <div className="item red">
              <h3>Перевезення меблів і техніки</h3>
              <img src={perewezTechImg} alt="Moving" />
            </div>
            <div className="item yellow">
              <h3>Комп'ютерна допомога</h3>
              <img src={kompDomogaImg} alt="Computer help" />
            </div>
            <div className="item darkblue">
              <h3>Ремонт квартир</h3>
              <img src={remontKwartImg} alt="Renovation" />
            </div>
            <div className="item green">
              <h3>Прибирання квартир</h3>
              <img src={prybKwarImg} alt="Cleaning" />
            </div>
            <div className="item blue">
              <h3>Установка побутової техніки</h3>
              <img src={ustanTechImg} alt="Installation" />
            </div>
            <div className="item red">
              <h3>Перевезення меблів і техніки</h3>
              <img src={perewezTechImg} alt="Moving" />
            </div>
            <div className="item yellow">
              <h3>Комп'ютерна допомога</h3>
              <img src={kompDomogaImg} alt="Computer help" />
            </div>
            <div className="item darkblue">
              <h3>Ремонт квартир</h3>
              <img src={remontKwartImg} alt="Renovation" />
            </div>
          </div>
          <button className="scroll-btn left" id="scrollLeft">
            <img src={controlLeftImg} alt="Scroll Left" />
          </button>
          <button className="scroll-btn right" id="scrollRight">
            <img src={controlRightImg} alt="Scroll Right" />
          </button>
        </div>
      </div>
    );
  };
  
  export default PopServices;