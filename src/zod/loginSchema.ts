import { z } from 'zod';

// Defina o schema de validação com Zod
export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .min(1, 'Senha é obrigatória'),
});

export type IFormInput = z.infer<typeof loginSchema>; // Infere o tipo do schema
