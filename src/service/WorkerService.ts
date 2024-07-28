import axios from 'axios';

export interface Funcionario {
  nome: string;
}

const get = async (): Promise<Funcionario[]> => {
  try {
    const response = await axios.get('/api/worker');
    return response.data as Funcionario[];
  } catch (error) {
    console.log(error);
  }
};

export const WorkerService = {
  get,
};
