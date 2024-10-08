
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
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		username: "",
		email: "",
		password: "",
		phone: ""
	})
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/homereg"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })

			setIsLoggedIn(true);
			// this.props.history.push('/homereg')

		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
  }
	

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
        <h2>Створіть новий аккаунт</h2>
        <p className='reg_step1_p'>Уже маєте аккаунт? <a><Link to="/register"><button className="regist-btn">Реєстрація</button></Link></a></p>
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
          <div className="or">ЧИ</div>
          <div className="btns_ap_fec">
            <button className="apple_facebook">
              <img src={appleIcon} alt="Apple" />Apple
            </button>
            <button className="apple_facebook">
              <img src={facebookIcon} alt="Facebook" />Facebook
            </button>
          </div>
        </div>
        <p className="terms">
          Приєднуючись, ви погоджуєтесь з <a href="#">Умовами надання послуг Domini</a> та періодично отримувати від нас електронні листи. Будь ласка, прочитайте нашу <a href="#">Політику конфіденційності</a>, щоб дізнатися, як ми використовуємо ваші персональні дані.
        </p>
      </div>
    </div>
    </div>
  );
};


export default Login2;