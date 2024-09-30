
import './top_none_auth_style.css';

import bgHeaderMain from './images/bg_main.png'; // Импорт фона
import cleanerHeaderMain from './images/cleaner_header_main.png';
import domMaster from './images/dom_master.png';
import remTech from './images/rem_tech.png';
import ozdobRob from './images/ozdob_rob.png';
import bydRob from './images/byd_rob.png';
import mebleRob from './images/meble_rob.png';
import klonPosl from './images/klon_posl.png';
import transpSkladPosl from './images/transpSklad_posl.png';
import pobPosl from './images/pob_posl.png';

const TopNoneAuth = () => {
  const headerStyle = {
    backgroundImage: `url(${bgHeaderMain})`,
  };

  return (
    <div>
      <header style={headerStyle}>
        <div className="header-content">
          <div className="left_part_header">
            <h1>Онлайн-сервіс пошуку майстрів для дому</h1>
            <div className="buttons">
              <button className="order-btn">Створити замовлення</button>
              <button className="freelancer-btn">Стати фрілансером</button>
            </div>
          </div>
          <div className="header-image">
            <img src={cleanerHeaderMain} alt="Помічник дому" />
          </div>
        </div>
      </header>

      <main>
        <section className="popular-services">
          <div className="service-categories">
            <div className="category">
              <a href="#">
                <img src={domMaster} alt="Домашній майстер" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={remTech} alt="Ремонт техніки" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={ozdobRob} alt="Оздоблювальні роботи" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={bydRob} alt="Будівельні роботи" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={mebleRob} alt="Меблеві роботи" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={klonPosl} alt="Клінінг" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={transpSkladPosl} alt="Транспортні послуги" />
              </a>
            </div>
            <div className="category">
              <a href="#">
                <img src={pobPosl} alt="Послуги побуту" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopNoneAuth;
