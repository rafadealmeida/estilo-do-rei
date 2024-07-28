import { z } from 'zod';
import { agendamentoSchema } from './agendamentoSchema';

// Definindo o schema do cliente
export const clientSchema = z
  .object({
    id: z.number().int().optional(),
    nome: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(80, 'Nome deve ter no máximo 80 caracteres'),
    telefone: z
      .string()
      .max(15, 'Telefone deve ter no máximo 15 caracteres')
      .optional(),
    email: z
      .string()
      .email('Email inválido')
      .max(80, 'Email deve ter no máximo 80 caracteres'),
    senha: z
      .string()
      .min(5, 'Senha deve ter no mínimo 5 caracteres')
      .max(255, 'Senha deve ter no máximo 255 caracteres'),
    agendamento: z.array(agendamentoSchema).optional(),

    confirmarSenha: z
      .string()
      .min(5, { message: 'Senha deve ter no mínimo 5 caracteres' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas devem ser iguais',
    path: ['confirmarSenha'], // path to show the error
  });

// Tipagem do cliente
export type Cliente = z.infer<typeof clientSchema>;
