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
					setValue("foto", result)  // Apenas preview
	
					// Aqui adicionamos o arquivo real ao react-hook-form
					setValue("fotoFile", file, { shouldValidate: true })  
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleFileSelect = () => fileInputRef.current?.click()
	
	// Nova função para capturar a foto da webcam
	const capturePhoto = (imageSrc: string) => {
		setFotoPreview(imageSrc)
		setValue("foto", imageSrc)
		setOpenCamera(false)
		
		// Converter base64 para arquivo (opcional - caso precise do arquivo)
		fetch(imageSrc)
			.then(res => res.blob())
			.then(blob => {
				const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" })
				
				// Criar um objeto DataTransfer para simular um evento de arquivo
				const dataTransfer = new DataTransfer()
				dataTransfer.items.add(file)
				
				// Se precisar atualizar o fileInputRef
				if (fileInputRef.current) {
					fileInputRef.current.files = dataTransfer.files
				}
			})
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

			const foto = fileInputRef.current?.files?.[0] || null
			const formData = createUsuarioFormData(user, foto)
					
			//Se temos uma foto em base64 mas não em arquivo
			if (data.foto && (!foto || foto.size === 0)) {
				formData.set("foto", data.foto)
			}

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