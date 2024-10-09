import React from 'react';
import './performer-profile_style.css'; // CSS for the profile card
import Accordion from './profile-accordoins'
import { Link } from 'react-router-dom';
// Import images directly
import userImage from './images/demo_user.png';
import mapImage from './images/map.png';
import starImage from './images/star.png';
import sendIcon from './images/fly_icone_send.png';
import satisfactionIcon from './images/zadowolenia.png';
import feedbackIcon from './images/vidgyku.png';
import qualityIcon from './images/jakist.png';
import politenessIcon from './images/vichlivist.png';
import punctualityIcon from './images/punktyalnist.png';
import efficiencyIcon from './images/efektyvnist.png';
import portfolio1 from './images/portfolio_1.png';
import portfolio2 from './images/portfolio_2.png';
import portfolio3 from './images/portfolio_3.png';
import portfolio4 from './images/portfolio_4.png';
import portfolio5 from './images/portfolio_5.png';

const reviews = [
  {
    title: "Потрібна нова оббивка для дивану",
    rating: "⭐⭐⭐⭐ 4.70",
    date: "29 травня 2024 – 21 червня 2024",
    content: "Замовляли нову оббивку для нашого старого дивану, і результат перевершив усі наші очікування! Майстер допоміг обрати ідеальну тканину, яка не тільки пасує до інтер'єру, а й дуже приємна на дотик. Робота була виконана швидко та професійно. Диван виглядає як новий, і тепер він став головною прикрасою нашої вітальні. Дуже задоволені якістю роботи та обслуговуванням. Рекомендуємо!"
  },
  {
    title: "Ремонт пошкодженої оббивки",
    rating: "⭐⭐⭐⭐⭐ 5.00",
    date: "1 червня 2024 – 16 червня 2024",
    content: "Зверталися для ремонту пошкодженої оббивки на кріслах. Робота виконана швидко та якісно. Майстер професійно підібрав матеріали, і крісла тепер виглядають як нові. Дуже задоволені результатом, будемо рекомендувати!"
  },
  {
    title: "Заміна оббивки на кухонних стільцях",
    rating: "⭐⭐⭐⭐⭐ 5.00",
    date: "18 червня 2024 – 25 червня 2024",
    content: "Замовляли заміну оббивки на кухонних стільцях і залишились дуже задоволені результатом. Майстер не тільки професійно підібрав якісну та зносостійку тканину, але й врахував усі наші побажання щодо дизайну. Ремонт був виконаний швидко, і стільці виглядають як нові. Тепер вони гармонійно вписуються в інтер'єр кухні і додають їй стильного вигляду. Величезне дякую за уважний підхід і чудову роботу. Рекомендуємо всім, хто шукає якісний ремонт меблів!"
  },
  {
    title: "Потрібна нова оббивка для дивану",
    rating: "⭐⭐⭐⭐ 4.70",
    date: "29 травня 2024 – 21 червня 2024",
    content: "Замовляли нову оббивку для нашого старого дивану, і результат перевершив усі наші очікування! Майстер допоміг обрати ідеальну тканину, яка не тільки пасує до інтер'єру, а й дуже приємна на дотик. Робота була виконана швидко та професійно. Диван виглядає як новий, і тепер він став головною прикрасою нашої вітальні. Дуже задоволені якістю роботи та обслуговуванням. Рекомендуємо!"
  },
  {
    title: "Ремонт пошкодженої оббивки",
    rating: "⭐⭐⭐⭐⭐ 5.00",
    date: "1 червня 2024 – 16 червня 2024",
    content: "Зверталися для ремонту пошкодженої оббивки на кріслах. Робота виконана швидко та якісно. Майстер професійно підібрав матеріали, і крісла тепер виглядають як нові. Дуже задоволені результатом, будемо рекомендувати!"
  },
  {
    title: "Заміна оббивки на кухонних стільцях",
    rating: "⭐⭐⭐⭐⭐ 5.00",
    date: "18 червня 2024 – 25 червня 2024",
    content: "Замовляли заміну оббивки на кухонних стільцях і залишились дуже задоволені результатом. Майстер не тільки професійно підібрав якісну та зносостійку тканину, але й врахував усі наші побажання щодо дизайну. Ремонт був виконаний швидко, і стільці виглядають як нові. Тепер вони гармонійно вписуються в інтер'єр кухні і додають їй стильного вигляду. Величезне дякую за уважний підхід і чудову роботу. Рекомендуємо всім, хто шукає якісний ремонт меблів!"
  }
];


const PerformerProfile = ({ profile }) => {
    return (
    <div className="performer-profile-all">
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
          <img src={starImage} alt="Rating Star" />
          <p>4,8 | 1,1к відгуків</p>
        </div>
        <div className="user-buttons">
          <button className="send_user-btn">
            <img src={sendIcon} alt="Send" />
            Написати виконавцю
          </button>
          <Link to="/perfprofilepay"><button className="make_work-btn">Запропонувати роботу</button></Link>
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
            <img src={satisfactionIcon} alt="Satisfied Clients" />
            <div className="bottom-item-describe">
              <h2>100%</h2>
              <p>Задоволених клієнтів</p>
            </div>
          </div>
          <div className="info_bottom_item">
            <img src={feedbackIcon} alt="Positive Feedback" />
            <div className="bottom-item-describe">
              <h2>215</h2>
              <p>Позитивних відгуків</p>
            </div>
          </div>
          <div className="info_bottom_item">
            <img src={qualityIcon} alt="Work Quality" />
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
          Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У
          своїй професії я завжди прагну до досконалості, створюючи нову оббивку
          для меблів, виконуючи реставрацію та перетяжку. Маю широкий досвід
          роботи з різноманітними матеріалами, такими як велюр, шкіра, бавовна,
          льон та синтетичні тканини. Мої навички включають точне викроювання,
          пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя
          у будь-які меблі.
          <br className="p-margin" />
          Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче.
          Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і
          стиль для кожного виробу. Вмію враховувати особливості інтер'єру та
          бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів
          та дизайну.
          <br className="p-margin" />
          Моя професійна діяльність включає також консультації щодо догляду за
          оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для
          вашого стилю життя. Я переконана, що кожна деталь має значення, тому
          уважно ставлюся до кожного етапу роботи, від вибору матеріалів до
          останнього шва.
          <br className="p-margin" />
          Моя мета — зробити ваші меблі не лише зручними, але й естетично
          привабливими, щоб вони приносили радість і задоволення у повсякденному
          житті. Довіртеся мені, і я зроблю все можливе, щоб перевершити ваші
          очікування.
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
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <h3>{review.title}</h3>
            <p>{review.rating} | {review.date}</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>

        <Accordion/>



    </div>
    );
};

export default PerformerProfile;
