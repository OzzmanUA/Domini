import React, { useState } from 'react';
import './style.css'; // Подключаем CSS файл

export default function PerformerProfile() {
  // Логика аккордеона
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Массив отзывов
  const reviews = [
    {
      title: "Потрібна нова оббивка для дивану",
      rating: "⭐⭐⭐⭐ 4.70",
      date: "29 травня 2024 – 21 червня 2024",
      content: "Замовляли нову оббивку для нашого старого дивану, і результат перевершив усі наші очікування! Майстер допоміг обрати ідеальну тканину, яка не тільки пасує до інтер'єру, але і надзвичайно приємна на дотик."
    },
    // Добавьте другие отзывы сюда
  ];

  return (
    <div>
      {/* Блок информации о пользователе */}
      <div className="user-parts">
        <div className="user-part-left">
          <img className="user-img" src="./images/demo_user.png" alt="User" />
          <div className="user-information">
            <h1>Софія Б.</h1>
            <div className="map">
              <img src="./images/map.png" alt="Map" />
              <p>Київ, Україна</p>
            </div>
          </div>
        </div>
        <div className="user-part-right">
          <div className="user-rating">
            <img src="./images/star.png" alt="Star" />
            <p>4,8 | 1,1к відгуків</p>
          </div>
          <div className="user-buttons">
            <button className="send_user-btn">
              <img src="./images/fly_icone_send.png" alt="Send" />
              Написати виконавцю
            </button>
            <button className="make_work-btn">Запропонувати роботу</button>
          </div>
        </div>
      </div>

      {/* Блок информации о работе пользователя */}
      <div className="information-parts">
        <div className="info-part-left">
          <div className="user-work-info-top">
            <div className="info_top_item">
              <h2>₴60К+</h2>
              <p>Загальний дохід</p>
            </div>
            <div className="info_top_item">
              <h2>20</h2>
              <p>Кількість проектів</p>
            </div>
            <div className="info_top_item">
              <h2>320</h2>
              <p>Кількість годин</p>
            </div>
          </div>
          <div className="user-work-info-bottom">
            <div className="info_bottom_item">
              <img src="./images/zadowolenia.png" alt="Задоволеність" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Задоволених клієнтів</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src="./images/vidgyku.png" alt="Відгуки" />
              <div className="bottom-item-describe">
                <h2>215</h2>
                <p>Позитивних відгуків</p>
              </div>
            </div>
            {/* Остальные элементы аналогично */}
          </div>
        </div>
        <div className="info-margin-part-middle"></div>
        <div className="info-part-right">
          <div className="user-categories">
            <div className="categ_left">
              <h2>
                Меблеві роботи: Швачка м’яких меблів | Перетяжка меблів |
                Реставрація меблів | Хімчистка
              </h2>
            </div>
            <div className="categ_right">
              <h2>1200грн/год</h2>
            </div>
          </div>
          <p>
            Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи.
            {/* Описание работы */}
          </p>
        </div>
      </div>

      {/* Портфолио */}
      <div className="portfolio">
        <h2>Портфоліо</h2>
        <div className="portfolio-images">
          <img src="./images/portfolio_1.png" alt="Меблі 1" />
          <img src="./images/portfolio_2.png" alt="Меблі 2" />
          <img src="./images/portfolio_3.png" alt="Меблі 3" />
          <img src="./images/portfolio_4.png" alt="Меблі 4" />
          <img src="./images/portfolio_5.png" alt="Меблі 5" />
        </div>
      </div>

      {/* Відгуки */}
      <div className="review-container">
        <h2>Відгуки</h2>
        <div className="review-list" id="review-list">
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <h3>{review.title}</h3>
              <p>{review.rating}</p>
              <p>{review.date}</p>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Аккордеоны */}
      <div className="container">
        <Accordion
          index={1}
          title="Загальна інформація"
          content="Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи..."
          isActive={activeAccordion === 1}
          onClick={() => toggleAccordion(1)}
        />
        <Accordion
          index={2}
          title="Мова"
          content={
            <div className="language-block">
              <div className="language-item">
                <span>Українська | Носій</span>
              </div>
              <div className="language-item">
                <span>Англійська | B2</span>
              </div>
            </div>
          }
          isActive={activeAccordion === 2}
          onClick={() => toggleAccordion(2)}
        />
        {/* Другие аккордеоны */}
      </div>
    </div>
  );
}

// Компонент Аккордеона
function Accordion({ index, title, content, isActive, onClick }) {
  return (
    <div className="accordion">
      <div className="accordion-header" onClick={onClick}>
        <h2>{title}</h2>
        <img
          src="./images/show_container.png"
          alt="Show"
          className={`accordion-icon ${isActive ? 'rotate' : ''}`}
        />
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
}
