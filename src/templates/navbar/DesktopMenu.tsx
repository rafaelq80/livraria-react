import {
    Book,
    Bookmark,
    Prohibit,
    ShoppingCart,
    SignOut,
    Star,
    User,
    Users
} from "@phosphor-icons/react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function DesktopMenu() {
	const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext)
	const navigate = useNavigate()

	function logout() {
		handleLogout()
		ToastAlerta("Usuário desconectado!", "info")
		navigate("/")
	}

	return (
		<div className="hidden md:flex gap-4 py-4">
			{isAuthenticated && (
				<>
					<div className="relative group">
						<button className="hover:underline cursor-pointer">E-Commerce</button>
						<div className="absolute left-0 hidden mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg group-hover:block w-36 z-40">
							<Link
								to="/cadastrarproduto"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-tl-lg rounded-tr-lg"
							>
								<div className="flex items-center gap-1">
									<Book size={20} weight="bold" />
									Novo Produto
								</div>
							</Link>
							<Link
								to="/autores"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base"
							>
								<div className="flex items-center gap-1">
									<Users size={20} weight="bold" />
									Autores
								</div>
							</Link>
							<Link
								to="/categorias"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base"
							>
								<div className="flex items-center gap-1">
									<Star size={20} weight="bold" />
									Categorias
								</div>
							</Link>
							<Link
								to="/editoras"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-bl-lg rounded-br-lg"
							>
								<div className="flex items-center gap-1">
									<Bookmark size={20} weight="bold" />
									Editoras
								</div>
							</Link>
						</div>
					</div>

					<div className="relative group">
						<button className="hover:underline cursor-pointer">Configurações</button>
						<div className="absolute left-0 hidden mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg group-hover:block w-36 z-50">
							<Link
								to="/usuarios"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-tl-lg rounded-tr-lg"
							>
								<div className="flex items-center gap-1">
									<Users size={20} weight="bold" />
									Usuários
								</div>
							</Link>
							<Link
								to="/roles"
								className="block px-2 py-1 hover:bg-indigo-400 hover:text-white text-base rounded-bl-lg rounded-br-lg"
							>
								<div className="flex items-center gap-1">
									<Prohibit size={20} weight="bold" />
									Roles
								</div>
							</Link>
						</div>
					</div>
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

			{isAuthenticated && (
				<Link to="" onClick={logout} className="hover:underline">
					<SignOut size={32} weight="bold" />
				</Link>
			)}
		</div>
	)
}

export default DesktopMenu