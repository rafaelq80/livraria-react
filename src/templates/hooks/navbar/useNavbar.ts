import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/store/AuthStore";
import { DropdownMenus, DropdownState } from "../../types/MenuTypes";
import { ToastAlerta } from "../../../shared/utils/ToastAlerta";
import messages from "../../../shared/constants/messages";

export function useNavbar(setMobileMenuOpen?: (open: boolean) => void) {
  const { usuario, isAuthenticated, isAdmin, handleLogout } = useAuth();
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
    		ToastAlerta(messages.auth.logoutSuccess, "info");
    if (setMobileMenuOpen) setMobileMenuOpen(false); // Fecha o menu no mobile
    navigate("/");
  };

  return {
    usuario,
    isAuthenticated,
    isAdmin,
    logout,
    dropdownOpen,
    toggleDropdown,
  };
}
