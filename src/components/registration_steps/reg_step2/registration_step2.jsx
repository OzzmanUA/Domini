
import './reg_step2_style.css';

// Импорт изображений
import leftMessages from '../images/left_part_messeges.png';
import backArrow from '../images/strelka_back.png';
import leftBackground from '../images/left_part_bg.png';

const RegistrStep2 = () => {
  return (
    <div className='all_reg_step2'>
    <div className="container">
      <div className="left-section" style={{ backgroundImage: `url(${leftBackground})` }}>
        <img className="left_messages" src={leftMessages} alt="Messages" />
      </div>

      <div className="right-section">
        <a href="../registration_step1/registr_step1_index.html" className="back-link">
          <img src={backArrow} alt="Back" /> Назад
        </a>
        <h1>Створіть свій профіль</h1>
        <p className="opis_name" style={{ marginBottom: 0 }}>Додайте унікальне для вас ім'я користувача, так ви будете виглядати для інших.</p>
        <p className="opis_name" style={{ fontWeight: 500, marginTop: 8 }}>Ви не можете змінити своє ім'я користувача, тому обирайте з розумом.</p>
        <form>
          <label htmlFor="username">Оберіть ім'я користувача</label>
          <input className='input_reg' type="text" id="username" name="username" placeholder="user_name" />
          <label htmlFor="email">Вкажіть email</label>
          <input className='input_reg' type="text" id="email" name="email" placeholder="email" />
          <label htmlFor="password">Придумайте пароль</label>
          <input className='input_reg' type="password" id="password" name="password" placeholder="password" />
          <label htmlFor="phone_number">Вкажіть номер телефону</label>
          <input className='input_reg' type="text" id="phone_number" name="phone_number" placeholder="phone_number" />
          <p className='reg_step2_p'>Побудуйте довіру, використовуючи своє повне ім'я або назву компанії!</p>
          <button className='reg_btn' type="submit">Створити аккаунт</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegistrStep2;
