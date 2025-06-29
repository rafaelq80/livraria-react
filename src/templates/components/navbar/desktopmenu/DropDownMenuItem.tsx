import { Link } from "react-router-dom"

export interface DropDownMenuItemProps {
  to: string
  icon: React.ReactNode
  text: string
  onClick?: () => void
  closeMenu?: () => void // Prop para fechar o menu pai
}

export const DropDownMenuItem = ({ to, icon, text, onClick, closeMenu }: DropDownMenuItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    // Se tivermos tanto closeMenu quanto onClick, o closeMenu já estará
    // combinado com onClick no componente pai (DropdownMenu)
    if (onClick) {
      onClick();
    } else if (closeMenu) {
      // Se não tivermos onClick, mas tivermos closeMenu
      closeMenu();
    }
    
    // Evitar navegação apenas se for um botão sem link
    if (to === "" && !onClick) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-600 hover:text-white text-sm lg:text-base rounded transition-colors"
      onClick={handleClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      {text && <span className="whitespace-nowrap">{text}</span>}
    </Link>
  );
}