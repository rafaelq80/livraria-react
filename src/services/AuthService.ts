import { api } from './AxiosService';
import UsuarioAutenticado from "../security/types/ResponseUsuarioLogin";
import UsuarioLogin from "../security/models/UsuarioLogin";

/**
 * Serviço dedicado para operações de autenticação específicas
 * NOTA: Funções básicas de login/logout estão no AuthStore
 */

/**
 * Função para autenticar usuário (login)
 * @param url Endpoint de login
 * @param dados Credenciais do usuário
 * @returns Dados do usuário autenticado
 */
export const login = async (
    url: string,
    dados: UsuarioLogin,
): Promise<UsuarioAutenticado> => {
    const resposta = await api.post<UsuarioAutenticado>(url, dados);
    return resposta.data;
};

/**
 * Função para solicitar recuperação de senha
 * @param url Endpoint de recuperação de senha
 * @param dados Dados do usuário (email/username)
 * @returns Mensagem de confirmação
 */
export const recuperarSenha = async (
	url: string,
	dados: { usuario: string }
): Promise<{ message: string }> => {
	const resposta = await api.post<{ message: string }>(url, dados);
	return resposta.data;
};

/**
 * Função para resetar senha com token
 * @param url Endpoint de reset de senha
 * @param dados Nova senha e token de reset
 * @returns Mensagem de confirmação
 */
export const resetarSenha = async (
	url: string,
	dados: Record<string, unknown>
): Promise<{ message: string }> => {
	const resposta = await api.patch<{ message: string }>(url, dados);
	return resposta.data;
};

/**
 * Função para verificar se o token está expirado
 * @param token Token JWT
 * @returns true se o token está expirado, false caso contrário
 */
export const isTokenExpired = (token: string): boolean => {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		const currentTime = Date.now() / 1000;
		return payload.exp < currentTime;
	} catch {
		return true; // Se não conseguir decodificar, considera expirado
	}
};

/**
 * Função para decodificar informações do token JWT
 * @param token Token JWT
 * @returns Payload decodificado ou null se inválido
 */
export const decodeToken = (token: string): Record<string, unknown> | null => {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]));
		return payload;
	} catch {
		return null;
	}
}; 