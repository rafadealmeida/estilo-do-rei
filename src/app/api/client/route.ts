// app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prismaClient';

export async function GET() {
  try {
    const clients = await prisma.cliente.findMany({
      where: {
        email: {
          not: 'estilodorei@senac.com',
        },
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
