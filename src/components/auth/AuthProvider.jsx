// import React, { createContext, useState, useContext } from "react"
// import {jwtDecode} from "jwt-decode"

// export const AuthContext = createContext({
// 	user: null,
// 	userId: null,
// 	handleLogin: (token) => {},
// 	handleLogout: () => {}
// })

// export const AuthProvider = ({ children }) => {
// 	const [user, setUser] = useState(null);
// 	const [userId, setUserId] = useState(null);

// 	const handleLogin = (token) => {
// 		const decodedUser = jwtDecode(token);
// 		const userId = decodedUser.sub;
// 		localStorage.setItem("userId", decodedUser.sub)
// 		localStorage.setItem("userRole", decodedUser.roles)
// 		localStorage.setItem("token", token)
// 		setUser(decodedUser);
// 		setUserId(userId);
// 	}

// 	const handleLogout = () => {
// 		localStorage.removeItem("userId")
// 		localStorage.removeItem("userRole")
// 		localStorage.removeItem("token")
// 		setUser(null)
// 	}

// 	return (
// 		<AuthContext.Provider value={{ userId, user, handleLogin, handleLogout }}>
// 			{children}
// 		</AuthContext.Provider>
// 	)
// }

// export const useAuth = () => {
// 	return useContext(AuthContext)
// }


import React, { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode"; // Ensure you import jwtDecode correctly

export const AuthContext = createContext({
  user: null,
  username: null, // Add username to the context
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null); // Store username separately

  const handleLogin = (token) => {
    // try {
      console.log(token);
      const decodedUser = jwtDecode(token); // Decode token immediately
      const usernameFromToken = decodedUser.sub; // Access username from decoded token (assumed to be 'sub')

      // Debugging logs
      console.log("Decoded User:", decodedUser);
      console.log("Decoded Username:", usernameFromToken);


      // Save decoded information
      localStorage.setItem("username", usernameFromToken); // Save username in localStorage
      localStorage.setItem("userRole", decodedUser.roles); // Save roles
      localStorage.setItem("token", token); // Save token

      setUser(decodedUser); // Save decoded user object
      setUserName(usernameFromToken); // Save userId in state
    // } catch (error) {
    //   console.error("Error decoding token:", error);
    // }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");

    setUser(null);
    setUserName(null); // Clear the userId state
  };

  return (
    <AuthContext.Provider value={{ user, username, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};