import React, { useState } from 'react';

import avatarImage from './images/demo_user.png';
import locationIcon from './images/location_logo.png';
import joinDateIcon from './images/user_logo.png';
import countryImage from './images/country.png';
import plusLogo from './images/plus_logo.png';
import arrowIcon from './images/arrow.png';

import './customer-profile-for-the-performer-style.css';

const reviews = [
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Генеральне прибирання перевершило наші очікування! Квартира виглядала бездоганно: чисті вікна, блискучі підлоги, і жодного пилу. Команда працювала злагоджено, використовували якісні засоби, і були дуже уважними до деталей. Обов\'язково звернемося ще раз!'
  },
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Викликала сантехніка для ремонту змішувача, і залишився дуже задоволений. Майстер швидко приїхав, оперативно вирішив проблему, і навіть дав кілька корисних порад на майбутнє. Робота виконана якісно, все працює відмінно. Рекомендую цього майстра!'
  },
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Замовляв вантажні перевезення, і хоча в цілому все було виконано, залишився дещо незадоволена. Доставка зайняла більше часу, ніж очікувала, і кілька речей були трохи пошкоджені під час транспортування. Сервіс можна покращити, особливо в плані акуратності і дотримання термінів.'
  },
  {
    name: 'Анастасія О.',
    location: 'Україна',
    rating: '⭐⭐⭐⭐ 4.70',
    date: '3 місяці тому',
    review: 'Замовляли послугу кухаря для сімейного свята, і залишилися дуже задоволені. Страви були смачними, зі свіжих інгредієнтів, подача — на найвищому рівні. Кухар врахував усі наші побажання і дієтичні обмеження. Єдине, що хотілося б, — трохи швидшого обслуговування. Але в цілому, це був чудовий досвід!'
  }
];


const CustomerProfileForThePerformer = () => {

  const [generalInfoText, setGeneralInfoText] = useState(
    'Будь ласка, розкажіть нам про свої хобі, додатковий досвід або щось ще, що ви хотіли б додати.'
  );
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Обработчики кликов для переключения секций
  const toggleGeneralInfo = () => {
    setIsGeneralInfoOpen(!isGeneralInfoOpen);
  };

  const toggleOrders = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  return (
<div className="customer-all">
<div className="customer-profile-container">
    <div className="customer-profile-left">
      <div className="top">
          <div className="customer-profile-card">
          <div className="avatar">
            <img 
              src={avatarImage}
              alt="Avatar" 
            />
          </div>
          <h2 className="username">Анастасія О.</h2>
          <p className="handle">@Nastya_lis</p>
          <div className="info">
            <div className="info-item">
              <div className="location-user-info">
                <img src={locationIcon} alt="Location" className="icon"/>
                <p>Місцезнаходження</p>
              </div>
              <p>Київ, Україна</p>
            </div>
            <div className="info-item">
              <div className="location-user-info">
                <img src={joinDateIcon} alt="Join date" className="icon"/>
                <p>Долучилися</p>
              </div>
              <p>Липень, 2022</p>
            </div>
          </div>
        </div>




      </div>
      <div className="bottom">

      <div className="accordion-customer">
      {/* Загальна інформація */}
      <div className="section">
        <div className="section-header" onClick={toggleGeneralInfo}>
          <h3>Загальна інформація</h3>
          <img
            src={arrowIcon}
            alt="toggle icon"
            style={{ transform: isGeneralInfoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
        {isGeneralInfoOpen && (
          <div className="section-content" id="section-content-bg">
            {/* Ваш существующий контент */}
            <p>{generalInfoText}</p>
          </div>
        )}
      </div>

      {/* Мої замовлення */}
      <div className="section">
        <div className="section-header" onClick={toggleOrders}>
          <h3>Мої замовлення</h3>
          <img
            src={arrowIcon}
            alt="toggle icon"
            style={{ transform: isOrdersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
        {isOrdersOpen && (
          <div className="section-content">
            <div className="orders-items">
              <p className="orders-count">В роботі (5)</p>
              <p>Завершені (50)</p>
            </div>
          </div>
        )}
      </div>
    </div>


      </div>
    </div>
    <div className="customer-profile-middle"></div>
    <div className="customer-profile-right">
      <div className="review-list-custo">
        <h2>Відгуки</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <div className="review-item-top">
              <div className="review-avatar">
                <img src={avatarImage} alt="Avatar" />
              </div>
              <div className="review-content">
                <div className="review-header">
                  <h3>{review.name}</h3>
                  <span className="location"><img src={countryImage}/>{` ${review.location}`}</span>
                </div>
              </div>
              </div>
              <div className="review-rating">
                  <span>{review.rating}</span>
                  <span>|</span>
                  <span>{review.date}</span>
              </div>
              <p className="review-text">{review.review}</p>
            </li>
          ))}
        </ul>
      </div>



    </div>
</div>
</div>






  );
};

export default CustomerProfileForThePerformer;