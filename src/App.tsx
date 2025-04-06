import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import { AuthProvider } from "./contexts/AuthContext"
import ListarAutores from "./pages/autores/listarautores/ListarAutores"
import FormCategoria from "./pages/categorias/formcategoria/FormCategoria"
import ListarCategorias from "./pages/categorias/listarcategorias/ListarCategorias"
import ListarEditoras from "./pages/editoras/listareditoras/ListarEditoras"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import FormProduto from "./pages/produtos/formproduto/FormProduto"
import ListarProdutos from "./pages/produtos/listarprodutos/ListarProdutos"
import ListarProdutosPorNome from "./pages/produtos/listarprodutosportitulo/ListarProdutosPorTitulo"
import ListarRoles from "./pages/roles/listarroles/ListarRoles"
import AtualizarSenha from "./pages/usuarios/atualizarsenha/AtualizarSenha"
import CadastrarUsuario from "./pages/usuarios/cadastrarusuario/CadastrarUsuario"
import ListarUsuarios from "./pages/usuarios/listarusuarios/ListarUsuarios"
import Perfil from "./pages/usuarios/perfil/Perfil"
import RecuperarSenha from "./pages/usuarios/recuperarsenha/RecuperarSenha"
import PrivateRoute from "./routes/PrivateRoute"
import Footer from "./templates/footer/Footer"
import Navbar from "./templates/navbar/Navbar"
import NotFound from "./templates/status/NotFound"
import FormRole from "./pages/roles/formrole/FormRole"
import Role from "./models/Role"
import Forbidden from "./templates/status/Forbidden"
import FormAutor from "./pages/autores/formautor/FormAutor"
import FormEditora from "./pages/editoras/formeditora/FormEditora"

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
			<AuthProvider>
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
							<Route
								path="/consultarnome/:titulo"
								element={<ListarProdutosPorNome />}
							/>
							<Route path="/recuperarsenha" element={<RecuperarSenha />} />
							<Route path="/atualizarsenha" element={<AtualizarSenha />} />

							<Route element={<PrivateRoute allowedRoles={[adminRole]} />}>
								<Route path="/cadastrarproduto" element={<FormProduto />} />
								<Route path="/atualizarproduto/:id" element={<FormProduto />} />
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
			</AuthProvider>
		</>
	)
}

export default App
