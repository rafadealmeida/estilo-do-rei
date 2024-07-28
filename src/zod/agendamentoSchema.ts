import { z } from 'zod';

// Definindo o schema do agendamento
export const agendamentoSchema = z.object({
  id: z.number().int().optional(),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  horario: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Horário inválido'),
  fk_cliente_id: z.number().int(),
  fk_servico_id: z.number().int(),
  fk_funcionario_id: z.number().int(),
});

// Tipagem do agendamento
export type Agendamento = z.infer<typeof agendamentoSchema>;
