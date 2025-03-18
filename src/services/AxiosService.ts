import axios from "axios";
import Produto from "../models/Produto";
import Usuario from "../models/Usuario";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

export const login = async <T>(
	url: string,
	dados: object,
	setDados: (updater: (prevState: T) => T) => void
  ) => {
	const resposta = await api.post<T>(url, dados);
	setDados(() => resposta.data);
  };
  

  export const recuperarSenha = async (
	url: string,
	dados: { usuario: string },
	setDados: (mensagem: string) => void
  ) => {
	const resposta = await api.post<{ message: string }>(url, dados);
	setDados(resposta.data.message);
  };
  

export const resetarSenha = async <T> (url: string, dados: object, setDados: (updater: (prevState: T) => T) => void
) => {
	const resposta = await api.patch(url, dados)
	setDados(resposta.data.message)
}

// export const cadastrarUsuario = async (url: string, dados: object) => {
// 	const resposta = await api.post(url, dados)
// 	return resposta.data
// }

export const cadastrarUsuario = async(url: string, dados: object, setDados: (dados: Usuario) => void) => {
    const resposta = await api.post(url, dados, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    setDados(resposta.data)
  }

export const listarProdutos = async (url: string, setDados: (dados: Produto[]) => void) => {
	const resposta = await api.get<Produto[]>(url)
	setDados(resposta.data)
}

export const listar = async <T> (url: string, setDados: (dados: T) => void, header: object) => {
	const resposta = await api.get<T>(url, header)
	setDados(resposta.data)
}

export const cadastrar = async <T> (url: string, dados: object, setDados: (dados: T) => void, header: object) => {
	const resposta = await api.post<T>(url, dados, header)
	setDados(resposta.data)
}

export const atualizar = async <T> (url: string, dados: object, setDados: (dados: T) => void, header: object) => {
	const resposta = await api.put<T>(url, dados, header)
	setDados(resposta.data)
}

export const deletar = async (url: string, header: object) => {
	await api.delete(url, header)
}
