import React from 'react';

import './favorite-offers-style.css';

import dimaImg from './images/demo_img/dima.png';
import alinaImg from './images/demo_img/alina.png';
import dariaImg from './images/demo_img/daria.png';
import andriiImg from './images/demo_img/andrii.png';
import starImg from './images/spec_star.png';


import image1 from './images/fav_1.png';
import image2 from './images/fav_2.png';
import image3 from './images/fav_3.png';
import image4 from './images/fav_4.png';
import image5 from './images/fav_5.png';

import heartIcon from './images/heart-logo.png';
import favFill from './images/favourite-fill.png'

const recommendations = [
  {
    id: 1,
    name: 'Максим Н.',
    foto: dimaImg,
    rating: 4.2,
    reviews: 48,
    description: 'Професійний ремонт, монтаж, дрібні роботи. Якість гарантується тривалим гарантійним терміном.',
    price: '500 грн/год',
    imageUrl: image1,
  },
  {
    id: 2,
    name: 'Максим Н.',
    foto: dimaImg,
    rating: 4.8,
    reviews: 52,
    description: 'Прибирання для будинків і квартир. Висока якість прибирання гарантована.',
    price: '400 грн/год',
    imageUrl: image2,
  },
  {
    id: 3,
    name: 'Юрій П.',
    foto: dimaImg,
    rating: 4.5,
    reviews: 68,
    description: 'Перевезення меблів та техніки. Надійно, швидко, ефективно.',
    price: '300 грн/год',
    imageUrl: image3,
  },
  {
    id: 4,
    name: 'Світлана Т.',
    foto: dimaImg,
    rating: 4.9,
    reviews: 45,
    description: 'Кухар за замовленням. Смачні страви, якість і свіжість гарантовані.',
    price: '500 грн/год',
    imageUrl: image4,
  },
  {
    id: 5,
    name: 'Олег К.',
    foto: dimaImg,
    rating: 4.4,
    reviews: 51,
    description: 'Ремонт дрібної техніки. Оперативно, якісно, з акцентом на довговічність.',
    price: '450 грн/год',
    imageUrl: image5,
  },
];


const FavoriteOffers = () => {
  const tags_1 = ["Чоловік на годину", "Столяр", "Електрик", "Сантехнік"];
  const tags_2 = ["Послуги домробітниці", "Няня", "Посдуги кухаря", "Фарбування одягу"];
  const tags_3 = ["Ремонт мобільних телефонів", "Обслуговування техніки"];
  const tags_4 = ["Прибирання офісів", "Хімчистка", "Прибирання після ремонту"];

  return (
    <div className="favourite-offerts-all">
        <h2 className="fav-h2">Обране</h2>
      <div className="specialists">
        <div className="specialist">
        <div className="spec-top">
            <p>$75/год</p>
            <img src={favFill}/>
            </div>
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
            <div className="spec-top">
            <p>$75/год</p>
            <img src={favFill}/>
            </div>
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
        <div className="spec-top">
            <p>$75/год</p>
            <img src={favFill}/>
            </div>
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
        <div className="spec-top">
            <p>$75/год</p>
            <img src={favFill}/>
            </div>
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

      <div className="recommendations-container">
      <h2>Вам можуть сподобатися</h2>
      <div className="recommendations-list">
        {recommendations.map((service) => (
          <div className="recommendation-card" key={service.id}>
            <div className="image-wrapper">
              <img src={service.imageUrl} alt={service.name} className="service-image" />
              {/* Иконка сердечка */}
              <img src={heartIcon} alt="Like" className="heart-icon" />
            </div>
            <div className="service-info">
              <div className="service-header">
                <div className="user-name-foto">
                    <img src={service.foto}/>
                    <span className="service-name">{service.name}</span>
                    <span className="service-rating">⭐ {service.rating}</span>
                </div>
                <div className="service-rating">
                  <span>({service.reviews} робіт)</span>
                </div>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    </div>
  );
};

export default FavoriteOffers;
