import './Header_style.css';
import { Link } from 'react-router-dom';

import logo from './images/logo.png';
import ukrLang from './images/ukr_lang.png';
import entry from './images/entry.png';
import NavMenu from '../main_parts_auth/categories/navmenu';

const Header = () => {
  return (
    <div className='all_header'>
    <div className="navbar">
      <a href="#" className="logo">
        <img src={logo} alt="Domini Logo" />
      </a>
      <div className="search-bar">
        <input type="text" placeholder="Шукайте будь-яку послугу..." />
      </div>
      <div className="nav-links">
        <a href="#" className="lang">
          <img src={ukrLang} alt="ukr_lang" />
        </a>
        <a href="/login" className="entry">
          <img src={entry} alt="entry" />
        </a>
        <Link to="/register"><button className="regist-btn">Реєстрація</button></Link>
      </div>
    </div>
          <div className="nav-container">
            <NavMenu />
          {/* <ul className="nav-menu">
              <li><a href="#">Домашній майстер</a></li>
              <li><a href="#">Ремонт техніки</a></li>
              <li><a href="#">Оздоблювальні роботи</a></li>
              <li><a href="#">Будівельні роботи</a></li>
              <li><a href="#">Меблеві роботи</a></li>
              <li><a href="#">Клінінгові послуги</a></li>
              <li><a href="#">Транспортні та складські послуги</a></li>
              <li><a href="#">Побутові послуги</a></li>
          </ul> */}
      </div>
      </div>
  );
};


export default Header;
