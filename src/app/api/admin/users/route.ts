// src/app/api/admin/users/route.ts

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

// GET /api/admin/users - Obtener todos los usuarios o un usuario específico por ID
export async function GET(req: Request, { params }: { params?: { id?: string } }) {
  try {
    if (params?.id) {
      const userId = parseInt(params.id);
      if (isNaN(userId)) {
        return NextResponse.json({ message: 'ID de usuario inválido' }, { status: 400 });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
    } else {
      const users = await prisma.user.findMany();
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    console.error('Error en la API de usuarios (GET):', error);
    return NextResponse.json({ message: 'Error al obtener usuarios' }, { status: 500 });
  }
}

// POST /api/admin/users - Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const { email, username, password, role } = await req.json();
    if (!email || !username || !password || !role) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Ya existe un usuario con este correo' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, username, password: hashedPassword, role },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error en la API de usuarios (POST):', error);
    return NextResponse.json({ message: 'Error al crear usuario' }, { status: 500 });
  }
}

// PUT /api/admin/users - Actualizar un usuario
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
    return NextResponse.json({ message: 'Error al actualizar usuario' }, { status: 500 });
  }
}

// DELETE /api/admin/users - Eliminar un usuario
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
    return NextResponse.json({ message: 'Error al eliminar usuario' }, { status: 500 });
  }
}
