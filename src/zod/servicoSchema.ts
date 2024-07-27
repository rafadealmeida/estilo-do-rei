// src/schemas/servicoSchema.ts
import { z } from 'zod';

export const servicoSchema = z.object({
  nome: z.string().max(80, 'O nome deve ter no máximo 80 caracteres'),
  valor: z
    .number()
    .min(0, 'O valor deve ser maior ou igual a 0')
    .or(z.string()),
});

export type Servico = z.infer<typeof servicoSchema>;
