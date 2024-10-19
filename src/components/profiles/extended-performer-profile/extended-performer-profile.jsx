import React, { useState } from 'react';

import avatarImage from '../customer-profile/images/demo_user.png';
import countryImage from '../customer-profile/images/country.png'
import locationIcon from '../customer-profile/images/location_logo.png';
import joinDateIcon from '../customer-profile/images/user_logo.png';

import './extended-performer-profile-style.css';

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
  }
];

const EditableSection = ({ title, initialContent }) => {
    const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
    const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием/закрытием секции
    const [content, setContent] = useState(initialContent); // Содержимое секции
  
    const handleEditClick = () => {
      setIsEditing(!isEditing); // Переключение режима редактирования
    };
  
    const handleContentChange = (e) => {
      setContent(e.target.value); // Изменение текста при редактировании
    };
  
    const handleToggle = () => {
        setIsOpen(!isOpen); // Переключение открытой/закрытой секции
      };




  
    return (
        <div className="section-ext-perf">
        <div className="section-header-ext-perf" onClick={handleToggle} style={{ cursor: 'pointer' }}>
          <h2>{title}</h2>
          <span>{isOpen ? 'Скасувати' : 'Змінити'}</span> {/* Стрелка меняется в зависимости от состояния */}
        </div>
        {isOpen && ( // Отображаем контент, если секция открыта
          <>
            {isEditing ? (
              <textarea
                className="edit-area-ext-perf"
                value={content}
                onChange={handleContentChange}
              />
            ) : (
              <p>{content}</p>
            )}
            <div className="button-container-ext-perf">
              <button className="edit-button-ext-perf" onClick={handleEditClick}>
                {isEditing ? 'Зберегти' : 'Змінити'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };




const ExtendedpPerformerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    avatar: avatarImage,
    name: 'Анастасія О.',
    username: '@Nastya_lis',
    location: 'Київ, Україна',
    joinDate: 'Липень, 2022'
  });

  // Обработчик изменения формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик редактирования
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Обработчик сохранения
  const handleSave = () => {
    setIsEditing(false);
    // Логика для сохранения данных (например, отправка на сервер)
    console.log('Сохраненные данные:', formData);
  };
  return (
<div className="customer-all">
<div className="customer-profile-container" id="customer-profile-container">
    <div className="customer-profile-left">
    <div className="customer-profile-card-extend">
      <div className="prof-up-btn">
      <div className="avatar-extend">
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) })
            }
          />
        ) : (
          <img className="avatar-img-extend" src={formData.avatar} alt="Avatar" />
        )}
      </div>

      <div className="cust-pof-top-extend">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Имя"
          />
        ) : (
          <h2>{formData.name}</h2>
        )}

        {isEditing ? (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        ) : (
          <p>{formData.username}</p>
        )}
      </div>

      {isEditing ? (
        <button className="save-button-extend" onClick={handleSave}>
          Зберегти
        </button>
      ) : (
        <button className="edit-button-extend" onClick={handleEdit}>
          Редагувати
        </button>
      )}
      </div>

      <div className="info-extend">
        <div className="info-item-extend">
          <div className="location-user-info-extend">
            <img src={locationIcon} alt="Location" className="icon-extend" />
            <p>Місцезнаходження</p>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Місцезнаходження"
            />
          ) : (
            <p>{formData.location}</p>
          )}
        </div>

        <div className="info-item-extend">
          <div className="location-user-info-extend">
            <img src={joinDateIcon} alt="Join date" className="icon-extend" />
            <p>Долучилися</p>
          </div>
          <p>{formData.joinDate}</p>
        </div>
      </div>


    </div>


      </div>

    <div className="customer-profile-middle"></div>
    <div className="customer-profile-right">
      <div className="review-list-custo" id="review-list-custo">
        <h2>Відгуки</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="review-item" id="review-item">
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


    <div className="container-accordions-ext-perf">
      {/* Загальна інформація */}
      <EditableSection
        title="Загальна інформація"
        initialContent="Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У своїй професії я завжди прагну до досконалості, створюючи нову оббивку для меблів, виконуючи реставрацію та перетяжку. Маю широкий досвід роботи з різноманітними матеріалами, такими як велюр, шкіра, бавовна, льон та синтетичні тканини. Мої навички включають точне викроювання, пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя у будь-які меблі. Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче. Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і стиль для кожного виробу. Вмію враховувати особливості інтер'єру та бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів та дизайну. Моя професійна діяльність включає також консультації щодо догляду за оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для вашого стилю життя. Я переконана, що кожна деталь має значення, тому уважно ставлюся до кожного етапу роботи, від вибору матеріалів до останнього шва. Моя мета — зробити ваші меблі не лише зручними, але й естетично привабливими, щоб вони приносили радість і задоволення у повсякденному житті. Довіртеся мені, і я зроблю все можливе, щоб перевершити ваші очікування."
      />

      {/* Мова */}
      <EditableSection
        title="Мова"
        initialContent="Українська | Носій, Англійська | B2"
      />

      {/* Навички */}
      <EditableSection
        title="Навички"
        initialContent="Середній рівень: 3-5 років досвіду | Самостійна робота з різними тканинами | Консультує клієнтів з вибору матеріалів., Перетяжка меблів | Заміна наповнювача | Дизайн інтер'єру та кольорова координація | Цифровий розкрій | Пошиття чохлів | Орієнтація на клієнта"
      />

      {/* Освіта */}
      <EditableSection
        title="Освіта"
        initialContent="Київський національний університет технологій та дизайну, Магістр, Технології легкої промисловості, 2015 рік випуску"
      />
    </div>


</div>






  );
};

export default ExtendedpPerformerProfile;