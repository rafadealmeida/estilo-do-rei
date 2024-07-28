import axios from 'axios';

export interface Clients {
  nome: string;
  telefone: string;
  email: string;
}

const get = async (): Promise<Clients[]> => {
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
