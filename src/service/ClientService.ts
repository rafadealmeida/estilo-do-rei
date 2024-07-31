import axios from 'axios';

export interface Clients {
  nome: string;
  telefone: string;
  email: string;
  id: number;
}
const get = async (): Promise<Clients[] | undefined> => {
  try {
    const response = await axios.get('/api/client');
    return response.data as Clients[];
  } catch (error) {
    console.log(error);
  }
};

export const ClientService = {
  get,
};
