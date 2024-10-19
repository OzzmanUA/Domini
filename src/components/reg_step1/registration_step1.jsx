
import './reg_step1_style.css';

// Импорт изображений
import checkMark from '../images/check_mark.png';
import googleIcon from '../images/icon_google.png';
import emailIcon from '../images/icon_email.png';
import appleIcon from '../images/icon_apple.png';
import facebookIcon from '../images/icon_facebook.png';
import leftSideImage from '../images/left_side.png';
import React, { useState, useEffect } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../auth/AuthProvider';
import HomeButton from '../common/Homebutton';
import BackLink from '../common/Goback';

const Login = () => {
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
  const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		username: "",
		email: "",
		password: "",
		phone: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

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
      <BackLink />
        <h2>Увійдіть у ваш аккаунт</h2>

        <form className="auth_form" onSubmit={handleSubmit}>
      <div>
        <label>Введіть ім'я користувача</label>
        <input 
          id="username"
          name="username"
          type="text" 
          className="form-control"
          value={login.username} 
          onChange={handleInputChange} 
          placeholder="Введіть ім'я користувача"
        />
      </div>

      <div>
        <label>Вкажіть email</label>
        <input 
          id="email"
          name="email"
          type="email" 
          className="form-control"
          value={login.email} 
          onChange={handleInputChange} 
          placeholder="Введіть email"
        />
      </div>

      <div>
        <label>Введіть пароль</label>
        <input 
          id="password"
          name="password"
          type="password" 
          className="form-control"
          value={login.password} 
          onChange={handleInputChange} 
          placeholder="Пароль"
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


export default Login;




// const Login = () => {
// 	const [errorMessage, setErrorMessage] = useState("")
// 	const [login, setLogin] = useState({
// 		username: "",
// 		email: "",
// 		password: "",
// 		phone: ""
// 	})

// 	const navigate = useNavigate()
// 	const auth = useAuth()
// 	const location = useLocation()
// 	const redirectUrl = location.state?.path || "/"

// 	const handleInputChange = (e) => {
// 		setLogin({ ...login, [e.target.name]: e.target.value })
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		const success = await loginUser(login)
// 		if (success) {
// 			const token = success.token
// 			auth.handleLogin(token)
// 			navigate(redirectUrl, { replace: true })

			

// 			// this.props.history.push('/homereg')

// 		} else {
// 			setErrorMessage("Invalid username or password. Please try again.")
// 		}
// 		setTimeout(() => {
// 			setErrorMessage("")
// 		}, 4000)
// 	}



// 	return (
// 		<section className="container col-6 mt-5 mb-5">
// 			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
// 			<h2>Login</h2>
// 			<HomeButton />
// 			<form onSubmit={handleSubmit}>
// 			<div className="mb-3 row">
// 					<label htmlFor="username" className="col-sm-2 col-form-label">
// 						Username
// 					</label>
// 					<div className="col-sm-10">
// 						<input
// 							id="username"
// 							name="username"
// 							type="text"
// 							className="form-control"
// 							value={login.username}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="mb-3 row">
// 					<label htmlFor="email" className="col-sm-2 col-form-label">
// 						Email
// 					</label>
// 					<div className="col-sm-10">
// 						<input
// 							id="email"
// 							name="email"
// 							type="email"
// 							className="form-control"
// 							value={login.email}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="mb-3 row">
// 					<label htmlFor="password" className="col-sm-2 col-form-label">
// 						Password
// 					</label>
// 					<div className="col-sm-10">
// 						<input
// 							type="password"
// 							className="form-control"
// 							id="password"
// 							name="password"
// 							value={login.password}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="mb-3 row">
// 					<label htmlFor="phone" className="col-sm-2 col-form-label">
// 						Phone
// 					</label>
// 					<div className="col-sm-10">
// 						<input
// 							id="phone"
// 							name="phone"
// 							type="text"
// 							className="form-control"
// 							value={login.phone}
// 							onChange={handleInputChange}
// 						/>
// 					</div>
// 				</div>

// 				<div className="mb-3">
// 					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
// 						Login
// 					</button>
// 					<span style={{ marginLeft: "10px" }}>
// 						Don't' have an account yet?<Link to={"/register"}> Register</Link>
// 					</span>
// 				</div>
// 			</form>
// 		</section>
// 	)
// }

// export default Login