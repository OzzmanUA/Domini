
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Login from "./component/auth/Login"
import Registration from "./component/auth/Registration"
import { AuthProvider } from "./component/auth/AuthProvider"


function App() {
  return (
    <main className="container mt-5">
			<AuthProvider>
				<Router>
					<NavBar />
					<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
					</Routes>
				</Router>
			</AuthProvider>
		</main>
  );
}

export default App;
