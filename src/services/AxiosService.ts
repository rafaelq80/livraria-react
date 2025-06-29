import axios, { AxiosResponse, AxiosError } from "axios";

// Configuração do ambiente - identifica se está em desenvolvimento ou produção
const isDevelopment = import.meta.env.DEV;

// Constantes para configuração
const API_CONFIG = {
	TIMEOUT: 10000,
	TOKEN_KEY: 'token',
	LOGIN_REDIRECT: '/login'
} as const;

// Criação da instância do Axios com configurações padrão
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL, // URL base da API
	headers: {
		'Content-Type': 'application/json', // Tipo de conteúdo padrão
		'Accept': 'application/json', // Aceita apenas JSON como resposta
	},
	withCredentials: false, // Não envia cookies automaticamente
	timeout: API_CONFIG.TIMEOUT, // Timeout de 10 segundos para evitar requisições pendentes
})

// ===== UTILITÁRIOS =====

/**
 * Função utilitária para logging condicional
 */
const log = {
	info: (message: string, ...args: unknown[]) => {
		if (isDevelopment) {
			console.log(message, ...args);
		}
	},
	error: (message: string, ...args: unknown[]) => {
		if (isDevelopment) {
			console.error(message, ...args);
		}
	},
	warn: (message: string, ...args: unknown[]) => {
		if (isDevelopment) {
			console.warn(message, ...args);
		}
	}
};

/**
 * Função utilitária para gerenciar tokens
 */
const tokenManager = {
	get: () => localStorage.getItem(API_CONFIG.TOKEN_KEY),
	set: (token: string) => localStorage.setItem(API_CONFIG.TOKEN_KEY, token),
	remove: () => localStorage.removeItem(API_CONFIG.TOKEN_KEY),
	format: (token: string) => `Bearer ${token}`
};

/**
 * Função utilitária para executar requisições com tratamento de erro padronizado
 */
const executeRequest = async <T>(
	requestFn: () => Promise<AxiosResponse<T>>,
	operation: string,
	url: string
): Promise<T> => {
	try {
		const resposta = await requestFn();
		return resposta.data;
	} catch (error) {
		log.error(`Erro ao ${operation}:`, url, error);
		throw error;
	}
};

// Interceptor que executa ANTES de cada requisição
api.interceptors.request.use(
	(config) => {
		// Log das requisições apenas em ambiente de desenvolvimento
		log.info('🚀 Requisição:', config.method?.toUpperCase(), config.url);
		
		// Adiciona token de autenticação automaticamente se disponível no localStorage
		const token = tokenManager.get();
		if (token && !config.headers.Authorization) {
			config.headers.Authorization = tokenManager.format(token);
		}
		
		return config;
	},
	(error) => {
		// Log de erros de requisição apenas em desenvolvimento
		log.error('❌ Erro na requisição:', error);
		// Garante que sempre rejeita com um objeto Error
		return Promise.reject(error instanceof Error ? error : new Error(String(error)));
	}
);

// Interceptor que executa DEPOIS de cada resposta
api.interceptors.response.use(
	(response) => {
		// Log das respostas bem-sucedidas apenas em desenvolvimento
		log.info('✅ Resposta:', response.status, response.config.url);
		return response;
	},
	(error: AxiosError) => {
		// Log detalhado de erros apenas em desenvolvimento
		log.error('❌ Erro na resposta:', {
			status: error.response?.status, // Código de status HTTP
			message: (error.response?.data as { message?: string })?.message ?? error.message, // Mensagem de erro
			url: error.config?.url // URL que causou o erro
		});
		
		// Tratamento específico para erros de CORS (Cross-Origin Resource Sharing)
		if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
			log.error('🚨 Erro de CORS detectado. Verifique se o backend está configurado corretamente.');
		}
		
		// Tratamento automático de erro 401 (Não autorizado)
		if (error.response?.status === 401) {
			// Remove token expirado/inválido do localStorage
			tokenManager.remove();
			// Emite evento para que o componente possa fazer o redirecionamento
			window.dispatchEvent(new CustomEvent('unauthorized', { 
				detail: { message: 'Sessão expirada. Faça login novamente.' }
			}));
		}
		
		// Garante que sempre rejeita com um objeto Error
		return Promise.reject(error instanceof Error ? error : new Error(String(error)));
	}
);

/**
 * Função utilitária para garantir que a resposta da API seja sempre um array
 * Útil quando a API pode retornar diferentes estruturas de dados
 * @param resposta Resposta da API que pode ter diferentes estruturas
 * @returns Array garantido ou array vazio em caso de erro
 */
export function ensureArrayResponse<T>(resposta: unknown): T[] {
	// Verifica se a resposta é um array diretamente
	if (Array.isArray(resposta)) {
		return resposta;
	} 
	// Se a resposta for um objeto com propriedade 'data' que é um array
	// (estrutura comum em APIs REST)
	else if (resposta && typeof resposta === 'object' && 'data' in resposta && Array.isArray(resposta.data)) {
		return resposta.data;
	}
	// Se a resposta for um objeto com propriedade 'content' que é um array
	// (estrutura comum em APIs paginadas como Spring Boot)
	else if (resposta && typeof resposta === 'object' && 'content' in resposta && Array.isArray(resposta.content)) {
		return resposta.content;
	}
	// Se nenhuma das estruturas esperadas for encontrada, retorna array vazio
	else {
		log.warn("Estrutura de resposta inesperada:", resposta);
		return [];
	}
}

// ===== FUNÇÕES GENÉRICAS CRUD (Create, Read, Update, Delete) =====

/**
 * Função para buscar dados da API (GET)
 * @param url Endpoint da API
 * @returns Dados da resposta da API
 */
export const listar = async <T>(url: string): Promise<T> => {
	return executeRequest(
		() => api.get<T>(url),
		'listar',
		url
	);
};

/**
 * Função para criar novos dados na API (POST)
 * @param url Endpoint da API
 * @param dados Dados a serem enviados
 * @returns Dados da resposta da API
 */
export const cadastrar = async <T>(
	url: string,
	dados: T
): Promise<T> => {
	const isFormData = dados instanceof FormData;
	return executeRequest(
		() => api.post<T>(url, dados, { headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined }),
		'cadastrar',
		url
	);
};

/**
 * Função para atualizar dados existentes na API (PUT)
 * @param url Endpoint da API
 * @param dados Dados a serem atualizados
 * @returns Dados da resposta da API
 */
export const atualizar = async <T>(
	url: string,
	dados: T
): Promise<T> => {
	const isFormData = dados instanceof FormData;
	return executeRequest(
		() => api.put<T>(url, dados, { headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined }),
		'atualizar',
		url
	);
};

/**
 * Função para deletar dados da API (DELETE)
 * @param url Endpoint da API
 * @returns Dados da resposta da API
 */
export const deletar = async <T>(url: string): Promise<T> => {
	return executeRequest(
		() => api.delete<T>(url),
		'deletar',
		url
	);
};
