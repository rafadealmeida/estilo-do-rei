// app/api/services/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import prisma from '../../../../../prisma/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nome, valor } = body;

    const newServico = await prisma.servico.create({
      data: {
        nome,
        valor,
      },
    });
    return NextResponse.json(newServico, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Erro ao criar serviço' },
      { status: 500 },
    );
  }
}
