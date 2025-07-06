import { useAuthStore } from "../../shared/store/AuthStore";

// Dados mockados do usuário administrador
const mockUsuario = {
  id: 1,
  nome: 'Usuário Admin',
  usuario: 'admin',
  senha: '123',
  foto: '',
  token: 'fake',
  roles: [{ id: 1, nome: 'admin', descricao: 'Administrador' }]
};

/**
 * Configura o AuthStore para simular um usuário administrador autenticado
 * 
 * Esta função:
 * 1. Define o estado do Zustand com dados de admin
 * 2. Configura o localStorage com token fake
 * 3. Persiste o estado no localStorage para compatibilidade com interceptors
 * 
 * Usado em testes que precisam simular autenticação de administrador
 */
export function mockAuthStoreAsAdmin() {
  // Define o estado do Zustand diretamente
  useAuthStore.setState({
    usuario: mockUsuario,
    isAdmin: true,
    isLoading: false,
    isLogout: false,
    isAuthenticated: true,
    handleLogin: async () => {},
    handleLogout: () => {},
    updateAuthState: () => {},
  });
  
  // Configura o token no localStorage (usado pelo Axios/interceptor)
  localStorage.setItem('token', 'fake');
  
  // Persiste o estado no localStorage para compatibilidade com persistência
  localStorage.setItem('auth-storage', JSON.stringify({
    state: {
      usuario: mockUsuario,
      isAdmin: true,
      isAuthenticated: true,
    }
  }));
} 