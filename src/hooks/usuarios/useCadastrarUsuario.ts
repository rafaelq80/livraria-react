import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/AxiosService"
import { createUsuarioFormData } from "../../services/FormDataService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { UsuarioSchemaType, usuarioSchema } from "../../validations/UsuarioSchema"

export function useCadastrarUsuario() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { usuario } = useContext(AuthContext)
	const token = usuario.token
	const [fotoPreview, setFotoPreview] = useState<string>("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const cameraInputRef = useRef<HTMLInputElement>(null)
	const [openCamera, setOpenCamera] = useState<boolean>(false)

	const rolePadrao: Role = {
		id: 2,
		nome: "user",
	}

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm<UsuarioSchemaType>({
		resolver: zodResolver(usuarioSchema),
		defaultValues: {
			nome: "",
			usuario: "",
			foto: "",
			fotoFile: undefined,
			senha: "",
			confirmarSenha: "",
		},
	})

	function retornar() {
		navigate(token ? "/usuarios" : "/login")
	}

	// Função única para lidar com ambas as fontes de imagem (arquivo ou webcam)
	const handleImageUpdate = (imageSource: string | File) => {
		if (imageSource instanceof File) {
			// Caso 1: É um arquivo
			const reader = new FileReader()
			reader.onloadend = () => {
				const result = reader.result
				if (typeof result === "string") {
					setFotoPreview(result)
					setValue("fotoFile", imageSource, { shouldValidate: true })
				}
			}
			reader.readAsDataURL(imageSource)
		} else {
			// Caso 2: É uma string base64 (da webcam)
			setFotoPreview(imageSource)
			
			// Converter base64 para arquivo
			fetch(imageSource)
				.then(res => res.blob())
				.then(blob => {
					const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" })
					setValue("fotoFile", file, { shouldValidate: true })
				})
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) handleImageUpdate(file)
	}

	const handleFileSelect = () => fileInputRef.current?.click()
	
	const capturePhoto = (imageSrc: string) => {
		handleImageUpdate(imageSrc)
		setOpenCamera(false)
	}

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

			// Usar o arquivo do formulário diretamente
			const formData = createUsuarioFormData(user, data.fotoFile || null)

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
	}
}