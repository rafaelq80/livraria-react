import { PencilIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../shared/components/deletemodal/DeleteButton";
import { useDeleteCategoria } from "../hooks/useDeleteCategoria";
import Categoria from "../models/Categoria";
import { TooltipButton } from "../../shared/components/tooltipbutton/TooltipButton";

/**
 * Cria as colunas para a tabela de categorias
 * 
 * @param onCategoriaDeleted - Callback executado após exclusão bem-sucedida
 * @returns Array de definições de colunas para o DataTable
 */
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
            {/* Botão de editar categoria */}
            <TooltipButton
              label="Editar categoria"
              onClick={() => navigate(`/editarcategoria/${categoria.id}`)}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              aria-label="Editar categoria"
            >
              <PencilIcon size={32} className="h-5 w-5 text-blue-500" />
            </TooltipButton>
            
            {/* Botão de excluir categoria */}
            <TooltipButton label="Excluir categoria" aria-label="Excluir categoria">
              <DeleteButton<Categoria>
                item={categoria}
                onDelete={async () => {
                  await excluirCategoria();
                  return Promise.resolve();
                }}
                disabled={isLoading}
                modalTitle="Excluir Categoria"
                itemName={`a categoria ${categoria.tipo}`}
                tooltipLabel="Excluir categoria"
              />
            </TooltipButton>
          </div>
        );
      },
    },
  ] as const satisfies ColumnDef<Categoria>[];
}