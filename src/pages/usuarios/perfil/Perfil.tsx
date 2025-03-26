import { EnvelopeSimple } from "@phosphor-icons/react"
import { ChangeEvent, useState } from "react"

const Perfil = () => {
	// Estado do usuário com dados de exemplo
	const [usuario, setUsuario] = useState({
		nome: "Maria Silva",
		usuario: "maria.silva@exemplo.com",
		foto: "",
		roles: [
			{
				id: 1,
				nome: "admin",
				descricao: "Administrador",
			},
		],
	})

	// Estado para o modo de edição
	const [modoEdicao, setModoEdicao] = useState(false)
	// Estado temporário para armazenar alterações durante a edição
	const [formDados, setFormDados] = useState(usuario)

	// Lidar com mudanças nos campos do formulário
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormDados({
			...formDados,
			[name]: value,
		})
	}

	// Salvar alterações
	const salvarPerfil = () => {
		setUsuario(formDados)
		setModoEdicao(false)
	}

	// Cancelar edição
	const cancelarEdicao = () => {
		setFormDados(usuario)
		setModoEdicao(false)
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-5xl h-[50vh] mx-auto p-6 bg-white rounded-lg shadow-md">
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

						<div className="w-full bg-gray-50 p-4 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-700 mb-2">Contato</h3>

							<div className="space-y-2">
								<p className="flex items-center text-base">
									<span className="mr-2"><EnvelopeSimple size={28} /></span> {usuario.usuario}
								</p>
							</div>
						</div>
					</div>

					{/* Coluna da direita - Informações detalhadas */}
					<div className="w-full md:w-2/3">
						{modoEdicao ? (
							<div className="space-y-4">
								<div className="flex justify-center">
									<h2 className="text-3xl tex-center font-semibold text-gray-700 mb-2">
										Editar Perfil
									</h2>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Nome
									</label>
									<input
										type="text"
										name="nome"
										value={formDados.nome}
										onChange={handleChange}
										className="w-full p-2 border rounded"
									/>
								</div>

								<div className="flex space-x-2 mt-4">
									<button
										onClick={salvarPerfil}
										className="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-700"
									>
										Salvar
									</button>
									<button
										onClick={cancelarEdicao}
										className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
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
