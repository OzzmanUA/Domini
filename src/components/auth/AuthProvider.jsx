import React, { createContext, useState, useContext } from "react"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	userId: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState(null);

	const handleLogin = (token) => {
		const decodedUser = jwtDecode(token);
		const userId = decodedUser.sub;
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		setUser(decodedUser);
		setUserId(userId);
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ userId, user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}

