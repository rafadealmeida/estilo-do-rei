// app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prismaClient';

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        cliente: {
          select: {
            nome: true,
            telefone: true,
          },
        },
        funcionario: {
          select: {
            nome: true,
          },
        },
        servico: {
          select: {
            nome: true,
          },
        },
      },
    });

    return NextResponse.json(agendamentos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao obter serviços' },
      { status: 500 },
    );
  }
}
