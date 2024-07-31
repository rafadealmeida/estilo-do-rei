import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { agendamentoSchema } from '@/zod/agendamentoSchema';
import prisma from '../../../../../prisma/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = agendamentoSchema.parse(body);

    const { data, horario, fk_cliente_id, fk_servico_id, fk_funcionario_id } =
      parsedBody;

    const newServico = await prisma.agendamento.create({
      data: {
        data: new Date(data),
        horario: new Date(horario),
        fk_cliente_id,
        fk_servico_id,
        fk_funcionario_id,
      },
    });
    return NextResponse.json(newServico, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Erro ao criar agendamento' },
      { status: 500 },
    );
  }
}
