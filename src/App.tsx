import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"


import Home from "./pages/home/Home"

import ListarProdutos from "./produto/pages/ListarProdutos"
import Role from "./role/models/Role"
import Footer from "./templates/components/footer/Footer"
import Navbar from "./templates/components/navbar/Navbar"
import Forbidden from "./templates/pages/Forbidden"
import NotFound from "./templates/pages/NotFound"
import Login from "./security/pages/Login"
import PrivateRoute from "./routes/PrivateRoute"
import CadastrarUsuario from "./usuario/pages/FormUsuario"
import ListarUsuarios from "./usuario/pages"
import Perfil from "./usuario/pages/Perfil"
import ListarAutores from "./autor/pages"
import FormAutor from "./autor/pages/FormAutor"
import Carrinho from "./carrinho/Carrinho"
import ListarCategorias from "./categoria/pages"
import FormCategoria from "./categoria/pages/FormCategoria"
import ListarEditoras from "./editora/pages"
import FormEditora from "./editora/pages/FormEditora"
import IndexProdutos from "./produto/pages"
import FormProduto from "./produto/pages/FormProduto"
import ProdutoDetalhe from "./produto/pages/ProdutoDetalhe"
import ListarRoles from "./role/pages"
import FormRole from "./role/pages/FormRole"
import AtualizarSenha from "./security/pages/AtualizarSenha"
import RecuperarSenha from "./security/pages/RecuperarSenha"
import ListarProdutosPorTitulo from "./produto/pages/ListarProdutosPorTitulo"

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
						<Route path="/consultarnome/:titulo" element={<ListarProdutosPorTitulo />} />
						<Route path="/recuperarsenha" element={<RecuperarSenha />} />
						<Route path="/atualizarsenha" element={<AtualizarSenha />} />
						<Route path="/produtodetalhe/:id" element={<ProdutoDetalhe />} />
						<Route path="/carrinho" element={<Carrinho />} />

						 <Route element={<PrivateRoute allowedRoles={[adminRole]} />}>

						 	<Route path="/usuarios" element={<ListarUsuarios />} />
							<Route path="/listarprodutos" element={<IndexProdutos />} />
							<Route path="/cadastrarproduto" element={<FormProduto />} />
							<Route path="/editarproduto/:id" element={<FormProduto />} />
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
