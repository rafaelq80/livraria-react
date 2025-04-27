import { List, X } from "@phosphor-icons/react"
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
		selectSuggestion
	} = useSearchBar()

	return (
		<nav className="w-full bg-indigo-900 text-white">
			<div className="w-full flex justify-center">
				<div className="container">
					{/* Cabeçalho com logo, barra de pesquisa e menu */}
					<div className="flex flex-wrap md:flex-nowrap justify-between items-center p-2">
						{/* Logo */}
						<Link
							to="/"
							onClick={() => setMobileMenuOpen(false)}
							className="flex-shrink-0"
						>
							<img
								src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.png?updatedAt=1737603351362"
								alt="Logo"
								className="w-36 md:w-40 lg:w-48"
							/>
						</Link>

						{/* Barra de pesquisa no desktop - entre logo e menu */}
						<div className="hidden md:block flex-grow mx-2 lg:mx-4">
							<SearchBar
								titulo={titulo}
								setTitulo={setTitulo}
								buscarProdutos={buscarProdutos}
								suggestions={suggestions}
								selectSuggestion={selectSuggestion}
							/>
						</div>

						{/* Menu desktop */}
						<DesktopMenu />

						{/* Botão de menu hambúrguer - visível apenas em mobile */}
						<button className="md:hidden text-white" onClick={toggleMobileMenu}>
							{mobileMenuOpen ? (
								<X size={32} weight="bold" />
							) : (
								<List size={32} weight="bold" />
							)}
						</button>
					</div>

					{/* Menu Mobile - desliza abaixo do cabeçalho */}
					<MobileMenu
						mobileMenuOpen={mobileMenuOpen}
						setMobileMenuOpen={setMobileMenuOpen}
					/>
				</div>
			</div>
		</nav>
	)
}

export default Navbar