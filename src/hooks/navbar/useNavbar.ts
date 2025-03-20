import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { DropdownMenus, DropdownState } from "../../types/MenuTypes";

export function useNavbar(setMobileMenuOpen?: (open: boolean) => void) {
  const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    ecommerce: false,
    config: false,
  });

  const toggleDropdown = (menu: DropdownMenus) => {
    setDropdownOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const logout = () => {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    if (setMobileMenuOpen) setMobileMenuOpen(false); // Fecha o menu no mobile
    navigate("/");
  };

  return {
    usuario,
    isAuthenticated,
    logout,
    dropdownOpen,
    toggleDropdown,
  };
}
