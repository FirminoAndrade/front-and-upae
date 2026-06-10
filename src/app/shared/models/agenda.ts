export interface Agenda {
  id?: number;

  data: string;

  especialidade: string;

  profissional: string;

  turno: string;

  agendados: number;

  confirmado: boolean;
}
