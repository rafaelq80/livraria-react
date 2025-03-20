import {
	Book,
	Bookmark,
	IdentificationCard,
	Prohibit,
	ShoppingCart,
	SignOut,
	Star,
	User,
	Users,
} from "@phosphor-icons/react"
import { useNavbar } from "../../../hooks/navbar/useNavbar"
import { useSearchBar } from "../../../hooks/searchbar/useSearchBar"
import SearchBar from "../../searchbar/SearchBar"
import { MenuItem } from "./MenuItem"
import { MenuSection } from "./MenuSection"

interface MenuProps {
	mobileMenuOpen: boolean
	setMobileMenuOpen: (open: boolean) => void
}

function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }: MenuProps) {
	const { titulo, setTitulo, buscarProdutos } = useSearchBar()
	const { usuario, isAuthenticated, logout, dropdownOpen, toggleDropdown } =
		useNavbar(setMobileMenuOpen)

	return (
		<div
			className={`${
				mobileMenuOpen ? "max-h-screen" : "max-h-0"
			} md:hidden overflow-hidden transition-all duration-300 ease-in-out w-full bg-indigo-900`}
		>
			<div className="flex flex-col gap-2 p-4">
				<SearchBar titulo={titulo} setTitulo={setTitulo} buscarProdutos={buscarProdutos} />
				{isAuthenticated && (
					<>
						<MenuSection
							title="E-Commerce"
							menu="ecommerce"
							toggleDropdown={toggleDropdown}
							dropdownOpen={dropdownOpen.ecommerce}
						>
							<MenuItem
								to="/cadastrarproduto"
								icon={<Book size={20} />}
								text="Novo Produto"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/autores"
								icon={<IdentificationCard size={20} />}
								text="Autores"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/categorias"
								icon={<Star size={20} />}
								text="Categorias"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/editoras"
								icon={<Bookmark size={20} />}
								text="Editoras"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						</MenuSection>
						<MenuSection
							title="Configurações"
							menu="config"
							toggleDropdown={toggleDropdown}
							dropdownOpen={dropdownOpen.config}
						>
							<MenuItem
								to="/usuarios"
								icon={<Users size={20} />}
								text="Usuários"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/roles"
								icon={<Prohibit size={20} />}
								text="Roles"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						</MenuSection>
					</>
				)}
				<MenuItem
					to={isAuthenticated ? "/Perfil" : "/login"}
					icon={
						isAuthenticated ? (
							<img
								src={usuario.foto}
								alt={usuario.nome}
								className="w-6 h-6 rounded-full"
							/>
						) : (
							<User size={24} />
						)
					}
					text={isAuthenticated ? "Perfil" : "Login"}
					setMobileMenuOpen={setMobileMenuOpen}
				/>
				<MenuItem
					to="/carrinho"
					icon={<ShoppingCart size={24} />}
					text="Carrinho"
					setMobileMenuOpen={setMobileMenuOpen}
				/>
				{isAuthenticated && (
					<MenuItem
						to=""
						icon={<SignOut size={24} />}
						text="Sair"
						onClick={logout}
						setMobileMenuOpen={setMobileMenuOpen}
					/>
				)}
			</div>
		</div>
	)
}

export default MobileMenu
