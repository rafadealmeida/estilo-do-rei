// app/api/services/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../../../../../prisma/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { nome, telefone, email, senha } = body;

    const existingUser = await prisma.cliente.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Este usuário já existe' },
        { status: 400 },
      );
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const newServico = await prisma.cliente.create({
      data: {
        nome,
        telefone,
        email,
        senha: hashedSenha,
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
