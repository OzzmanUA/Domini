import './Footer_style.css';

import instagramIcon from './images/instagram.png';
import facebookIcon from './images/facebook.png';
import telegramIcon from './images/telegram.png';
import linkedInIcon from './images/linkedIn.png';

const Footer = () => {
  
  return (
    <div className='all_footer'>
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Як це працює</h3>
          <ul>
            <li><a href="#">Як замовити послугу</a></li>
            <li><a href="#">Робота в Україні</a></li>
            <li><a href="#">Переваги для компаній</a></li>
            <li><a href="#">Як зареєструватися ФОП</a></li>
            <li><a href="#">Гарантія та безпека</a></li>
            <li><a href="#">Останні відгуки</a></li>
            <li><a href="#">Топ виконавців</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Про нас</h3>
          <ul>
            <li><a href="#">Про проект domini</a></li>
            <li><a href="#">Контакти</a></li>
            <li><a href="#">Мобільний застосунок</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Постійна робота</h3>
          <ul>
            <li><a href="#">Усі вакансії</a> <span className="new-badge">NEW</span></li>
            <li><a href="#">Віддалена робота</a></li>
            <li><a href="#">Про вакансії</a></li>
            <li><a href="#">Опублікувати вакансію</a></li>
            <li><a href="#">Список шукачів</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Корисна інформація</h3>
          <ul>
            <li><a href="#">Блог</a></li>
            <li><a href="#">Ідеї та пропозиції</a></li>
            <li><a href="#">Статистика цін</a></li>
            <li><a href="#">Партнери та акції</a></li>
            <li><a href="#">Реєстрація ФОП</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Зроблено в Україні © 2005-2024</p>
        <p className="regulamin">
          <a href="#">Правила сервісу</a> | <a href="#">Конфіденційність</a>
        </p>
        <div className="social-icons">
          <p className="subscribe">Підписуйтесь</p>
          <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fexplore%2Fpeople%2F%3F__coig_login%3D1">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://pl-pl.facebook.com/login/?next=https%3A%2F%2Fpl-pl.facebook.com%2F">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://web.telegram.org/k/">
            <img src={telegramIcon} alt="Telegram" />
          </a>
          <a href="https://www.linkedin.com/signup?_l=pl">
            <img src={linkedInIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
