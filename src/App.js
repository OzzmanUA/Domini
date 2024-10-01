
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import NavBar from './components/common/NavBar'
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
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

function App() {


  return (
    <main>
			<AuthProvider>
				<Router>
					{/* <NavBfar /> */}
					<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />	
					</Routes>

					<div className="App">
						<Header />
      					<Admin_UserList users={users} />
      					<Categories categories={categoriesList} />
						<CategoryForm/>
      					<Footer/>
					</div>

				</Router>
			</AuthProvider>			
		</main>
  );
}

export default App;
