import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.NEXT_PUBLIC_EMAIL &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      return NextResponse.json(
        { isAdmin: true, message: 'Login bem-sucedido' },
        { status: 200 },
      );
    }

    const user = await prisma.cliente.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { isAdmin: false, message: 'Usuário não encontrado' },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return NextResponse.json(
        { isAdmin: false, message: 'Credenciais inválidas' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { isAdmin: false, message: 'Login bem-sucedido' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
