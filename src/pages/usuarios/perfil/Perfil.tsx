import { EnvelopeSimple } from "@phosphor-icons/react"
import { usePerfil } from "../../../hooks/usuarios/usePerfil"
import CadastrarUsuario from "../cadastrarusuario/CadastrarUsuario"

const Perfil = () => {
	const { modoEdicao, setModoEdicao, cancelarEdicao, usuario } = usePerfil()

	return (
		<div className="flex md:items-center justify-center min-h-screen">
			<div className="items-center justify-center w-6xl md:min-h-[60vh] m-4 md:mx-auto p-8 bg-white rounded-lg shadow-md">
				<div className="flex flex-col md:flex-row items-start gap-8">
					{/* Coluna da esquerda - Foto e informações básicas */}
					<div className="w-full md:w-1/3 flex flex-col items-center">
						<div className="relative mb-4">
							<img
								src={
									usuario.foto
										? usuario.foto
										: "https://ik.imagekit.io/vzr6ryejm/profile/usuario.svg?updatedAt=1729485119852"
								}
								alt="Foto de perfil"
								className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
							/>
						</div>

						<div className="w-full bg-gray-100 p-4 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-700 mb-2">Contato</h3>

							<div className="space-y-2">
								<p className="flex items-center text-base">
									<span className="mr-2">
										<EnvelopeSimple size={28} />
									</span>{" "}
									{usuario.usuario}
								</p>
							</div>
						</div>
					</div>

					{/* Coluna da direita - Informações detalhadas */}
					<div className="w-full">
						{modoEdicao ? (
							<div className="space-y-4">
			
									<CadastrarUsuario isPerfil={true} />
		

								<div className="flex justify-end space-x-2 mt-4">
									<button
										onClick={cancelarEdicao}
										className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
									>
										Cancelar
									</button>
								</div>
							</div>
						) : (
							<>
								<div className="flex justify-between items-center mb-4">
									<div>
										<h1 className="text-2xl font-bold text-gray-800">
											{usuario.nome}
										</h1>
										{usuario.roles.map((role) => (
											<p className="text-gray-600">{role.descricao}</p>
										))}
									</div>
									<button
										onClick={() => setModoEdicao(true)}
										className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
									>
										Editar Perfil
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Perfil
