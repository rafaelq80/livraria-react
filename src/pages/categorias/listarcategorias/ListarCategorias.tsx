import { useContext, useEffect, useState } from "react"
import { DNA } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Categoria from "../../../models/Categoria"
import { listar } from "../../../services/AxiosService"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function ListarCategorias() {
	const navigate = useNavigate()

	const [categorias, setCategorias] = useState<Categoria[]>([])

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarCategorias() {
		try {
			await listar("/categorias", setCategorias, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			if (!isLogout)
				ToastAlerta("Você precisa estar logado!", "info")
			navigate("/")
		}
	}, [token])

	useEffect(() => {
		buscarCategorias()
	}, [categorias.length])

	return (
		<>
			{categorias === undefined && (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			)}

			<div className="flex justify-center">
				<div className="my-2 mx-8 container flex flex-col">
					{categorias.length === 0 && (
						<span className="text-3xl text-center my-8">
							Nenhum categoria foi encontrado
						</span>
					)}

					<div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
						{/* {categorias.map((categoria) => (
							<CardCategorias key={categoria.id} categoria={categoria} />
						))} */}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarCategorias
