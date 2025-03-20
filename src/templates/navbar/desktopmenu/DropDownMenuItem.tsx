import { Link } from "react-router-dom"

interface DropDownMenuItemProps {
	to: string
	icon: React.ReactNode
	text: string
	onClick?: () => void
}

export const DropDownMenuItem = ({ to, icon, text, onClick }: DropDownMenuItemProps) => (
	<Link
		to={to}
		className="flex items-center gap-2 px-2 py-1 hover:bg-indigo-400 hover:text-white text-base rounded"
		onClick={onClick}
	>
		{icon}
		{text}
	</Link>
)
