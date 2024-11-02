
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import Home from './pages/Home';
import NavBar from './components/common/NavBar'
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { redirect } from "react-router-dom";
import Login from "./components/reg_step1/registration_step1";
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from './components/auth/RequireAuth';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Header_auth from './components/header/Header_auth'

import Registr_step1 from './components/reg_step1/registration_step1'
import Registration from './components/reg_step2/registration_step2'

import TopNoneAuth from './components/main_parts/top_none_auth/top_none_auth_index'
import PopServices from './components/main_parts/pop_services/pop_services_index'
import MiddleNonAuth from './components/main_parts/middle_none_auth/middle_none_auth_index'
import UsefulGuides from './components/main_parts/gaids/gaids_index'

import MiddleMainAuth from './components/main_parts_auth/middle_main_auth/middle_main_auth_index'
import TopMainAuth from './components/main_parts_auth/top_main_auth/top_main_auth_index'

import Categories from './components/main_parts_auth/categories/categories';
import categoriesList from './components/main_parts_auth/categories/categoriesList';

import Admin_UserList from './components/admin/admin_part'
import users from './components/admin/users_demo'
import CategoryForm from './components/admin/categories_admin_form'

import PerformerProfilePay from './components/profiles/performer-profile-pay/performer-profile-pay';
import Login2 from "./components/reg_step1/registration_step1";
import Profile from "./pages/Profile";

import PCatalog from "./pages/PCatalog";
import OCatalog from "./pages/OCatalog";

import PerfProfile from "./pages/PerfProfile";
import PerfProfilePay from "./pages/PerfProfilePay";

import OrderP from "./pages/OrderP";
import ListOrders from "./pages/ListOrders";

import CustomProfile from "./pages/CustomProfile";
import CustomProfileForPerf from "./pages/CustomProfileForPerf";
import ProtectedRoute from "./components/auth/ProtectedRoute";


import FavouriteOffersPage from "./pages/FavouriteOffersPage";
import ChatPg from "./pages/ChatPg";
import ExtendPerfProfile from "./pages/ExtendPerfProfile";
import ConversationsList from "./components/chat/ConversationsList";

import PChat from "./pages/PChat";

import ErrorPage from "./pages/ErrorPage";
import Chat from "./components/chat/chat";
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
  
	// Add logic to prevent page from rendering while we check authentication
	if (isAuthenticated === null) {
	  // While authentication is being checked, you can show a loading indicator
	  return <div>Loading...</div>;
	}
	// 	const [token, setToken] = useState();

	//   if(!token) {
	//     return <Login setToken={setToken} />
	//   }


  return (
	<AuthProvider>
    	<main>
			
				<Router>
					
					
					<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route path="/" element={isAuthenticated ? <Navigate to="/homereg" /> : <Home />} /> */}
					{/* <Route path="/" element={<Home />}/> */}
					<Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
					<Route path="/register" element={<Registration />} />
					{/* <Route path="/pCatalog" element={<PCatalog />} /> */}

					<Route path="/pcatalog/:categoryId" element={<PCatalog />} />
					{/* <Route path="/chat/:userId" element={<ChatPg />} /> */}
					{/* <Route path="/chat" element={<Chat />} /> */}
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
					
					



					{/* <Route path="/homereg" element={token ? <HomeReg /> : <Navigate to="/" />} /> */}
					<Route path="/private-information" element={ <Profile />} />
					
										
					
					{/* <Route 
						path="/private-information" 
						element={
						<RequireAuth>
							<Profile /> 
						</RequireAuth>
						}
						
					/> */}
					{/* <Route path="/profile" element={<Profile />} />	 */}
					
					{/* <Route
 						path="/homereg"
  						element={
    					<RequireAuth>
      						<HomeReg />
    					</RequireAuth>
  						}

					/> */}
					{/* <Route element={<ProtectedRoute />}>
          			<Route path="/private-information" element={<Profile />} />
        			</Route>

					<Route element={<ProtectedRoute />}>
          			<Route path="/homereg" element={<HomeReg />} />
        			</Route> */}
        			

					</Routes>
					

					{/* <div className="App">
						<Header />
      					<Admin_UserList users={users} />
      					<Categories categories={categoriesList} />
						<CategoryForm/>
      					<Footer/>
					</div> */}

				</Router>
				
					
		</main>
	</AuthProvider>	
  );
}

export default App;


