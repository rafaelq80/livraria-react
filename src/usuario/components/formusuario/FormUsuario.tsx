import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import Role from "../../../role/models/Role"
import { CampoFoto } from "../../../shared/components/campofoto/CampoFoto"
import TagInput from "../../../shared/components/taginput/TagInput"
import Button from "../../../shared/components/ui/Button"
import { useSanitizedForm } from "../../../shared/hooks/sanitized/useSanitizedForm"
import { useCadastrarUsuario } from "../../hooks/useCadastrarUsuario"
import { usuarioSchema, UsuarioSchemaType } from "../../validations/UsuarioSchema"

interface FormUsuarioProps {
	isPerfil?: boolean
}

function FormUsuario({ isPerfil = false }: Readonly<FormUsuarioProps>) {
	const {
		id,
		isLoading,
		onSubmit,
		retornar,
		rolesList,
		isAdmin,
		fotoPreview,
		defaultRole,
		userData,
	} = useCadastrarUsuario(isPerfil)

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
	} = useSanitizedForm<UsuarioSchemaType>({
		resolver: zodResolver(usuarioSchema),
		defaultValues: {
			nome: "",
			usuario: "",
			senha: "",
			confirmarSenha: "",
			roles: [defaultRole],
			foto: "",
			fotoFile: undefined,
		},
	}, {
		sanitizeStrings: false,
		sanitizeNumbers: true,
		sanitizeEmails: false,
		sanitizeNames: true,
	})

	// Preencher formulário ao editar usuário
	useEffect(() => {
		if (userData && id) {
			setValue("nome", userData.nome || "")
			setValue("usuario", userData.usuario || "")
			setValue("roles", userData.roles || [defaultRole])
			setValue("foto", userData.foto || "")
			// Não preenche senha/confirmarSenha por segurança
		}
	}, [userData, id, setValue, defaultRole])

	return (
		<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-6xl lg:w-[90%]">
			<h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
				{id ? "Editar Usuário" : "Cadastrar Usuário"}
			</h2>
			<div className="flex flex-col gap-8 lg:flex-row">
				<div className="flex flex-col items-center justify-center w-full lg:w-1/3">
					<CampoFoto
						control={control}
						setValue={setValue}
						photoFieldName="fotoFile"
						label="Foto do Perfil"
						initialPreview={fotoPreview}
						allowedTypes={["jpg", "jpeg", "png", "webp"]}
						maxFileSize={5000000}
						showFileInfo={true}
					/>
				</div>

				<div className="w-full lg:w-2/3">
					<form onSubmit={handleSubmit((data) => {
						return onSubmit(data);
					})}>
						<div className="flex flex-col w-full mb-4">
							<label htmlFor="nome" className="block font-medium text-gray-700">
								Nome
							</label>
							<input
								type="text"
								id="nome"
								placeholder="Adicione o nome"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("nome")}
							/>
							{errors.nome && (
								<span className="text-sm text-red-500">{errors.nome.message}</span>
							)}
						</div>
						<div className="flex flex-col w-full mb-4">
							<label htmlFor="usuario" className="block font-medium text-gray-700">
								Usuario
							</label>
							<input
								type="text"
								id="usuario"
								placeholder="Adicione o usuário (e-mail)"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("usuario")}
							/>
							{errors.usuario && (
								<span className="text-sm text-red-500">
									{errors.usuario.message}
								</span>
							)}
						</div>
						<div className="flex flex-col w-full mb-4">
							<label htmlFor="senha" className="block font-medium text-gray-700">
								Senha
							</label>
							<input
								type="password"
								id="senha"
								placeholder="Adicione a Senha"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("senha")}
							/>
							{errors.senha && (
								<span className="text-sm text-red-500">{errors.senha.message}</span>
							)}
						</div>
						<div className="flex flex-col w-full mb-4">
							<label
								htmlFor="confirmarSenha"
								className="block font-medium text-gray-700"
							>
								Confirmar Senha
							</label>
							<input
								type="password"
								id="confirmarSenha"
								placeholder="Confirmar a Senha"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("confirmarSenha")}
							/>
							{errors.confirmarSenha && (
								<span className="text-sm text-red-500">
									{errors.confirmarSenha.message}
								</span>
							)}
						</div>

						{/* Role Selection */}
						{isAdmin && (
							<div className="flex flex-col w-full mb-4">
								<Controller
									name="roles"
									control={control}
									render={({ field: { value, onChange } }) => (
										<TagInput<Role>
											label="Papel de Usuário"
											itensDisponiveis={rolesList}
											itensSelecionados={value}
											setItensSelecionados={onChange}
											getNome={(role) => role.descricao}
											getId={(role) => role.id}
											errors={errors.roles}
										/>
									)}
								/>
							</div>
						)}

						<div className="flex justify-around w-full gap-8">
							{!isPerfil && (
								<Button
									type="button"
									variant="danger"
									size="full"
									onClick={retornar}
								>
									Cancelar
								</Button>
							)}

							<Button
								type="submit"
								variant="primary"
								size="full"
								isLoading={isLoading}
								disabled={isLoading}
							>
								{id ? "Atualizar" : "Cadastrar"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default FormUsuario
