// app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prismaClient';

export async function GET() {
  try {
    const workers = await prisma.funcionario.findMany({});
    return NextResponse.json(workers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao obter serviços' },
      { status: 500 },
    );
  }
}
