export interface Usuario {

  id?: number;

  nome: string;

  login: string;

  senha?: string;

  perfil: string;

  ativo: boolean;
}