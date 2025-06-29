import { CaretDownIcon } from "@phosphor-icons/react"
import { DropdownMenus } from "../../../types/MenuTypes"
interface MenuSectionProps {
	title: string
	menu: DropdownMenus
	toggleDropdown: (menu: DropdownMenus) => void
	dropdownOpen: boolean
	children: React.ReactNode
}

export const MenuSection = ({
	title,
	menu,
	toggleDropdown,
	dropdownOpen,
	children,
}: MenuSectionProps) => (
	<div>
		<button
			className="w-full text-left py-1 hover:bg-indigo-700 px-2 rounded flex justify-between items-center"
			onClick={() => toggleDropdown(menu)}
		>
			<span>{title}</span>
			<CaretDownIcon
				className={`transition-transform duration-300 ${
					dropdownOpen ? "rotate-270" : "rotate-0"
				}`}
				size={16}
			/>
		</button>
		{dropdownOpen && <div className="pl-4 space-y-2 mt-1">{children}</div>}
	</div>
)
