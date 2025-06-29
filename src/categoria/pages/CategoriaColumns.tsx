import { PencilIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../shared/components/DeleteConfirmationModal/DeleteButton";
import { useDeleteCategoria } from "../hooks/useDeleteCategoria";
import Categoria from "../models/Categoria";

export function createCategoriaColumns(onCategoriaDeleted?: () => void): ColumnDef<Categoria>[] {
  const navigate = useNavigate();

  return [
    {
      accessorKey: "tipo",
      header: "Categoria",
      cell: (props) => props.getValue(),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const categoria = row.original;
        const { excluirCategoria, isLoading } = useDeleteCategoria(
          categoria.id.toString(),
          onCategoriaDeleted
        );
        
        return (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => navigate(`/editarcategoria/${categoria.id}`)}
              className="text-blue-500 hover:text-blue-700 cursor-pointer rounded-full p-1"
              aria-label="Editar categoria"
            >
              <PencilIcon size={32} className="h-5 w-5" />
            </button>
            
            <DeleteButton<Categoria>
              item={categoria}
              onDelete={async () => {
                await excluirCategoria();
                return Promise.resolve();
              }}
              disabled={isLoading}
              modalTitle="Excluir Categoria"
              itemName={`a categoria "${categoria.tipo}"`}
            />
          </div>
        );
      },
    },
  ] as const satisfies ColumnDef<Categoria>[];
}