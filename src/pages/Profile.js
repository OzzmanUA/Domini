// import "..bootstrap.min.css";
// import "..bootstrap.min.js";
import NavBar from '../components/common/NavBar'
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Login from "../components/auth/Login"
import { AuthProvider } from "../components/auth/AuthProvider"
import RequireAuth from '../components/auth/RequireAuth';
import MiddleNonAuth from '../components/main_parts/middle_none_auth/middle_none_auth_index';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Header_auth from '../components/header/Header_auth'

import Registr_step1 from '../components/reg_step1/registration_step1'
import Registration from '../components/reg_step2/registration_step2'

import TopNoneAuth from '../components/main_parts/top_none_auth/top_none_auth_index'
import PopServices from '../components/main_parts/pop_services/pop_services_index'

import UsefulGuides from '../components/main_parts/gaids/gaids_index'

import MiddleMainAuth from '../components/main_parts_auth/middle_main_auth/middle_main_auth_index'
import TopMainAuth from '../components/main_parts_auth/top_main_auth/top_main_auth_index'

import Categories from '../components/main_parts_auth/categories/categories';
import categoriesList from '../components/main_parts_auth/categories/categoriesList';

import Admin_UserList from '../components/admin/admin_part'
import users from '../components/admin/users_demo'
import CategoryForm from '../components/admin/categories_admin_form'
import { getAllCategories } from '../components/utils/ApiFunctions';

import ProfilesCatalog from '../components/catalog/profilesCatalog'

import PerformerProfile from '../components/profiles/performer-profile/performer-profile'
import { useAuth } from '../components/auth/AuthProvider';
import Order from '../components/order/order'
import AddCategory from '../components/admin/AddCategory';
import ProfileCard from '../components/catalog/profileCard';
import ProfilePage from '../components/catalog/ProfilePage';
import UserProfile from '../components/catalog/UserProfile';
import CreateTask from '../components/catalog/CreateTask';
import Logout from "../components/auth/Logout"
import AvatarUploadPage from '../components/catalog/AvatarUpload';
import UserTasks from '../components/catalog/UserTasks';
import ExtendedPerformerProfile from '../components/profiles/extended-performer-profile/extended-performer-profile';
import { useEffect, useState } from 'react';
import Page404 from '../components/404-page/404-page';

function Profile() {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const token = localStorage.getItem('token');
	useEffect(() => {
	  if (token) {
		setIsAuthenticated(true);
	  } else {
		setIsAuthenticated(false);
	  }
	}, [token]); 
	if (isAuthenticated === null) {
	  return <div>Loading...</div>;
	}
// const { username, token } = useAuth(); // Get userId and token from context
// console.log(useAuth());


  return (
    <main>
			
					{/* <NavBfar /> */}
					{/* <Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />	
					</Routes> */}

					<div className="profile">
					{isAuthenticated ? (
						<AuthProvider>
							<Header_auth />
							<ExtendedPerformerProfile/>					
      						<Footer/>
						</AuthProvider>
					) : (
						<AuthProvider>
							<Header />
							<Page404/>					
						  	<Footer/>
						</AuthProvider>

					)}
					</div>


						
		</main>
  );
}

export default Profile;