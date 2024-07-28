import { z } from 'zod';

export const servicoSchema = z.object({
  nome: z.string().min(1, 'Nome do serviço é obrigatório'),
  valor: z.string().refine(
    (value) => {
      const numericValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');
      return numericValue;
    },
    {
      message: 'O valor deve ser um número válido',
    },
  ),
});

export type Servico = z.infer<typeof servicoSchema>;
