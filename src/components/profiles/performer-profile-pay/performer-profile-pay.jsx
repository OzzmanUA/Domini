<<<<<<< HEAD
import React from 'react';
import styles from './performer_profile_pay_style.css';
=======
import './performer-profile-pay-style.css';
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
import demoUserImg from './images/demo_user.png';
import mapImg from './images/map.png';
import checkSmallImg from './images/checksmall.png';

const PerformerProfilePay = () => {
  return (
    <div>
<<<<<<< HEAD
      <div className={styles.userParts}>
        <div className={styles.userPartLeft}>
          <img className={styles.userImg} src={demoUserImg} alt="User" />
          <div className={styles.userInformation}>
            <h1>Софія Б.</h1>
            <div className={styles.map}>
=======
      <div className="userParts">
        <div className="userPartLeft">
          <img className="userImg" src={demoUserImg} alt="User" />
          <div className="userInformation">
            <h1>Софія Б.</h1>
            <div className="map">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
              <img src={mapImg} alt="Map" />
              <p>Київ, Україна</p>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      
      <div className={styles.informationParts}>
        <div className={styles.infoPartLeft}>
          <div className={styles.userWorkInfoTop}>
            <div className={styles.infoTopItem}>
              <h2>₴60К+</h2>
              <p>Загальний дохід</p>
            </div>
            <div className={styles.infoTopItem}>
              <h2>20</h2>
              <p>Кількість проектів</p>
            </div>
            <div className={styles.infoTopItem}>
=======

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
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
              <h2>320</h2>
              <p>Кількість годин</p>
            </div>
          </div>

<<<<<<< HEAD
          <div className={styles.userWorkInfoMiddle}>
            <h2>Перелік проведених робіт:</h2>
            <ul>
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
          <div className="userWorkInfoMiddle">
            <h2 className="infoMiddleH2">Перелік проведених робіт:</h2>
            <ul>
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Консультація з вибору матеріалів</p>
                </div>
                <p>300 грн</p>
              </li>
<<<<<<< HEAD
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Зміна стилю оббивки</p>
                </div>
                <p>500 грн</p>
              </li>
<<<<<<< HEAD
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Ремонт підлокітників та спинок</p>
                </div>
                <p>400 грн</p>
              </li>
<<<<<<< HEAD
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Пошиття чохлів на замовлення</p>
                </div>
                <p>800 грн</p>
              </li>
<<<<<<< HEAD
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Заміна наповнювача</p>
                </div>
                <p>300 грн</p>
              </li>
<<<<<<< HEAD
              <li className={styles.infoMiddleItem}>
                <div className={styles.infoMiddleItemLeft}>
=======
              <li className="infoMiddleItem">
                <div className="infoMiddleItemLeft">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
                  <img src={checkSmallImg} alt="Check" />
                  <p>Ремонт пружинних блоків</p>
                </div>
                <p>400 грн</p>
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          <div className={styles.userWorkInfoBottom}>
            <div className={styles.symaTimeWork}>
              <h3>Всього:</h3>
              <h3>2700 грн</h3>
            </div>
            <div className={styles.symaTimeWork}>
=======
          <div className="userWorkInfoBottom">
            <div className="symaTimeWork">
              <h3>Всього:</h3>
              <h3>2700 грн</h3>
            </div>
            <div className="symaTimeWork">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
              <p>Загальний термін робіт</p>
              <p>3 дні</p>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className={styles.infoMarginPartMiddle}></div>

        <div className={styles.infoPartRight}>
          <div className={styles.userCategories}>
            <div className={styles.categLeft}>
              <h2>Меблеві роботи: Швачка м’яких меблів | Перетяжка меблів | Реставрація меблів | Хімчистка</h2>
            </div>
            <div className={styles.categRight}>
=======
        <div className="infoMarginPartMiddle"></div>

        <div className="infoPartRight">
          <div className="userCategories">
            <div className="categLeft">
              <h2>Меблеві роботи: Швачка м’яких меблів | Перетяжка меблів | Реставрація меблів | Хімчистка</h2>
            </div>
            <div className="categRight">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
              <h2>1200 грн/год</h2>
            </div>
          </div>
          <p>
            Я — досвідчена швачка м'яких меблів з понад 10-річним стажем роботи. У своїй професії я завжди прагну до досконалості, створюючи нову оббивку для меблів, виконуючи реставрацію та перетяжку. Маю широкий досвід роботи з різноманітними матеріалами, такими як велюр, шкіра, бавовна, льон та синтетичні тканини. Мої навички включають точне викроювання, пошиття та оздоблення меблів, завдяки чому я здатна вдихнути нове життя у будь-які меблі.
<<<<<<< HEAD
            <br className={styles.pMargin} />
            Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче. Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і стиль для кожного виробу. Вмію враховувати особливості інтер'єру та бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів та дизайну.
            <br className={styles.pMargin} />
            Моя професійна діяльність включає також консультації щодо догляду за оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для вашого стилю життя. Я переконана, що кожна деталь має значення, тому уважно ставлюся до кожного етапу роботи, від вибору матеріалів до останнього шва.
            <br className={styles.pMargin} />
=======
            <br className="pMargin" />
            Я завжди дбаю про те, щоб кожен клієнт отримував саме те, що хоче. Працюю над тим, щоб забезпечити максимальний комфорт, довговічність і стиль для кожного виробу. Вмію враховувати особливості інтер'єру та бажання клієнта, пропонуючи оптимальні рішення щодо вибору матеріалів та дизайну.
            <br className="pMargin" />
            Моя професійна діяльність включає також консультації щодо догляду за оббивкою та рекомендації щодо вибору тканин, що найкраще підійдуть для вашого стилю життя. Я переконана, що кожна деталь має значення, тому уважно ставлюся до кожного етапу роботи, від вибору матеріалів до останнього шва.
            <br className="pMargin" />
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
            Моя мета — зробити ваші меблі не лише зручними, але й естетично привабливими, щоб вони приносили радість і задоволення у повсякденному житті. Довіртеся мені, і я зроблю все можливе, щоб перевершити ваші очікування.
          </p>
        </div>
      </div>

<<<<<<< HEAD
      <div className={styles.confirmAndPay}>
=======
      <div className="confirmAndPay">
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
        <button>Підтвердити і оплатити</button>
      </div>
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> 7bbe30cc0d524a08e3b792cbd629353d2fc9ae53
export default PerformerProfilePay;
