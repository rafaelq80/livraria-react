// DTO Auxiliar
export interface RoleIdDto {
	id: number
}

export default interface CriarUsuarioDto {
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    roles: RoleIdDto[]
}