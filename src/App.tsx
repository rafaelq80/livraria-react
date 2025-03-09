import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import Footer from "./templates/footer/Footer"
import Navbar from "./templates/navbar/Navbar"
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import FormProduto from "./pages/produtos/formproduto/FormProdutos"
import ListarProdutos from "./pages/produtos/listarprodutos/ListarProdutos"
import ListarUsuarios from "./pages/usuarios/listarusuarios/ListarUsuarios"
import PrivateRoute from "./routes/PrivateRoute"
import ListarProdutosPorNome from "./pages/produtos/listarprodutospornome/ListarProdutosPorNome"
import ListarRoles from "./pages/roles/listarroles/ListarRoles"
import ListarCategorias from "./pages/categorias/listarcategorias/ListarCategorias"
import ListarEditoras from "./pages/editoras/listareditoras/ListarEditoras"
import ListarAutores from "./pages/autores/listarautores/ListarAutores"
import FormUsuario from "./pages/usuarios/cadastrarusuario/CadastrarUsuario"


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
							<Route path="/cadastro" element={<FormUsuario />} />
							<Route path="/produtos" element={<ListarProdutos />} />
							<Route path="/consultarnome/:titulo" element={<ListarProdutosPorNome />} />

							<Route element={<PrivateRoute />}>
								<Route path="/cadastrarproduto" element={<FormProduto />} />
								<Route path="/atualizarproduto/:id" element={<FormProduto />} />
								<Route path="/usuarios" element={<ListarUsuarios />} />
								<Route path="/roles" element={<ListarRoles />} />
								<Route path="/categorias" element={<ListarCategorias />} />
								<Route path="/editoras" element={<ListarEditoras />} />
								<Route path="/autores" element={<ListarAutores />} />
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
