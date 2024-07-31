import { z } from 'zod';

// Função auxiliar para validar se a data e horário não estão no passado
const isFutureDateTime = (date: string, time: string) => {
  const currentDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  return currentDateTime > now;
};

// Função auxiliar para validar o formato do horário
const isValidTime = (val: string) => {
  const [hours, minutes] = val.split(':').map(Number);
  return (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
};

// Definindo o schema do agendamento
export const agendamentoSchema = z.object({
  id: z.number().int().optional(),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  horario: z.string().min(1, 'Horario não pode ser vazio'),
  fk_cliente_id: z.number().int().min(1, 'Deve-se escolher o cliente'),
  fk_servico_id: z.number().int().min(1, 'Deve-se escolher o serviço'),
  fk_funcionario_id: z.number().int().min(1, 'Deve-se escolher o funcionário'),
  //   dataHora: z
  //     .string()
  //     .min(1, 'A data e hora é obrigatorio para o agendamento'),
  // })
  // .superRefine((data, ctx) => {
  //   if (!isFutureDateTime(data.data, data.horario)) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'A data e horário não podem ser no passado',
  //       path: ['data'],
  //     });
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'O horário não pode ser no passado',
  //       path: ['horario'],
  //     });
  //   }
});

// Tipagem do agendamento
export type Agendamento = z.infer<typeof agendamentoSchema>;
