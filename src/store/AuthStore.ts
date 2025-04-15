import { create } from "zustand"
import { persist } from "zustand/middleware"
import UsuarioLogin from "../models/UsuarioLogin"
import { ToastAlerta } from "../utils/ToastAlerta"
import { login } from "../services/AxiosService"
import Role from "../models/Role"

// Interface para o estado da autenticação
interface AuthState {
	// Estado do usuário
	usuario: UsuarioLogin
	isLoading: boolean
	isLogout: boolean
	isAdmin: boolean

	// Ações
	handleLogin: (usuarioLogin: UsuarioLogin) => Promise<void>
	handleLogout: () => void

	// Getters computados
	isAuthenticated: () => boolean
}

// Objeto de usuário inicial/vazio
const emptyUser: UsuarioLogin = {
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

// Criação da store com persistência em localStorage
export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			// Estado inicial
			usuario: emptyUser,
			isLoading: false,
			isLogout: false,
			isAdmin: false,

			// Método de login
			handleLogin: async (usuarioLogin: UsuarioLogin) => {
				set({ isLoading: true })

				try {
					const resposta = await login<UsuarioLogin>(`/usuarios/logar`, usuarioLogin)
					const isAdmin = checkIsAdmin(resposta.roles)

					set({
						usuario: resposta,
						isAdmin,
						isLogout: false,
					})

					ToastAlerta("Usuário autenticado com sucesso!", "sucesso")
				} catch (error: unknown) {
					console.error("Erro: ", error)
					ToastAlerta("Dados do Usuário inconsistentes!", "erro")
				} finally {
					set({ isLoading: false })
				}
			},

			// Método de logout
			handleLogout: () => {
				// Limpa o localStorage completamente
				localStorage.removeItem("auth-storage")

				set({
					usuario: emptyUser,
					isAdmin: false,
					isLogout: true,
				})
			},

			// Getter para verificar autenticação
			isAuthenticated: () => {
				return !!get().usuario.token
			},
		}),
		{
			name: "auth-storage", // nome para o localStorage
			partialize: (state) => ({
				usuario: state.usuario,
				isAdmin: state.isAdmin,
			}), // armazena apenas os dados necessários
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
		isAuthenticated: store.isAuthenticated(),
		handleLogin: store.handleLogin,
		handleLogout: store.handleLogout,
	}
}
