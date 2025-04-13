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
import { DropdownMenu } from "./DropDownMenu"
import { DropDownMenuItem } from "./DropDownMenuItem"

function DesktopMenu() {
	const { usuario, isAuthenticated, logout } = useNavbar()

	return (
		<div className="hidden md:flex items-center gap-2 lg:gap-4 py-4 flex-shrink-0">
			{isAuthenticated && (
				<>
					<DropdownMenu title="E-Commerce">
						<DropDownMenuItem
							to="/listarprodutos"
							icon={<Book size={20} />}
							text="Produtos"
						/>
						<DropDownMenuItem
							to="/autores"
							icon={<IdentificationCard size={20} />}
							text="Autores"
						/>
						<DropDownMenuItem
							to="/categorias"
							icon={<Star size={20} />}
							text="Categorias"
						/>
						<DropDownMenuItem
							to="/editoras"
							icon={<Bookmark size={20} />}
							text="Editoras"
						/>
					</DropdownMenu>
					<DropdownMenu title="Configurações">
						<DropDownMenuItem
							to="/usuarios"
							icon={<Users size={20} />}
							text="Usuários"
						/>
						<DropDownMenuItem to="/roles" icon={<Prohibit size={20} />} text="Roles" />
					</DropdownMenu>
				</>
			)}

			{/* Menu do Usuário com ícone */}

			{isAuthenticated ? (
				<DropdownMenu
					icon={
						<img
							src={usuario.foto}
							alt={usuario.nome}
							className="border-transparent rounded-full w-8 h-8 lg:w-10 lg:h-10"
						/>
					}
				>
					<DropDownMenuItem to="/perfil" icon={<User size={20} />} text="Perfil" />
					<DropDownMenuItem
						to=""
						icon={<SignOut size={20} />}
						text="Sair"
						onClick={logout}
					/>
				</DropdownMenu>
			) : (
				<DropdownMenu 
					icon={<User size={28} className="flex-shrink-0" />}
					to="/login"
				>
				</DropdownMenu>
			)}

			{/* Carrinho */}
			<DropdownMenu
				to="/carrinho"
				icon={<ShoppingCart size={28} className="flex-shrink-0" />}
			>
			</DropdownMenu>
		</div>
	)
}

export default DesktopMenu
