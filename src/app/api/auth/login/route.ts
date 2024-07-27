// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.NEXT_PUBLIC_EMAIL &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      return NextResponse.json(
        { message: 'Login bem-sucedido' },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
