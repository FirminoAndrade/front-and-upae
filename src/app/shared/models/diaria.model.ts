export interface RegistroDiario {

  id?: number;

  data: string;

  totalAgendados: number;

  compareceram: number;

  faltaram?: number;

  observacao: string;

  interno: number;

  externo: number;

  interconsulta: number;

  especialidadeId: number;

  nomeProfissional: string;
}