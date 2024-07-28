// app/api/services/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nome } = body;

    const newServico = await prisma.funcionario.create({
      data: {
        nome,
      },
    });
    return NextResponse.json(newServico, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Erro ao criar usuário' },
      { status: 500 },
    );
  }
}
