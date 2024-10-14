// import "..bootstrap.min.css";
// import "..bootstrap.min.js";
import NavBar from '../components/common/NavBar'
// import NavBar from "./components/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { useContext } from 'react';

import Login from "./../components/auth/Login"
import { AuthProvider } from "./../components/auth/AuthProvider"
import RequireAuth from './../components/auth/RequireAuth';
import MiddleNonAuth from './../components/main_parts/middle_none_auth/middle_none_auth_index';
import Header from './../components/header/Header'
import Footer from './../components/footer/Footer'
import Header_auth from './../components/header/Header_auth'

import Registr_step1 from './../components/reg_step1/registration_step1'
import Registration from './../components/reg_step2/registration_step2'

import TopNoneAuth from './../components/main_parts/top_none_auth/top_none_auth_index'
import PopServices from './../components/main_parts/pop_services/pop_services_index'

import UsefulGuides from './../components/main_parts/gaids/gaids_index'

import MiddleMainAuth from './../components/main_parts_auth/middle_main_auth/middle_main_auth_index'
import TopMainAuth from './../components/main_parts_auth/top_main_auth/top_main_auth_index'

import Categories from './../components/main_parts_auth/categories/categories';
import categoriesList from './../components/main_parts_auth/categories/categoriesList';

import Admin_UserList from './../components/admin/admin_part'
import users from './../components/admin/users_demo'
import CategoryForm from './../components/admin/categories_admin_form'

import CustomerProfile from '../components/profiles/customer-profile/customer-profile'
import CustomerProfileForThePerformer from '../components/profiles/customer-profile-for-the-performer/customer-profile-for-the-performer'

import PerformerProfilePay from './../components/profiles/performer-profile-pay/performer-profile-pay'
import HomeReg from './HomeReg';
import { getAllParentCategories } from '../components/utils/ApiFunctions';

import UserOrdersList from '../components/user-order-list/user-order-list'

import FavoriteOffers from '../components/user-suggestions/favorite-offers/favorite-offers'

import ExtendedpPerformerProfile from '../components/profiles/extended-performer-profile/extended-performer-profile'

import { getAllCategories } from '../components/utils/ApiFunctions';
import { useState, useEffect } from 'react';




function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const token = localStorage.getItem('token');
	const categoriesList2 = getAllCategories()
  
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
	// const categoriesList2 = getAllParentCategories()
	// console.log (getAllParentCategories)



  return (
    <main>
		<div className="Home">
		{isAuthenticated ? (


			<AuthProvider>
				<div>
						<Header_auth />
						<TopMainAuth/>
						<MiddleMainAuth />
						<Categories categories={categoriesList2} />
						<UsefulGuides/>
		  				<Footer/>
				</div>
			</AuthProvider>
		) : (
			<AuthProvider>

				{/* <NavBfar /> */}
				<div>
	
						<Header />
						<TopNoneAuth/>
						<PopServices/>
						<MiddleNonAuth />
						<UsefulGuides/>
	
						<Footer/>
				</div>
	
	
			</AuthProvider>
		)}
		</div>		
		</main>
  );
}

export default Home;