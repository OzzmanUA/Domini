import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
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
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}

			<h2>Register</h2>
			<form onSubmit={handleRegistration}>
				<div className="mb-3 row">
					<label htmlFor="username" className="col-sm-2 col-form-label">
						Username
					</label>
					<div className="col-sm-10">
						<input
							id="username"
							name="username"
							type="text"
							className="form-control"
							value={registration.username}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							type="text"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="phone" className="col-sm-2 col-form-label">
						Phone
					</label>
					<div className="col-sm-10">
						<input
							id="phone"
							name="phone"
							type="text"
							className="form-control"
							value={registration.phone}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Registration
