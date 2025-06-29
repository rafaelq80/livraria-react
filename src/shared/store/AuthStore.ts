import { create } from "zustand"
import { persist } from "zustand/middleware"
import { default as ResponseUsuarioLogin, default as UsuarioAutenticado } from "../../security/types/ResponseUsuarioLogin"
import { ToastAlerta } from "../../utils/ToastAlerta"
import Role from "../../role/models/Role";
import UsuarioLogin from "../../security/models/UsuarioLogin";
import { login } from "../../services/AuthService";

// Interface para o estado da autenticação
interface AuthState {
    // Estado do usuário autenticado
    usuario: UsuarioAutenticado
    isLoading: boolean
    isLogout: boolean
    isAdmin: boolean
    isAuthenticated: boolean

    // Ações
    handleLogin: (usuarioLogin: UsuarioLogin) => Promise<void>
    handleLogout: () => void
    updateAuthState: () => void
}

// Objeto de usuário autenticado inicial/vazio
const emptyUser: ResponseUsuarioLogin = {
    id: 0,
    nome: "",
    usuario: "",
	senha: "",
    foto: "",
    token: "",
    roles: [],
}

// Verifica se o usuário é administrador com base em suas roles
const checkIsAdmin = (roles: Role[] | undefined): boolean => {
    if (!roles || roles.length === 0) return false
    return roles.some((role) => role.nome.toLowerCase().includes("admin"))
}

// Verifica se o usuário está autenticado
const checkIsAuthenticated = (token: string): boolean => {
    return !!token && token.trim() !== ""
}

// Função utilitária para garantir que a resposta da API seja um objeto válido
const ensureObjectResponse = <T>(resposta: unknown): T => {
    // Se a resposta tem propriedade 'data', retorna o conteúdo de data
    if (resposta && typeof resposta === 'object' && 'data' in resposta && resposta.data) {
        return resposta.data as T
    }
    // Se não, retorna a resposta original
    return resposta as T
}

// Criação da store com persistência em localStorage
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            usuario: emptyUser,
            isLoading: false,
            isLogout: false,
            isAdmin: false,
            isAuthenticated: false,

            // Método de login
            handleLogin: async (usuarioLogin: UsuarioLogin) => {
                set({ isLoading: true })
                
                try {
                    const apiResponse = await login(`/usuarios/logar`, usuarioLogin)
                    const resposta = ensureObjectResponse<ResponseUsuarioLogin>(apiResponse)
                    
                    // Validação da resposta
                    if (!resposta?.token) {
                        throw new Error("Resposta inválida da API")
                    }
                    
                    const isAdmin = checkIsAdmin(resposta.roles)
                    const isAuthenticated = checkIsAuthenticated(resposta.token)

                    // Atualiza o estado completo
                    set({
                        usuario: resposta,
                        isAdmin,
                        isAuthenticated,
                        isLogout: false,
                    })

                    // Salva o token no localStorage para o interceptor do Axios
                    localStorage.setItem('token', resposta.token.replace('Bearer ', ''))

                    ToastAlerta("Usuário autenticado com sucesso!", "sucesso")
                } catch (error: unknown) {
                    console.error("Erro no login: ", error)
                    ToastAlerta("Dados do Usuário inconsistentes!", "erro")
                    
                    // Reseta o estado em caso de erro
                    set({
                        usuario: emptyUser,
                        isAdmin: false,
                        isAuthenticated: false,
                        isLogout: false,
                    })
                    throw error
                } finally {
                    set({ isLoading: false })
                }
            },

            // Método de logout
            handleLogout: () => {
                localStorage.removeItem("auth-storage")
                localStorage.removeItem("token")

                set({
                    usuario: emptyUser,
                    isAdmin: false,
                    isAuthenticated: false,
                    isLogout: true,
                })
            },

            // Método para atualizar o estado de autenticação
            updateAuthState: () => {
                const { usuario } = get()
                const isAdmin = checkIsAdmin(usuario.roles)
                const isAuthenticated = checkIsAuthenticated(usuario.token)
                
                set({
                    isAdmin,
                    isAuthenticated,
                })
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                usuario: state.usuario,
                isAdmin: state.isAdmin,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                // Callback executado após reidratação do estado
                if (state) {
                    // Atualiza o estado de autenticação após reidratação
                    requestAnimationFrame(() => {
                        state.updateAuthState()
                    })
                }
            },
        }
    )
)

// Hook auxiliar para obter o usuário
export const useAuth = () => {
    const store = useAuthStore()

    return {
        usuario: store.usuario,
        isAdmin: store.isAdmin,
        isLoading: store.isLoading,
        isLogout: store.isLogout,
        isAuthenticated: store.isAuthenticated,
        handleLogin: store.handleLogin,
        handleLogout: store.handleLogout,
        updateAuthState: store.updateAuthState,
    }
}