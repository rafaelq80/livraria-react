import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import Usuario from "../../models/Usuario"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { createUsuarioFormData } from "../../services/FormDataService"
import { ImageService } from "../../services/ImageService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { UsuarioSchemaType, usuarioSchema } from "../../validations/UsuarioSchema"

export function useCadastrarUsuario(isPerfil?: boolean) {
	const navigate = useNavigate()
	const { usuario, isAuthenticated, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const { id: rotaId } = useParams<{ id: string }>()

	const id = isPerfil ? usuario.id : rotaId

	const [isLoading, setIsLoading] = useState(false)
	const [fotoPreview, setFotoPreview] = useState("")
	const [openCamera, setOpenCamera] = useState(false)
	const [rolesList, setRolesList] = useState<Role[]>([])

	const fileInputRef = useRef<HTMLInputElement>(null)
	const cameraInputRef = useRef<HTMLInputElement>(null)

	const defaultRole: Role = {
		id: 2,
		nome: "user",
		descricao: "Usuário",
	}

	const form = useForm<UsuarioSchemaType>({
		resolver: zodResolver(usuarioSchema),
		defaultValues: {
			nome: "",
			usuario: "",
			foto: "",
			fotoFile: undefined,
			senha: "",
			confirmarSenha: "",
			role: defaultRole.id,
		},
	})

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = form

	const retornar = () => {
		navigate(token ? "/usuarios" : "/login")
	}

	// Configurando os tratadores de sucesso para operações CRUD
	const successHandlers = SuccessHandlerService.createCrudHandlers("Usuário", {
		navigate,
		redirectTo: isAuthenticated ? "/usuarios" : "/login",
		resetForm: () => {
			reset()
			setFotoPreview("")
		},
		handleLogout,
		currentUserId: usuario.id,
	})

	const fetchRoles = async () => {
		try {
			const resposta = await listar<Role[]>(`/roles`, token)
			setRolesList(resposta)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	const fetchUserData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Usuario>(`/usuarios/${id}`, token)

			// Carrega os dados no formulario
			setValue("nome", resposta.nome)
			setValue("usuario", resposta.usuario)
			setValue("role", resposta.roles[0]?.id || defaultRole.id)
			setFotoPreview(resposta.foto || "")
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	useEffect(() => {
		if (usuario.roles.some((role) => role.nome === "admin")) {
			fetchRoles()
		}
		fetchUserData()
	}, [id, token])

	// Usando o ImageService para processar imagens
	const handleImageUpdate = async (imageSource: string | File) => {
		try {
			const { preview, file } = await ImageService.processImage(imageSource, {
				fileName: "user-photo.jpg",
				fileType: "image/jpeg",
			})

			setFotoPreview(preview)
			setValue("fotoFile", file, { shouldValidate: true })
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao processar imagem!",
			})
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		ImageService.handleFileChange(e, {
			onSuccess: (file, preview) => {
				setFotoPreview(preview)
				setValue("fotoFile", file, { shouldValidate: true })
			},
			onError: (error) => {
				ErrorHandlerService.handleError(error, {
					errorMessage: "Erro ao selecionar imagem!",
				})
			},
		})
	}

	const handleFileSelect = () => fileInputRef.current?.click()

	const capturePhoto = (imageSrc: string) => {
		handleImageUpdate(imageSrc)
		setOpenCamera(false)
	}

	const onSubmit = async (data: UsuarioSchemaType) => {
		setIsLoading(true)
		try {
			const selectedRole = rolesList.find((role) => role.id === data.role) || defaultRole

			const user: Usuario = {
				id: id ? Number(id) : 0,
				nome: data.nome,
				usuario: data.usuario,
				senha: data.senha,
				foto: data.foto,
				roles: [selectedRole],
			}

			const formData = createUsuarioFormData(user, data.fotoFile || null)

			const acao = id ? atualizar : cadastrar
			const url = id ? "usuarios/atualizar" : "usuarios/cadastrar"
			const onSuccess = id ? successHandlers.handleUpdate(id) : successHandlers.handleCreate

			await acao(url, formData, token)
			onSuccess()
            
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao salvar o usuário!",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		id,
		isLoading,
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		retornar,
		fotoPreview,
		setFotoPreview,
		handleFileChange,
		handleFileSelect,
		fileInputRef,
		cameraInputRef,
		capturePhoto,
		openCamera,
		setOpenCamera,
		rolesList,
		isAdmin: usuario.roles.some((role) => role.nome === "admin"),
	}
}
