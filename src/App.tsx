import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import FormProduto from "./pages/produtos/formproduto/FormProdutos"
import ListarProdutos from "./pages/produtos/listarprodutos/ListarProdutos"
import ListarUsuarios from "./pages/usuarios/listarusuarios/ListarUsuarios"
import PrivateRoute from "./routes/PrivateRoute"


function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Navbar />
					<div className="min-h-[80vh] bg-slate-200">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/produtos" element={<ListarProdutos />} />

							<Route element={<PrivateRoute />}>
								<Route path="/cadastrarproduto" element={<FormProduto />} />
								<Route path="/atualizarproduto/:id" element={<FormProduto />} />
								<Route path="/usuarios" element={<ListarUsuarios />} />
							</Route>
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App
