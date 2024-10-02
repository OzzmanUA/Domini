import React, { useState, useEffect } from 'react';
import './performer-profile_style.css';
import userImage from './images/demo_user.png';
import mapImage from './images/map.png';
import starImage from './images/star.png';
import flyIcon from './images/fly_icone_send.png';
import satisfactionIcon from './images/zadowolenia.png';
import reviewIcon from './images/vidgyku.png';
import qualityIcon from './images/jakist.png';
import politenessIcon from './images/vichlivist.png';
import punctualityIcon from './images/punktyalnist.png';
import efficiencyIcon from './images/efektyvnist.png';
import portfolio1 from './images/portfolio_1.png';
import portfolio2 from './images/portfolio_2.png';
import portfolio3 from './images/portfolio_3.png';
import portfolio4 from './images/portfolio_4.png';
import portfolio5 from './images/portfolio_5.png';
import showIcon from './images/show_container.png';

const PerformerProfile = () => {
  // State for accordion toggle
  const [accordionOpen, setAccordionOpen] = useState({
    generalInfo: false,
    language: false,
    skills: false,
    education: false
  });

  // Toggle accordion content visibility
  const toggleAccordion = (section) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  // Dummy reviews data
  const [reviews, setReviews] = useState([]);

  // Simulate fetching reviews
  useEffect(() => {
    // Mock API call or static data
    const fetchedReviews = [
      { id: 1, user: 'Олександр П.', comment: 'Чудова робота! Рекомендую.', rating: 5 },
      { id: 2, user: 'Ірина С.', comment: 'Виконав швидко і якісно!', rating: 4 },
      { id: 3, user: 'Максим Б.', comment: 'Все влаштувало, ціна і якість на рівні.', rating: 5 }
    ];
    setReviews(fetchedReviews);
  }, []);

  return (
    <div className="profile-container">
      <div className="user-parts">
        <div className="user-part-left">
          <img className="user-img" src={userImage} alt="User" />
          <div className="user-information">
            <h1>Софія Б.</h1>
            <div className="map">
              <img src={mapImage} alt="Map" />
              <p>Київ, Україна</p>
            </div>
          </div>
        </div>
        <div className="user-part-right">
          <div className="user-rating">
            <img src={starImage} alt="Rating" />
            <p>4,8 | 1,1к відгуків</p>
          </div>
          <div className="user-buttons">
            <button className="send_user-btn">
              <img src={flyIcon} alt="Send" />
              Написати виконавцю
            </button>
            <button className="make_work-btn">Запропонувати роботу</button>
          </div>
        </div>
      </div>

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
              <img src={satisfactionIcon} alt="Satisfaction" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Задоволених клієнтів</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src={reviewIcon} alt="Review" />
              <div className="bottom-item-describe">
                <h2>215</h2>
                <p>Позитивних відгуків</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src={qualityIcon} alt="Quality" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Якість роботи</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src={politenessIcon} alt="Politeness" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Ввічливість</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src={punctualityIcon} alt="Punctuality" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Пунктуальність</p>
              </div>
            </div>
            <div className="info_bottom_item">
              <img src={efficiencyIcon} alt="Efficiency" />
              <div className="bottom-item-describe">
                <h2>100%</h2>
                <p>Ефективність</p>
              </div>
            </div>
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
            У своїй професії я завжди прагну до досконалості, створюючи нову
            оббивку для меблів, виконуючи реставрацію та перетяжку. Маю широкий
            досвід роботи з різноманітними матеріалами, такими як велюр,
            шкіра, бавовна, льон та синтетичні тканини...
          </p>
        </div>
      </div>

      <div className="portfolio">
        <h2>Портфоліо</h2>
        <div className="portfolio-images">
          <img src={portfolio1} alt="Меблі 1" />
          <img src={portfolio2} alt="Меблі 2" />
          <img src={portfolio3} alt="Меблі 3" />
          <img src={portfolio4} alt="Меблі 4" />
          <img src={portfolio5} alt="Меблі 5" />
        </div>
      </div>

      <div className="review-container">
        <h2>Відгуки</h2>
        <div className="review-list" id="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h3>{review.user}</h3>
              <p>{review.comment}</p>
              <p>Рейтинг: {review.rating}/5</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggleAccordion('generalInfo')}>
            <h2>Загальна інформація</h2>
            <img src={showIcon} className={`accordion-icon ${accordionOpen.generalInfo ? 'open' : ''}`} alt="Show" />
          </div>
          {accordionOpen.generalInfo && (
            <div className="accordion-content">
              <p>
                Я — досвідчена швачка м'яких меблів з понад 10-річним стажем
                роботи. У своїй професії я завжди прагну до досконалості...
              </p>
            </div>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-header" onClick={() => toggleAccordion('language')}>
            <h2>Мови</h2>
            <img src={showIcon} className={`accordion-icon ${accordionOpen.language ? 'open' : ''}`} alt="Show" />
          </div>
          {accordionOpen.language && (
            <div className="accordion-content">
              <p>Українська — Рідна</p>
              <p>Російська — Вільно</p>
            </div>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-header" onClick={() => toggleAccordion('skills')}>
            <h2>Навички</h2>
            <img src={showIcon} className={`accordion-icon ${accordionOpen.skills ? 'open' : ''}`} alt="Show" />
          </div>
          {accordionOpen.skills && (
            <div className="accordion-content">
              <p>Перетяжка меблів</p>
              <p>Реставрація меблів</p>
              <p>Хімчистка</p>
            </div>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-header" onClick={() => toggleAccordion('education')}>
            <h2>Освіта</h2>
            <img src={showIcon} className={`accordion-icon ${accordionOpen.education ? 'open' : ''}`} alt="Show" />
          </div>
          {accordionOpen.education && (
            <div className="accordion-content">
              <p>Київський коледж легкої промисловості</p>
              <p>Майстер виробничого навчання з перетяжки меблів</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformerProfile;
