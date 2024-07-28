// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const clients = await prisma.cliente.findMany({
      where: {
        email: {
          not: 'estilodorei@senac.com',
        },
      },
      select: {
        nome: true,
        email: true,
        telefone: true,
      },
    });
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao obter serviços' },
      { status: 500 },
    );
  }
}
