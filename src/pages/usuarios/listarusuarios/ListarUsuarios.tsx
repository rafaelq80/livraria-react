import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import Usuario from '../../../models/Usuario'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { Plus } from '@phosphor-icons/react'
import UsuarioDataTable from '../../../components/usuarios/usuariodatatable/UsuarioDataTable'
import { listar } from '../../../services/AxiosService'

function ListarUsuarios() {
	const navigate = useNavigate()
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)
  const [showButton, setShowButton] = useState(false)

	async function buscarDepartamentos() {
		setIsLoading(true)
		try {
			await listar('/usuarios/all', setUsuarios, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado', 'info')
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		buscarDepartamentos()
	}, [])

  useEffect(() => {
		if(usuarios.length === 0)
      setShowButton(true)
    else
      setShowButton(false)
	}, [usuarios])

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate('/cadastrarusuario')}
						className="flex items-center gap-2 bg-teal-400 hover:bg-teal-600 px-4 py-2 text-white font-bold rounded-xl"
					>
						<Plus size={32} className="h-4 w-4" />
						Novo Usuario
					</button>
				</div>
			)}
			{isLoading ? (
				// Loader enquanto busca dados
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			) : usuarios.length === 0 ? (
				// Mensagem de "Nenhum Usuario encontrado"
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Usuario encontrado.</p>
				</div>
			) : (
				// Renderiza a tabela se houver dados
				<div>
					<UsuarioDataTable usuarios={usuarios} />
				</div>
			)}
		</div>
	)
}

export default ListarUsuarios
