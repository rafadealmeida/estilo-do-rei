// app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prismaClient';

export async function GET() {
  try {
    const servicos = await prisma.servico.findMany();
    return NextResponse.json(servicos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao obter serviços' },
      { status: 500 },
    );
  }
}
