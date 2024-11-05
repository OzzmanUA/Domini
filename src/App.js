
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import Home from './pages/Home';
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/reg_step1/registration_step1";
import { AuthProvider } from "./components/auth/AuthProvider"
import Registration from './components/reg_step2/registration_step2'
import Profile from "./pages/Profile";
import PCatalog from "./pages/PCatalog";
import OCatalog from "./pages/OCatalog";
import PerfProfile from "./pages/PerfProfile";
import PerfProfilePay from "./pages/PerfProfilePay";
import OrderP from "./pages/OrderP";
import ListOrders from "./pages/ListOrders";
import CustomProfile from "./pages/CustomProfile";
import CustomProfileForPerf from "./pages/CustomProfileForPerf";
import FavouriteOffersPage from "./pages/FavouriteOffersPage";
import ChatPg from "./pages/ChatPg";
import ExtendPerfProfile from "./pages/ExtendPerfProfile";
import PChat from "./pages/PChat";
import ErrorPage from "./pages/ErrorPage";
import OrderG from "./pages/OrderG";
import Adminpg from "./pages/Adminpg";
function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const token = localStorage.getItem('token');
  
	useEffect(() => {
	  // Check if token exists in localStorage
	  if (token) {
		setIsAuthenticated(true);
	  } else {
		setIsAuthenticated(false);
	  }
	}, [token]); // Only run this effect if the token changes
  

	if (isAuthenticated === null) {
	  // While authentication is being checked, you can show a loading indicator
	  return <div>Loading...</div>;
	}



  return (
	<AuthProvider>
    	<main>
			
				<Router>
					
					
					<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/pcatalog/:categoryId" element={<PCatalog />} />
					<Route path="/chat" element={<ChatPg />} />
					<Route path="/admin" element={<Adminpg />} />
					<Route path="/oCatalog/:categoryId/tasks" element={<OCatalog />} />
					<Route path="/perfProfile/:userId" element={<PerfProfile />} />
					<Route path="/perfProfilePay" element={<PerfProfilePay />} />
					<Route path="/orderP/:userId" element={<OrderP />} />
					<Route path="/order" element={<OrderG />} />
					<Route path="/customProfile" element={<CustomProfile />} />
					<Route path="/favouriteOffersPage" element={<FavouriteOffersPage />} />
					<Route path="/customProfileForPerf" element={<CustomProfileForPerf />} />
					<Route path="/extendPerfProfile" element={<ExtendPerfProfile />} />
					<Route path="/pChat" element={<PChat />} />
					<Route path="/errorPage" element={<ErrorPage />} />
					<Route path="/listOrders" element={<ListOrders />}/>
					<Route path="/private-information" element={ <Profile />} />

					</Routes>				
				</Router>
				
					
		</main>
	</AuthProvider>	
  );
}

export default App;


