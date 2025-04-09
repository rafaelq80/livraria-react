import { Link } from "react-router-dom";

interface MenuItemProps {
    to: string;
    icon: React.ReactNode;
    text: string;
    setMobileMenuOpen: (open: boolean) => void;
    onClick?: () => void;
  }
  
  export const MenuItem = ({ to, icon, text, setMobileMenuOpen, onClick }: MenuItemProps) => (
    <Link to={to} className="flex py-2 hover:bg-indigo-700 px-2 rounded items-center gap-2" onClick={() => { setMobileMenuOpen(false); onClick?.(); }}>
      {icon}
      {text}
    </Link>
  );