import axios from 'axios';

export interface BarberService {
  nome: string;
  valor: string;
  id: number;
}
const get = async (): Promise<BarberService[] | undefined> => {
  try {
    const response = await axios.get('/api/service');
    return response.data as BarberService[];
  } catch (error) {
    console.log(error);
  }
};

export const BarberService = {
  get,
};
