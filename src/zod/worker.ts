import { z } from 'zod';
import { agendamentoSchema } from './agendamentoSchema';

export const workerSchema = z.object({
  id: z.number().int().optional(),
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(80, 'Nome deve ter no máximo 80 caracteres'),

  agendamento: z.array(agendamentoSchema).optional(),
});

export type Worker = z.infer<typeof workerSchema>;
