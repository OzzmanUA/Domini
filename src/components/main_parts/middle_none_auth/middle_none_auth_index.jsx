import React from 'react';

import './middle_none_auth_style.css';

import whyDominiImg from './images/why_domini.png';
import createTaskImg from './images/create_task.png';
import searchTaskImg from './images/search_task.png';
import closeTaskImg from './images/close_task.png';
import arrowTaskImg from './images/arrow_task.png';
import dimaImg from './images/demo_img/dima.png';
import alinaImg from './images/demo_img/alina.png';
import dariaImg from './images/demo_img/daria.png';
import andriiImg from './images/demo_img/andrii.png';
import supportUkraineImg from './images/support_Ukraine.png';
import starImg from './images/spec_star.png';


const MiddleNonAuth = () => {
  const tags_1 = ["Чоловік на годину", "Столяр", "Електрик", "Сантехнік"];
  const tags_2 = ["Послуги домробітниці", "Няня", "Посдуги кухаря", "Фарбування одягу"];
  const tags_3 = ["Ремонт мобільних телефонів", "Обслуговування техніки"];
  const tags_4 = ["Прибирання офісів", "Хімчистка", "Прибирання після ремонту"];

  return (
    <div>
      <div className="why-domini">
        <img src={whyDominiImg} alt="Чому Domini" />
      </div>
      <div className="how-work-domini">
        <h1>Як працює Domini</h1>
        <div className="steps">
          <div className="step">
            <img src={createTaskImg} alt="Створити замовлення" />
            <h3>Створіть замовлення</h3>
            <p>Опишіть, що і коли потрібно зробити</p>
          </div>
          <div className="arrow">
            <img src={arrowTaskImg} alt="Наступний крок" />
          </div>
          <div className="step">
            <img src={searchTaskImg} alt="Вибрати фахівця" />
            <h3>Виберіть фахівця</h3>
            <p>Виберіть компетентного фахівця для виконання роботи</p>
          </div>
          <div className="arrow">
            <img src={arrowTaskImg} alt="Наступний крок" />
          </div>
          <div className="step">
            <img src={closeTaskImg} alt="Закрити замовлення" />
            <h3>Закрийте замовлення</h3>
            <p>Залиште відгук та оцінку за виконану роботу</p>
          </div>
        </div>
      </div>

      <h2 className="spec-h2">Обирайте перевірених спеціалістів</h2>
      <div className="nav-container_middle">
        <ul className="nav-menu_middle">
          <li><a href="#">Домашній майстер</a></li>
          <li><a href="#">Ремонт техніки</a></li>
          <li><a href="#">Оздоблювальні роботи</a></li>
          <li><a href="#">Будівельні роботи</a></li>
          <li><a href="#">Меблеві роботи</a></li>
          <li><a href="#">Клінінгові послуги</a></li>
          <li><a href="#">Транспортні та складські послуги</a></li>
          <li><a href="#">Побутові послуги</a></li>
        </ul>
      </div>

      <div className="specialists">
        <div className="specialist">
          <p className="spec-cennik">$70/год</p>
          <img className="spec-img" src={dimaImg} alt="Дмитро К." />
          <h3>Дмитро К.</h3>
          <p className="spec-categ">Домашній майстер</p>
          <img className="spec-ratting" src={starImg} alt="Rating" />
          <p className="spec-ratting">4.2 / 5 (32 роботи)</p>
          <div className="tags-container">
            {tags_1.map((tag, index) => (
              <div key={index} className="tag">{tag}</div>
            ))}
          </div>
          <button>Детальніше</button>
        </div>

        <div className="specialist">
          <p className="spec-cennik">$75/год</p>
          <img className="spec-img" src={alinaImg} alt="Аліна С." />
          <h3>Аліна С.</h3>
          <p className="spec-categ">Побутові послуги</p>
          <img className="spec-ratting" src={starImg} alt="Rating" />
          <p className="spec-ratting">4.8 / 5 (40 робот)</p>
          <div className="tags-container">
            {tags_2.map((tag, index) => (
              <div key={index} className="tag">{tag}</div>
            ))}
          </div>
          <button>Детальніше</button>
        </div>

        <div className="specialist">
          <p className="spec-cennik">$80/год</p>
          <img className="spec-img" src={dariaImg} alt="Дарія Л." />
          <h3>Дарія Л.</h3>
          <p className="spec-categ">Ремонт техніки</p>
          <img className="spec-ratting" src={starImg} alt="Rating" />
          <p className="spec-ratting">3.9 / 5 (28 робот)</p>
          <div className="tags-container">
            {tags_3.map((tag, index) => (
              <div key={index} className="tag">{tag}</div>
            ))}
          </div>
          <button>Детальніше</button>
        </div>

        <div className="specialist">
          <p className="spec-cennik">$65/год</p>
          <img className="spec-img" src={andriiImg} alt="Андрій Г." />
          <h3>Андрій Г.</h3>
          <p className="spec-categ">Клінінгові послуги</p>
          <img className="spec-ratting" src={starImg} alt="Rating" />
          <p className="spec-ratting">4.9 / 5 (51 робота)</p>
          <div className="tags-container">
            {tags_4.map((tag, index) => (
              <div key={index} className="tag">{tag}</div>
            ))}
          </div>
          <button>Детальніше</button>
        </div>
      </div>

      <section className="created-on-domini">
        <h2>Створено на Domini</h2>
        <div className="gallery">
          <img src="https://via.placeholder.com/200" alt="Приклад" />
          <img src="https://via.placeholder.com/200" alt="Приклад" />
          <img src="https://via.placeholder.com/200" alt="Приклад" />
          <img src="https://via.placeholder.com/200" alt="Приклад" />
          <img src="https://via.placeholder.com/200" alt="Приклад" />
        </div>
      </section>

      <div className="support-container">
        <div className="support-text">
          <h2>Підтримайте Україну</h2>
          <p>Ваша допомога Україні – це внесок у майбутнє без конфліктів. Підтримайте Україну у її боротьбі за свободу і мир. Дякуємо за вашу підтримку!</p>
          <a href="https://war.ukraine.ua/support-ukraine/" className="support-button">Дізнатися більше</a>
        </div>
        <div className="support-image">
          <img src={supportUkraineImg} alt="Підтримка України" />
        </div>
      </div>
    </div>
  );
};

export default MiddleNonAuth;
