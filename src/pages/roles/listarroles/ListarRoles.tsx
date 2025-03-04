import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import Role from '../../../models/Role'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { Plus } from '@phosphor-icons/react'
import RoleDataTable from '../../../components/roles/roledatatable/RoleDataTable'
import { listar } from '../../../services/AxiosService'

function ListarRoles() {
	const navigate = useNavigate()
	const [roles, setRoles] = useState<Role[]>([])
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)
  const [showButton, setShowButton] = useState(false)

	async function buscarRoles() {
		setIsLoading(true)
		try {
			await listar('/roles', setRoles, {
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
		buscarRoles()
	}, [])

  useEffect(() => {
		if(roles.length === 0)
      setShowButton(true)
    else
      setShowButton(false)
	}, [roles])

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate('/cadastrarrole')}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded-xl"
					>
						<Plus size={32} className="h-4 w-4" />
						Novo Role
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
			) : roles.length === 0 ? (
				// Mensagem de "Nenhum Role encontrado"
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Role encontrado.</p>
				</div>
			) : (
				// Renderiza a tabela se houver dados
				<div>
					<RoleDataTable roles={roles} />
				</div>
			)}
		</div>
	)
}

export default ListarRoles
