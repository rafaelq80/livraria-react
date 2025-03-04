import { useContext, useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import Editora from '../../../models/Editora'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { Plus } from '@phosphor-icons/react'
import EditoraDataTable from '../../../components/editoras/editoradatatable/EditoraDataTable'
import { listar } from '../../../services/AxiosService'

function ListarEditoras() {
	const navigate = useNavigate()
	const [editoras, setEditoras] = useState<Editora[]>([])
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)
  const [showButton, setShowButton] = useState(false)

	async function buscarEditoras() {
		setIsLoading(true)
		try {
			await listar('/editoras', setEditoras, {
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
		buscarEditoras()
	}, [])

  useEffect(() => {
		if(editoras.length === 0)
      setShowButton(true)
    else
      setShowButton(false)
	}, [editoras])

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate('/cadastrareditora')}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded-xl"
					>
						<Plus size={32} className="h-4 w-4" />
						Nova Editora
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
			) : editoras.length === 0 ? (
				// Mensagem de "Nenhum Editora encontrada"
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Editora encontrado.</p>
				</div>
			) : (
				// Renderiza a tabela se houver dados
				<div>
					<EditoraDataTable editoras={editoras} />
				</div>
			)}
		</div>
	)
}

export default ListarEditoras
