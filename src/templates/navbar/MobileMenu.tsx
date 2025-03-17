import { User, ShoppingCart, SignOut, Book, Bookmark, Prohibit, Star, Users } from "@phosphor-icons/react"
import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { DropdownState, DropdownMenus } from "../../types/MenuTypes"

function MobileMenu({
	mobileMenuOpen,
	setMobileMenuOpen,
}: {
	mobileMenuOpen: boolean
	setMobileMenuOpen: (open: boolean) => void
}) {
	const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext)
	const navigate = useNavigate()
	const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
		ecommerce: false,
		config: false,
	})

	function toggleDropdown(menu: DropdownMenus) {
		setDropdownOpen({
			...dropdownOpen,
			[menu]: !dropdownOpen[menu],
		})
	}

	function logout() {
		handleLogout()
		ToastAlerta("Usuário desconectado!", "info")
		setMobileMenuOpen(false)
		navigate("/")
	}

	return (
		<div
			className={`${
				mobileMenuOpen ? "max-h-screen" : "max-h-0"
			} md:hidden overflow-hidden transition-all duration-300 ease-in-out w-full bg-indigo-900`}
		>
			<div className="flex flex-col gap-2 p-4">
				{isAuthenticated && (
					<>
						{/* Menu E-Commerce para mobile */}
						<div>
							<button
								className="w-full text-left py-2 hover:bg-indigo-400 px-2 rounded transition-colors duration-200"
								onClick={() => toggleDropdown("ecommerce")}
							>
								E-Commerce
							</button>
							{dropdownOpen.ecommerce && (
								<div className="pl-4 space-y-2 mt-1">
									<Link
										to="/cadastrarproduto"
										className="block py-2 hover:bg-indigo-400 px-2 rounded transition-colors duration-200"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Book size={20} weight="bold" />
											Novo Produto
										</div>
									</Link>
									<Link
										to="/autores"
										className="block py-2 hover:bg-indigo-400 px-2 rounded"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Users size={20} weight="bold" />
											Autores
										</div>
									</Link>
									<Link
										to="/categorias"
										className="block py-2 hover:bg-indigo-400 px-2 rounded"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Star size={20} weight="bold" />
											Categorias
										</div>
									</Link>
									<Link
										to="/editoras"
										className="block py-2 hover:bg-indigo-400 px-2 rounded"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Bookmark size={20} weight="bold" />
											Editoras
										</div>
									</Link>
								</div>
							)}
						</div>

						{/* Menu Configurações para mobile */}
						<div>
							<button
								className="w-full text-left py-2 hover:bg-indigo-400 px-2 rounded"
								onClick={() => toggleDropdown("config")}
							>
								Configurações
							</button>
							{dropdownOpen.config && (
								<div className="pl-4 space-y-2 mt-1">
									<Link
										to="/usuarios"
										className="block py-2 hover:bg-indigo-400 px-2 rounded"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Users size={20} weight="bold" />
											Usuários
										</div>
									</Link>
									<Link
										to="/roles"
										className="block py-2 hover:bg-indigo-400 px-2 rounded"
										onClick={() => setMobileMenuOpen(false)}
									>
										<div className="flex items-center gap-1">
											<Prohibit size={20} weight="bold" />
											Roles
										</div>
									</Link>
								</div>
							)}
						</div>
					</>
				)}

				{isAuthenticated ? (
					<Link
						to="/Perfil"
						className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded"
						onClick={() => setMobileMenuOpen(false)}
					>
						<img
							src={usuario.foto}
							alt={usuario.nome}
							className="border-transparent rounded-full w-6 h-6 mr-2"
						/>
						<span>Perfil</span>
					</Link>
				) : (
					<Link
						to="/login"
						className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded"
						onClick={() => setMobileMenuOpen(false)}
					>
						<User size={24} weight="bold" className="mr-2" />
						<span>Login</span>
					</Link>
				)}

				<Link
					to="/carrinho"
					className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded"
					onClick={() => setMobileMenuOpen(false)}
				>
					<ShoppingCart size={24} weight="bold" className="mr-2" />
					<span>Carrinho</span>
				</Link>

				{isAuthenticated && (
					<Link
						to=""
						onClick={logout}
						className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded"
					>
						<SignOut size={24} weight="bold" className="mr-2" />
						<span>Sair</span>
					</Link>
				)}
			</div>
		</div>
	)
}

export default MobileMenu
