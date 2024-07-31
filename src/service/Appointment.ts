import axios from 'axios';

export interface Cliente {
  nome: string;
  telefone?: string;
}

export interface Funcionario {
  nome: string;
}
export interface Servico {
  nome: string;
}

export interface AppointmentService {
  id: number;
  data: Date;
  horario: Date;
  fk_cliente_id: number;
  fk_servico_id: number;
  fk_funcionario_id: number;
  cliente: Cliente;
  funcionario: Funcionario;
  servico: Servico;
}

const get = async (): Promise<AppointmentService[]> => {
  try {
    const response = await axios.get('/api/appointment');
    return response.data as AppointmentService[];
  } catch (error) {
    console.log(error);
  }
};

export const AppointmentService = {
  get,
};
