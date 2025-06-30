import { ListIcon, XIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useSearchBar } from "../../hooks/searchbar/useSearchBar"
import DesktopMenu from "./desktopmenu/DesktopMenu"
import MobileMenu from "./mobilemenu/MobileMenu"
import SearchBar from "../searchbar/SearchBar"

function Navbar() {
	const {
		titulo,
		setTitulo,
		mobileMenuOpen,
		setMobileMenuOpen,
		buscarProdutos,
		toggleMobileMenu,
		suggestions,
		selectSuggestion,
	} = useSearchBar()

	return (
		<div className="relative z-50">
			{/* Navbar fixa e compacta */}
			<div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-900 to-indigo-800 shadow-lg shadow-indigo-950/30 rounded-b-2xl overflow-visible">
				<div className="relative h-28 md:h-32 lg:h-36 overflow-visible">
					{/* Ondas decorativas */}
					<svg
						className="absolute bottom-0 left-0 w-full h-10 md:h-14"
						viewBox="0 0 1440 100"
						preserveAspectRatio="none"
					>
						<path
							d="M0,0 C360,95 720,100 1080,80 C1260,70 1440,90 1440,100 L1440,100 L0,100 Z"
							fill="#C7D2FE"
							fillOpacity="0.2"
						/>
					</svg>
					<svg
						className="absolute bottom-0 left-0 w-full h-8 md:h-12"
						viewBox="0 0 1440 100"
						preserveAspectRatio="none"
					>
						<path
							d="M0,20 C240,60 480,30 720,40 C960,50 1200,100 1440,80 L1440,100 L0,100 Z"
							fill="#818CF8"
							fillOpacity="0.3"
						/>
					</svg>

					{/* Conteúdo da Navbar */}
					<div className="container mx-auto relative z-10 h-full flex items-center justify-between px-4 text-white text-base md:text-lg">
						{/* Logo alinhado */}
						<Link
							to="/"
							onClick={() => setMobileMenuOpen(false)}
							className="flex items-center"
						>
							<img
								src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.png?updatedAt=1737603351362"
								alt="Logo"
								className="w-48 md:w-56 lg:w-60 transition-transform duration-300 hover:scale-105"
							/>
						</Link>

						{/* Barra de pesquisa - visível apenas em desktop */}
						<div className="hidden md:flex flex-grow mx-6">
							<SearchBar
								titulo={titulo}
								setTitulo={setTitulo}
								buscarProdutos={buscarProdutos}
								suggestions={suggestions}
								selectSuggestion={selectSuggestion}
							/>
						</div>

						{/* Menu Desktop */}
						<div className="hidden md:block">
							<DesktopMenu />
						</div>

						{/* Botão do menu mobile (sem bordas arredondadas) */}
						<button
							className="md:hidden p-3 hover:bg-indigo-600 transition duration-300"
							onClick={toggleMobileMenu}
						>
							{mobileMenuOpen ? (
								<XIcon size={28} weight="bold" />
							) : (
								<ListIcon size={28} weight="bold" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Espaço compensatório */}
			<div className="h-28 md:h-32 lg:h-36"></div>

			{/* Mobile Menu (sem SearchBar visível no mobile) */}
			<div className="container mx-auto relative z-10 text-white">
				<MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
			</div>
		</div>
	)
}

export default Navbar
