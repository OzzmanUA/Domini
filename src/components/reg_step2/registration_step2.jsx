
import './reg_step2_style.css';

// Импорт изображений
import leftMessages from '../images/left_part_messeges.png';
import backArrow from '../images/strelka_back.png';
import leftBackground from '../images/left_part_bg.png';
import React, { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom"
import  redirect from "react-router-dom"


const Registration = () => {
  const [registration, setRegistration] = useState({
		username: "",
		email: "",
		password: "",
		phone: ""
	})
  const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			// setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ username: "", email: "", password: "", phone: "" })
			return <redirect to='/#'></redirect>
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}
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
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && <p className="alert alert-success">{successMessage}</p>}
        <form onSubmit={handleRegistration}>
          <label htmlFor="username">Оберіть ім'я користувача</label>
          <input className='input_reg' 
          id="username"
          name="username"
          type="text"
          value={registration.username}
          onChange={handleInputChange} 
          />
          <label htmlFor="email">Вкажіть email</label>
          <input className='input_reg' 
          id="email"
          name="email"
          type="email"
          value={registration.email}
          onChange={handleInputChange}
          />
          <label htmlFor="password">Придумайте пароль</label>
          <input className='input_reg' 
              type="text"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
              />
          <label htmlFor="phone_number">Вкажіть номер телефону</label>
          <input className='input_reg' 
          id="phone"
          name="phone"
          type="text"
          value={registration.phone}
          onChange={handleInputChange}
          />
          <p className='reg_step2_p'>Побудуйте довіру, використовуючи своє повне ім'я або назву компанії!</p>
          <button className='reg_btn' type="submit">Створити аккаунт</button>
        </form>
      </div>
    </div>
    </div>

  );
};

export default Registration;
