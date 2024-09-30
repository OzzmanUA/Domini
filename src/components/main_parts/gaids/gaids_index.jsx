import React from "react";

import './gaids_style.css';

import gayd1 from './images/Gayd_1.png';
import gayd2 from './images/Gayd_2.png';
import gayd3 from './images/Gayd_3.png';
import gayd4 from './images/Gayd_4.png';
import gayd5 from './images/Gayd_5.png';
import gayd6 from './images/Gayd_6.png';
import leftBtnImg from './images/Control_left.png';
import rightBtnImg from './images/Controle_right.png';

const UsefulGuides = () => {
  const handleScroll = (direction) => {
    const scrollContainer = document.querySelector('.container-gayds');
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += direction === "right" ? 520 : -520;
  };

  return (
    <div>
      <h2 className="h2-gayds">Корисні гайди для вас</h2>
      <div className="controls">
        <img src={leftBtnImg} alt="left" id="leftBtn" onClick={() => handleScroll("left")} />
        <div className="container-gayds">
          <section className="useful-guides">
            <div className="gayd">
              <img src={gayd1} alt="Гайд 1" />
              <p>Як швидко позбутися пилу та алергенів у домі</p>
            </div>
            <div className="gayd">
              <img src={gayd2} alt="Гайд 2" />
              <p>Гармонія кольорів: як обрати правильну палітру для кожної кімнати</p>
            </div>
            <div className="gayd">
              <img src={gayd3} alt="Гайд 3" />
              <p>Як зробити прибирання легким і приємним: лайфхаки для кожного</p>
            </div>
          </section>
          <section className="useful-guides">
            <div className="gayd">
              <img src={gayd4} alt="Гайд 4" />
              <p>Поради для прибирання кухні: як підтримувати чистоту та гігієну</p>
            </div>
            <div className="gayd">
              <img src={gayd5} alt="Гайд 5" />
              <p>Як зробити ванну кімнату бездоганно чистою: прості поради</p>
            </div>
            <div className="gayd">
              <img src={gayd6} alt="Гайд 6" />
              <p>Чисті вікна і дзеркала без розводів: прості поради</p>
            </div>
          </section>
        </div>
        <img src={rightBtnImg} alt="right" id="rightBtn" onClick={() => handleScroll("right")} />
      </div>
    </div>
  );
}

export default UsefulGuides;
