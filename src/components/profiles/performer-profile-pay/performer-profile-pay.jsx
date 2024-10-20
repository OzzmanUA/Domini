import React, { useState } from 'react';
// Импорт изображений
import closeIcon from './images/closeIcon.png';
import cardIcon from './images/cardIcon.png';
import './performer_profile_pay_style.css';
import demoUserImg from './images/demo_user.png';
import mapImg from './images/map.png';
import checkSmallImg from './images/checksmall.png';

const PerformerProfilePay = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className="userParts">
        <div className="userPartLeft">
          <img className="userImg" src={demoUserImg} alt="User" />
          <div className="userInformation">
            <h1>Софія Б.</h1>
            <div className="map">
              <img src={mapImg} alt="Map" />
              <p>Київ, Україна</p>
            </div>
          </div>
        </div>
      </div>

      <div className="informationParts">
        <div className="infoPartLeft">
          <div className="userWorkInfoTop">
            <div className="infoTopItem">
              <h2>₴60К+</h2>
              <p>Загальний дохід</p>
            </div>
            <div className="infoTopItem">
              <h2>20</h2>
              <p>Кількість проектів</p>
            </div>
            <div className="infoTopItem">
              <h2>320</h2>
              <p>Кількість годин</p>
            </div>
          </div>

          <div className="userWorkInfoMiddle">
            <h2 className="infoMiddleH2">Перелік проведених робіт:</h2>
            <ul>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Консультація з вибору матеріалів</p>
                </div>
                <p>300 грн</p>
              </li>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Зміна стилю оббивки</p>
                </div>
                <p>500 грн</p>
              </li>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Ремонт підлокітників та спинок</p>
                </div>
                <p>400 грн</p>
              </li>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Пошиття чохлів на замовлення</p>
                </div>
                <p>800 грн</p>
              </li>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Заміна наповнювача</p>
                </div>
                <p>300 грн</p>
              </li>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
                  <img src={checkSmallImg} alt="Check" />
                  <p>Ремонт пружинних блоків</p>
                </div>
                <p>400 грн</p>
              </li>
            </ul>
          </div>

          <div className="userWorkInfoBottom">
            <div className="symaTimeWork">
              <h3>Всього:</h3>
              <h3>2700 грн</h3>
            </div>
            <div className="symaTimeWork">
              <p>Загальний термін робіт</p>
              <p>3 дні</p>
            </div>
          </div>
        </div>

        <div className="infoMarginPartMiddle"></div>

        <div className="infoPartRight">
          <div className="userCategories">
            <div className="categLeft">
              <h2>Меблеві роботи: Швачка м’яких меблів | Перетяжка меблів | Реставрація меблів | Хімчистка</h2>
            </div>
            <div className="categRight">
              <h2>1200 грн/год</h2>
            </div>
          </div>
          <p>
            Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У своїй професії я завжди прагну до досконалості, створюючи нову оббивку для меблів, виконуючи реставрацію та перетяжку. Маю широкий досвід роботи з різноманітними матеріалами, такими як велюр, шкіра, бавовна, льон та синтетичні тканини. Мої навички включають точне викроювання, пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя у будь-які меблі.
            <br className="pMargin" />
            Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче. Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і стиль для кожного виробу. Вмію враховувати особливості інтер'єру та бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів та дизайну.
            <br className="pMargin" />
            Моя професійна діяльність включає також консультації щодо догляду за оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для вашого стилю життя. Я переконана, що кожна деталь має значення, тому уважно ставлюся до кожного етапу роботи, від вибору матеріалів до останнього шва.
            <br className="pMargin" />
            Моя мета — зробити ваші меблі не лише зручними, але й естетично привабливими, щоб вони приносили радість і задоволення у повсякденному житті. Довіртеся мені, і я зроблю все можливе, щоб перевершити ваші очікування.
          </p>
        </div>
      </div>

      <div className="confirmAndPay"  onClick={handleOpenModal}>
        <button>Підтвердити і оплатити</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Кнопка закрытия с картинкой крестика */}
            <button className="close-btn" onClick={handleCloseModal}>
              <img src={closeIcon} alt="Close" className="icon" />
            </button>

            <h2 className="new-paysend-h2">Новий платіж</h2>
            <p className="new-paysend-p">До сплати 2700 грн</p>
            <p className="new-paysend-p2">З картки</p>

            <form className="payment-form">
              <label>Номер карти</label>
              <div className="input-with-icon">
                {/* Картинка карты рядом с полем для ввода номера карты */}
                <img src={cardIcon} alt="Card" className="card-icon" />
                <input type="text" placeholder="0000 0000 0000 0000" />
              </div>

              <div className="form-row">
                <div>
                  <label>Термін дії</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div>
                  <label>CVV-код</label>
                  <input type="text" placeholder="•••" />
                </div>
              </div>
            </form>
            <button type="submit" className="submit-btn">Сплатити</button>
          </div>
        </div>
      )}



    </div>
  );
};

export default PerformerProfilePay;
