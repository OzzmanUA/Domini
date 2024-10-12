
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import Home from './pages/Home';
import NavBar from './components/common/NavBar'
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { Fragment } from "react";
import { redirect } from "react-router-dom";
import Login from "./components/auth/Login"
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

import PerformerProfilePay from './components/profiles/performer-profile-pay/performer-profile-pay'
import HomeReg from "./pages/HomeReg";
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

import FavouriteOfertsPage from "./pages/FavouriteOfertsPage";

import ExtendPerfProfile from "./pages/ExtendPerfProfile";

function App() {
// 	const [token, setToken] = useState();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }


  return (
	<AuthProvider>
    	<main>
			
				<Router>
					
					
					<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/pCatalog" element={<PCatalog />} />
					<Route path="/oCatalog" element={<OCatalog />} />
					<Route path="/perfProfile" element={<PerfProfile />} />
					<Route path="/perfProfilePay" element={<PerfProfilePay />} />
					<Route path="/orderP" element={<OrderP />} />
					<Route path="/customProfile" element={<CustomProfile />} />
					<Route path="/customProfileForPerf" element={<CustomProfileForPerf />} />
					<Route path="/listOrders" element={<ListOrders />} />
					<Route path="/favouriteOfertsPage" element={<FavouriteOfertsPage />} />
					<Route path="/extendPerfProfile" element={<ExtendPerfProfile />} />
					
					
					
					<Route 
						path="/private-information" 
						element={
						<RequireAuth>
							<Profile /> 
						</RequireAuth>
						}
						
					/>
					{/* <Route path="/profile" element={<Profile />} />	 */}
					
					<Route
 						path="/homereg"
  						element={
    					<RequireAuth>
      						<HomeReg />
    					</RequireAuth>
  						}

					/>
        			

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
