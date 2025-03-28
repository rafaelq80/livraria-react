import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import Usuario from "../../models/Usuario"
import { atualizar, cadastrarUsuario, listar } from "../../services/AxiosService"
import { createUsuarioFormData } from "../../services/FormDataService"
import { ToastAlerta } from "../../utils/ToastAlerta"
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

    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = form

    const retornar = () => {
        navigate(token ? "/usuarios" : "/login")
    }

    const handleError = (error: unknown) => {
        if (typeof error === "string" && error.includes("401")) {
            handleLogout()
        } else {
            ToastAlerta("Erro ao carregar dados!", "erro")
        }
    }

    const fetchRoles = async () => {
        try {
            await listar<Role[]>(
                `/roles`, 
                (rolesData) => {
                    setRolesList(rolesData)
                }, 
                { headers: { Authorization: token } }
            )
        } catch (error) {
            handleError(error)
        }
    }

    const fetchUserData = async () => {
        if (!id) return

        try {
            await listar<Usuario>(
                `/usuarios/${id}`, 
                (userData: Usuario) => {
                    // Carrega os dados no formulario
                    setValue("nome", userData.nome)
                    setValue("usuario", userData.usuario)
                    setValue("role", userData.roles[0]?.id || defaultRole.id)
                    setFotoPreview(userData.foto || "")
                }, 
                { headers: { Authorization: token } }
            )
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        if (usuario.roles.some(role => role.nome === "admin")) {
            fetchRoles()
        }
        fetchUserData()
    }, [id, token])

    const convertBase64ToFile = async (base64Image: string): Promise<File> => {
        const response = await fetch(base64Image)
        const blob = await response.blob()
        return new File([blob], "webcam-photo.jpg", { type: "image/jpeg" })
    }

    const handleImageUpdate = async (imageSource: string | File) => {
        if (imageSource instanceof File) {
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
            setFotoPreview(imageSource)
            const file = await convertBase64ToFile(imageSource)
            setValue("fotoFile", file, { shouldValidate: true })
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

    const onSubmit = async (data: UsuarioSchemaType) => {
        setIsLoading(true)
        try {
            const selectedRole = rolesList.find(role => role.id === data.role) || defaultRole

            const user: Usuario = {
                id: id ? Number(id) : 0,
                nome: data.nome,
                usuario: data.usuario,
                senha: data.senha,
                foto: data.foto,
                roles: [selectedRole],
            }

            const formData = createUsuarioFormData(user, data.fotoFile || null)

            const handleSuccess = () => {
                ToastAlerta(id ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!", "sucesso")
                
                if (id && usuario.id === Number(id)) {
                    handleLogout()
                } else {
                    navigate(isAuthenticated ? "/usuarios" : "/login")
                }

                if (!id) {
                    reset()
                    setFotoPreview("")
                }
            }

            if (id) {
                await atualizar(
                    `/usuarios/atualizar`, 
                    formData, 
                    handleSuccess, 
                    { headers: { Authorization: token } }
                )
            } else {
                await cadastrarUsuario(
                    `/usuarios/cadastrar`, 
                    formData, 
                    handleSuccess
                )
            }
        } catch (error) {
            console.error("Erro: ", error)
            ToastAlerta("Erro ao salvar o usuário!", "erro")
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
        isAdmin: usuario.roles.some(role => role.nome === "admin"),
    }
}