import { MagnifyingGlass, ShoppingCart, SignOut, User } from "@phosphor-icons/react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {
	const navigate = useNavigate()

	const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext)

	function logout() {
		handleLogout()
		ToastAlerta("Usuário desconectado!", "info")
		navigate("/")
	}

	return (
		<div className="w-full bg-indigo-900 text-white flex justify-center p-4">
			<div className="container flex justify-between text-lg">
				<Link to="/">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.png?updatedAt=1737603351362"
						alt="Logo"
						className="w-60"
					/>
				</Link>

				<div className="flex-1 flex justify-center items-center relative w-30 text-black">
					<form
						className="w-3/4 flex justify-center"
						onSubmit={(e) => {
							e.preventDefault() // Impede o envio padrão do formulário
							console.log("Envio do formulário impedido!")
						}}
					>
						<input
							className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
							type="search"
							placeholder="Pesquisar produto"
							id="busca"
							name="busca"
							required
						/>
						<button
							type="submit"
							className="hover:bg-indigo-900 hover:border-white border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
						>
							<MagnifyingGlass size={14} weight="bold" className="fill-white" />
						</button>
					</form>
				</div>

				<div className="flex gap-4 py-4">
					{isAuthenticated && (
						<>
							<div className="relative group">
								<button className="hover:underline">E-Commerce</button>
								<div className="absolute left-0 hidden mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg group-hover:block w-36 z-40">
									<Link
										to="/cadastrarproduto"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-tl-lg rounded-tr-lg"
									>
										Novo Produto
									</Link>
									<Link
										to="/autores"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base"
									>
										Autores
									</Link>
									<Link
										to="/categorias"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base"
									>
										Categorias
									</Link>
									<Link
										to="/editoras"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-bl-lg rounded-br-lg"
									>
										Edtoras
									</Link>
								</div>
							</div>

							<div className="relative group">
								<button className="hover:underline">Configurações</button>
								<div className="absolute left-0 hidden mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg group-hover:block w-36 z-50">
									<Link
										to="/usuarios"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-tl-lg rounded-tr-lg"
									>
										Usuários
									</Link>
									<Link
										to="/roles"
										className="block px-4 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-bl-lg rounded-br-lg"
									>
										Roles
									</Link>
								</div>
							</div>

							<Link to="" onClick={logout} className="hover:underline">
								<SignOut size={32} weight="bold" />
							</Link>
						</>
					)}

					{isAuthenticated ? (
						<Link to="/Perfil">
							<img
								src={usuario.foto}
								alt={usuario.nome}
								className="border-transparent rounded-full w-8 h-8"
							/>
						</Link>
					) : (
						<Link to="/login" className="hover:underline">
							<User size={32} weight="bold" />
						</Link>
					)}

					<Link to="/carrinho">
						<ShoppingCart size={32} weight="bold" />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
