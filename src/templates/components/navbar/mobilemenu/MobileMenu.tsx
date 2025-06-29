import {
	BookIcon,
	BookmarkIcon,
	IdentificationCardIcon,
	ProhibitIcon,
	ShoppingCartIcon,
	SignOutIcon,
	StarIcon,
	UserIcon,
	UsersIcon
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

function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }: Readonly<MenuProps>) {
	const { titulo, setTitulo, buscarProdutos, suggestions, selectSuggestion } = useSearchBar()
	const { usuario, isAuthenticated, logout, dropdownOpen, toggleDropdown } =
		useNavbar(setMobileMenuOpen)

	return (
		<div
			className={`${
				mobileMenuOpen ? "max-h-screen" : "max-h-0"
			} md:hidden overflow-hidden transition-all duration-300 ease-in-out w-full bg-indigo-900`}
		>
			<div className="flex flex-col gap-2 p-4">
				<SearchBar
					titulo={titulo}
					setTitulo={setTitulo}
					buscarProdutos={buscarProdutos}
					onSearchSubmit={() => setMobileMenuOpen(false)}
					suggestions={suggestions}
					selectSuggestion={selectSuggestion}
				/>

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
								icon={<BookIcon size={20} />}
								text="Novo Produto"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/autores"
								icon={<IdentificationCardIcon size={20} />}
								text="Autores"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/categorias"
								icon={<StarIcon size={20} />}
								text="Categorias"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/editoras"
								icon={<BookmarkIcon size={20} />}
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
								icon={<UsersIcon size={20} />}
								text="Usuários"
								setMobileMenuOpen={setMobileMenuOpen}
							/>
							<MenuItem
								to="/roles"
								icon={<ProhibitIcon size={20} />}
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
								src={usuario.foto || "https://ik.imagekit.io/vzr6ryejm/profile/user_white.svg?updatedAt=1750919376967"}
								alt={usuario.nome || "Usuário"}
								className="w-6 h-6 rounded-full"
							/>
						) : (
							<UserIcon size={24} />
						)
					}
					text={isAuthenticated ? "Perfil" : "Login"}
					setMobileMenuOpen={setMobileMenuOpen}
				/>
				<MenuItem
					to="/carrinho"
					icon={<ShoppingCartIcon size={24} />}
					text="Carrinho"
					setMobileMenuOpen={setMobileMenuOpen}
				/>
				{isAuthenticated && (
					<MenuItem
						to=""
						icon={<SignOutIcon size={24} />}
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
