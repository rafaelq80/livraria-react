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
import FormProduto from "./pages/produtos/formproduto/FormProdutos"
import ListarProdutos from "./pages/produtos/listarprodutos/ListarProdutos"
import ListarProdutosPorNome from "./pages/produtos/listarprodutospornome/ListarProdutosPorNome"
import ListarRoles from "./pages/roles/listarroles/ListarRoles"
import AtualizarSenha from "./pages/usuarios/atualizarsenha/AtualizarSenha"
import CadastrarUsuario from "./pages/usuarios/cadastrarusuario/CadastrarUsuario"
import ListarUsuarios from "./pages/usuarios/listarusuarios/ListarUsuarios"
import Perfil from "./pages/usuarios/perfil/Perfil"
import RecuperarSenha from "./pages/usuarios/recuperarsenha/RecuperarSenha"
import PrivateRoute from "./routes/PrivateRoute"
import Footer from "./templates/footer/Footer"
import Navbar from "./templates/navbar/Navbar"
import NotFound from "./templates/notfound/NotFound"
import FormRole from "./pages/roles/formcategoria/FormRole"


function App() {
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
							<Route path="/login" element={<Login />} />
							<Route path="/cadastro" element={<CadastrarUsuario />} />
							<Route path="/produtos" element={<ListarProdutos />} />
							<Route path="/consultarnome/:titulo" element={<ListarProdutosPorNome />} />
							<Route path="/recuperarsenha" element={<RecuperarSenha />} />
							<Route path="/atualizarsenha" element={<AtualizarSenha />} />

							<Route element={<PrivateRoute />}>
								<Route path="/cadastrarproduto" element={<FormProduto />} />
								<Route path="/atualizarproduto/:id" element={<FormProduto />} />
								<Route path="/usuarios" element={<ListarUsuarios />} />
								<Route path="/editarusuario/:id" element={<CadastrarUsuario />} />
								<Route path="/perfil" element={<Perfil />} />
								<Route path="/roles" element={<ListarRoles />} />
								<Route path="/cadastrarrole" element={<FormRole />} />
								<Route path="/editarrole/:id" element={<FormRole />} />
								<Route path="/categorias" element={<ListarCategorias />} />
								<Route path="/cadastrarcategoria" element={<FormCategoria />} />
								<Route path="/editarcategoria/:id" element={<FormCategoria />} />
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
