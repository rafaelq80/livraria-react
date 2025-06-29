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
							icon={<BookIcon size={20} />}
							text="Produtos"
						/>
						<DropDownMenuItem
							to="/autores"
							icon={<IdentificationCardIcon size={20} />}
							text="Autores"
						/>
						<DropDownMenuItem
							to="/categorias"
							icon={<StarIcon size={20} />}
							text="Categorias"
						/>
						<DropDownMenuItem
							to="/editoras"
							icon={<BookmarkIcon size={20} />}
							text="Editoras"
						/>
					</DropdownMenu>
					<DropdownMenu title="Configurações">
						<DropDownMenuItem
							to="/usuarios"
							icon={<UsersIcon size={20} />}
							text="Usuários"
						/>
						<DropDownMenuItem to="/roles" icon={<ProhibitIcon size={20} />} text="Roles" />
					</DropdownMenu>
				</>
			)}

			{/* Menu do Usuário com ícone */}

			{isAuthenticated ? (
				<DropdownMenu
					icon={
						<img
							src={usuario.foto || "https://ik.imagekit.io/vzr6ryejm/profile/user_white.svg?updatedAt=1750919376967"}
							alt={usuario.nome || "Usuário"}
							className="border-transparent rounded-full w-8 h-8 lg:w-10 lg:h-10"
						/>
					}
				>
					<DropDownMenuItem to="/perfil" icon={<UserIcon size={20} />} text="Perfil" />
					<DropDownMenuItem
						to=""
						icon={<SignOutIcon size={20} />}
						text="Sair"
						onClick={logout}
					/>
				</DropdownMenu>
			) : (
				<DropdownMenu 
					icon={<UserIcon size={28} className="flex-shrink-0" />}
					to="/login"
				>
				</DropdownMenu>
			)}

			{/* Carrinho */}
			<DropdownMenu
				to="/carrinho"
				icon={<ShoppingCartIcon size={28} className="flex-shrink-0" />}
			>
			</DropdownMenu>
		</div>
	)
}

export default DesktopMenu
