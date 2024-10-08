
import './reg_step1_style.css';

// Импорт изображений
import checkMark from '../images/check_mark.png';
import googleIcon from '../images/icon_google.png';
import emailIcon from '../images/icon_email.png';
import appleIcon from '../images/icon_apple.png';
import facebookIcon from '../images/icon_facebook.png';
import leftSideImage from '../images/left_side.png';
import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../auth/AuthProvider';

const Login2 = () => {
	// const [errorMessage, setErrorMessage] = useState("")
	// const [login, setLogin] = useState({
	// 	username: "",
	// 	email: "",
	// 	password: "",
	// 	phone: ""
	// })
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const navigate = useNavigate()
	// const auth = useAuth()
	// const location = useLocation()
	// const redirectUrl = location.state?.path || "/homereg"

	// const handleInputChange = (e) => {
	// 	setLogin({ ...login, [e.target.name]: e.target.value })
	// }

	// const handleSubmit1 = async (e) => {
	// 	e.preventDefault()
	// 	const success = await loginUser(login)
	// 	if (success) {
	// 		const token = success.token
	// 		auth.handleLogin(token)
	// 		navigate(redirectUrl, { replace: true })

	// 		setIsLoggedIn(true);
	// 		// this.props.history.push('/homereg')

	// 	} else {
	// 		setErrorMessage("Invalid username or password. Please try again.")
	// 	}
	// 	setTimeout(() => {
	// 		setErrorMessage("")
	// 	}, 4000)
  // }
	

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ username, email, password, phoneNumber });
  };



  return (
    <div className='all_reg_step1'>
    <div className="container">
      <div className="left-section" style={{ backgroundImage: `url(${leftSideImage})` }}>
        <h2>Комфорт з нами</h2>
        <ul>
          <li><img src={checkMark} alt="Check Mark" />Перевірені майстри для вашого спокою</li>
          <li><img src={checkMark} alt="Check Mark" />Гарантія якості на всі виконані роботи</li>
          <li><img src={checkMark} alt="Check Mark" />Персоналізовані рішення під ваші потреби</li>
        </ul>
      </div>
      <div className="right-section">
        <h2>Увійдіть у ваш аккаутн</h2>

        <form className="auth_form" onSubmit={handleSubmit}>
      <div>
        <label>Введіть ім'я користувача</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Введіть ім'я користувача"
        />
      </div>

      <div>
        <label>Вкажіть email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Введіть email"
        />
      </div>

      <div>
        <label>Введіть пароль</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Придумайте пароль"
        />
      </div>

      <div>
        <label>Вкажіть номер телефону</label>
        <input 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          placeholder="Введіть номер телефону"
        />
      </div>

      <button type="submit">Продовжити</button>
    </form>


        <div className="or">ЧИ</div>
        <div className="social-buttons">
          <button className="google_email">
            <img src={googleIcon} alt="Google" />Продовжити з Google
          </button>
          <button
            className="google_email"
            onClick={() => window.location.href='../registration_step2/registr_step2_index.html'}
          >
            <img src={emailIcon} alt="Email" />Продовжити з email
          </button>
        </div>
        <div className="reg-if-no-acc">
          <p className='reg_step1_p'>Уже маєте аккаунт? <a><Link to="/register">
          <button className="regist-btn">Реєстрація</button></Link></a></p>
        </div>
      </div>
    </div>
    </div>
  );
};


export default Login2;