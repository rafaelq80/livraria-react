import { MagnifyingGlass, ShoppingCart, SignOut, User, List, X } from "@phosphor-icons/react"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

// Definindo tipos para os dropdowns
type DropdownMenus = "ecommerce" | "config"
type DropdownState = {
	ecommerce: boolean
	config: boolean
}

function Navbar() {
	const navigate = useNavigate()

	const [titulo, setTitulo] = useState<string>("")

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
		ecommerce: false,
		config: false,
	})

	const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext)

	function handleBuscarProdutos(e: ChangeEvent<HTMLInputElement>) {
		setTitulo(e.target.value)
	}

	function buscarProdutos(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		navigate(`/consultarnome/${titulo}`)
		setTitulo("")
	}

	function logout() {
		handleLogout()
		ToastAlerta("Usuário desconectado!", "info")
		setMobileMenuOpen(false) // Fechar menu ao fazer logout
		navigate("/")
	}

	function toggleMobileMenu() {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	function toggleDropdown(menu: DropdownMenus) {
		setDropdownOpen({
			...dropdownOpen,
			[menu]: !dropdownOpen[menu],
		})
	}

	return (
		<div className="w-full bg-indigo-900 text-white flex justify-center p-4">
			<div className="container flex flex-col md:flex-row justify-between text-lg">
				{/* Cabeçalho com logo e botão de menu */}
				<div className="flex justify-between items-center">
					<Link to="/" onClick={() => setMobileMenuOpen(false)}>
						<img
							src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.png?updatedAt=1737603351362"
							alt="Logo"
							className="w-40 md:w-60"
						/>
					</Link>

					{/* Botão de menu hambúrguer - visível apenas em mobile */}
					<button className="md:hidden text-white" onClick={toggleMobileMenu}>
						{mobileMenuOpen ? (
							<X size={32} weight="bold" />
						) : (
							<List size={32} weight="bold" />
						)}
					</button>
				</div>

				{/* Barra de pesquisa mobile - posicionada abaixo do logo */}
				<div className="md:hidden mt-4 text-black w-full">
					<form className="w-full flex justify-center" onSubmit={buscarProdutos}>
						<input
							className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
							type="search"
							placeholder="Informe o título do livro"
							id="busca-mobile"
							name="titulo"
							required
							value={titulo}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
						/>
						<button
							type="submit"
							className="hover:bg-indigo-900 hover:border-white border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
						>
							<MagnifyingGlass size={14} weight="bold" className="fill-white" />
						</button>
					</form>
				</div>

				{/* Barra de pesquisa desktop - original entre logo e ícones */}
				<div className="hidden md:flex flex-1 justify-center items-center relative w-30 text-black">
					<form className="w-3/4 flex justify-center" onSubmit={buscarProdutos}>
						<input
							className="w-10/12 h-9 rounded-lg px-4 py-4 focus:outline-none"
							type="search"
							placeholder="Informe o título do livro"
							id="busca-desktop"
							name="titulo"
							required
							value={titulo}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
						/>
						<button
							type="submit"
							className="hover:bg-indigo-900 hover:border-white border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
						>
							<MagnifyingGlass size={14} weight="bold" className="fill-white" />
						</button>
					</form>
				</div>

				{/* Ícones desktop - original do lado direito */}
				<div className="hidden md:flex gap-4 py-4">
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
										Editoras
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

				{/* Menu mobile - vertical */}
				<div
					className={`${
						mobileMenuOpen ? "flex" : "hidden"
					} md:hidden flex-col gap-2 mt-4`}
				>
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
											Novo Produto
										</Link>
										<Link
											to="/autores"
											className="block py-2 hover:bg-indigo-800 px-2 rounded"
											onClick={() => setMobileMenuOpen(false)}
										>
											Autores
										</Link>
										<Link
											to="/categorias"
											className="block py-2 hover:bg-indigo-800 px-2 rounded"
											onClick={() => setMobileMenuOpen(false)}
										>
											Categorias
										</Link>
										<Link
											to="/editoras"
											className="block py-2 hover:bg-indigo-800 px-2 rounded"
											onClick={() => setMobileMenuOpen(false)}
										>
											Editoras
										</Link>
									</div>
								)}
							</div>

							{/* Menu Configurações para mobile */}
							<div>
								<button
									className="w-full text-left py-2 hover:bg-indigo-800 px-2 rounded"
									onClick={() => toggleDropdown("config")}
								>
									Configurações
								</button>
								{dropdownOpen.config && (
									<div className="pl-4 space-y-2 mt-1">
										<Link
											to="/usuarios"
											className="block py-2 hover:bg-indigo-800 px-2 rounded"
											onClick={() => setMobileMenuOpen(false)}
										>
											Usuários
										</Link>
										<Link
											to="/roles"
											className="block py-2 hover:bg-indigo-800 px-2 rounded"
											onClick={() => setMobileMenuOpen(false)}
										>
											Roles
										</Link>
									</div>
								)}
							</div>
						</>
					)}

					{isAuthenticated ? (
						<Link
							to="/Perfil"
							className="flex items-center py-2 hover:bg-indigo-800 px-2 rounded"
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
							className="flex items-center py-2 hover:bg-indigo-800 px-2 rounded"
							onClick={() => setMobileMenuOpen(false)}
						>
							<User size={24} weight="bold" className="mr-2" />
							<span>Login</span>
						</Link>
					)}

					<Link
						to="/carrinho"
						className="flex items-center py-2 hover:bg-indigo-800 px-2 rounded"
						onClick={() => setMobileMenuOpen(false)}
					>
						<ShoppingCart size={24} weight="bold" className="mr-2" />
						<span>Carrinho</span>
					</Link>

					{isAuthenticated && (
						<Link
							to=""
							onClick={logout}
							className="flex items-center py-2 hover:bg-indigo-800 px-2 rounded"
						>
							<SignOut size={24} weight="bold" className="mr-2" />
							<span>Sair</span>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
