// src/schemas/servicoSchema.ts
import { z } from 'zod';

export const servicoSchema = z.object({
  nome: z.string().max(80, 'O nome deve ter no máximo 80 caracteres'),
  valor: z
    .string()
    .refine((value) => !isNaN(parseFloat(value.replace(/[^0-9,-]+/g, ''))), {
      message: 'O valor deve ser um número',
    }),
});

export type Servico = z.infer<typeof servicoSchema>;
