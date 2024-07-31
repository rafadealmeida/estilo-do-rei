import axios from 'axios';

export interface Funcionario {
  nome: string;
  id: number;
}
// @ts-ignore
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
