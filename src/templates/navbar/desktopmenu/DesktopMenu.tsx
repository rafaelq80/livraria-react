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
import { Link } from "react-router-dom"
import { useNavbar } from "../../../hooks/navbar/useNavbar"
import { DropdownMenu } from "./DropDownMenu"
import { DropDownMenuItem } from "./DropDownMenuItem"

function DesktopMenu() {
	const { usuario, isAuthenticated, logout } = useNavbar()

	return (
		<div className="hidden md:flex gap-4 py-4">
			{isAuthenticated && (
				<>
					<DropdownMenu title="E-Commerce">
						<DropDownMenuItem
							to="/cadastrarproduto"
							icon={<Book size={20} />}
							text="Novo Produto"
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
			{isAuthenticated ? (
				<Link to="/Perfil">
					<img
						src={usuario.foto}
						alt={usuario.nome}
						className="border-transparent rounded-full w-8 h-8"
					/>
				</Link>
			) : (
				<DropDownMenuItem to="/login" icon={<User size={32} />} text="" />
			)}
			<DropDownMenuItem to="/carrinho" icon={<ShoppingCart size={32} />} text="" />
			{isAuthenticated && (
				<DropDownMenuItem to="" icon={<SignOut size={32} />} text="" onClick={logout} />
			)}
		</div>
	)
}

export default DesktopMenu
