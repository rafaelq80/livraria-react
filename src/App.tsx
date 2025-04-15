import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import Role from "./models/Role"
import ListarAutores from "./pages/autores"
import FormAutor from "./pages/autores/FormAutor"
import ListarCategorias from "./pages/categorias"
import FormCategoria from "./pages/categorias/FormCategoria"
import ListarEditoras from "./pages/editoras"
import FormEditora from "./pages/editoras/FormEditora"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import IndexProdutos from "./pages/produtos"
import FormProduto from "./pages/produtos/FormProduto"
import ListarProdutos from "./pages/produtos/ListarProdutos"
import ListarProdutosPorNome from "./pages/produtos/ListarProdutosPorTitulo"
import AtualizarSenha from "./pages/recuperarsenha/AtualizarSenha"
import RecuperarSenha from "./pages/recuperarsenha/RecuperarSenha"
import ListarRoles from "./pages/roles"
import FormRole from "./pages/roles/FormRole"
import CadastrarUsuario from "./pages/usuarios/FormUsuario"
import ListarUsuarios from "./pages/usuarios/index"
import Perfil from "./pages/usuarios/Perfil"
import PrivateRoute from "./routes/PrivateRoute"
import Footer from "./templates/footer/Footer"
import Navbar from "./templates/navbar/Navbar"
import Forbidden from "./templates/status/Forbidden"
import NotFound from "./templates/status/NotFound"

function App() {
	const adminRole: Role = {
		id: 1,
		nome: "admin",
		descricao: "Admninistrador",
	}

	const userRole: Role = {
		id: 2,
		nome: "user",
		descricao: "Usuário",
	}

	return (
		<>
			<ToastContainer />
			<BrowserRouter>
				<Navbar />
				<div className="md:min-h-[80vh] bg-slate-200">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/forbidden" element={<Forbidden />} />
						<Route path="/login" element={<Login />} />
						<Route path="/cadastro" element={<CadastrarUsuario />} />
						<Route path="/produtos" element={<ListarProdutos />} />
						<Route path="/consultarnome/:titulo" element={<ListarProdutosPorNome />} />
						<Route path="/recuperarsenha" element={<RecuperarSenha />} />
						<Route path="/atualizarsenha" element={<AtualizarSenha />} />

						<Route element={<PrivateRoute allowedRoles={[adminRole]} />}>
							<Route path="/listarprodutos" element={<IndexProdutos />} />
							<Route path="/cadastrarproduto" element={<FormProduto />} />
							<Route path="/editarproduto/:id" element={<FormProduto />} />
							<Route path="/usuarios" element={<ListarUsuarios />} />
							<Route path="/roles" element={<ListarRoles />} />
							<Route path="/cadastrarrole" element={<FormRole />} />
							<Route path="/editarrole/:id" element={<FormRole />} />
							<Route path="/categorias" element={<ListarCategorias />} />
							<Route path="/cadastrarcategoria" element={<FormCategoria />} />
							<Route path="/editarcategoria/:id" element={<FormCategoria />} />
							<Route path="/editoras" element={<ListarEditoras />} />
							<Route path="/cadastrareditora" element={<FormEditora />} />
							<Route path="/editareditora/:id" element={<FormEditora />} />
							<Route path="/autores" element={<ListarAutores />} />
							<Route path="/cadastrarautor" element={<FormAutor />} />
							<Route path="/editarautor/:id" element={<FormAutor />} />
						</Route>

						<Route element={<PrivateRoute allowedRoles={[adminRole, userRole]} />}>
							<Route path="/editarusuario/:id" element={<CadastrarUsuario />} />
							<Route path="/perfil" element={<Perfil />} />
						</Route>
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
