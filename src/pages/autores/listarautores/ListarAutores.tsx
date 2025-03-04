import { DNA } from "react-loader-spinner"
import { Plus } from "@phosphor-icons/react"
import AutorDataTable from "../../../components/autores/autordatatable/AutorDataTable"
import { useListarAutores } from "../../../hooks/autores/useListaAutores"

function ListarAutors() {
    const { 
        autores, 
        isLoading, 
        showButton, 
        navigate 
    } = useListarAutores()

    return (
        <div className="p-4">
            {showButton && (
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastrarautor")}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded-xl"
                    >
                        <Plus size={32} className="h-4 w-4" />
                        Novo Autor
                    </button>
                </div>
            )}
            {isLoading ? (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            ) : autores.length === 0 ? (
                <div className="text-center text-gray-500 mt-6">
                    <p className="text-lg">Nenhum Autor encontrado.</p>
                </div>
            ) : (
                <div>
                    <AutorDataTable autores={autores} />
                </div>
            )}
        </div>
    )
}

export default ListarAutors