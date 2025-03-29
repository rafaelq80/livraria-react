import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Categoria from "../../models/Categoria"
import { listar, atualizar, cadastrar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { CategoriaSchemaType, categoriaSchema } from "../../validations/CategoriaSchema"


export function useFormCategoria() {

    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<CategoriaSchemaType>({
        resolver: zodResolver(categoriaSchema),
        defaultValues: {
            tipo: "",
        },
    })

    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = form

    const handleError = (error: unknown) => {
        if (typeof error === "string" && error.includes("401")) {
            handleLogout()
        } else {
            ToastAlerta("Erro ao carregar dados!", "erro")
        }
    }

    const fetchCategoriaData = async () => {
        if (!id) return

        try {
            await listar<Categoria>(
                `/categorias/${id}`, 
                (categoriaData: Categoria) => {
                    setValue("tipo", categoriaData.tipo)
                }, 
                { headers: { Authorization: token } }
            )
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        fetchCategoriaData()
    }, [id])

    const retornar = () => {
        navigate("/categorias")
    }

    const onSubmit = async (data: CategoriaSchemaType) => {
        setIsLoading(true)
        try {
            
            const categoria: Categoria = {
                id: id ? Number(id) : 0,
                tipo: data.tipo,
            }

            const handleSuccess = () => {
                ToastAlerta(id ? "Categoria atualizada com sucesso!" : "Categoria cadastrada com sucesso!", "sucesso")
                
                if (!id) {
                    reset()
                }

                retornar()
            }

            if (id) {
                await atualizar(
                    `/categorias`, 
                    categoria, 
                    handleSuccess, 
                    { headers: { Authorization: token } }
                )
            } else {
                await cadastrar(
                    `/categorias`, 
                    categoria, 
                    handleSuccess,
                    { headers: { Authorization: token } }
                )
            }
        } catch (error) {
            console.error("Erro: ", error)
            ToastAlerta("Erro ao salvar a categoria!", "erro")
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
    }
}