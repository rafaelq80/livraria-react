// MobileMenu.tsx - Refatorado com SearchBar como primeira opção
import { User, ShoppingCart, SignOut, Book, Bookmark, Prohibit, Star, Users } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { DropdownState, DropdownMenus } from "../../types/MenuTypes";
import SearchBar from "./SearchBar";
import { useSearchBar } from "../../hooks/searchbar/useSearchBar";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }: MobileMenuProps) {
  const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { titulo, setTitulo, buscarProdutos } = useSearchBar();
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    ecommerce: false,
    config: false,
  });

  function toggleDropdown(menu: DropdownMenus) {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  }

  function logout() {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    setMobileMenuOpen(false);
    navigate("/");
  }

  return (
    <div className={`${mobileMenuOpen ? "max-h-screen" : "max-h-0"} md:hidden overflow-hidden transition-all duration-300 ease-in-out w-full bg-indigo-900`}>
      <div className="flex flex-col gap-2 p-4">
        {/* Barra de pesquisa no mobile */}
        <SearchBar titulo={titulo} setTitulo={setTitulo} buscarProdutos={buscarProdutos} />

        {isAuthenticated && (
          <>
            {/* Menu E-Commerce */}
            <div>
              <button className="w-full text-left py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => toggleDropdown("ecommerce")}>E-Commerce</button>
              {dropdownOpen.ecommerce && (
                <div className="pl-4 space-y-2 mt-1">
                  <Link to="/cadastrarproduto" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Book size={20} /> Novo Produto
                  </Link>
                  <Link to="/autores" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Users size={20} /> Autores
                  </Link>
                  <Link to="/categorias" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Star size={20} /> Categorias
                  </Link>
                  <Link to="/editoras" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Bookmark size={20} /> Editoras
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Configurações */}
            <div>
              <button className="w-full text-left py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => toggleDropdown("config")}>Configurações</button>
              {dropdownOpen.config && (
                <div className="pl-4 space-y-2 mt-1">
                  <Link to="/usuarios" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Users size={20} /> Usuários
                  </Link>
                  <Link to="/roles" className="block py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                    <Prohibit size={20} /> Roles
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Links principais */}
        {isAuthenticated ? (
          <Link to="/Perfil" className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
            <img src={usuario.foto} alt={usuario.nome} className="border-transparent rounded-full w-6 h-6 mr-2" />
            <span>Perfil</span>
          </Link>
        ) : (
          <Link to="/login" className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
            <User size={24} className="mr-2" /> Login
          </Link>
        )}

        <Link to="/carrinho" className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>
          <ShoppingCart size={24} className="mr-2" /> Carrinho
        </Link>

        {isAuthenticated && (
          <Link to="" onClick={logout} className="flex items-center py-2 hover:bg-indigo-400 px-2 rounded">
            <SignOut size={24} className="mr-2" /> Sair
          </Link>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
