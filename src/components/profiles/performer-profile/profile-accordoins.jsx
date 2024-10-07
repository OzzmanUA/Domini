import React, { useState } from 'react';
import './profile-accordoins.css';

import showIcon from './images/show_container.png'; // Импорт иконки

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>{title}</h2>
        <img
          src={showIcon}
          className={`accordion-icon ${isOpen ? 'rotate' : ''}`}
          alt="toggle"
        />
      </div>
      <div className="accordion-content" style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="container-accordions">
      {/* Общая информация */}
      <Accordion title="Загальна інформація">
        <p>
          Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У своїй професії я
          завжди прагну до досконалості, створюючи нову оббивку для меблів, виконуючи реставрацію
          та перетяжку. Маю широкий досвід роботи з різноманітними матеріалами, такими як велюр,
          шкіра, бавовна, льон та синтетичні тканини. Мої навички включають точне викроювання,
          пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя у будь-які
          меблі. Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче...
        </p>
      </Accordion>

      {/* Мова */}
      <Accordion title="Мова">
        <div className="language-block">
          <div className="language-item">
            <span>Українська | Носій</span>
          </div>
          <div className="language-item">
            <span>Англійська | B2</span>
          </div>
        </div>
      </Accordion>

      {/* Навички */}
      <Accordion title="Навички">
        <div className="language-block">
          <div className="language-item">
            <span>
              <p>Середній рівень</p> 3-5 років досвіду | Самостійна робота з різними тканинами |
              Консультує клієнтів з вибору матеріалів.
            </span>
          </div>
          <div className="language-item">
            <span>
              Перетяжка меблів | Заміна наповнювача | Дизайн інтер'єру та кольорова координація |
              Цифровий розкрій | Пошиття чохлів | Орієнтація на клієнта
            </span>
          </div>
        </div>
      </Accordion>

      {/* Освіта */}
      <Accordion title="Освіта">
        <div className="education-block">
          <div className="education-item">
            <span>Київський національний університет технологій та дизайну</span>
          </div>
          <div className="education-item">
            <span>Магістр</span>
          </div>
          <div className="education-item">
            <span>Технології легкої промисловості</span>
          </div>
          <div className="education-item">
            <span>2015 рік випуску</span>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default App;
