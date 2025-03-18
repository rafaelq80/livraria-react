import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Role from "../../models/Role"
import { cadastrarUsuario } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import AuthContext from "../../contexts/AuthContext"
import { UsuarioSchemaType, usuarioSchema } from "../../validations/UsuarioSchema"
import { createUsuarioFormData } from "../../services/FormDataService"
import Usuario from "../../models/Usuario"

export function useCadastrarUsuario() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { usuario } = useContext(AuthContext)
	const token = usuario.token
	const [fotoPreview, setFotoPreview] = useState<string>("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const cameraInputRef = useRef<HTMLInputElement>(null)

	const rolePadrao: Role = {
		id: 2,
		nome: "user",
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<UsuarioSchemaType>({
		resolver: zodResolver(usuarioSchema),
		defaultValues: {
			nome: "",
			usuario: "",
			foto: "",
			senha: "",
			confirmarSenha: "",
		},
	})

	function retornar() {
		if (!token) navigate("/login")
		else navigate("/usuarios")
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const result = reader.result
				if (typeof result === "string") {
					setFotoPreview(result)
					setValue("foto", result)
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleFileSelect = () => fileInputRef.current?.click()

	const handleCameraCapture = () => cameraInputRef.current?.click()

	async function onSubmit(data: UsuarioSchemaType) {
		setIsLoading(true)
		try {
			const user: Usuario = {
				id: 0,
				nome: data.nome,
				usuario: data.usuario,
				senha: data.senha,
				foto: "",
				roles: [rolePadrao],
			}

			const foto = fileInputRef.current?.files?.[0] || null
			const formData = createUsuarioFormData(user, foto)

			await cadastrarUsuario(`/usuarios/cadastrar`, formData, () => {
				ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
				reset()
				setFotoPreview("")
				navigate("/login")
			})
		} catch (error) {
			console.error("Erro: ", error)
			ToastAlerta("Erro ao cadastrar o usuário!", "erro")
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		register,
		handleSubmit,
		errors,
		onSubmit,
		retornar,
		fotoPreview,
		setFotoPreview,
		handleFileChange,
		handleFileSelect,
		handleCameraCapture,
		fileInputRef,
		cameraInputRef,
	}
}
