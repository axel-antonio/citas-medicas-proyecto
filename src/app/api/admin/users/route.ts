// src/app/api/admin/users/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error en la API de usuarios (GET):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Actualizar un usuario
export async function PUT(req: Request) {
  try {
    const { id, role } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error en la API de usuarios (PUT):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Eliminar un usuario
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Falta el ID del usuario para eliminar.' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error en la API de usuarios (DELETE):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
